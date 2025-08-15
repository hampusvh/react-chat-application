export default function AvatarPreview({ src }) {
    if (!src) return null;
    return (
        <div className="avatar-preview">
            <img src={src} alt="avatar preview" className="avatar-preview-img" />
        </div>
    );
}
