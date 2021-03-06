import React, { useState } from "react";
import Knob, {
  SkinWrap,
  KnobProps,
  composeTwo,
  useAngleUpdater
} from "react-dial-knob";

interface MyKnobSkinTheme {
  activeColor?: string;
  defaultColor?: string;
}

interface MyKnobSkinProps extends KnobProps {
  theme?: MyKnobSkinTheme;
  style?: React.CSSProperties;
}

const uniqClassName = `customknob-${new Date().getTime()}`;

export default function Dial(props: MyKnobSkinProps) {
  const [angle, setAngle] = useAngleUpdater(props.value - 90);
  const [isActive, setIsActive] = useState(false);
  const theme = props.theme || {};
  const activeColor = theme.activeColor || "#b56a7a";
  const defaultColor = theme.defaultColor || "#100";
  const bgrColor = isActive ? activeColor : defaultColor;
  const angleChangeHandler = composeTwo<number>(setAngle, props.onAngleChange);
  const interactionChangeHandler = composeTwo<boolean>(
    setIsActive,
    props.onInteractionChange
  );
  return (
    <SkinWrap style={props.style}>
      <Knob
        diameter={props.diameter}
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        spaceMaxFromZero={props.spaceMaxFromZero}
        ariaLabelledBy={props.ariaLabelledBy}
        ariaValueText={props.ariaValueText}
        knobStyle={{ cursor: "pointer", ...props.knobStyle }}
        onAngleChange={angleChangeHandler}
        onInteractionChange={interactionChangeHandler}
        onValueChange={props.onValueChange}
      >
        <>
          <style type="text/css">
            {`
        .${uniqClassName}-text {
                        width: 100%;
                        text-align: center;
                        font-weight: bold;
                        position: absolute;
                        top: calc(50% - 0.6em);
                        user-select: none;
                        z-index: 3;
                        color: #262626;
                        text-shadow: -1px -1px 1px #111, 1px 1px 2px #fff;
                    }`}
          </style>
          <div
            className={`${uniqClassName}-text`}
            style={{
              fontSize: `${Math.ceil(props.diameter / 4)}px`,
              color: "white"
            }}
          >
            {props.value}
          </div>
          <svg
            viewBox="0 0 100 100"
            transform={`rotate(${angle})`}
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <path
              fill={bgrColor}
              d="M50 0A50 50 0 000 50a50 50 0 0050 50 50 50 0 0050-50A50 50 0 0050 0zm0 2a48 48 0 0148 48 48 48 0 01-48 48A48 48 0 012 50 48 48 0 0150 2z"
            />
            <path
              fill={bgrColor}
              d="M50 4A46 46 0 004 50a46 46 0 0046 46 46 46 0 0046-46A46 46 0 0050 4zm0 2.141a4.276 4.276 0 014.276 4.277A4.276 4.276 0 0150 14.694a4.276 4.276 0 01-4.276-4.276A4.276 4.276 0 0150 6.141z"
            />
          </svg>
        </>
      </Knob>
      {props.children}
    </SkinWrap>
  );
}
