import SigninForm from "./components/SigninForm";

export default function Home() {
  return (
    <>
      <div className="flex bg-neutral-800 md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-neutral-800  text-white max-w-[500px] w-full rounded-lg">
          <SigninForm />
        </div>
      </div>
    </>
  );
}
