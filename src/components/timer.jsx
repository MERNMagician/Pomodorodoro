import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../output.css";
import Modes from "./modes";

function Timer() {
  const currentTime = useRef(0);
  const [time, setTime] = useState(0);
  const [interval, assignInterval] = useState(null);
  let second = 0;

  useEffect(() => {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    currentTime.current.innerHTML = `${pad(String(minute))} : ${pad(
      String(seconds)
    )}`;
  }, [time]);

  const pad = (value) => {
    return value.padStart(2, "0");
  };

  const startTimer = () => {};

  const pauseTimer = () => {};

  const incrementNumber = () => {
    second++;
    setTime(second);
  };

  const resetTimer = () => {
    clearInterval(interval);
    currentTime.current.innerHTML = "00 : 00";
    setTime(0);
  };

  return (
    <div className="flex items-center flex-col mt-[40px]  gap-[40px]">
      <img src="src/assets/images/tomato.png" alt="" className="h-[120px]" />
      <Modes />
      <div className="border-2 border-[rgb(255,255,255,0.5)] w-[600px] rounded-md">
        <h2
          className="text-white text-center p-5 text-[80px] font-['Jetbrains_Mono']"
          ref={currentTime}
        >
          {time};
        </h2>
      </div>

      <div className="flex gap-10">
        <button
          className="border-2 border-black w-[130px] p-2 rounded-[400px] font-[Jetbrains_Mono] hover:bg-black hover:text-white"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="border-2 border-black w-[130px] p-2 rounded-[400px] font-[Jetbrains_Mono]  hover:bg-black hover:text-white"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="border-2 border-black w-[130px] p-2 rounded-[400px] font-[Jetbrains_Mono]  hover:bg-black hover:text-white"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
