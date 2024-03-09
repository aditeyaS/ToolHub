import { Link } from "react-router-dom";
import IssuesModel from "../models/IssuesModel";
import { useEffect, useState } from "react";
import SearchSvg from "../components/svg/SearchSvg";

export const github_owner = "aditeyaS";
export const github_repo = "ToolHub";

const GITHUB_BASE_URL = `https://api.github.com/repos/${github_owner}/${github_repo}/issues`;

const Home = () => {
  const [issues, setIssues] = useState<IssuesModel[]>([]);

  useEffect(() => {
    fetch(GITHUB_BASE_URL)
      .then((response) => response.json())
      .then((json) => setIssues(json))
      .catch((error) => console.error(error));
  }, []);

  const onNewIssue = () => {
    window.open(
      `https://github.com/${github_owner}/${github_repo}/issues/new`,
      "_blank",
    );
  };
  return (
    <div className="flex flex-col gap-10 px-28 items-center">
      <span className="text-9xl text-center -rotate-3 my-10">
        Unlock your productivity potential with Tool
        <span className="text-accent">Hub</span>
      </span>
      <div className="mockup-phone border-accent">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard phone-1 bg-base-100">
            <div className="p-8 bg-base-200 text-center">ToolHub Chat</div>
            <div className="mr-2 ml-16 mt-10 rounded p-2 bg-info text-sm text-justify">
              How can I maximize my efficiency, stay focused, and accomplish
              more in less time?
            </div>
            <div className="ml-2 mr-16 mt-2 rounded p-2 bg-base-200 text-sm text-justify">
              You are at the right place! ToolHub offers a suite of powerful
              time management tools designed to supercharge your productivity
              and help you seize every moment.
            </div>
            <div className="ml-2 mr-16 mt-2 rounded p-2 bg-base-200 text-sm text-justify">
              <Link to="/tools">
                Explore tools.{" "}
                <span className="underline">{document.location.href}tools</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <span className="text-5xl">Features</span>
        </div>
        <div className="collapse bg-base-200 my-2">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl">User-Friendly Interface</div>
          <div className="collapse-content">
            <p>
              Our intuitive interface makes it easy to navigate and utilize all
              the features ToolHub has to offer. Whether you're a seasoned pro
              or new to time management techniques, our user-friendly design
              ensures a seamless experience for everyone.
            </p>
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl">
            Accessible Anywhere, Anytime
          </div>
          <div className="collapse-content">
            <p>
              ToolHub is fully accessible online, meaning you can manage your
              time effectively whether you're at home, in the office, or on the
              go. Say goodbye to distractions and hello to enhanced productivity
              wherever you are.
            </p>
          </div>
        </div>
      </div>
      <div className="mockup-browser border border-base-300 bg-base-100 w-full">
        <div className="mockup-browser-toolbar">
          <div className="bg-base-200 p-2 rounded w-full flex items-center gap-2">
            <SearchSvg />
            <span>{`github.com/${github_owner}/${github_repo}/issues`}</span>
          </div>
        </div>
        <div className="flex flex-col p-4 bg-base-200 gap-2">
          <div className="flex justify-end">
            <button
              onClick={onNewIssue}
              className="btn btn-sm btn-success text-base-100"
            >
              Create new issue
            </button>
          </div>
          <div>
            {issues.length != 0 &&
              issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex flex-col p-2 rounded hover:bg-base-300"
                >
                  <span className="text-lg">{issue.title}</span>
                  <span className="text-sm italic">
                    {issue.updated_at.toString().slice(0, 10)}
                  </span>
                </div>
              ))}
            {issues.length == 0 && (
              <div className="flex justify-center text-5xl py-5 text-base-300">
                No issues found.
              </div>
            )}
          </div>
          {issues.length != 0 && (
            <div className="text-center">
              <a
                className="text-accent underline"
                target="_blank"
                href={`https://github.com/${github_owner}/${github_repo}/issues`}
              >
                Explore issues
              </a>{" "}
              to contribute.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
