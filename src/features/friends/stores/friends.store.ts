import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';

import { privateAxios } from '@/lib';

interface FriendsStore {
  onlineStatus: { [userId: number]: boolean };
  socket: Socket | null;
  initializeSocket: () => void;
  setOnlineStatus: (userId: number, isOnline: boolean) => void;
  fetchInitialStatus: () => Promise<void>;
  disconnectSocket: () => void;
}

export const useFriendsStore = create<FriendsStore>((set, get) => ({
  onlineStatus: {},
  socket: null,

  initializeSocket: () => {
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}/friends`, {
      withCredentials: true,
    });

    socket.on('friend_status_changed', ({ userId, isOnline }) => {
      get().setOnlineStatus(userId, isOnline);
    });

    set({ socket });
  },

  setOnlineStatus: (userId: number, isOnline: boolean) => {
    set((state) => ({
      onlineStatus: {
        ...state.onlineStatus,
        [userId]: isOnline,
      },
    }));
  },

  // TODO: Move it into react query call and set it into the store
  fetchInitialStatus: async () => {
    try {
      const { data } = await privateAxios.get('/friends/online-status');
      set({ onlineStatus: data });
    } catch (error) {
      console.error('Failed to fetch initial online status:', error);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
