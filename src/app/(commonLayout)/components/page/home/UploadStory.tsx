
import React, { useRef } from "react";
import { useAddStoryMutation, useGetStoryQuery } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "./style.css";
import { Story } from "./types";
import { SkeletonLoader } from "./SkeletonLoader"; 
const UploadStory = () => {
  const { data: storyData, isLoading, error, refetch } = useGetStoryQuery(undefined);
  const [addStory] = useAddStoryMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ensure correct typing
  const { userId } = useUser();
  const IMG_BB_API_KEY = "9717d5d4436d262250f736d12880032f";
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgbbData = await imgbbResponse.json();
      const imageUrl = imgbbData.data.url;

      await addStory({ userId, images: [imageUrl] });
      refetch();
    } catch (err) {
      console.error("Error uploading story:", err);
    }
  };

  
  if (isLoading) return <div>    <SkeletonLoader/></div>;
  if (error) return <p>Error loading stories</p>;

  return (
    <div className="upload-story h-[190px] flex gap-3  ">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div
        onClick={openFileDialog}
        className="story-card border-2 border-dashed border-[#252629] h-[170px] w-[170px] p-4 flex flex-col items-center justify-center bg-[#141519] add-story cursor-pointer"
      >
        <span className="bg-[#202227] p-5 rounded-3xl">+</span>
        <p>Post a Story</p>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        className="w-full custom-swiper-scrollbar"
      >
        {storyData?.data
          ?.slice()
          .reverse()
          .map((story: Story) => {
            const lastImage = story.images[story.images.length - 1]; // Get the last image
            return (
              <SwiperSlide key={story._id.$oid} className="story-card pb-5"> {/* Ensure correct key */}
                <img
                  src={lastImage}
                  alt={`Story`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default UploadStory;



















// import React, { useRef } from "react";
// import { useAddStoryMutation, useGetStoryQuery } from "@/GlobalRedux/api/api";
// import { useUser } from "@/services";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Scrollbar } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import "./style.css";
// import {Story} from "./types"
// const UploadStory = () => {
//   const { data: storyData, isLoading, error, refetch } = useGetStoryQuery(undefined);
//   const [addStory] = useAddStoryMutation();
//   const fileInputRef = useRef(null);
//   const { userId } = useUser();
//   const IMG_BB_API_KEY = "9717d5d4436d262250f736d12880032f";
  
//   const openFileDialog = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const imgbbResponse = await fetch(
//         `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const imgbbData = await imgbbResponse.json();
//       const imageUrl = imgbbData.data.url;

//       await addStory({ userId, images: [imageUrl] });
//       refetch();
//     } catch (err) {
//       console.error("Error uploading story:", err);
//     }
//   };

//   if (isLoading) return <p>Loading stories...</p>;
//   if (error) return <p>Error loading stories</p>;

//   return (
//     <div className="upload-story h-[190px] flex gap-3">
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

//       <div
//         onClick={openFileDialog}
//         className="story-card border-2 border-dashed border-gray-600 h-[170px] w-[170px] p-4 flex flex-col items-center justify-center bg-[#141519] add-story cursor-pointer"
//       >
//         <span className="bg-[#202227] p-5 rounded-3xl">+</span>
//         <p>Post a Story</p>
//       </div>

//       <Swiper
//         spaceBetween={10}
//         slidesPerView={4}
//         scrollbar={{ draggable: true }}
//         modules={[Scrollbar]}
//         className="w-full custom-swiper-scrollbar"
//       >
//         {storyData?.data
//           ?.slice()
//           .reverse()
//           .map((story:Story) => {
//             const lastImage = story.images[story.images.length - 1]; // Get the last image
//             return (
//               <SwiperSlide key={story._id} className="story-card pb-5">
//                 <img
//                   src={lastImage}
//                   alt={`Story ${index + 1}`}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </SwiperSlide>
//             );
//           })}
//       </Swiper>
//     </div>
//   );
// };

// export default UploadStory;
