import SideNav from "../components/SideNav";
import "../styles/Chat.css";

const Chat = () => {
    return (
        <div className="chat-page">
            <SideNav />
            <main className="chat-content">
                <div className="message-output">
                    Message output
                </div>
                <input className="message-input">
                </input>
            </main>
        </div>
    );
};

export default Chat;
