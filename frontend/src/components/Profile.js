import React from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate=useNavigate();
  const BackToFeed=()=>{
    navigate('/Feed')
  }
  const EditPlace=()=>{
    navigate('/edit')
  }
  return (
    <div className="profile">
      
      <div className="cover-container">
        <div className="image">
        </div>
        
        
      </div>
      <i class="bi bi-arrow-left-short " ></i>
      {/* Profile Details */}
      <div className="profile-details">
        <div className="first-row-profile">
        <img
          className="profile-avatar"
          src="https://s3-alpha-sig.figma.com/img/b54f/d858/f5e14f76f0793df709ce9bfe5e5f284e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F8EFZaa43X~VhEEfRsEglJDRMTzHxfryVgZpQr4867nnq~eRK2PoxpDYPhNmWuAwD~U~EO6q2wjlxPnmI1N5EQt5ubA8xkxbbiod6DmBGyQzNrBhaDkihT1L7PZy6nQGXxCdZJk33f1sFk4LP9I20QmSXaFs87hDjq-01nwMXmcj8PsfMA9GX1bPWHtJq6mxKQ4w~ftMK-OeZ9~GS61vYBncZ859QZzdeH16hP4S4123dgvRs8TJhHakYxvrql63NNAsnXYa~~5YkkhF7M4g1AcT0ybU8roBS-MmWt4yDwPXZ6s1llYiTkEr8ecDNk0D6TXt7B8gdtyBR-IbT~kwdw__"
          alt="Profile"
        />
        <button className="edit-profile-button" onClick={EditPlace}>Edit Profile</button>
        </div>
        <h2 className="profile-name">Sakshi Agarwal</h2>
        <p className="profile-bio">
          Just someone who loves designing, sketching, and finding beauty in the
          little things. ❤️
        </p>
        
      </div>

      {/* Posts Section */}
      <h3 className="posts-header">My Posts</h3>
      <div className="posts-container">
        {/* Post 1 */}
        <div className="post">
          <img
            src="https://s3-alpha-sig.figma.com/img/3d74/8cb4/2f8d406fbe46243a0c8ca283df76b831?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nurIcN7U3Pj-mQTI5znZ0r0XZmglGN3lO2scvCDwhScQhQ5bqw9HMB21Xip9zGwX1ROtH73gRXAY58YmZeHB6jX06RBj-1jWFamJ4FkigJLuJ8MHQNk8CP7iNXmdSCZSl1t9ECR~xHyfZlfFs534LSvUGZpCHJsQUG6bEsxk48KBAI-KAwoUr0fAECY87zPdAeAnGbJcgA6r829l9XFZY6UXxCRf6Pwz-oBkVL4iiKe9jh56~B0MIyBBCkM-zjOISBXrDk8ZBPhG88L2swqzUgSsQV0svZ3~ng8tLqopInr8XeEbj8gX2b8nI7VW2jEpuVWQWnJC6RRzfy80VlhPrw__"
            alt="Post 1"
            className="post-image"
          />
          <div className="post-details">
            <h4 className="post-title">Design meet</h4>
            <p className="post-likes">❤ 67</p>
          </div>
        </div>

        {/* Post 2 */}
        <div className="post">
          <img
            src="https://s3-alpha-sig.figma.com/img/5760/ca9b/faaae9e15a4924b85a62195848d258eb?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgr6Wra0WPGzs6sWMLl31nt-rgcxXTCbcpc8NutoNz3mB2Ihe7CthDExE4I12DA3j6Ue2sVZfHC8Z4bPMh15-QxJgiMJj8oRzsoezjCsbDNPOpvtM9sEc4x3Nd08IsJBGk~tZv2uc1s2YBygRd49VdrAri4X-PNc5Yai5MpH~U7lWkoFUDk44NQU7cxMNpfAyrsEH1z0g7yQQd-F~UE20vSJuSWMbGubz5QOEttI8qS-h4gN7RrZEiWHYbFDKGqAx2rcL~cuOyG7oFDwVG6IrLRslM9IkpnXUU-gnUXpJ5DRdsK8yx3ea~X4dgQ8FQ~9S7gO3gh47lLaO42aWw9WtA__"
            alt="Post 2"
            className="post-image"
          />
          <div className="post-details">
            <h4 className="post-title">Working on a B2B...</h4>
            <p className="post-likes">❤ 40</p>
          </div>
        </div>

        {/* Post 3 */}
        <div className="post">
          <img
            src="https://s3-alpha-sig.figma.com/img/6bcc/3cfe/0044c8f832b54e5947d3c8f2607cc9ec?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dzPI9TYKLk1RPPaly-qTM1AGp-xs7vVs~6biEHJI2U0K43C4x0iCAxLGMxFF~wCmypbBXnRbofL12a4ZBTxIV5DtnuIULa0oh-Cpzd7cMWKas07Va7-JRdIjeCILdqGtmT9awz9akTxSdafV77zDYh2DUSQjwV3XE2ZxIihShfy-KDwi-0d4c~08jusDBDVGg1q0H-QECVZQdUOc3sZOusTrvpWyxDSlj5ZXBPduWLWIv6zBRAX0mF9NZui8m0X2dV3nA~3zdz0HI2DuLIBfXSFzd9PIDEWcAGuxsnHspDjwhh1TvK-pxiLJV7SAOEBtqLZqw1PpxukYJYrc~rngCw__"
            alt="Post 3"
            className="post-image"
          />
          <div className="post-details">
            <h4 className="post-title">Parachute ❤</h4>
            <p className="post-likes">❤ 66</p>
          </div>
        </div>
      </div>
      <button className="add-post-button">+</button>
    </div>
  );
};

export default Profile;
