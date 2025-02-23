import React, { forwardRef, useEffect, useState } from "react";
import { useRef } from "react";
import "../output.css";
import "../assets/css/modal-hide.css";

//using forwardref to  reuse this modal to other file when imported
const Modal = forwardRef((props, ref) => {
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const closeModal = () => {
    ref.current.style.display = "none";
  };

  const handleMinute = (event) => {
    setMinute(event.target.value);
  };

  const handleSeconds = (event) => {
    setSeconds(event.target.value);
  };

  return (
    <div
      className="bg-white border-3 font-[Jetbrains_Mono] flex gap-10 flex-col items-center border-[rgba(255,255,255,0.5)] p-10 modal-hide absolute  rounded  right-105 top-50"
      ref={ref}
    >
      <section className="flex gap-3">
        <input
          type="number"
          placeholder="Enter Minutes"
          className="border-2 border-black p-2 bg-white placeholder:text-center"
          onChange={handleMinute}
          minuteState={minute}
        />
        <input
          type="number"
          placeholder="Enter Seconds "
          className="border-2 border-black p-2 bg-white placeholder:text-center"
          onChange={handleSeconds}
          secondState={seconds}
        />
      </section>
      <button
        className="border-2 border-black w-[200px] p-2 rounded-lg bg-white hover:bg-black hover:text-white"
        onClick={closeModal}
      >
        Confirm
      </button>
    </div>
  );
});

export default Modal;
