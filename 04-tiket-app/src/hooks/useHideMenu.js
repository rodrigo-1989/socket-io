import { useContext } from 'react'
import { UiContext } from '../context/UiContext';
import { useEffect } from 'react';

export const useHideMenu = (ocultar) => {
    const { showMenu, hidenMenu } = useContext(UiContext);
    useEffect(() => {
        if (ocultar)
            hidenMenu();
        else
            showMenu()
    }, [ocultar, hidenMenu, showMenu])
}
