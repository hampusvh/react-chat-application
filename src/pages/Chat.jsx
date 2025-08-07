import SideNav from "../components/SideNav";
import "../styles/Chat.css";

const Chat = () => {
    return (
        <div className="chat-page">
            <SideNav />
            <main className="chat-content">

                <p>Välkommen till chatten!</p>
            </main>
        </div>
    );
};

export default Chat;
