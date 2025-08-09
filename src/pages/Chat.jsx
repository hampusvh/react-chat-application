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
                <div className="composer">
                    <input className="message-input"
                        type="text"
                        placeholder="write your message here"
                    />
                    <button className="send-btn" type="button">Send</button>
                </div>
            </main>
        </div>
    );
};

export default Chat;
