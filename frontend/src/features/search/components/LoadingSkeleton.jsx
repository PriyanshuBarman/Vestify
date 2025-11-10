function LoadingSkeleton({ isLoading }) {
  if (!isLoading) return;

  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="Skeleton bg-foreground/5 my-2 h-14 w-full animate-pulse rounded-lg"></div>
      ))}
    </>
  );
}

export default LoadingSkeleton;
