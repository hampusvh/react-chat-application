import SideNav from "../components/SideNav";
import "../styles/Chat.css";

const Chat = () => {
    return (
        <div className="chat-layout">
            <SideNav />               {/* aside i sin egen komponent */}

            <main className="chat-main">
                <div className="container">
                    <div className="chat-body">
                        Message output
                    </div>

                    <div className="chat-composer">
                        <input
                            className="composer-input"
                            type="text"
                            placeholder="write your message here"
                        />
                        <button className="composer-send" type="button">Send</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chat;
