import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chatContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket]);

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);

    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({ type: '', payload: usuarios})
        });
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }} >
            {children}
        </SocketContext.Provider>
    )
}
