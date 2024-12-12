import React from "react";
import "../styles/Feed.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Feed = () => {
    const [showShareIcons, setShowShareIcons] = useState(false);
    const [pageLink, setPageLink] = useState("");
    const [linkGenerated, setLinkGenerated] = useState(false); 

  const toggleShareIcons = () => {
    setShowShareIcons((prev) => !prev);
  };
  const closeShareIcons = () => {
    setShowShareIcons(false); 
  };
  
  const handleGenerateLink = () => {
    const generatedLink = "https://www.arnav/feed";
    setPageLink(generatedLink);
    setLinkGenerated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageLink); 
    alert("Link copied to clipboard!");
  };
 
  const navigate=useNavigate()
  const GoProfile=()=>{
    navigate('/profile')
  }
  const Createpost=()=>{
    navigate('/create')
  }
  
  return (
    <header>
        <div className="first-one">
            <div className="first-container" onClick={GoProfile}>
                <img  className=' image-owner'src="https://s3-alpha-sig.figma.com/img/b54f/d858/f5e14f76f0793df709ce9bfe5e5f284e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F8EFZaa43X~VhEEfRsEglJDRMTzHxfryVgZpQr4867nnq~eRK2PoxpDYPhNmWuAwD~U~EO6q2wjlxPnmI1N5EQt5ubA8xkxbbiod6DmBGyQzNrBhaDkihT1L7PZy6nQGXxCdZJk33f1sFk4LP9I20QmSXaFs87hDjq-01nwMXmcj8PsfMA9GX1bPWHtJq6mxKQ4w~ftMK-OeZ9~GS61vYBncZ859QZzdeH16hP4S4123dgvRs8TJhHakYxvrql63NNAsnXYa~~5YkkhF7M4g1AcT0ybU8roBS-MmWt4yDwPXZ6s1llYiTkEr8ecDNk0D6TXt7B8gdtyBR-IbT~kwdw__" alt="image-owner"/>
            </div>
            <div className="column-second"onClick={GoProfile}>
            <h3>WElcome Back</h3>
            <h2>Sakshi Agarwal</h2>
            </div>
        </div>
    <main className="feed">
      <h1 className="feed-head">Feeds</h1>
      <div className="post1">
        <div className="post-header">
          <img
            className="post-avatar"
            src="https://s3-alpha-sig.figma.com/img/b54f/d858/f5e14f76f0793df709ce9bfe5e5f284e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F8EFZaa43X~VhEEfRsEglJDRMTzHxfryVgZpQr4867nnq~eRK2PoxpDYPhNmWuAwD~U~EO6q2wjlxPnmI1N5EQt5ubA8xkxbbiod6DmBGyQzNrBhaDkihT1L7PZy6nQGXxCdZJk33f1sFk4LP9I20QmSXaFs87hDjq-01nwMXmcj8PsfMA9GX1bPWHtJq6mxKQ4w~ftMK-OeZ9~GS61vYBncZ859QZzdeH16hP4S4123dgvRs8TJhHakYxvrql63NNAsnXYa~~5YkkhF7M4g1AcT0ybU8roBS-MmWt4yDwPXZ6s1llYiTkEr8ecDNk0D6TXt7B8gdtyBR-IbT~kwdw__"
            alt="Aarav"
          />
          <div>
            <h3>Aarav</h3>
            <span>2 hours ago</span>
          </div>
        </div>
        <p className="post-content">
          Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. ✨
          <span className="hashtags">#NYC #Travel</span>
        </p>
        <div className="post-images">
          <img
            src="https://s3-alpha-sig.figma.com/img/92fa/0669/9fc5c5ac336e1596b0abe398f32fdc70?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mMphcmKQsBoabGeXTFFD15JhAA5xPBJcam28-pi3XzFVRoUggoy32oRtGOcDXM6SE15AY6a8GpolfuJJe9HCwvl4f2a3n3isrcC1jmGcyO7BxHC-Oh0hnl3zMIlLbDHdoB4liaKo7hscGtk2uIAAwHnHAB3ySpyVkDSOp4gDSDuH9FsXqQZ~gkT-oZ94dBCWuu3FfdXyGPmfNDidg-IIl81ZaflHOvd4oYlhsrIcrdg9sefzMHtE3pehhXvG1uiOnz0vF0vYfDtEkbnMqg4Upv5vz7POc4Le9LXXux44m3nzZEOXRP6T7Lg5dR9ZPPMXQ6jq6finIHfkQRB2TvlnYg__"
            alt="NYC"
            className="post-image"
          />
          <img
            src="https://s3-alpha-sig.figma.com/img/468d/f99b/7970153da6c5da9091d49a21a3df94d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XTRgY3WrDWlaoslry-eYF3fMJ4St1g4vXUXYKQTWfiLhADDGNG4ssWovpgYCE0SeDXU2lMpluhSzWlOHgc4rq~pBPooYrUKJ-kpocKTIaBr586Zx6sg5hL0h8xzu~GMEIDMEawloExVwD0dse5znk0grXsRc8QxaMgJu5JsZRjUOER3KniJgZkcwE89OZS7QhXk8mo775A~TWsp6T3TmRaEVHyFHcvixzEEOYnNWpdi83eENYiWOryf8aQCpKrYsr5cmS-8uSk2Jf65M9mIK7W8CdD8c-t9yu5oeBOusor~lQtClgV1bSeEMxb7cRMDY-RRbMVpj~lU7dviAcI~BQA__"
            alt="NYC"
            className="post-image"
          />
        </div>
        <div className="post-actions">
          <button className="like-button">❤ 67</button>
          <button className="share-button" onClick={toggleShareIcons}>
              Share
            </button>
        </div>
      </div>
      <div className="post2">
        <div className="post-header">
          <img
            className="post-avatar"
            src="https://s3-alpha-sig.figma.com/img/4d2d/d095/0a4046070bdac45f3f9cf3e7f3a15e80?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jI6Z7WVvkR7ozvak9QmgO8UKeZslhmnerizDbmwaWi2tdKCOHU3GfUSvSIFjXW7~fGqsR5DUTwCG3HEIbNlOAKMoUm0rvmuwk5YBWhuS-T~RIQOp4WVCaD4YVNk78miKanOB8tCarkEuUIcrMn5fKviYm9d9Kb3Oam1GEXX~bwGM5ooFms4InbD1sXBfnFkW9wwRN8PC2S8NQQVpEkK-QNVIoJlPnD5rE5yBVS7x~Lw9gs1hA29hHXT2xCpCR4-ljcXdK5hApZNAFxo56pxmKXu4D9gxowDwy9rF6dMpqlpr4MiDP5w0STtKahcHzy9-SBohQzwlLm51FzdMt9IenA__"
            alt="Sneha"
          />
          <div>
            <h3>Sneha</h3>
            <span>1 day ago</span>
          </div>
        </div>
        <p className="post-content">
          Taking a moment to slow down, breathe, and focus on myself. ✨ Self-care isn’t selfish — it’s necessary. ❤
          <span className="hashtags">#SelfCare #MeTime #Wellness</span>
        </p>
        <div className="post-images">
          <img
            src="https://s3-alpha-sig.figma.com/img/3b55/b80d/f7651d23a24974c2981b14219f77d2d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N2I9RiDWb5zek312DtE0X5w9wzN~wRVdXkf9fA-feXKqbZdaN-ov39Sl2Gql1vG-0zhfYfF2qbj0J9DMPbGNQrCdJAsXorHYrl6eXRbF2eNOGmJ8RLuuEhClSfVS3cQzyzYuQjCoIg-PwfNexoBb91oUZXVYgq-bICqYFM7sp72Ev2waEIIFL660O1aEhYF1lByLQQ0Sa7SMEJPuKI3z~xKMDFEQr4ez2hRwLYuet31lcCXJFV7u7R5ZJYeLqvrLwTmUnUPk1hUAesUo9z4AXIfi-pgWkN-J~9MFurrhV9EckZjgqoDXlSecKdrccxhLpp9IbAu-J5~ODEk3yxao2A__"
            alt="Self-care"
            className="post-image"
          />
        </div>
        <div className="post-actions">
          <button className="like-button">❤ 67</button>
          <button className="share-button" onClick={toggleShareIcons}>
              Share
            </button>
        </div>
      </div>
<div >
  {showShareIcons && (
  <div className="share-icons-overlay">
    <div className="share-icons-card">
    <div className="toggle-first" >
        <p className="share-post-title">Share Post</p>
        <button onClick={closeShareIcons} className="into">X</button> 
    </div>
      <div className="icon-container twitter">
        <i className="bi bi-twitter"></i>
        <p>Twitter</p>
      </div>
      <div className="icon-container facebook">
        <i className="bi bi-facebook"></i>
        <p>Facebook</p>
      </div>
      <div className="icon-container reddit">
        <i className="bi bi-reddit"></i>
        <p>Reddit</p>
      </div>
      <div className="icon-container discord">
        <i className="bi bi-discord"></i>
        <p>Discord</p>
      </div>
      <div className="icon-container whatsapp">
        <i className="bi bi-whatsapp"></i>
        <p>WhatsApp</p>
      </div>
      <div className="icon-container messenger">
        <i className="bi bi-messenger"></i>
        <p>Messenger</p>
      </div>
      <div className="icon-container telegram">
        <i className="bi bi-telegram"></i>
        <p>Telegram</p>
      </div>
      <div className="icon-container instagram">
        <i className="bi bi-instagram"></i>
        <p>Instagram</p>
      </div>

      {/* Button to generate the page link */}
      {!linkGenerated && (
        <button onClick={handleGenerateLink}>Generate Page Link</button>
      )}

      {/* Show generated link with copy button */}
      {linkGenerated && (
        <div className="generated-link">
          <h3>Page Link</h3>
          <div className="link-box">
            <input
              type="text"
              value={pageLink}
              readOnly
              className="link-input"
            />
            <button className="copy-btn" onClick={handleCopyLink}>
              <i className="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}


</div>


<div 
  className="add-button" 
  onClick={Createpost}
>
  +
</div>

    </main>
    
    </header>
  );
};

export default Feed;
