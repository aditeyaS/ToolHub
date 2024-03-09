import { useEffect, useState } from "react";
import ResetSvg from "../components/svg/ResetSvg";
import PlayResumeSvg from "../components/svg/PlayResumeSvg";
import { clearInterval, setInterval } from "worker-timers";
import notificationSound from "../assets/notification.mp3";
import { Link } from "react-router-dom";

type TimerModel = {
  sec: number;
};

const initialTimer: TimerModel = {
  sec: 0,
};

const INITIAL_FOCUS = 25;
const INITIAL_REST = 5;

const Pomodoro = () => {
  const sound = new Audio(notificationSound);
  sound.volume = 0.5;
  const [focusTime, setFocusTime] = useState<number>(INITIAL_FOCUS);
  const [restTime, setRestTime] = useState<number>(INITIAL_REST);
  const [timer, setTimer] = useState<TimerModel>(initialTimer);
  const [remainingTime, setRemainingTime] = useState<number>(INITIAL_FOCUS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>(-1);
  const [progress, setProgress] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const onFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const focus: number = parseInt(e.target.value);
    if (!isNaN(focus)) {
      setFocusTime(focus);
      setRemainingTime(focus);
    }
  };

  const onRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rest: number = parseInt(e.target.value);
    if (!isNaN(rest)) setRestTime(rest);
  };

  useEffect(() => {
    if (isFocused) {
      const time = focusTime * 60;
      if (timer.sec === time) {
        sound.play();
        setTimer(initialTimer);
        setProgress(0);
        setIsFocused(false);
        setRemainingTime(restTime);
      } else {
        const rT = Math.ceil((time - timer.sec) / 60);
        const p = Math.round((timer.sec * 100) / time);
        setProgress(p);
        setRemainingTime(rT);
      }
    } else {
      const time = restTime * 60;
      if (timer.sec === time) {
        sound.play();
        setTimer(initialTimer);
        setProgress(0);
        setIsFocused(true);
        setRemainingTime(focusTime);
      } else {
        const rT = Math.ceil((time - timer.sec) / 60);
        const p = Math.round((timer.sec * 100) / time);
        setProgress(p);
        setRemainingTime(rT);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const updateTimer = () => {
    setTimer((time) => {
      const newTime = { ...time };
      newTime.sec += 1;
      return newTime;
    });
  };

  const onStart = () => {
    setIsTimerRunning(true);
    const id = setInterval(updateTimer, 1000);
    setIntervalId(id);
  };

  const onReset = () => {
    setIsFocused(true);
    setIsTimerRunning(false);
    clearInterval(intervalId);
    setIntervalId(-1);
    setTimer(initialTimer);
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/tools">Tools</Link>
          </li>
          <li>Pomodoro</li>
        </ul>
      </div>
      {isFocused ? (
        <progress
          className="progress progress-success w-96 h-10"
          value={progress}
          max="100"
        ></progress>
      ) : (
        <progress
          className="progress progress-error w-96 h-10"
          value={progress}
          max="100"
        ></progress>
      )}

      <div className="flex flex-col gap-2 items-center">
        {isTimerRunning ? (
          <>
            <span
              className={`text-7xl font-bold ${isFocused ? "text-success" : "text-error"}`}
            >
              {isFocused ? "FOCUS" : "REST"}
            </span>
            <span>{`${progress}% done`}</span>
            <span>{`${remainingTime} ${remainingTime <= 1 ? "minute" : "minutes"} remaining.`}</span>
          </>
        ) : (
          <span>Click to start</span>
        )}
      </div>

      <div className="flex gap-2">
        {isTimerRunning ? (
          <button className="btn btn-circle btn-error" onClick={onReset}>
            <ResetSvg />
          </button>
        ) : (
          <button className="btn btn-circle btn-success" onClick={onStart}>
            <PlayResumeSvg />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{`Focus time (minutes)`}</span>
          </div>
          <input
            type="number"
            placeholder="Focus time"
            className="input input-bordered w-full max-w-xs"
            disabled={isTimerRunning}
            min={1}
            value={focusTime}
            onChange={(e) => onFocusChange(e)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{`Rest time (minutes)`}</span>
          </div>
          <input
            type="number"
            placeholder="Rest time"
            className="input input-bordered w-full max-w-xs"
            disabled={isTimerRunning}
            min={1}
            value={restTime}
            onChange={(e) => onRestChange(e)}
          />
        </label>
      </div>
    </div>
  );
};

export default Pomodoro;
