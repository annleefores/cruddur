import toast, { Toast, Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

interface ErrorToastProps {
  t: Toast;
  error?: string;
}
const ErrorToast: React.FC<ErrorToastProps> = ({ error, t }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-neutral-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5"></div>
          <div className="ml-3 flex-1">
            <p className="mt-1 text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
      <div className="flex ">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-white hover:text-gray-300"
        >
          <AiOutlineClose size={16} />
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;
