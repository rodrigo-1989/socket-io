import { useContext } from 'react';
import { SidebarChatItem } from './SidebarChatItem';
import { ChatContext } from '../contexts/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const Sidebar = () => {
    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    return (
        <div className="inbox_chat">
            {
                chatState.usuarios.map((usuario) => (
                    usuario.uid !== auth.uid &&
                    <SidebarChatItem key={usuario.uid} usuario={usuario} />
                ))
            }
            <div className="extra_space"></div>
        </div>
    )
}
