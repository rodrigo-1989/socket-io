import { SidebarChatItem } from './SidebarChatItem';

export const Sidebar = () => {
    const chat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="inbox_chat">
            {chat.map((chat) => (<SidebarChatItem key={chat} />))}
            <div className="extra_space"></div>
        </div>
    )
}
