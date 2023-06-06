import { FC, useState } from "react";
const EditForm = () => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-y-4 my-6">
        <div>
          <p className="text-xs  text-neutral-500 mb-1">Display Name</p>
          <input
            type="text"
            maxLength={50}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="w-full bg-neutral-900 resize-none outline-none border rounded border-neutral-800 focus:border-neutral-700 p-2"
            placeholder="Display Name"
          />
        </div>
        <div>
          <p className="text-xs  text-neutral-500 mb-1">Bio</p>
          <input
            maxLength={160}
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="w-full bg-neutral-900 resize-none outline-none border rounded border-neutral-800 focus:border-neutral-700 p-2"
            placeholder="Bio"
          />
        </div>
      </div>

      <div className="flex flex-col xs:flex-row xs:items-center gap-2 gap-x-4">
        <p className="text-xs  text-neutral-500 mb-1">Profile Picture</p>
        <div className="bg-neutral-200 p-2 w-36 text-xs text-black truncate text-center rounded cursor-pointer">
          <label htmlFor="fileUpload" className=" cursor-pointer">
            {file ? file.name : "Choose a file"}
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
