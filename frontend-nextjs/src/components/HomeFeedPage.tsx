const HomeFeedPage = () => {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="sticky top-0 left-0 w-full p-4 bg-black border-b border-neutral-700">
        <h1 className="text-2xl font-bold">Home</h1>
      </div>
      <div className="flex flex-col w-full overflow-y-scroll no-scrollbar">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 h-full w-full border-b border-neutral-700"
          >
            <div className="h-[100px]">
              <p>{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeedPage;
