import React, { createContext, useState } from 'react';

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
    const [ocultarMenu, setOcultarMenu] = useState(true);
    const showMenu = () => setOcultarMenu(false);
    const hidenMenu = () => setOcultarMenu(true);
    return (
        <UiContext.Provider value={{ ocultarMenu, showMenu, hidenMenu }}>
            {children}
        </UiContext.Provider>
    )
}
