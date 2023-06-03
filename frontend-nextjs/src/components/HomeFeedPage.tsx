import Image from "next/image";
import logo from "../../public/logo.svg";
import user from "../../public/user.png";

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
    "You have reached the end of page",
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-between sticky top-0 left-0 w-full py-3 px-4 bg-black border-b border-neutral-700">
        <h1 className="text-lg sm:text-2xl font-bold h-fit">Home</h1>
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] mb-2 rounded-full xl:mx-2">
          <Image src={logo} alt="cruddur-logo" className="object-cover" />
        </div>
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] mb-2 rounded-full xl:mx-2 bg-white">
          <Image src={user} alt="user-profile" className="object-cover" />
        </div>
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
