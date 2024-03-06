import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import { ChatProvider } from './contexts/chat/ChatContext';

export const ChatApp = () => {

  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}
