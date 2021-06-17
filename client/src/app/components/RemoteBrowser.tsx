import React,{useState, useLayoutEffect, useEffect} from 'react';

function RemoteBrowser({ socket }: { socket: any }) {
  const [imageData, setImageData] = useState<string>("");
  let mousePosition = { x: 0, y: 0 };

  function getRelativeMousePosition(e: any ){
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x: x, y: y};
  }
  function handleMousePosition(e: any){
    mousePosition = getRelativeMousePosition(e);
    socket.emit('browser-input-mouse-position', mousePosition);
  }

  function handleMouseClick(e: any){
    mousePosition = getRelativeMousePosition(e);
    socket.emit('browser-input-mouse-click', mousePosition);
  }
  useLayoutEffect(() => {
    function updateSize() {
      let viewport: any = document.getElementById("viewport") ;
      socket.emit("browser-viewport",{width: viewport.clientWidth, height: viewport.clientHeight});
    }

    socket.on("image", (data: string) => {
      setImageData(data);
    });

    let viewport: any = document.getElementById("viewport") ;
    socket.emit("browser-viewport",{width: viewport.clientWidth, height: viewport.clientHeight});
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
  <div id="viewport" className="h-full w-full" onMouseMove={(e) => {
    handleMousePosition(e);
  }} onClick={(e) => {handleMouseClick(e)}}>
    <img className="object-fill" alt="" src={`data:image/png;base64,${imageData}`} draggable={false}/>
  </div>
  );
}

export default RemoteBrowser;
