import SideNav from "../components/SideNav";
import "../styles/Chat.css";

const Chat = () => {
    return (
        <div className="chat-wrapper">
            <SideNav />

            <main className="chat-content">
                <div className="chat-output">
                    Message output
                </div>

                <div className="chat-composer">
                    <input
                        className="composer-input"
                        type="text"
                        placeholder="write your message here"
                    />
                    <button className="send-button" type="button">Send</button>
                </div>
            </main>
        </div>
    );
};

export default Chat;
