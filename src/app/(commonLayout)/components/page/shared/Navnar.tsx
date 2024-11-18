// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { FaSearch, FaBell, FaEnvelope, FaCog } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { logout } from "@/GlobalRedux/Features/auth/authSlice"; // Import your logout action
// import {useUser} from "@/services"
// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dispatch = useDispatch();
//   const {token}=useUser()
//   const router = useRouter();
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   const handleLogout = () => {
//     dispatch(logout()); // Call the logout action from the auth slice
//     router.push("/login"); // Redirect to login page
//   };

//   return (
//     <nav className="bg-[#0F0F10] text-white px-4 py-2 flex items-center justify-around">
//       {/* Left Section */}
//       <div className="flex items-center gap-2">
//         <Link href="/">
//           <div>
//             <img
//               src="data:image/svg+xml,%3csvg%20id='Logo'%20xmlns='http://www.w3.org/2000/svg'%20width='35.312'%20height='35.313'%20viewBox='0%200%2035.312%2035.313'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20%230f6fec;%20}%20.cls-1,%20.cls-2%20{%20fill-rule:%20evenodd;%20}%20.cls-2%20{%20fill:%20%23fff;%20}%20%3c/style%3e%3c/defs%3e%3cpath%20class='cls-1'%20d='M389,18.5h25.321a5,5,0,0,1,5,5V48.82a5,5,0,0,1-5,5H389a5,5,0,0,1-5-5V23.5A5,5,0,0,1,389,18.5Z'%20transform='translate(-384%20-18.5)'/%3e%3cpath%20class='cls-2'%20d='M406.384,30.252a1.437,1.437,0,1,1,2.851,0V42.123a1.437,1.437,0,1,1-2.851,0V30.252Zm-0.95.781a17.656,17.656,0,0,1-6.653,1.787v6.731q0.517,0.033,1.034.091a15.227,15.227,0,0,1,5.619,1.684V31.033Zm-7.6,8.462V32.879c-0.647.029-1.33,0.046-1.909,0.057a2.066,2.066,0,0,0-1.893,2.173v2.158a2.059,2.059,0,0,0,1.895,2.168l0.472,0.009Q397.113,39.46,397.831,39.5Zm1.321,1.167c0.27,0.023.54,0.051,0.808,0.084l0.24,1.824a1.08,1.08,0,0,1-.756,1.262,0.841,0.841,0,0,1-.178.019h-0.521a0.955,0.955,0,0,1-.871-0.647l-1.248-2.676q0.8,0.023,1.608.069C398.544,40.616,398.851,40.637,399.152,40.662Z'%20transform='translate(-384%20-18.5)'/%3e%3c/svg%3e"
//               alt="Logo"
//             />
//           </div>
//         </Link>
//         <div className="flex items-center bg-[#202227] border border-gray-600 rounded-md px-2">
//           <FaSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-[#202227] text-white focus:outline-none px-4 py-2 w-48 sm:w-64"
//           />
//         </div>
//       </div>

//       {/* Center Section */}
//       <div className="flex items-center space-x-4">
//         <Link href="/">
//           <p className="text-green-400 font-bold text-lg">
//             envato<span className="text-white">market</span>
//           </p>
//         </Link>
//         <div className="hidden md:flex space-x-6">
//           <Link href="/demo">
//             <p className="hover:text-gray-300">Demo</p>
//           </Link>
//           <Link href="/pages">
//             <p className="hover:text-gray-300">Pages</p>
//           </Link>
//           <Link href="/account">
//             <p className="hover:text-gray-300">Account</p>
//           </Link>
//           <Link href="/network">
//             <p className="hover:text-gray-300">My Network</p>
//           </Link>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
//           <FaEnvelope />
//         </button>
//         <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
//           <FaBell />
//         </button>
//         <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
//           <FaCog />
//         </button>

//         {/* Avatar and Dropdown */}
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="p-3 rounded overflow-hidden"
//           >
//             <img
//               src="https://randomuser.me/api/portraits/men/1.jpg"
//               alt="User Avatar"
//               className="h-8 w-8 rounded"
//             />
//           </button>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-60 bg-[#0F0F10] rounded-lg shadow-lg p-4 text-white">
//               <div className="flex items-center space-x-3">
//                 <img
//                   src="https://randomuser.me/api/portraits/men/1.jpg"
//                   alt="User Avatar"
//                   className="h-12 w-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">Lori Ferguson</p>
//                   <p className="text-sm text-gray-400">Web Developer</p>
//                 </div>
//               </div>
//               <div className="w-full h-9  mt-2 flex justify-center items-center hover:bg-[#0f6fec]  bg-[#0f6fec27] hover:bg-blue-300/40 backdrop-blur-lg">
//                 <Link
//                   href="/profile"
//                   className="text-blue-600 hover:text-white font-semibold"
//                 >
//                   View profile
//                 </Link>
//               </div>

//               <ul className="mt-4 space-y-2">
//                 <li>
//                   <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
//                     <span>⚙️</span>
//                     <span>Settings & Privacy</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
//                     <span>🛠️</span>
//                     <span>Support</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
//                     <span>📄</span>
//                     <span>Documentation</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded"
//                   >
//                     <span>🔓</span>
//                     <span>Sign Out</span>
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         <Link href="/buy-now">
//           <p className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
//             Buy now
//           </p>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client"
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaBell, FaEnvelope, FaCog } from "react-icons/fa";
import {useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {useUser} from "@/services"
import { FaVideo, FaHome, FaShoppingCart } from "react-icons/fa";
import { GiGrass } from "react-icons/gi";
import { logout } from "@/GlobalRedux/Features/auth/authSlice"; // Import your logout action

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
const {token}=useUser()
  // Access token from Redux or localStorage
// Assuming token is stored in auth slice
  // const token = localStorage.getItem("token"); // If using localStorage

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Call the logout action from the auth slice
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-[#0F0F10] text-white px-4 py-2 flex items-center justify-around">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <div>
            <img
              src="data:image/svg+xml,%3csvg%20id='Logo'%20xmlns='http://www.w3.org/2000/svg'%20width='35.312'%20height='35.313'%20viewBox='0%200%2035.312%2035.313'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20%230f6fec;%20}%20.cls-1,%20.cls-2%20{%20fill-rule:%20evenodd;%20}%20.cls-2%20{%20fill:%20%23fff;%20}%20%3c/style%3e%3c/defs%3e%3cpath%20class='cls-1'%20d='M389,18.5h25.321a5,5,0,0,1,5,5V48.82a5,5,0,0,1-5,5H389a5,5,0,0,1-5-5V23.5A5,5,0,0,1,389,18.5Z'%20transform='translate(-384%20-18.5)'/%3e%3cpath%20class='cls-2'%20d='M406.384,30.252a1.437,1.437,0,1,1,2.851,0V42.123a1.437,1.437,0,1,1-2.851,0V30.252Zm-0.95.781a17.656,17.656,0,0,1-6.653,1.787v6.731q0.517,0.033,1.034.091a15.227,15.227,0,0,1,5.619,1.684V31.033Zm-7.6,8.462V32.879c-0.647.029-1.33,0.046-1.909,0.057a2.066,2.066,0,0,0-1.893,2.173v2.158a2.059,2.059,0,0,0,1.895,2.168l0.472,0.009Q397.113,39.46,397.831,39.5Zm1.321,1.167c0.27,0.023.54,0.051,0.808,0.084l0.24,1.824a1.08,1.08,0,0,1-.756,1.262,0.841,0.841,0,0,1-.178.019h-0.521a0.955,0.955,0,0,1-.871-0.647l-1.248-2.676q0.8,0.023,1.608.069C398.544,40.616,398.851,40.637,399.152,40.662Z'%20transform='translate(-384%20-18.5)'/%3e%3c/svg%3e"
              alt="Logo"
            />
          </div>
        </Link>
        <div className="flex items-center bg-[#202227] border border-gray-600 rounded-md px-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#202227] text-white focus:outline-none px-4 py-2 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-4">
       
        <div className="hidden md:flex space-x-6">
          <Link href="/">
          <FaVideo className="text-[#6B6D70]" size={30} title="Video" />
          </Link>
          <Link href="/">
          <FaHome className="text-[#6B6D70]"  size={25} title="Homepage" />
          </Link>
          <Link href="/">
          <GiGrass className="text-[#6B6D70]"  size={25} title="Ground" />
          </Link>
          <Link href="/">
          <FaShoppingCart className="text-[#6B6D70]"  size={25} title="Shop" />
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="p-3  bg-gray-700 rounded hover:bg-gray-600">
          <FaEnvelope className="text-[#6B6D70]"  size={25} />
        </button>
        <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
          <FaBell className="text-[#6B6D70]"  size={25} />
        </button>
        <button className="p-3 bg-gray-700 rounded hover:bg-gray-600">
          <FaCog className="text-[#6B6D70]"  size={25} />
        </button>

        {/* Avatar and Dropdown */}
        {token && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-3 rounded overflow-hidden"
            >
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User Avatar"
                className="h-8 w-8 rounded"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-[#0F0F10] rounded-lg shadow-lg p-4 ">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Lori Ferguson</p>
                    <p className="text-sm text-gray-400">Web Developer</p>
                  </div>
                </div>
                <div className="w-full h-9  mt-2 flex justify-center items-center hover:bg-[#0f6fec]  bg-[#0f6fec27] hover:bg-blue-300/40 backdrop-blur-lg">
                  <Link
                    href="/profile"
                    className="text-blue-600 hover:text-white font-semibold"
                  >
                    View profile
                  </Link>
                </div>

                <ul className="mt-4 space-y-2">
                  <li>
                    <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
                      <span>⚙️</span>
                      <span>Settings & Privacy</span>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
                      <span>🛠️</span>
                      <span>Support</span>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded">
                      <span>📄</span>
                      <span>Documentation</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left hover:bg-gray-700 p-2 rounded"
                    >
                      <span>🔓</span>
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
