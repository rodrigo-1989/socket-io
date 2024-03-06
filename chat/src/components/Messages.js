import React, { useContext } from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { ChatContext } from '../contexts/chat/ChatContext'
import { AuthContext } from '../auth/AuthContext'

export const Messages = () => {
    const { chatState } = useContext(ChatContext);    
    const { auth } = useContext(AuthContext);   
    return (
        <div className="mesgs">
            <div className="msg_history" id="mensajes">
                {
                    chatState.mensajes.map(msg => (
                        ( msg.para === auth.uid )
                            ? <IncomingMessage key={msg._id} msg={ msg }/>
                            : <OutgoingMessage key={msg._id} msg={ msg }/>
                    ))
                }

            </div>
            <SendMessage />
        </div>
    )
}
