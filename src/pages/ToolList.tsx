import { Link } from "react-router-dom";
import toolList from "../config/toolList";

const ToolList = () => {
  return (
    <div className="flex flex-row gap-5">
      {toolList.map((tool, index) => (
        <Link
          className="p-8 w-36 text-center bg-base-200 bordered text-base-content"
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
