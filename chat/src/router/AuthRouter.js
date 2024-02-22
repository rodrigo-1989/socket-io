import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import '../css/login-register.css'

export const AuthRouter = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <Routes>
                        <Route exact path='login' element={<LoginPage />} ></Route>
                        <Route exact path='register' element={<RegisterPage />} ></Route>
                        <Route path='*' element={<Navigate to='/auth/login' />} ></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
