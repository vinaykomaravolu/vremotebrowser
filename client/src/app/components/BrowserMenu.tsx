import React, { useState } from 'react';
import { GoBackIcon, GoForwardIcon, RefreshIcon, SearchIcon } from './Icons';

function BrowserMenu({ socket }: { socket: any }) {
  const [search, setSearch] = useState<string>('');

  function handleGoBack(){
    socket.emit('browser-goback');
  }

  function handleGoForward(){
    socket.emit('browser-goforward');
  }

  function handleReload(){
    socket.emit('browser-reload');
  }

  function handleSearch(e: any){
    e.preventDefault();
    socket.emit('browser-goto', search);
    console.log(search);
  }

  function handleSearchChange(e: any){
    setSearch(e.target.value);
  }

  return (
    <div className=" w-full bg-gray-400 flex flex-row">
      <div className="flex flex-row  items-start h-full p-2 ">
        <button
          type="button"
          onClick={handleGoBack}
          className="text-black hover:bg-gray-300 rounded-full focus:outline-none"
        >
          {GoBackIcon}
        </button>
        <button
          type="button"
          onClick={handleGoForward}
          className="text-black hover:bg-gray-300 rounded-full focus:outline-none"
        >
          {GoForwardIcon}
        </button>
        <button
          type="button"
          onClick={handleReload}
          className="text-black hover:bg-gray-300 rounded-full p-1 focus:outline-none"
        >
          {RefreshIcon}
        </button>
      </div>
      <div className="flex relative h-full w-full p-2">
        <form className="h-8 w-full" onSubmit={handleSearch}>
          <input
          type="text"
          className="h-full w-full text-black rounded-full z-0 focus:outline-none outline-none pr-3 pl-3 focus:shadow"
          placeholder="Search Website"
          onChange={handleSearchChange}

          value={search}
          defaultValue=""
        />
        </form>

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
