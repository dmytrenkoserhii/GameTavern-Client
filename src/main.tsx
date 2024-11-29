import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';

import '@/index.css';
import { getGlobalChatSocket } from '@/lib/global-chat-socket.ts';
import '@/lib/i18n';

import App from './App.tsx';

getGlobalChatSocket();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
