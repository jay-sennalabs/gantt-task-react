import React, { ReactChild } from "react";
import { ViewMode, DateFormatter } from "../../types/public-types";
import { TopPartOfCalendar } from "./top-part-of-calendar";
import {
  getCachedDateTimeFormat,
  getLocalDayOfWeek,
  getLocaleMonth,
  getWeekNumberISO8601,
} from "../../helpers/date-helper";
import { DateSetup } from "../../types/date-setup";
import styles from "./calendar.module.css";

export type CalendarProps = {
  dateSetup: DateSetup;
  locale: string;
  viewMode: ViewMode;
  rtl: boolean;
  headerHeight: number;
  columnWidth: number;
  fontFamily: string;
  fontSize: string;
  dateFormatter?: DateFormatter;
  todayHeaderColor?: string;
  headerLineColor?: string;
  headerTextColor?: string;
};

export const Calendar: React.FC<CalendarProps> = ({
  dateSetup,
  locale,
  viewMode,
  rtl,
  headerHeight,
  columnWidth,
  fontFamily,
  fontSize,
  dateFormatter,
  todayHeaderColor,
  headerLineColor = "#e0e0e0",
  headerTextColor = "#333",
}) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isSameDay = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const getCalendarValuesForYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = dateFormatter?.formatYear
        ? dateFormatter.formatYear(date, locale)
        : date.getFullYear().toString();
      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
          style={{ fill: headerTextColor }}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = dateFormatter?.formatYear
          ? dateFormatter.formatYear(date, locale)
          : date.getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getFullYear() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getFullYear()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={headerHeight}
            xText={xText}
            yText={headerHeight * 0.25}
            lineColor={headerLineColor}
            textColor={headerTextColor}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForQuarterYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      // const bottomValue = getLocaleMonth(date, locale);
      const quarter = "Q" + Math.floor((date.getMonth() + 3) / 3);
      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
          style={{ fill: headerTextColor }}
        >
          {quarter}
        </text>
      );
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = date.getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={Math.abs(xText)}
            yText={headerHeight * 0.25}
            lineColor={headerLineColor}
            textColor={headerTextColor}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForMonth = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = dateFormatter?.formatMonth
        ? dateFormatter.formatMonth(date, locale)
        : getLocaleMonth(date, locale);
      bottomValues.push(
        <text
          key={bottomValue + date.getFullYear()}
          y={headerHeight * 0.75}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
          style={{ fill: headerTextColor }}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = dateFormatter?.formatYear
          ? dateFormatter.formatYear(date, locale)
          : date.getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={xText}
            yText={headerHeight * 0.25}
            lineColor={headerLineColor}
            textColor={headerTextColor}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForWeek = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    let weeksCount: number = 1;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      let topValue = "";
      if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
        // top
        topValue = dateFormatter?.formatMonth
          ? `${dateFormatter.formatMonth(date, locale)}, ${
              dateFormatter?.formatYear
                ? dateFormatter.formatYear(date, locale)
                : date.getFullYear()
            }`
          : `${getLocaleMonth(date, locale)}, ${date.getFullYear()}`;
      }
      // bottom
      const bottomValue = dateFormatter?.formatWeek
        ? dateFormatter.formatWeek(date, locale)
        : `W${getWeekNumberISO8601(date)}`;

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          style={{ fill: headerTextColor }}
        >
          {bottomValue}
        </text>
      );

      if (topValue) {
        // if last day is new month
        if (i !== dates.length - 1) {
          topValues.push(
            <TopPartOfCalendar
              key={topValue}
              value={topValue}
              x1Line={columnWidth * i + weeksCount * columnWidth}
              y1Line={0}
              y2Line={topDefaultHeight}
              xText={columnWidth * i + columnWidth * weeksCount * 0.5}
              yText={headerHeight * 0.25}
              lineColor={headerLineColor}
              textColor={headerTextColor}
            />
          );
        }
        weeksCount = 0;
      }
      weeksCount++;
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForDay = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const todayHighlights: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    const monthSegments: Array<{
      month: number;
      year: number;
      startIdx: number;
      endIdx: number;
    }> = [];
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = dateFormatter?.formatDay
        ? dateFormatter.formatDay(date, locale)
        : `${getLocalDayOfWeek(date, locale, "short")}, ${date
            .getDate()
            .toString()}`;

      // Add today highlight
      if (todayHeaderColor && isSameDay(date)) {
        todayHighlights.push(
          <rect
            key={`today-${date.getTime()}`}
            x={columnWidth * i}
            y={topDefaultHeight}
            width={columnWidth}
            height={headerHeight - topDefaultHeight}
            fill={todayHeaderColor}
            className={styles.calendarTodayHeader}
          />
        );
      }

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
          style={{
            fill: headerTextColor,
            ...(isSameDay(date) && todayHeaderColor
              ? { fontWeight: "bold" }
              : {}),
          }}
        >
          {bottomValue}
        </text>
      );
      const lastSegment = monthSegments[monthSegments.length - 1];
      if (
        !lastSegment ||
        lastSegment.month !== date.getMonth() ||
        lastSegment.year !== date.getFullYear()
      ) {
        monthSegments.push({
          month: date.getMonth(),
          year: date.getFullYear(),
          startIdx: i,
          endIdx: i,
        });
      } else {
        monthSegments[monthSegments.length - 1] = {
          ...lastSegment,
          endIdx: i,
        };
      }
    }
    monthSegments.forEach((segment) => {
      const segmentDate = dates[segment.endIdx];
      const topValue = dateFormatter?.formatMonth
        ? dateFormatter.formatMonth(segmentDate, locale)
        : getLocaleMonth(segmentDate, locale);
      const segmentLength = segment.endIdx - segment.startIdx + 1;
      const segmentCenter =
        columnWidth * (segment.startIdx + segmentLength / 2);
      topValues.push(
        <TopPartOfCalendar
          key={`${topValue}${segmentDate.getFullYear()}${segment.startIdx}`}
          value={topValue}
          x1Line={columnWidth * (segment.endIdx + 1)}
          y1Line={0}
          y2Line={topDefaultHeight}
          xText={segmentCenter}
          yText={headerHeight * 0.25}
          lineColor={headerLineColor}
          textColor={headerTextColor}
        />
      );
    });
    return [topValues, bottomValues, todayHighlights];
  };

  const getCalendarValuesForPartOfDay = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = dateFormatter?.formatHour
        ? dateFormatter.formatHour(date, locale)
        : getCachedDateTimeFormat(locale, {
            hour: "numeric",
          }).format(date);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
          style={{ fill: headerTextColor }}
        >
          {bottomValue}
        </text>
      );
      if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
        const topValue = dateFormatter?.formatDay
          ? dateFormatter.formatDay(date, locale)
          : `${getLocalDayOfWeek(
              date,
              locale,
              "short"
            )}, ${date.getDate()} ${getLocaleMonth(date, locale)}`;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + date.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i + ticks * columnWidth}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * i + ticks * columnWidth * 0.5}
            yText={headerHeight * 0.25}
            lineColor={headerLineColor}
            textColor={headerTextColor}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  const getCalendarValuesForHour = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = dateFormatter?.formatHour
        ? dateFormatter.formatHour(date, locale)
        : getCachedDateTimeFormat(locale, {
            hour: "numeric",
          }).format(date);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.75}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
          style={{ fill: headerTextColor }}
        >
          {bottomValue}
        </text>
      );
      if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
        const displayDate = dates[i - 1];
        const topValue = dateFormatter?.formatDay
          ? dateFormatter.formatDay(displayDate, locale)
          : `${getLocalDayOfWeek(
              displayDate,
              locale,
              "long"
            )}, ${displayDate.getDate()} ${getLocaleMonth(
              displayDate,
              locale
            )}`;
        const topPosition = (date.getHours() - 24) / 2;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + displayDate.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + topPosition)}
            yText={headerHeight * 0.25}
            lineColor={headerLineColor}
            textColor={headerTextColor}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  let topValues: ReactChild[] = [];
  let bottomValues: ReactChild[] = [];
  let todayHighlights: ReactChild[] = [];
  switch (dateSetup.viewMode) {
    case ViewMode.Year:
      [topValues, bottomValues] = getCalendarValuesForYear();
      break;
    case ViewMode.QuarterYear:
      [topValues, bottomValues] = getCalendarValuesForQuarterYear();
      break;
    case ViewMode.Month:
      [topValues, bottomValues] = getCalendarValuesForMonth();
      break;
    case ViewMode.Week:
      [topValues, bottomValues] = getCalendarValuesForWeek();
      break;
    case ViewMode.Day:
      [topValues, bottomValues, todayHighlights] = getCalendarValuesForDay();
      break;
    case ViewMode.QuarterDay:
    case ViewMode.HalfDay:
      [topValues, bottomValues] = getCalendarValuesForPartOfDay();
      break;
    case ViewMode.Hour:
      [topValues, bottomValues] = getCalendarValuesForHour();
  }
  return (
    <g className="calendar" fontSize={fontSize} fontFamily={fontFamily}>
      <rect
        x={0}
        y={0}
        width={columnWidth * dateSetup.dates.length}
        height={headerHeight}
        className={styles.calendarHeader}
        stroke={headerLineColor}
      />
      {/* Horizontal line between top and bottom header */}
      <line
        x1={0}
        y1={headerHeight / 2}
        x2={columnWidth * dateSetup.dates.length}
        y2={headerHeight / 2}
        className={styles.calendarHeaderSeparator}
        stroke={headerLineColor}
      />
      {todayHighlights}
      {bottomValues} {topValues}
    </g>
  );
};
