import React, { forwardRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useRef } from "react";
import "../output.css";
import "../assets/css/modal-hide.css";
import Swal from "sweetalert2";

function Timer() {
  const modal = useRef();
  const showModal = () => {
    modal.current.style.display = "flex";
  };

  return (
    <div
      className="flex items-center justify-center flex-col gap-8 mt-10"
      id="mainComponent"
    >
      <img
        src="src/assets/images/tomato.png"
        alt="tomato.jpeg"
        className="h-[150px]"
      />
      <div className="flex  font-[Fira_Code]">
        <button className="border-2 border-black w-[200px] rounded-l-[15px] p-3 bg-white hover:text-white hover:bg-black">
          Pomodoro
        </button>
        <button className="border-2 border-black w-[200px]  p-3  bg-white hover:text-white hover:bg-black">
          Break
        </button>
        <button
          className="border-2 border-black w-[200px] rounded-r-[15px] p-3  bg-white hover:text-white hover:bg-black"
          onClick={showModal}
        >
          Show Modal
        </button>
      </div>
      <div>
        <Modal ref={modal} />
      </div>
    </div>
  );
}

export const Seconds = ({ secondstate }) => {
  return <h1>{secondstate}</h1>;
};

export const Minutes = ({ minutestate }) => {
  return <h1>{minutestate}</h1>;
};

const Modal = forwardRef((props, ref) => {
  let [minute, setMinute] = useState(0);
  let [seconds, setSeconds] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  let interval = useRef();

  const closeModal = () => {
    if (minute < 0 || seconds < 0) {
      Swal.fire({
        title: "Negative input error",
        text: "Negative numbers are not allowed",
        icon: "error",
      });
      return;
    }

    ref.current.style.display = "none";
    setConfirmed(true);
  };

  const handleMinute = (event) => {
    setMinute(event.target.value);
  };

  const handleSeconds = (event) => {
    setSeconds(event.target.value);
  };

  const pauseTime = () => {
    clearInterval(interval.current);
  };

  const clearTime = () => {
    clearInterval(interval.current);
    setSeconds(0);
    setMinute(0);
  };

  const startTime = () => {
    interval.current = setInterval(deductTime, 1000);
  };

  const deductTime = () => {
    if (seconds === 0) {
      minute--;
      seconds = 60;
      setMinute(minute);
    }

    seconds--;
    if (minute === 0 && seconds === 0) {
      console.log(pauseTime);
      pauseTime();
    }
    setSeconds(seconds);
  };
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div
        className="bg-white border-3 font-[Jetbrains_Mono] flex gap-10 flex-col items-center border-[rgba(255,255,255,0.5)] p-10  absolute  rounded  right-105 top-50 modal-hide"
        ref={ref}
      >
        <section className="flex gap-3">
          <input
            type="number"
            placeholder="Enter Minutes"
            className="border-2 border-black p-2 bg-white placeholder:text-center"
            onChange={handleMinute}
            minutestate={minute}
          />
          <input
            type="number"
            placeholder="Enter Seconds "
            className="border-2 border-black p-2 bg-white placeholder:text-center"
            onChange={handleSeconds}
            secondstate={seconds}
          />
        </section>
        <button
          className="border-2 border-black w-[200px] p-2 rounded-lg bg-white hover:bg-black hover:text-white"
          onClick={closeModal}
        >
          Confirm
        </button>
      </div>

      {confirmed && <Time minute={minute} seconds={seconds} />}
      {!confirmed && <Time minute={0} seconds={0} />}
      <div className="flex gap-5 font-[Fira_Code]">
        <button
          className="border-1 border-black w-[120px] p-3 rounded-lg"
          onClick={startTime}
        >
          Start
        </button>
        <button
          className="border-1 border-black w-[120px] p-3 rounded-lg"
          onClick={pauseTime}
        >
          Pause
        </button>
        <button
          className="border-1 border-black w-[120px] p-3 rounded-lg"
          onClick={clearTime}
        >
          Restart
        </button>
      </div>
    </div>
  );
});

const Time = ({ minute, seconds }) => {
  return (
    <div className="flex text-[100px] font-[Jetbrains_Mono]">
      <Minutes minutestate={minute ? padTime(String(minute)) : "00"} />
      <h1> : </h1>
      <Seconds secondstate={seconds ? padTime(String(seconds)) : "00"} />
    </div>
  );
};

const padTime = (value) => {
  return value.padStart(2, "00");
};

export default Timer;
