import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimeout(() => {
        //not to make it laggy
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        //check if the bar is not hidden when resizing window
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: width,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.8, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 36],
    };
  }

  return (
    //take all the properties defined in the object
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};
export default Resizable;
