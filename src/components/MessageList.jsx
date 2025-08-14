export default function MessageList({ conversations = [], activeId, onSelect }) {
    return (
        <div className="conversation-list">
            {conversations.map((c) => (
                <button
                    key={c.id ?? "general"}
                    type="button"
                    className={c.id === activeId ? "conv-item active" : "conv-item"}
                    onClick={() => onSelect(c.id ?? null)}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
}
