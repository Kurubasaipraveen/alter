const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Set up multer storage to save files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Files will be saved to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  }
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("MongoDB connection error:", error);
});

// Define post schema
const postSchema = new mongoose.Schema({
  textContent: String,
  media: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create post endpoint
app.post("/create-post", upload.array("media", 5), async (req, res) => {
  try {
    const { textContent } = req.body;
    const media = req.files.map(file => `/uploads/${file.filename}`);  // Store file paths
    
    const newPost = new Post({
      textContent,
      media
    });

    await newPost.save();

    res.status(200).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
});

// Get posts endpoint
app.get("/get-posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve posts", error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
