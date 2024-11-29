import { Socket, io } from 'socket.io-client';

let globalChatSocket: Socket;

export const getGlobalChatSocket = (): Socket => {
  if (!globalChatSocket) {
    globalChatSocket = io(`${import.meta.env.VITE_BACKEND_URL}/global-chat`, {
      withCredentials: true,
    });
  }
  return globalChatSocket;
};
