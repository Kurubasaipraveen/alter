import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/Editprofile";
import CreatePost from "./components/CreatePost";
import './App.css'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ensure the 'path' is accurate and 'element' properly displays components */}
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditProfile/>}/>
          <Route path="/create" element={<CreatePost/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
