import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import { ChatProvider } from './contexts/ChatContext'

export const ChatApp = () => {

  return (
    <AuthProvider>
      <SocketProvider>
        <ChatProvider>
          <AppRouter />
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
