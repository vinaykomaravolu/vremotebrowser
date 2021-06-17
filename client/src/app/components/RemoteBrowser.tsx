import React,{useState, useLayoutEffect, useEffect} from 'react';

function RemoteBrowser({ socket }: { socket: any }) {
  const [imageData, setImageData] = useState<string>("");

  useLayoutEffect(() => {
    function updateSize() {
      let viewport: any = document.getElementById("viewport") ;
      console.log({width: viewport.clientWidth, height: viewport.clientHeight});
      socket.emit("browser-viewport",{width: viewport.clientWidth, height: viewport.clientHeight});
    }

    socket.on("image", (data: string) => {
      setImageData(data); //
    });

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
  <div id="viewport" className="h-full w-full">
    <img className="object-fill" alt="" src={`data:image/png;base64,${imageData}`} draggable={false}/>
  </div>
  );
}

export default RemoteBrowser;
