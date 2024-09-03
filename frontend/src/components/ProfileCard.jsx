import React, { useContext, useState } from 'react';
import '../styles/profileCard.css';
import EditIcon from '@mui/icons-material/Edit';
import { SocketContext } from "../context/SocketContext";

const ProfileCard = () => {
  const { socket } = useContext(SocketContext);

  const username = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(username);

  const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551_1280.png');

  const handleUpdate = async () => {
    await socket.emit("update-username", { updateText, userId });
    setIsUpdate(false);
    console.log("userruu", updateText);
  }

  return (
    <div className='profile-card'>
      <div className="profile-header">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <button className="edit-btn" onClick={() => setIsUpdate(true)}>
          <EditIcon />
        </button>
      </div>

      {!isUpdate ?
        <div className="profile-info">
          <p>Username: <span>{username}</span></p>
          <p>Email: <span>{email}</span></p>
        </div>
        :
        <div className="update-info">
          <input
            type="text"
            placeholder="Update your name"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            className="update-input"
          />
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      }
    </div>
  )
}

export default ProfileCard;
