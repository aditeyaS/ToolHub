import { Link } from "react-router-dom";
import toolList from "../config/toolList";

const ToolList = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {toolList.map((tool, index) => (
        <Link
          className="p-8 w-36 text-center border-accent bg-base-200 bordered rounded border-2 text-base-content flex justify-center items-center transform hover:bg-accent transition duration-500 hover:scale-125"
          key={index}
          to={tool.url}
        >
          {tool.name}
        </Link>
      ))}
    </div>
  );
};

export default ToolList;
