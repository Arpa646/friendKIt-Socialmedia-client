import React from "react";
import { useGetPostByEmailQuery } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./types";
import { SkeletonLoader } from "../components/page/home/SkeletonLoader"; 
export type ImageProp = {
  _id: string;
  url: string;
};

const Gallery = () => {
  const { email } = useUser();
  const { data: profileItem,  isLoading } = useGetPostByEmailQuery(email);

  const posts = profileItem?.data as Post[]; // Explicitly typing 'posts' as an array of Post

  if (isLoading) return <div><SkeletonLoader/></div>;
  // if (error) return <div>Error loading user profile.</div>;

  // Flatten images from all posts and take only the latest 5
  const images = posts?.flatMap((post: Post) => post.images || []).slice(0, 5);

  return (
    <div className="flex flex-col bg-background text-white p-4">
      <div className="flex justify-between p-4">
        <h1>Photos</h1>
        <Link
          href="/profile/media"
          className="btn px-4 py-2 rounded bg-blue-100 bg-opacity-20 text-blue-500 shadow-lg transition-transform hover:scale-105"
        >
          See all photos
        </Link>
      </div>

      {images && images.length > 0 ? (
        <>
          {/* First Row */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {images.slice(0, 2).map((image: ImageProp) => (
              <div key={image._id} className="relative w-full h-60">
                <Image
                  src={image.url}
                  alt="Gallery Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-2">
            {images.slice(2).map((image: ImageProp) => (
              <div key={image._id} className="relative w-full h-40">
                <Image
                  src={image.url}
                  alt="Gallery Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        // No Images Available
        <div className="text-center text-gray-500">
          <p>No images available. Upload your first image!</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
