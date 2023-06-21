import SuggestedUsersItem from "./SuggestedUsersItem";
import { suggestedUsers } from "@/lib/data";

const SuggestedUsers = () => {
  return (
    <div className="w-full h-[250px] rounded-lg bg-[#02060E]">
      <p className="p-2 px-4 border-b border-neutral-800 font-semibold leading-9 tracking-tight">
        Suggested User
      </p>
      <div className="flex flex-col">
        {suggestedUsers.map((item, index) => (
          <div key={index}>
            <SuggestedUsersItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
