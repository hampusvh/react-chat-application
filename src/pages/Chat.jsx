import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../styles/Chat.css";
import { getMessages } from "../api/messages";
import { decodeToken } from "../utils/jwt";


const Chat = () => {
    const myUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | error
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                setStatus("loading");
                setError("");

                // ⬇️ Lägg debug här, efter att du hämtat token men innan du kallar getMessages
                const decoded = decodeToken(token);
                console.log("Token payload:", decoded);

                const data = await getMessages(token);
                console.log("Exempelmeddelande:", data[0]);

                if (!isMounted) return;
                setMessages(Array.isArray(data) ? data : []);
                setStatus("idle");
            } catch (err) {
                if (!isMounted) return;
                setStatus("error");
                setError(err?.message || "Kunde inte hämta meddelanden");
                console.error("GET /messages failed:", err);
            }
        }
        load();
        return () => { isMounted = false; };
    }, [token]);

    return (
        <div className="chat-wrapper">
            <SideNav />

            <main className="chat-content">
                <div className="chat-output">
                    {status === "loading" && <div>Laddar...</div>}
                    {status === "error" && <div className="error">{error}</div>}

                    {status === "idle" && messages.length === 0 && (
                        <div>Inga meddelanden ännu</div>
                    )}

                    {messages.map((msg) => {
                        const isMine = String(msg.userId) === String(myUserId);
                        return (
                            <div key={msg.id} className={`message ${isMine ? "mine" : "other"}`}>
                                {msg.text}
                            </div>
                        );
                    })}
                </div>

                <div className="chat-composer">
                    <input
                        className="composer-input"
                        type="text"
                        placeholder="write your message here"
                        disabled
                    />
                    <button className="send-button" type="button" disabled>
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Chat;
