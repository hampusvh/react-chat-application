import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../styles/Chat.css";
import { getMessages, sendMessage, deleteMessage } from "../api/messages";
import { getCsrfToken } from "../api/auth";

function sanitizeText(text) {
    return text.replace(/[<>]/g, "").trim();
}

const getProjectId = () => {
    let id = localStorage.getItem("projectConversationId");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("projectConversationId", id);
    }
    return id;
};

const Chat = () => {
    const myUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const conversations = [
        { id: null, name: "General" },
        { id: getProjectId(), name: "Project" },
    ];

    const [conversationId, setConversationId] = useState(
        localStorage.getItem("currentConversationId") || null
    );
    useEffect(() => {
        if (conversationId) {
            localStorage.setItem("currentConversationId", conversationId);
        } else {
            localStorage.removeItem("currentConversationId");
        }
    }, [conversationId]);

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setError("");
                const data = await getMessages(token, conversationId);
                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err?.message || "Kunde inte hämta meddelanden");
            }
        }
        load();
    }, [token, conversationId]);

    const handleChange = (e) => setInputText(e.target.value);

    const handleSend = async () => {
        if (isSending) return;

        const cleanText = sanitizeText(inputText);
        if (!cleanText) return;

        try {
            setIsSending(true);
            const csrfToken = await getCsrfToken();
            await sendMessage({ token, text: cleanText, conversationId, csrfToken });

            const fresh = await getMessages(token, conversationId);
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
            const csrfToken = await getCsrfToken();
            await deleteMessage({ token, id, csrfToken });
            setMessages((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            setError(err?.message || "Kunde inte radera meddelande");
        }
    };

    return (
        <div className="chat-wrapper">
            <SideNav
                conversations={conversations}
                activeId={conversationId}
                onSelect={setConversationId}
            />

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
                                    <button
                                        className="msg-delete-btn"
                                        onClick={() => handleDelete(msg.id)}
                                        title="Radera meddelande"
                                        aria-label="Radera meddelande"
                                    >
                                        ❌
                                    </button>
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
