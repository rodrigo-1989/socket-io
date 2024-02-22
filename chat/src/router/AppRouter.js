import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
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
