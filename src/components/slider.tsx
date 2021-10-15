// @ts-nocheck
import React, { useEffect, useState } from "react";

let canvasRef;
function Slider({
  width,
  height,
  thickness = 0.35,
  capSize = 20,
  lineCap = "round",
  bgColor = "#CCC",
  fgColor = "#F8AFAE",
  onChange = (...args) => {},
  onChangeEnd = (...args) => {},
  min = 0,
  max = 10,
  value = 5
}) {

  let h = height || 200,
    touchIndex,
    w = width || 50,
    xy = 0,
    lineWidth,
    position = 0,
    internalValue = value;
  // const [readOnly, setReadOnly] = useState(false);

  function getPosition() {
    const bounds = canvasRef.getBoundingClientRect();
    // const inversePosition
    const percent = internalValue / max;
    const inverseBound = 1 - percent;
    const halfcap = capSize / 2;
    position =
      (internalValue
        ? inverseBound * h + capSize
        : bounds.bottom - bounds.top + capSize) + halfcap;
    return position;
  }
  function valueToPoint() {
    const bounds = canvasRef.getBoundingClientRect();
    const position = (max / value) * bounds.top;
    console.log(position);
  }

  function eventToValue(e) {
    if (!canvasRef) {
      return internalValue;
    }
    const bounds = canvasRef.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top; //+ capSize / 2;
    const tempposition = Math.max(Math.min(y, h), 0);
    const height_ = bounds.bottom - bounds.top;
    console.log(x, y, h);
    const heightWithCap = h - capSize;
    const inversePosition = h - tempposition;
    const val = (inversePosition / h) * max;
    console.log(val);
    internalValue = val > 0.5 ? Math.round(val) : 0;
    getPosition();
    //position = y;
    // drawCanvas();

    return internalValue;
    // setPosition(y);
  }
  function handleMouseMove(e) {
    e.preventDefault();
    onChange(eventToValue(e));
  }
  function handleMouseUp(e) {
    onChange(eventToValue(e));
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    //document.removeEventListener("keyup", this.handleEsc);
  }
  function handleMouseDown(e) {
    onChange(eventToValue(e));
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    //document.addEventListener("keyup", this.handleEsc);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    onChange(eventToValue(e.targetTouches[touchIndex]));
  }

  function handleTouchEnd(e) {
    onChangeEnd(eventToValue(e));
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    document.removeEventListener("touchcancel", handleTouchEnd);
  }
  function handleTouchStart(e) {
    e.preventDefault();
    touchIndex = e.targetTouches.length - 1;
    onChange(eventToValue(e.targetTouches[touchIndex]));
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false
    });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);
  }

  function getCanvasScale(ctx) {
    const devicePixelRatio =
      window.devicePixelRatio ||
      window.screen.deviceXDPI / window.screen.logicalXDPI || // IE10
      1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  }

  function drawCanvas() {
    const ctx = canvasRef.getContext("2d");
    const scale = getCanvasScale(ctx);
    const halfcap = capSize / 2;
    canvasRef.width = w * scale; // clears the canvas
    canvasRef.height = (h + capSize * 2) * scale;
    ctx.scale(scale, scale);
    xy = w / 2; // coordinates of canvas center
    lineWidth = xy * thickness;
    ctx.lineWidth = lineWidth;
    ctx.save();

    // background
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 5;
    ctx.moveTo(xy, h + capSize);
    ctx.lineTo(xy, capSize);
    ctx.stroke();

    // trail
    ctx.restore();
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FF645A";
    ctx.lineWidth = 5;
    ctx.moveTo(xy, h + capSize);
    ctx.lineTo(xy, position - halfcap - 1);
    ctx.stroke();

    // button
    ctx.restore();
    ctx.beginPath();
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = capSize;

    ctx.moveTo(xy, position - halfcap);
    ctx.lineTo(xy, position - halfcap - 1);
    ctx.stroke();
  }

  useEffect(() => {
    console.log("being run");
    internalValue = value;
    getPosition();
    canvasRef.addEventListener("touchstart", handleTouchStart, {
      passive: false
    });
    drawCanvas();
  }, []);

  useEffect(() => {
    console.log("being run");
    internalValue = value;
    getPosition();
    drawCanvas();
  }, [value]);

  console.log("rerendering?");
  return (
    <div
      style={{
        position: "relative",
        width: w + "px",
        height: h + "px",
        display: "inline-block"
      }}
      className="slider"
    >
      <canvas
        style={{ width: "100%", height: "100%" }}
        ref={(ref) => {
          canvasRef = ref;
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default Slider;
