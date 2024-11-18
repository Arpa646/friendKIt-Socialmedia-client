// types.ts

export type User = {
    _id: string;
    name?: string;
    profileImage?: string;
    position?: string;
  };
  export   type UserProfile = {
    _id: string;
    profileImage?: string;
    position?: string;
    name: string; // User's name
    email: string; // User's email
    password: string; // User's password
    phone: string; // User's phone number
    role: string; // User's role (e.g., 'user')
    address: string; // User's address
    createdAt: {
      $date: string; // ISO date string
    };
    updatedAt: {
      $date: string; // ISO date string
    };
    __v: number; // Version key
    isBlock: boolean; // Whether the user is blocked
    isDeleted: boolean; // Whether the user is deleted
    isPremium: boolean; // Whether the user has a premium account
    following: Array<{
      _id: string; // IDs of users being followed
    }>;
    followers: Array<{
      _id: string; // IDs of followers
    }>;
    image: string; // URL of the profile image
    bannerImage: string; // URL of the banner image
  };
  
  export type Comment = {
    _id: string;
    userId: string;
    comment: string;
    user?: User; // Optional, if populated
  };
  
  export type Image = {
    _id: string;
    url: string;
  };
  
  export type Post = {
    _id: string;
    userId: UserProfile;
 // Optional, if populated
    content: string;
    location: string;
    images: Image[];
    privacy: "public" | "private";
    createdAt: string;
    updatedAt: string;
    __v: number;
    likedBy: string[];
    comments: Comment[];
  };
  
  export type MenuItems = [
    {
      label: string;
      icon: string;
    }
  ];
  export type Item = {
    label: string;
    icon: string;
  };
  export type ImageProp = {
    _id: string;
    url: string;
  };

  export  interface Story {

      _id: {
        $oid: string;
      };
      userId: {
        $oid: string;
      };
      images: string[];
      createdAt: {
        $date: string;
      };
      updatedAt: {
        $date: string;
      };
      __v: number;
    }
    