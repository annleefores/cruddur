const HomeFeedPage = () => {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center">
        <div className="sticky top-0 left-0 w-full  p-4 bg-black border-b-[0.5px] border-neutral-800">
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
        <div className="flex flex-col w-full overflow-y-scroll no-scrollbar">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 h-full w-full border-b border-gray-300"
            >
              <div className="h-[100px]">
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeFeedPage;
