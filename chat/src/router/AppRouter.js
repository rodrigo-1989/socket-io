import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {
    const { auth, verificaToken } = useContext(AuthContext);
    useEffect(() => {
      verificaToken();
    }, [])
    
    if (auth.checking) {
        return <h1>Espere or favor</h1>
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/*' element={<AuthRouter />} ></Route>
                <Route exact path='/' element={<ChatPage />} ></Route>

                <Route path='*' element={<ChatPage />} ></Route>
            </Routes>
        </BrowserRouter>
    )
}
