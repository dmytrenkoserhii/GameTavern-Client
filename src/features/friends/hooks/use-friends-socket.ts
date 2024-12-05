import { io } from 'socket.io-client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { PaginatedResponse } from '@/types';

import { Friend } from '../types';

export const useFriendsSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('useFriendsSocket');
    const socket = io('http://localhost:5050/friends', {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Connected to friends socket');
    });

    // Handle new friend request
    socket.on('new_friend_request', (friendRequest: Friend) => {
      console.log('new_friend_request', friendRequest);
      queryClient.setQueryData(
        ['friends', 'pending', 'incoming'],
        (oldData: PaginatedResponse<Friend>) => ({
          ...oldData,
          items: [...(oldData?.items || []), friendRequest],
        }),
      );
    });

    // Handle friend request accepted
    socket.on('friend_request_accepted', (friendRequest: Friend) => {
      console.log('friend_request_accepted', friendRequest);
      // Add to friends list
      queryClient.setQueryData(['friends'], (oldData: PaginatedResponse<Friend>) => ({
        ...oldData,
        items: [...(oldData?.items || []), friendRequest],
      }));

      // Remove from pending outgoing
      queryClient.setQueryData(
        ['friends', 'pending', 'outgoing'],
        (oldData: PaginatedResponse<Friend>) => ({
          ...oldData,
          items: oldData?.items.filter((req: Friend) => req.id !== friendRequest.id) || [],
        }),
      );
    });

    // Handle friend request rejected
    socket.on('friend_request_rejected', (friendRequest: Friend) => {
      console.log('friend_request_rejected', friendRequest);
      // Remove from pending outgoing
      queryClient.setQueryData(
        ['friends', 'pending', 'outgoing'],
        (oldData: PaginatedResponse<Friend>) => ({
          ...oldData,
          items: oldData?.items.filter((req: Friend) => req.id !== friendRequest.id) || [],
        }),
      );

      // Add to rejected outgoing
      queryClient.setQueryData(
        ['friends', 'rejected', 'outgoing'],
        (oldData: PaginatedResponse<Friend>) => ({
          ...oldData,
          items: [...(oldData?.items || []), friendRequest],
        }),
      );
    });

    socket.on('friend_deleted', (friendRequest: Friend) => {
      console.log('friend_deleted', friendRequest);
      queryClient.setQueryData(['friends'], (oldData: PaginatedResponse<Friend>) => ({
        ...oldData,
        items: oldData?.items.filter((req: Friend) => req.id !== friendRequest.id) || [],
      }));
    });

    socket.on('friend_request_resent', (friendRequest: Friend) => {
      console.log('friend_request_resent', friendRequest);
      // Add to pending outgoing
      queryClient.setQueryData(
        ['friends', 'pending', 'incoming'],
        (oldData: PaginatedResponse<Friend>) => ({
          ...oldData,
          items: [...(oldData?.items || []), friendRequest],
        }),
      );
    });

    // Handle friend status changes
    socket.on('friend_status_changed', ({ userId, isOnline }) => {
      console.log('friend_status_changed', { userId, isOnline });
      // Update online status in friends list
      queryClient.setQueryData(['friends'], (oldData: PaginatedResponse<Friend>) => ({
        ...oldData,
        items:
          oldData?.items.map((friend: Friend) => {
            if (friend.sender.id === userId || friend.receiver.id === userId) {
              return {
                ...friend,
                isOnline,
              };
            }
            return friend;
          }) || [],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
