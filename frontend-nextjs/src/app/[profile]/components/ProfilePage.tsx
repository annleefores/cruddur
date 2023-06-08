import Crud from "@/components/Crud";
import Profile from "./Profile";
import CrudPage from "@/components/CrudPage";
import { userpost } from "@/lib/data";

const ProfilePage = () => {
  const ifPosts = true;
  return (
    <div className="flex flex-col w-full pt-10 sm:pt-0 ">
      <div className="border-b border-neutral-800">
        <Profile />
      </div>
      <div>
        {ifPosts ? (
          <CrudPage data={userpost} />
        ) : (
          <div className="w-full text-center">
            <p className="text-sm text-neutral-500 p-4">
              Nothing to see here yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
