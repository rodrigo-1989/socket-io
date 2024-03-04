import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const { auth, verificaToken } = useContext(AuthContext);
    useEffect(() => {
        verificaToken();
    }, [])

    if (auth.checking) {
        return <h1>Espere por favor</h1>
    }
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path='/auth/*' element={<AuthRouter />} ></Route> */}
                <Route path='/auth/*' element={<PublicRoute isAuthenticated={auth.logged} />}></Route>

                <Route path='/' element={<PrivateRoute isAuthenticated={auth.logged} />} ></Route>

                <Route path='*' element={<ChatPage />} ></Route>
            </Routes>
        </BrowserRouter>
    )
}
