// "use client";
// import React, { useEffect, useState,FormEvent } from "react";



// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; 
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });// Import styles for React Quill
// import {
  
//   useGetSingleRecipeQuery,
//   useUpdateRecipeMutation,
// } from "@/GlobalRedux/api/api"; // Make sure to import updateRecipe


// interface Params {
//   updateId: string; // Assuming updateId is a string, you can change this if necessary
// }


const RecipeCreationPage = ()=> {
  // const [recipeTitle, setRecipeTitle] = useState("");
  // const [recipeContent, setRecipeContent] = useState("");
  // const [recipeTime, setRecipeTime] = useState("");
  // const [recipeImage, setRecipeImage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
 

  // const id  = params.updateId; // Extract the recipe ID from the URL params

  // const { data: currentRecipe, isLoading: isFetching } =
  //   useGetSingleRecipeQuery(id); // Fetch current recipe
  // const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();



  // console.log(currentRecipe)
  // // Effect to set current recipe data to state
  // useEffect(() => {
  //   if (currentRecipe) {
  //     setRecipeTitle(currentRecipe?.data.title);
  //     setRecipeContent(currentRecipe ?.data.recipe);
  //     setRecipeTime(currentRecipe?.data.time);
  //     setRecipeImage(currentRecipe?.data.image);
  //   }
  // }, [currentRecipe]);

  // // Handle form submission
  // const handleRecipeSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const recipeData = {
  //     title: recipeTitle,
  //     recipe: recipeContent,
  //     time: recipeTime,
  //     image: recipeImage,
  //     // Include the user ID if necessary
  //   };

  //   try {
  //     // Send recipeData to the server using updateRecipe
  //     const response = await updateRecipe({ id, ...recipeData }).unwrap();
  //     console.log("Recipe updated successfully:", response);

  //     // Save the submitted recipe to display it on the page
 

  //     // Reset form after submission
   
  //     alert("Recipe updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating recipe:", error);
  //     alert("Failed to update the recipe.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // if (isFetching) return <div>Loading...</div>; // Show loading state while fetching recipe

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
    //   {/* <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
    //     <h1 className="text-3xl font-semibold mb-6 text-center">
    //       Update Recipe
    //     </h1>
    //     <form onSubmit={handleRecipeSubmit}>
    //       {/* Recipe Title */}
    //       <div className="mb-4">
    //         <label className="block text-lg font-medium mb-2">
    //           Recipe Title
    //         </label>
    //         <input
    //           type="text"
    //           value={recipeTitle}
    //           onChange={(e) => setRecipeTitle(e.target.value)}
    //           className="w-full border px-3 py-2 rounded-md"
    //           placeholder="Enter recipe title"
    //           required
    //         />
    //       </div>

    //       {/* Recipe Time */}
    //       <div className="mb-4">
    //         <label className="block text-lg font-medium mb-2">
    //           Time Required
    //         </label>
    //         <input
    //           type="text"
    //           value={recipeTime}
    //           onChange={(e) => setRecipeTime(e.target.value)}
    //           className="w-full border px-3 py-2 rounded-md"
    //           placeholder="Enter time required (e.g., 30 mins)"
    //           required
    //         />
    //       </div>

    //       {/* Recipe Image */}
    //       <div className="mb-4">
    //         <label className="block text-lg font-medium mb-2">Image URL</label>
    //         <input
    //           type="text"
    //           value={recipeImage}
    //           onChange={(e) => setRecipeImage(e.target.value)}
    //           className="w-full border px-3 py-2 rounded-md"
    //           placeholder="Enter image URL"
    //         />
    //       </div>

    //       {/* Recipe Content - Rich Text Editor */}
    //       <div className="mb-4">
    //         <label className="block text-lg font-medium mb-2">
    //           Recipe Content
    //         </label>
    //         <ReactQuill
    //           theme="snow"
    //           value={recipeContent}
    //           onChange={setRecipeContent}
    //           placeholder="Write your recipe instructions or description here..."
    //           className="h-64"
    //         />
    //       </div>

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
    //         disabled={isLoading || isUpdating}
    //       >
    //         {isLoading || isUpdating ? "Submitting..." : "Update Recipe"}
    //       </button>
    //     </form>

    //   </div> */}
    // </div>
    <h1></h1>
  );
};

export default RecipeCreationPage;
