import React from "react";
import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
  taskBarHeight?: number;
  taskBarStrokeWidth?: number;
  taskBarStrokeColor?: string;
  taskBarSelectedStrokeColor?: string;
  taskBarBackgroundColor?: string;
  taskBarSelectedBackgroundColor?: string;
  taskBarProgressColor?: string;
  taskBarSelectedProgressColor?: string;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
  taskBarHeight,
  taskBarStrokeWidth,
  taskBarStrokeColor,
  taskBarSelectedStrokeColor,
  taskBarBackgroundColor,
  taskBarSelectedBackgroundColor,
  taskBarProgressColor,
  taskBarSelectedProgressColor,
}) => {
  const getProcessColor = () => {
    return isSelected
      ? taskBarSelectedProgressColor || styles.progressSelectedColor
      : taskBarProgressColor || styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected
      ? taskBarSelectedBackgroundColor || styles.backgroundSelectedColor
      : taskBarBackgroundColor || styles.backgroundColor;
  };

  const getStrokeColor = () => {
    return isSelected
      ? taskBarSelectedStrokeColor || taskBarStrokeColor
      : taskBarStrokeColor;
  };

  const actualHeight = taskBarHeight || height;
  const strokeWidth = taskBarStrokeWidth !== undefined ? taskBarStrokeWidth : 0;
  const yPosition = y + (height - actualHeight) / 2;

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={yPosition}
        height={actualHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        stroke={getStrokeColor()}
        strokeWidth={strokeWidth}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={yPosition}
        height={actualHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
    </g>
  );
};
