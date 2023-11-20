import React, { useState } from "react";
import githubLogo from '../assets/github-logo.png'

export default function Footer() {
  return (
    <footer className="flex self-center mx-auto max-w-screen-sm justify-around pb-4">
      <h3 className="flex self-center text-white w-1/2">
        made by matt hlavaty
      </h3>
      <a href="https://github.com/Hephaestus01" target="_blank">
        <img
          className="flex self-center w-8"
          src={githubLogo}
          alt="github link"
        />
      </a>
    </footer>
  );
}
