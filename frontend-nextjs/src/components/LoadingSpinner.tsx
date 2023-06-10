const LoadingSpinner = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className="w-10 h-10 rounded-full animate-spin
      border-4 border-solid border-white border-t-transparent"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
