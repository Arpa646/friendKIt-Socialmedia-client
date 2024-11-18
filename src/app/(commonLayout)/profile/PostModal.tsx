'use client'

import { useState, useEffect } from "react";

import { useAddPostMutation } from "@/GlobalRedux/api/api";
import {useUser} from "@/services"
import {
  FaImage,
  FaUserFriends,
  FaSmile,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
const IMG_BB_API_KEY = "9717d5d4436d262250f736d12880032f"; 

const PostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Explicitly define the type as string[]

  const [addPost] = useAddPostMutation();
  const {userId}=useUser()
  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));
    setImageUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setContent("");
    setImages([]);
    setImageUrls([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);  // Convert FileList to an array
      setImages(selectedFiles);  // Update state with the selected files
    }
  };
  const uploadImageToImgBB = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);  // Append image file to form data
  
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    const data = await response.json();
    console.log("Uploaded Image URL:", data);
    return data.data.url;  // Return the image URL from ImgBB
  };
  

  const handlePost = async () => {
   
    const uploadedImageUrls = [];
    for (const image of images) {
      const imageUrl = await uploadImageToImgBB(image);
      uploadedImageUrls.push({ url: imageUrl });
    }

    
    const postData = {
      content,
      images: uploadedImageUrls, // Use the uploaded image URLs
      userId: userId, // Replace with a valid user ID
      privacy: "public",
      location: "New York",
    };

    try {
      await addPost(postData).unwrap();
      console.log("Post successful:", postData);
      closeModal();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <button onClick={openModal} className="btn bg-[#202227] px-2 py-2 rounded">
        📷 Photo
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#191A1F] p-6 rounded-lg shadow-lg max-w-lg w-full relative z-60">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#BFC0C9]">Create Post</h2>
              <FaTimes className="cursor-pointer text-[#BFC0C9]" onClick={closeModal} />
            </div>

            <div className="flex items-center mb-4">
              <div className="rounded-full bg-gray-400 w-12 h-12 mr-3">
                <img
                  src="https://themes.stackbros.in/social_r/assets/03-UJBpqOsq.jpg"
                  alt=""
                  className="rounded"
                />
              </div>
              <div>
                <p className="font-semibold text-[#BFC0C9]">Arpa Tasnim is in Dhaka</p>
                <div className="-ms-20">
             
                </div>
              </div>
            </div>

            <textarea
              className="w-full p-2 mb-4 border rounded"
              placeholder="What's on your mind, Arpa?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="border-dashed border-2 border-gray-300 p-24 rounded-lg flex justify-center items-center relative">
              <FaImage className="text-gray-500 text-4xl" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Add photos and videos from your mobile device
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {imageUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-24 h-24"
                >
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </a>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <FaImage className="text-green-500 mr-2" />
              <FaUserFriends className="text-blue-500 mr-2" />
              <FaSmile className="text-yellow-500 mr-2" />
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <FaTimes className="text-gray-500 mr-2 cursor-pointer" onClick={closeModal} />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePost}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
