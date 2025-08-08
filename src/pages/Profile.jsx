import { useNavigate } from "react-router-dom";



const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className='profile-page'>
            <div className='profile-container'>
                <button onClick={() => navigate("/chat")} className="back-button">
                    go back
                </button>
            </div>
        </div>
    )
}

export default Profile