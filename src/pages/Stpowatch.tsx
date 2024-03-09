import { useState } from "react";
import ResetSvg from "../components/svg/ResetSvg";
import PauseSvg from "../components/svg/PauseSvg";
import PlayResumeSvg from "../components/svg/PlayResumeSvg";
import { clearInterval, setInterval } from "worker-timers";

type StopwatchModel = {
  hr: number;
  min: number;
  sec: number;
};

const initialStopwatch: StopwatchModel = {
  hr: 0,
  min: 0,
  sec: 0,
};

const stopwatchInterval = {
  RESET: -2,
  PAUSED: -1,
};

const Stopwatch = () => {
  const [time, setTime] = useState<StopwatchModel>(initialStopwatch);
  const [intervalId, setIntervalId] = useState<number>(stopwatchInterval.RESET);

  const updateTimer = () => {
    setTime((currentTime) => {
      const newTime = { ...currentTime };
      if (newTime.sec < 59) {
        newTime.sec += 1;
      } else {
        newTime.min += 1;
        newTime.sec = 0;
      }
      if (newTime.min === 60) {
        newTime.min = 0;
        newTime.hr += 1;
      }
      return newTime;
    });
  };

  const onStartPauseResume = () => {
    if (intervalId < 0) {
      const id = setInterval(updateTimer, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(stopwatchInterval.PAUSED);
    }
  };

  const onReset = () => {
    if (intervalId != stopwatchInterval.PAUSED) clearInterval(intervalId);
    setIntervalId(stopwatchInterval.RESET);
    setTime(initialStopwatch);
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <span className="text-accent text-9xl">{`${time.hr < 10 ? 0 : ""}${time.hr} : ${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</span>
      <div className="flex gap-2">
        <button
          className={`btn btn-circle ${intervalId == stopwatchInterval.RESET ? "btn-success" : "btn-warning"}`}
          onClick={onStartPauseResume}
        >
          {intervalId < 0 ? <PlayResumeSvg /> : <PauseSvg />}
        </button>
        {intervalId != stopwatchInterval.RESET && (
          <button className="btn btn-circle btn-error" onClick={onReset}>
            <ResetSvg />
          </button>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
