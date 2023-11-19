import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

// import Nav from "./subcomponents/Nav";

export default function Header({ismodalOpen, setIsModalOpen}) {
  return (
    <div className="sticky top-0 w-full flex items-center justify-between h-16 py-2 px-6 bg-slate-800 border-b-2 border-violet-400">
        <p href="/" className="text-2xl font-bold text-violet-400">
          ScoreKeeper
        </p>
      <div onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon
          icon={faEllipsis}
          size="2xl"
          style={{ color: "#a78bfa" }}
        />
      </div>
    </div>
  );
}
