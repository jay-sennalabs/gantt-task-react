import React from "react";
import styles from "./calendar.module.css";

type TopPartOfCalendarProps = {
  value: string;
  fullValue?: string;
  x1Line: number;
  y1Line: number;
  y2Line: number;
  xText: number;
  yText: number;
  lineColor?: string;
  textColor?: string;
  textAnchor?: "start" | "middle" | "end";
};

export const TopPartOfCalendar: React.FC<TopPartOfCalendarProps> = ({
  value,
  fullValue,
  x1Line,
  y1Line,
  y2Line,
  xText,
  yText,
  lineColor = "#e6e4e4",
  textColor = "#555",
  textAnchor = "middle",
}) => {
  return (
    <g className="calendarTop">
      <line
        x1={x1Line}
        y1={y1Line}
        x2={x1Line}
        y2={y2Line}
        className={styles.calendarTopTick}
        stroke={lineColor}
        key={value + "line"}
      />
      <text
        key={value + "text"}
        y={yText}
        x={xText}
        className={styles.calendarTopText}
        textAnchor={textAnchor}
        style={{ fill: textColor }}
      >
        {fullValue ? <title>{fullValue}</title> : null}
        {value}
      </text>
    </g>
  );
};
