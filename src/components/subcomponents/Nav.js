import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ isLoggedIn }) {
  const [navOpen, setNavOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setNavOpen(false);
    let checkbox = document.getElementById("check");
    checkbox.checked = false;
  });

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  // function handleNavForLink() {
  //   setNavOpen((current) => !current);
  //   let checkbox = document.getElementById("check");
  //   checkbox.checked = false;
  // }

  return (
    <div ref={ref}>
      <label
        htmlFor="check"
        className="z-20 absolute z-10 top-0 right-0 pr-6"
        onChange={toggleMenu}
        style={{ cursor: "pointer" }}
      >
        <input id="check" type="checkbox"></input>
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </label>

      {/* Dropdown panel */}
      {navOpen && (
        <div className="z-10 flex bg-white rounded-md mt-0 pt-16 p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col text-center">
            <Link to="/locations" onClick={useOnClickOutside}>
              <button className="text-gray-800 hover:bg-emerald-600 font-semibold py-2 px-4 rounded-md drop-shadow-md">
                Enrollment Centers
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
