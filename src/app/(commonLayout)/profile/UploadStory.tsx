
import {  useGetStoryQuery } from "@/GlobalRedux/api/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
 import "./style.css"; // Ensure to link your CSS file if separate
 import { SkeletonLoader } from "../components/page/home/SkeletonLoader"; 
 import { Story } from "./types";
const UploadStory = () => {
  const { data: storyData, isLoading, error } = useGetStoryQuery(undefined);
  // const [addStory] = useAddStoryMutation();
  // const fileInputRef = useRef(null);
  // const { userId } = useUser();
  // const IMG_BB_API_KEY = "9717d5d4436d262250f736d12880032f"; 
  // const openFileDialog = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     const imgbbResponse = await fetch(
  //       `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const imgbbData = await imgbbResponse.json();
  //     const imageUrl = imgbbData.data.url;

  //     await addStory({ userId, images: [imageUrl] });
  //     refetch();
  //   } catch (err) {
  //     console.error("Error uploading story:", err);
  //   }
  // };

  if (isLoading) return <div><SkeletonLoader/></div>;
  if (error) return <p>Error loading stories</p>;

  return (
    <div className="upload-story h-[190px]   flex gap-3 ">
     

      
      {/* Swiper Carousel with Bottom Scrollbar */}
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        className="w-full  custom-swiper-scrollbar "
      >
        {storyData?.data?.map((story: Story, index:number) => (
          <SwiperSlide key={story._id?.$oid || index}  className="story-card pb-5   ">
            <img
              src={story.images[0]}
              alt={`Story ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UploadStory;




