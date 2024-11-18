// types.ts

export type User = {
  _id: string;
  name?: string;
  image?: string;
  position?: string;
};

export interface User1 {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  email: string;
  password: string;
  phone: string;
  isDeleted: boolean;
  isPremium: boolean;
  isBlock: boolean;
  followers: string[]; // Array of follower IDs
  following: string[]; // Array of following IDs
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  location?: string;
}

export type Comment = {
  _id: string;
  userId: User1;
  comment: string;
  // Optional, if populated
};

export type Image = {
  _id: string;
  url: string;
};

export type Post = {
  _id: string;

  userId: {
    _id: string; // MongoDB ObjectId as a string
    name: string;
    email: string;
    password: string;
    phone: string;
    isDeleted: boolean;
    isPremium: boolean;
    isBlock: boolean;
    followers: string[]; // Array of follower IDs
    following: string[]; // Array of following IDs
    role: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    location?: string;
  }; // Optional, if populated
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

export type UserProfile = {
  _id: {
    $oid: string; // ObjectId represented as a string
  };
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
    $oid: string; // IDs of users being followed
  }>;
  followers: Array<{
    $oid: string; // IDs of followers
  }>;
  image: string; // URL of the profile image
  bannerImage: string; // URL of the banner image
};
export interface Story {
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
