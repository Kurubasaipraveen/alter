import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/createpost.css";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase"; 

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState([]); // Store both images and videos
  const [currentIndex, setCurrentIndex] = useState(0);

  const storage = getStorage(app); 
  const db = getFirestore(app); 
  // Handle file upload (Image or Video)
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0]; // Check if it's image or video
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const fileData = { type: fileType, data: e.target.result };
  
        // Ensure only valid image or video types are added
        if (fileType === "image" || fileType === "video") {
          setMedia((prev) => [...prev, fileData]);
        } else {
          alert("Please select a valid image or video file.");
        }
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  // Handle camera capture (photo)
  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const captureImage = new Promise((resolve) => {
        video.addEventListener("loadeddata", () => {
          setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            const dataUrl = canvas.toDataURL("image/png");
            resolve({ type: "image", data: dataUrl });
            stream.getTracks().forEach((track) => track.stop());
          }, 3000);
        });
      });

      const capturedImage = await captureImage;
      setMedia((prev) => [...prev, capturedImage]);
    } catch (error) {
      alert("Failed to access the camera: " + error.message);
    }
  };

  // Handle video capture
  const handleVideoClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const videoData = new Promise((resolve) => {
        video.addEventListener("loadeddata", () => {
          setTimeout(() => {
            const videoUrl = URL.createObjectURL(stream);
            resolve({ type: "video", data: videoUrl });
            stream.getTracks().forEach((track) => track.stop());
          }, 3000); // Adjust the duration for capturing the video
        });
      });

      const capturedVideo = await videoData;
      setMedia((prev) => [...prev, capturedVideo]);
    } catch (error) {
      alert("Failed to access the camera for video: " + error.message);
    }
  };

  // Handle removing an image or video
  const handleRemoveMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    if (currentIndex >= media.length - 1) setCurrentIndex(currentIndex - 1);
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => Math.min(prev + 1, media.length - 1)),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
  });

  // Upload media to Firebase Storage
  const uploadMedia = async (mediaData) => {
    const mediaUrls = [];
    for (const mediaItem of mediaData) {
      const storageRef = ref(storage, `posts/${Date.now()}`);
      const uploadTask = uploadString(storageRef, mediaItem.data, "data_url");
      const snapshot = await uploadTask;
      const downloadURL = await snapshot.ref.getDownloadURL();
      mediaUrls.push(downloadURL);
    }
    return mediaUrls;
  };

  // Handle creating a post
  const handleCreatePost = async () => {
    try {
      // First, upload all media files and get their download URLs
      const mediaUrls = await uploadMedia(media);
      
      // Create a new post document in Firestore
      const postRef = collection(db, "posts"); // Refers to the "posts" collection in Firestore
      await addDoc(postRef, {
        content: postContent, // Post content (text)
        media: mediaUrls, // Array of media URLs (image/video)
        timestamp: new Date(), // Timestamp of post creation
      });
      
      // Alert user of successful post creation
      alert("Post created successfully!");
      
      // Reset the state for the next post
      setPostContent(""); // Clear the content field
      setMedia([]); // Clear all selected media
    } catch (error) {
      // Catch and log any errors during post creation
      console.error("Error creating post: ", error);
      alert("Failed to create post.");
    }
  };
  

  const handleGalleryClick = (type) => {
    const inputFile = document.querySelector('input[type="file"]');
    inputFile.accept = type === "video" ? "video/*" : "image/*";
    inputFile.click(); // Trigger file input on click
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <i className="bi bi-arrow-left"></i> New post
      </div>

      <textarea
        className="post-input"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>

      {/* Swipeable Media Carousel */}
      {media.length > 0 && (
        <div className="swipe-container" {...handlers}>
          {media[currentIndex].type === "image" ? (
            <img className="swipe-image" src={media[currentIndex].data} alt={`Selected ${currentIndex}`} />
          ) : (
            <video className="swipe-video" src={media[currentIndex].data} controls />
          )}
          <i className="bi bi-x-circle remove-icon" onClick={() => handleRemoveMedia(currentIndex)}></i>
          <div className="carousel-indicators">
            {media.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      )}

      <div className="post-options">
        <label className="post-option">
          <i className="bi bi-folder-fill file-icon"> Choose the file</i>
          <input type="file" accept="image/*, video/*" style={{ display: "none" }} onChange={handleFileUpload} />
        </label>
        <i className="bi bi-camera-fill camera-icon" onClick={handleCameraClick}> Camera</i>
        <i className="bi bi-image image-icon" onClick={() => handleGalleryClick("image")}> Gallery</i>
        <i className="bi bi-camera-video video-icon" onClick={() => handleGalleryClick("video")}> Video</i>
      </div>

      <button className="create-button" onClick={handleCreatePost}>
        CREATE
      </button>
    </div>
  );
};

export default CreatePost;
