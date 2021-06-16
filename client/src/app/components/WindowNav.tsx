import React, { useContext } from 'react';

function WindowNav() {
  function closeWindow() {
    const remote = window.require ? window.require('electron').remote : null;
    const WIN = remote.getCurrentWindow();
    WIN.close();
  }

  function minimizeWindow() {
    const remote = window.require ? window.require('electron').remote : null;
    const WIN = remote.getCurrentWindow();
    WIN.minimize();
  }

  function maximizeWindow() {
    const remote = window.require ? window.require('electron').remote : null;
    const WIN = remote.getCurrentWindow();
    const ismax = WIN.isMaximized();
    if (ismax) {
      WIN.unmaximize();
    } else {
      WIN.maximize();
    }
  }

  return (
    <div className=" bg-gray-400 w-full h-7 pb-2">
      <div className="flex flex-row-reverse ">
        <button
          id="closeapp"
          onClick={() => {
            closeWindow();
          }}
          className="focus:outline-none flex-none group px-3 py-1 text-black  hover:bg-gray-300 "
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            maximizeWindow();
          }}
          id="maximizeapp"
          className="focus:outline-none flex-none group  px-3 py-1 text-black hover:bg-gray-300"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </button>
        <button
          onClick={() => {
            minimizeWindow();
          }}
          id="minimizeapp"
          className="focus:outline-none flex-none group  px-3 py-1 text-black hover:bg-gray-300"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WindowNav;
