import React from 'react'
import { SendMessage } from './SendMessage'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'

export const Messages = () => {
    const messages = [1, 2, 3, 4, 5, 6, 7, 8,]
    return (
        <div className="mesgs">
            <div className="msg_history">
                {
                    messages.map(msg => (
                        (msg % 2)
                            ? <IncomingMessage key={msg}/>
                            : <OutgoingMessage key={msg}/>
                    ))
                }

            </div>
            <SendMessage />
        </div>
    )
}
