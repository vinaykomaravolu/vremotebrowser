import React, { useState } from 'react';
import { GoBackIcon, GoForwardIcon, RefreshIcon, SearchIcon } from './Icons';

function BrowserMenu() {
  const [search, setSearch] = useState<string>('');

  return (
    <div className=" w-full bg-gray-400 flex flex-row">
      <div className="flex flex-row  items-start h-full p-2 ">
        <button
          type="button"
          className="text-black hover:bg-gray-300 rounded-full focus:outline-none"
        >
          {GoBackIcon}
        </button>
        <button
          type="button"
          className="text-black hover:bg-gray-300 rounded-full focus:outline-none"
        >
          {GoForwardIcon}
        </button>
        <button
          type="button"
          className="text-black hover:bg-gray-300 rounded-full p-1 focus:outline-none"
        >
          {RefreshIcon}
        </button>
      </div>
      <div className="flex relative h-full w-full p-2">
        <input
          type="text"
          className="h-8 w-full text-black rounded-full z-0 focus:outline-none outline-none pr-3 pl-3 focus:shadow"
          placeholder="Search Website"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
          defaultValue=""
        />
        <button
          type="button"
          className="text-black hover:text-gray-300  rounded-full focus:outline-none pr-2 absolute  top-2.5 right-2 "
        >
          {SearchIcon}
        </button>
      </div>
    </div>
  );
}

export default BrowserMenu;
