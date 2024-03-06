import { createContext, useCallback, useContext, useState } from "react";
import React from 'react';
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { ChatContext } from "../contexts/chat/ChatContext";
import { types } from "../types/types";

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
    const { dispatch } = useContext(ChatContext);

    const login = async (email, password) => {
        const resp = await fetchSinToken('login', { email, password }, 'POST');
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { uid, nombre, email } = resp.usuarioDB;
            setAuth({
                uid,
                checking: false,
                logged: true,
                name: nombre, email
            });
        }
        return resp.ok;
    }
    const register = async (nombre, email, password) => {
        const resp = await fetchSinToken('login/new', { email, password, nombre }, 'POST');
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { uid, nombre, email } = resp.usuario;
            setAuth({
                uid,
                checking: false,
                logged: true,
                name: nombre, email
            });
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
            return true;
        } else {
            setAuth({ uid: null, checking: false, logged: false });
            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false
        });
        dispatch({ type: types.eliminarState })
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
