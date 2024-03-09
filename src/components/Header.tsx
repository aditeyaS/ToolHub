import { Link } from "react-router-dom";
import SunSvg from "./svg/SunSvg";
import MoonSvg from "./svg/MoonSvg";
import { useEffect, useState } from "react";

const Header = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const previousTheme = localStorage.getItem("app-theme") || "light";
    if (previousTheme === "light") {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
    }
    document.querySelector("html")?.setAttribute("data-theme", previousTheme);
  }, []);

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      document.querySelector("html")?.setAttribute("data-theme", "dark");
      setDarkTheme(true);
    } else {
      document.querySelector("html")?.setAttribute("data-theme", "light");
      setDarkTheme(false);
    }
  };
  return (
    <div className="navbar bg-base-300 text-base-content px-5">
      <div className="navbar-start gap-2">
        <SunSvg />
        <input
          type="checkbox"
          className="toggle"
          checked={darkTheme}
          onChange={onThemeChange}
        />
        <MoonSvg />
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-2xl">
          Tool<span className="bg-accent p-1 rounded">Hub</span>
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn btn-ghost" to="/tools">
          Explore Tools
        </Link>
      </div>
    </div>
  );
};

export default Header;
