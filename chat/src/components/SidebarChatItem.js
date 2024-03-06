import React, { useContext } from 'react'
import { ChatContext } from '../contexts/chat/ChatContext'
import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

export const SidebarChatItem = ({ usuario }) => {
    const { chatState, dispatch } = useContext(ChatContext);
    const activarChat = async () => {
        dispatch({ type: types.activarChat, payload: usuario.uid });
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);
        dispatch({ type: types.cargarMensajes, payload: resp.mensajes });
        setTimeout(() => { scrollToBottom('mensajes'); }, 1);
    }
    const { nombre, online, uid } = usuario;
    return (
        <div className={`chat_list ${(uid === chatState.chatActivo) && 'active_chat'}`} onClick={activarChat} >
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{nombre}</h5>
                    {
                        online
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
