import { createContext, useCallback, useState } from "react";
import React from 'react';
import { fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const login = async (email, password) => {
        const resp = await fetchSinToken('login', { email, password }, 'POST');
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { uid, nombre, email } = resp.usuarioDB;
            setAuth({
                uid,
                checking: true,
                logged: true,
                name: nombre, email
            });
            console.log('Authenticado')
        }
        return resp.ok;
    }
    const register = (nombre, email, password) => {

    }

    const verificaToken = useCallback(() => {
    }, []);

    const logout = () => {

    }
    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout
        }} >
            {children}
        </AuthContext.Provider>
    )
}
