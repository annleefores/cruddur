import SuggestedUsersItem from "./SuggestedUsersItem";

const SuggestedUsers = () => {
  return (
    <div className="w-full h-[250px] rounded-lg bg-black">
      <p className="p-2 px-4 border-b border-neutral-800 font-semibold leading-9 tracking-tight">
        Suggested User
      </p>
      <div className="flex flex-col">
        <SuggestedUsersItem />
        <SuggestedUsersItem />
      </div>
    </div>
  );
};

export default SuggestedUsers;
