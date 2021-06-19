import React,{useState, useLayoutEffect, useEffect} from 'react';

function RemoteBrowser({ socket }: { socket: any }) {
  const [imageData, setImageData] = useState<string>("");
  let isMouseDrag = false;
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
    socket.emit('browser-mouse-position', mousePosition);
  }

  function handleMouseDown(e: any){
    mousePosition = getRelativeMousePosition(e);
    if(!isMouseDrag){
      isMouseDrag = true;
      socket.emit('browser-mouse-down', mousePosition);
    }
  }

  function handleMouseUp(e: any){
    mousePosition = getRelativeMousePosition(e);
    isMouseDrag = false;
    socket.emit('browser-mouse-up', mousePosition);
  }

  function handleMouseWheel(e: any){
    socket.emit('browser-mouse-wheel', e.deltaY);
  }

  function handleKeyPressEvent(e : any) {
    socket.emit('browser-keyboard-press', e.key);
  }

  function handleKeyUpEvent(e : any) {
    socket.emit('browser-keyboard-up', e.key);
  }

  function handleKeyDownEvent(e : any) {
    socket.emit('browser-keyboard-down', e.key);
  }



  useLayoutEffect(() => {
    function updateSize() {
      let viewport: any = document.getElementById("viewport") ;
      socket.emit("browser-viewport",{width: viewport.clientWidth, height: viewport.clientHeight});
    }
    updateSize();
    socket.on("image", (data: string) => {
      setImageData(data);
    });

    window.addEventListener('resize', updateSize);
   // document.addEventListener('keypress', handleKeyPressEvent);
    document.addEventListener('keyup', handleKeyUpEvent);
    document.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      window.removeEventListener('resize', updateSize);
      // document.removeEventListener('keypress', handleKeyPressEvent);
      document.removeEventListener('keyup', handleKeyUpEvent);
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
  <div id="viewport" className="h-full w-full"
    onMouseMove={(e) => {handleMousePosition(e)}}
    onMouseDown={(e) => {
      handleMouseDown(e)
    }}
    onMouseUp={(e) => {
      handleMouseUp(e);
    }}
    onWheel={(e) => {handleMouseWheel(e)}}
    onDragStartCapture={(e) => console.log(e)}>
    <img className="w-full h-full" alt="" src={`data:image/png;base64,${imageData}`} draggable={false}/>
  </div>
  );
}

export default RemoteBrowser;
