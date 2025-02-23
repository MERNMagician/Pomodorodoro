import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../output.css";
import Modal from "./modal";

function Modes() {
  const modal = useRef();

  const showModal = () => {
    modal.current.style.display = "flex";
  };

  return (
    <div className="flex cursor-pointer font-[Fira_Code] font-bold">
      <div className="border-2 border-black p-[10px] w-[230px] text-center rounded-l-[10px] hover:text-white hover:bg-black">
        Pomodoro
      </div>
      <div className="border-2 border-black p-[10px] w-[230px] text-center   hover:text-white hover:bg-black">
        Break
      </div>
      <div
        className="border-2 border-black p-[10px] w-[230px] text-center  rounded-r-[10px] hover:text-white hover:bg-black"
        onClick={showModal}
      >
        Set time
      </div>
      <Modal ref={modal} />
    </div>
  );
}

export default Modes;
