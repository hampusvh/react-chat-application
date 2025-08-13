import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../styles/Chat.css";
import { getMessages, sendMessage, deleteMessage } from "../api/messages";
import { getCsrfToken } from "../api/auth";



const Chat = () => {

    const myUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);


    useEffect(() => {
        async function load() {
            try {
                setError("");

                const data = await getMessages(token);

                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err?.message || "Kunde inte hämta meddelanden");
            }
        }
        load();
    }, [token]);

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSend = async () => {
        const text = inputText.trim();
        if (!text || isSending) return;
        try {
            setIsSending(true);
            const { csrfToken } = await getCsrfToken();
            await sendMessage({ token, text, conversationId: null, csrfToken });

            const fresh = await getMessages(token);
            setMessages(fresh);
            setInputText("");
        } catch (err) {
            console.error("Kunde inte skicka meddelande:", err);
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Vill du radera meddelandet?")) return;
        try {
            const { csrfToken } = await getCsrfToken();
            await deleteMessage({ token, id, csrfToken });
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            setError(err?.message || "Kunde inte radera meddelande");
        }
    };

    return (
        <div className="chat-wrapper">
            <SideNav />

            <main className="chat-content">
                <div className="chat-output">

                    {error && <div className="error">{error}</div>}
                    {!error && messages.length === 0 && <div>Inga meddelanden ännu</div>}

                    {messages.map((msg) => {
                        const isMine = String(msg.userId) === String(myUserId);
                        return (
                            <div key={msg.id} className={`message ${isMine ? "mine" : "other"}`}>
                                <span className="message-text">{msg.text}</span>
                                {isMine && (
                                    <div className="delete-btn-wrapper">
                                        <button
                                            className="msg-delete-btn"
                                            onClick={() => handleDelete(msg.id)}
                                            title="Radera meddelande"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="chat-composer">
                    <input
                        className="composer-input"
                        type="text"
                        placeholder="write your message here"
                        value={inputText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={isSending}
                    />
                    <button
                        className="send-button"
                        type="button"
                        onClick={handleSend}
                        disabled={isSending || inputText.trim() === ""}
                    >
                        {isSending ? "Sending..." : "Send"}
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Chat;
