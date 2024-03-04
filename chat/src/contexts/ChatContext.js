import { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

const initiaState = {
    uid: '',
    chatActivo: null,
    usuarios: [],
    mensajes: []
  }

export const ChatContext = createContext();

export const ChatProvider = ({ children }) =>{
    const [chatState, dispatch] = useReducer(chatReducer, initiaState);
    return (
        <ChatContext.Provider value={{ chatState, dispatch }} >
            { children }
        </ChatContext.Provider>
    )

} 