import SuggestedUsersItem from "./SuggestedUsersItem";

const SuggestedUsers = () => {
  return (
    <div className="w-[350px] h-[250px] rounded-lg bg-black">
      <p className="p-4 border-b border-neutral-800 ">Suggested User</p>
      <div className="flex flex-col">
        <SuggestedUsersItem />
        <SuggestedUsersItem />
      </div>
    </div>
  );
};

export default SuggestedUsers;
