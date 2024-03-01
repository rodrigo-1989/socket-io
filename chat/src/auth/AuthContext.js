import { createContext, useCallback, useState } from "react";
import React from 'react';
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

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
            const { uid, nombre, email } = resp.usuario;
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
    const register = async (nombre, email, password) => {
        const resp = await fetchSinToken('login/new', { email, password, nombre }, 'POST');
        console.log(object);
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { uid, nombre, email } = resp.usuario;
            setAuth({
                uid,
                checking: true,
                logged: true,
                name: nombre, email
            });
            console.log('Registrado')
        }
        return resp.ok;
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuth({ uid: null, checking: false, logged: false, name: null, email: null });
            return false;
        }

        const resp = await fetchConToken('login/renew');
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { uid, nombre, email } = resp.usuario;
            setAuth({ uid, checking: false, logged: true, name: nombre, email });
            console.log('Token restablecido');
            return true;
        } else {
            setAuth({ uid: null, checking: false, logged: false });
            return false;
        }
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
