import { detectHashtags } from "@/lib/hashtagDetector";
import { Fragment } from "react";

interface HashtagsProps {
  text: string;
}
const Hashtags: React.FC<HashtagsProps> = ({ text }) => {
  const hashtags = detectHashtags(text);
  const words = text.split(" ");

  return (
    <p>
      {words.map((word, index) => {
        if (hashtags.includes(word)) {
          return (
            <span key={index} className="text-blue-500 hover:underline">
              {word}{" "}
            </span>
          );
        }
        return <Fragment key={index}>{word} </Fragment>;
      })}
    </p>
  );
};

export default Hashtags;
