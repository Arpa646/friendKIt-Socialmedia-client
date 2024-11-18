// PostThought.js
import React from "react";
import PostModal from "./PostModal";
const PostThought = () => {
  return (
    <div className="post-thought h-[150px]  space-y-3 flex flex-col items-center justify-center  bg-[#141519] mb-4">
      <div className="user-avatar flex w-3/4 gap-2 ">
        <img
          className="w-10  rounded"
          src="https://themes.stackbros.in/social_r/assets/03-UJBpqOsq.jpg"
          alt="User"
        />
        <input
          className="w-full p-3  rounded"
          type="text"
          placeholder="Share your thoughts..."
        />
      </div>

      <div className="post-options flex items-center w-3/4 space-x-3 ">
     
       <button className=" "> <PostModal></PostModal></button>
        <button className="btn  bg-[#202227] px-2 py-2 rounded">
          📹 Video
        </button>
        <button className="btn  bg-[#202227] px-2 py-2 rounded">
          📅 Event
        </button>
        <button className="btn  bg-[#202227] px-2 py-2 rounded">
          😊 Feeling/Activity
        </button>
      </div>
    </div>
  );
};

export default PostThought;
