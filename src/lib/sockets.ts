import { Socket, io } from 'socket.io-client';

let globalChatSocket: Socket;
// let friendsSocket: Socket;

export const getGlobalChatSocket = (): Socket => {
  if (!globalChatSocket) {
    globalChatSocket = io(`${import.meta.env.VITE_BACKEND_URL}/global-chat`, {
      withCredentials: true,
    });
  }
  return globalChatSocket;
};

// export const getFriendsSocket = (): Socket => {
//   if (!friendsSocket) {
//     friendsSocket = io(`${import.meta.env.VITE_BACKEND_URL}/friends`, {
//       withCredentials: true,
//     });
//   }
//   return friendsSocket;
// };
