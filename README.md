### Project Documentation

**Project Overview:**
This project is a video meeting application built on the MERN stack (MongoDB, Express, React, Node.js). It allows users to create and join meetings, offering a seamless experience for video conferencing. The app includes features like screen sharing, muting, and video toggling to enhance user interaction.

**Key Features:**
- **User Authentication:** Users register and log in securely using bcrypt.js for password hashing.
- **Real-Time Communication:** The app uses WebRTC for handling video calls and data transfer between peers, enabling real-time video and audio communication.
- **Socket.io Implementation:** Socket.io is used for signaling in WebRTC, allowing users to join and leave meetings dynamically and ensuring that real-time updates (like new participants joining) are instantly reflected.
- **Screen Sharing:** Users can share their screens with others in the meeting, making it ideal for presentations and collaborative work.
- **Mute/Unmute and Video Toggle:** Participants have the ability to mute/unmute their microphones and toggle their video streams on or off during a meeting.

**Technologies Used:**
- **Frontend:** React.js for building the user interface, Material UI for components, and Bootstrap for responsive design.
- **Backend:** Node.js with Express.js for server-side logic, MongoDB for database management.
- **WebRTC:** For peer-to-peer video communication.
- **Socket.io:** For real-time event-based communication.
- **Bcrypt.js:** For secure user authentication.

This application offers a comprehensive solution for virtual meetings, combining robust technologies to ensure a reliable and user-friendly experience.
