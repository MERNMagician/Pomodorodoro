import React, { forwardRef, use, useEffect, useState } from "react";
import { useRef } from "react";
import "../output.css";
import "../assets/css/modal-hide.css";
import Swal from "sweetalert2";
import "../assets/css/custom-font.css";
import "../assets/css/global-font.css";

export const Seconds = ({ secondstate }) => {
  return <h1>{secondstate}</h1>;
};

export const Minutes = ({ minutestate }) => {
  return <h1>{minutestate}</h1>;
};

const Modal = () => {
  let [minute, setMinute] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [confirmed, setConfirmed] = useState(false);
  let interval = useRef();
  let modalControl = useRef();

  const closeModal = () => {
    if (minute === 0 && seconds === 0) {
      Swal.fire({
        title: "Blank inputs error",
        text: "Blank inputs are not allowed",
        icon: "error",
      });
      return;
    }

    if (minute < 0 || seconds < 0) {
      Swal.fire({
        title: "Negative input error",
        text: "Negative numbers are not allowed",
        icon: "error",
      });
      return;
    }

    setConfirmed(true);
  };

  useEffect(() => {
    if (confirmed) {
      modalControl.current.style.display = "none";
    }
  }, [confirmed]);

  const showModal = () => {
    if (!confirmed) {
      console.log(confirmed);
      modalControl.current.style.display = "flex";
    }
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
    if (seconds === 0 && minute === 0) {
      Swal.fire({
        title: "No input provided!",
        icon: "error",
        draggable: true,
      });
      return;
    } else if (seconds == 0 && minute == 0) {
      Swal.fire({
        title: "Zero input provided!",
        icon: "error",
        draggable: true,
      });
      return;
    }
    if (interval) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(deductTime, 1000);
  };

  const deductTime = () => {
    //*This will decrement the second by one every one second
    //* This will trigger if the both minute and seconds is zero
    //* Which means the time is already over and the program should prevent the second from decrementing
    if (minute === 0 && seconds === 0) {
      pauseTime();
      setSeconds(seconds);
      setConfirmed(false);
      return;
    }
    if (Number(seconds) === 0) {
      minute--;
      seconds = 60;
      setMinute(minute);
      setSeconds(seconds);
    }

    seconds--;
    setSeconds(seconds);
  };

  return (
    <div
      className="flex flex-col items-center gap-[20px] mt-[140px]"
      onClick={showModal}
    >
      <div
        className="bg-[#56666B] border-1 font-[Jetbrains_Mono] flex gap-10 flex-col items-center border-[rgba(255,255,255,0.5)] p-10  absolute    right-105 top-40 modal-hide   rounded-[20px]"
        ref={modalControl}
      >
        <section className="flex items-center text-[40px] gap-[20px] ">
          <i className="fa-solid fa-clock text-white"></i>
          <h2 className="clock-timer text-white">Edit Time</h2>
        </section>
        <section className="flex gap-3">
          <input
            type="number"
            placeholder="Enter Minutes"
            className="border-2 border-black p-2 bg-white placeholder:text-center rounded-lg"
            onChange={handleMinute}
          />
          <input
            type="number"
            placeholder="Enter Seconds "
            className="border-2 border-black p-2 bg-white placeholder:text-center rounded-lg"
            onChange={handleSeconds}
          />
        </section>
        <button
          className=" w-[120px] p-2 rounded-lg bg-green-600 text-white cursor-pointer hover:opacity-50"
          onClick={closeModal}
        >
          Confirm
        </button>
      </div>

      {confirmed && <Time minute={minute} seconds={seconds} />}
      {!confirmed && <Time minute={0} seconds={0} />}

      <div className="flex gap-5 font-[Fira_Code]">
        <button
          className="bg-green-600 text-white w-[120px] p-3 rounded-[20px] hover:opacity-50"
          onClick={startTime}
        >
          Start
        </button>
        <button
          className="bg-red-600 text-white w-[120px] p-3  rounded-[20px] hover:opacity-50"
          onClick={pauseTime}
        >
          Pause
        </button>
        <button
          className="bg-yellow-500 text-white w-[120px] p-3 rounded-[120px] hover:opacity-50"
          onClick={clearTime}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

const Time = ({ minute, seconds }) => {
  return (
    <div className="flex text-[100px] clock-timer">
      <Minutes minutestate={minute ? padTime(String(minute)) : "00"} />
      <h1> : </h1>
      <Seconds secondstate={seconds ? padTime(String(seconds)) : "00"} />
    </div>
  );
};

const padTime = (value) => {
  return value.padStart(2, "00");
};

export default Modal;
