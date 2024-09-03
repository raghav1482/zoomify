import React, { useContext, useEffect, useState } from 'react';
import '../styles/Home.css';
import { AuthContext } from '../context/authContext';
import { SocketContext } from '../context/SocketContext';
import { CgEnter } from 'react-icons/cg';
import { RiVideoAddFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Groups2Icon from '@mui/icons-material/Groups2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BoltIcon from '@mui/icons-material/Bolt';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [newMeetDate, setNewMeetDate] = useState('none');
  const [newMeetTime, setNewMeetTime] = useState('none');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomError, setJoinRoomError] = useState('');

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { socket, setMyMeets, newMeetType, setNewMeetType } = useContext(SocketContext);

  const userId = localStorage.getItem("userId") ? localStorage.getItem("userId").toString() : '';
  const userName = localStorage.getItem("userName") ? localStorage.getItem("userName").toString() : '';

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  const handleCreateRoom = () => {
    socket.emit("create-room", { userId, roomName, newMeetType, newMeetDate, newMeetTime });
  };

  const handleJoinRoom = async () => {
    setJoinRoomError(''); // Clear any previous error messages
    socket.emit('user-code-join', { roomId: joinRoomId });
    
    socket.on('room-exists', ({ roomId }) => {
      navigate(`/meet/${roomId}`);
    });
    
    socket.on('room-not-exist', () => {
      setJoinRoomError("Room doesn't exist! Please try again.");
      setJoinRoomId(''); // Clear the room ID input
    });
  };
  

  useEffect(() => {
    socket.on("room-exists", ({ roomId }) => {
      navigate(`/meet/${roomId}`);
    });

    socket.on("room-not-exist", () => {
      setJoinRoomId('');
      setJoinRoomError("Room doesn't exist! Please try again.");
    });

    socket.emit("fetch-my-meets", { userId });
    socket.on("meets-fetched", async ({ myMeets }) => {
      console.log("myMeets", myMeets);
      setMyMeets(myMeets);
    });
  }, [socket]);

  return (
    <div className='homePage'>
      <div className="homePage-hero">
        <div className="home-header">
          <div className="home-logo">
            <h2>Zoomify</h2>
          </div>

          {!userName || userName === 'null' ? 
            <div className="header-before-login">
              <button onClick={handleLogIn}>Login</button>
            </div>
          :
            <div className="header-after-login">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link className='dropdown-options' to='/profile'>Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item className='dropdown-options' onClick={handleLogOut}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          }
        </div>

        <div className="home-container container">
          {!userName || userName === 'null' ? 
            <div className="home-app-intro">
              <h2>Video calls and meetings<br/>
              for everyone.</h2>
              <button onClick={handleLogIn}>Join Now..</button>
            </div>
          :
            <>
              <div className="home-app-intro">
                <span className="welcome">Welcome!! {userName},</span>
                <h2>Video calls and meetings<br/>
                for everyone.</h2>
              </div>
              <div className="home-meet-container">
                <div className="create-meet">
                  <input type="text" placeholder='Name your meet...' onChange={(e) => setRoomName(e.target.value)} />
                  <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <RiVideoAddFill /> New meet
                  </button>
                </div>
                <p>or</p>
                <div className="join-meet">
                  <input type="text" placeholder='Enter code...' onChange={(e) => setJoinRoomId(e.target.value)} />
                  <button onClick={handleJoinRoom}>
                    <CgEnter /> Join Meet
                  </button>
                </div>
                <span>{joinRoomError}</span>
              </div>

              {/* Modal */}
              <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ width: "30vw" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">Create New Meet</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder='Name your meet' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                        <label htmlFor="floatingInput">Meet name</label>
                      </div>

                      <select className="form-select" aria-label="Default select example" onChange={(e) => setNewMeetType(e.target.value)}>
                        <option selected>Choose meet type</option>
                        <option value="instant">Instant meet</option>
                        <option value="scheduled">Schedule for later</option>
                      </select>

                      {newMeetType === 'scheduled' && (
                        <>
                          <p style={{ margin: "10px 0px 0px 0px", color: 'rgb(2, 34, 58)' }}>Meet Date:</p>
                          <input type='date' className="form-control" onChange={(e) => setNewMeetDate(e.target.value)} />
                          <p style={{ margin: "10px 0px 0px 0px", color: 'rgb(2, 34, 58)' }}>Meet Time:</p>
                          <input type='time' className="form-control" onChange={(e) => setNewMeetTime(e.target.value)} />
                        </>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary" onClick={handleCreateRoom} data-bs-dismiss="modal">Create meet</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>



      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <Link to='/privacy'>Privacy Policy</Link>
            <Link to='/terms'>Terms of Use</Link>
            <Link to='/contact'>Contact Us</Link>
          </div>
          <div className="footer-socials">
            <Link to=''><GoogleIcon /></Link>
            <Link to=''><FacebookIcon /></Link>
            <Link to=''><InstagramIcon /></Link>
            <Link to=''><TwitterIcon /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Zoomify. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
