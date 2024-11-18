const LoadingPage = () => {
  return 
  <div className="space-y-4">
  {/* Card Skeleton */}
  <div className="bg-gray-300 animate-pulse h-32 rounded-lg"></div>
  
  {/* Post Skeleton */}
  <div className="flex items-center space-x-4">
    <div className="bg-gray-300 animate-pulse w-10 h-10 rounded-full"></div>
    <div className="space-y-2">
      <div className="bg-gray-300 animate-pulse w-32 h-4 rounded"></div>
      <div className="bg-gray-300 animate-pulse w-24 h-4 rounded"></div>
    </div>
  </div>

  {/* Post Content Skeleton */}
  <div className="bg-gray-300 animate-pulse h-24 rounded"></div>

  {/* Button Skeleton */}
  <div className="bg-gray-300 animate-pulse w-32 h-8 rounded-md"></div>
</div>

};

export default LoadingPage;
