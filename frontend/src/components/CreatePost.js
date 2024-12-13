import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/createpost.css";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Handle creating a post (without Firebase)
  const handleCreatePost = async () => {
    try {
      // Log the content and media before sending the request
      console.log("Post Content:", postContent);
      console.log("Media:", media);
  
      // Prepare the form data
      const formData = new FormData();
      formData.append("textContent", postContent);
      
      // Append media files to the form data
      media.forEach((item, index) => {
        if (item.type === "image") {
          const blob = dataURItoBlob(item.data);
          formData.append("media", blob, `image-${index}.png`);
        } else if (item.type === "video") {
          const blob = dataURItoBlob(item.data);
          formData.append("media", blob, `video-${index}.mp4`);
        }
      });
  
      // Log the formData entries (for debugging)
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      // Send data to backend
      const response = await fetch("http://localhost:5000/create-post", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Post creation success:", result); // Log success response from the backend
        alert("Post created successfully!");
        setPostContent(""); // Clear the content field
        setMedia([]); // Clear all selected media
      } else {
        console.log("Failed to create post:", result); // Log failure response
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error); // Log any errors
      alert("Failed to create post.");
    }
  };
  
  // Helper function to convert base64 to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: mimeString });
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
