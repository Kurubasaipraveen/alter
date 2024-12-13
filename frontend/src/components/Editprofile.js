import React, { useState } from "react";
import "../styles/EditProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { userId } = useParams(); 
  console.log("User ID:", userId); 

  const [name, setName] = useState("Sakshi Agarwal");
  const [bio, setBio] = useState(
    "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
  );
  const [profileImage, setProfileImage] = useState(
    "https://s3-alpha-sig.figma.com/img/b54f/d858/f5e14f76f0793df709ce9bfe5e5f284e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F8EFZaa43X~VhEEfRsEglJDRMTzHxfryVgZpQr4867nnq~eRK2PoxpDYPhNmWuAwD~U~EO6q2wjlxPnmI1N5EQt5ubA8xkxbbiod6DmBGyQzNrBhaDkihT1L7PZy6nQGXxCdZJk33f1sFk4LP9I20QmSXaFs87hDjq-01nwMXmcj8PsfMA9GX1bPWHtJq6mxKQ4w~ftMK-OeZ9~GS61vYBncZ859QZzdeH16hP4S4123dgvRs8TJhHakYxvrql63NNAsnXYa~~5YkkhF7M4g1AcT0ybU8roBS-MmWt4yDwPXZ6s1llYiTkEr8ecDNk0D6TXt7B8gdtyBR-IbT~kwdw__"
  );
  const [backgroundImage, setBackgroundImage] = useState(
    "https://s3-alpha-sig.figma.com/img/d4b7/bb5d/bd8b3943a763e1d2e13b607efc1e224e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A1pL5l3UkYsKUQu~NsQFaKRw7PlByESy7RxouuE3Hwmt3DSbVicU-RffRXt9ZbYvCf3TLgPf5e4FtpcGWpE~-hBjPWqgdRQ9FQaz9A4AidFggdpWXL8jGK~xF4R~y3IE0OIAtPPpzBuNvjkBXcS~LqiXBJcffEiSHIMsAezKcO2ZH5TdVX53gdtO2kvCSCGUvGCYbJKMPOaU~jH5fyJ03dWX8il2084C80kpIvu7LU1IgyXmN-lvDqmd-VORxD5y355D~n4HWpvJiRa9K9wrDttiGafSz1jqjW1ka-ncrIoiN-SvTyM-wJ8n3LMNUfkbbAACRvCHNe2DNemxjt3eQw__"
  );

  const navigate = useNavigate();

  const handleImageChange = (setImage) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
  
    // If a new profile image is selected, append it
    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    }
  
    // If a new background image is selected, append it
    if (backgroundImage instanceof File) {
      formData.append('backgroundImage', backgroundImage);
    }
  
  };
  


  const backToFeed = () => {
    navigate("/feed");
  };

  return (
    <div className="profile">
      <div
        className="cover-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <p className="edit-back" onClick={backToFeed}>
          <i className="bi bi-arrow-left"></i> Back to Feed
        </p>
        <i
          className="bi bi-pencil-square edit-icon"
          onClick={() => handleImageChange(setBackgroundImage)}
        ></i>
      </div>

      <div className="profile-details">
        <div className="first-row-profile">
          <img
            className="profile-avatar"
            src={profileImage}
            alt="Profile"
            onClick={() => handleImageChange(setProfileImage)}
          />
        </div>
        <div className="form-section">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Bio
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </label>
        </div>
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <button className="add-post-button">+</button>
    </div>
  );
};

export default EditProfile;
