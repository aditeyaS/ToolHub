import { useState } from "react";
import { Link } from "react-router-dom";
import isValidHex from "../utils/isValidHex";
import CopySvg from "../components/svg/CopySvg";
import DeleteSvg from "../components/svg/DeleteSvg";

const ColorVisualizer = () => {
  const [hexString, setHexString] = useState<string>("");
  const [hexArray, setHexArray] = useState<string[]>([]);

  const onVisualize = () => {
    const arr = hexString.trim().split(",");
    const finalArr: string[] = [];
    arr.map((hex) => {
      const trimmedHex = hex.trim();
      if (isValidHex(trimmedHex)) {
        finalArr.push(trimmedHex);
      }
    });
    setHexArray(finalArr);
    setHexString(finalArr.join(", "));
  };

  const onCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  const onDelete = (index: number) => {
    hexArray.splice(index, 1);
    setHexArray(hexArray);
    setHexString(hexArray.join(", "));
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/tools">Tools</Link>
          </li>
          <li>Color Vizualizer</li>
        </ul>
      </div>
      <div className="flex items-center w-full">
        <label className="form-control grow">
          <div className="label">
            <span className="label-text text-xs">
              Enter comma seperated HEX values
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered textarea-xs"
            placeholder="#000000, #ffffff"
            value={hexString}
            onChange={(e) => setHexString(e.target.value)}
          ></textarea>
          <div className="label">
            {hexArray.length != 0 && (
              <span className="label-text-alt text-xs">
                {hexArray.length} colors found
              </span>
            )}
          </div>
        </label>
        <button
          className="btn btn-sm btn-accent ml-2"
          disabled={hexString.length <= 3}
          onClick={onVisualize}
        >
          Visualize
        </button>
      </div>
      <div className="flex w-full flex-wrap">
        {hexArray.map((hex, index) => (
          <div
            style={{
              backgroundColor: hex,
            }}
            key={index}
            className="w-36 h-36 flex justify-center items-center"
          >
            <div className="flex flex-col items-center">
              <span className="bg-accent p-1 text-xs rounded text-accent-content">
                {hex}
              </span>
              <div className="mt-1">
                <div className="tooltip tooltip-info" data-tip="copy">
                  <button
                    className="btn btn-xs btn-accent btn-circle"
                    onClick={() => onCopy(hex)}
                  >
                    <CopySvg />
                  </button>
                </div>
                <div className="tooltip tooltip-info ml-1" data-tip="delete">
                  <button
                    className="btn btn-xs btn-accent btn-circle"
                    onClick={() => onDelete(index)}
                  >
                    <DeleteSvg />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorVisualizer;
