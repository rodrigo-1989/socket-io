import React, { useContext, useState } from 'react'
import { SocketContext } from '../contexts/SocketContext';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../contexts/chat/ChatContext';

export const SendMessage = () => {

    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const [mensaje, setMensaje] = useState('');
    const onChange = ({ target }) => {
        setMensaje(target.value);
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (mensaje.length === 0) return;
        setMensaje('');
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={mensaje}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="button">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
