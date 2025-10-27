# gantt-task-react

## Interactive Gantt Chart for React with TypeScript.

![example](https://user-images.githubusercontent.com/26743903/88215863-f35d5f00-cc64-11ea-81db-e829e6e9b5c8.png)

## [Live Demo](https://matematuk.github.io/gantt-task-react/)

> **Note**: This is a fork with added support for:
>
> - **Custom Date Formatters** - See [Custom Date Formatter](#custom-date-formatter) section
> - **Custom Header Text Color** - See [Header Text Color Customization](#header-text-color-customization) section
> - **Today Highlighting Features** - See [Today Highlighting Features](#today-highlighting-features) section
> - **Custom Task Bar Styling** - See [Custom Task Bar Styling](#custom-task-bar-styling) section
> - **Row Background Color Customization** - See [Row Background Color Customization](#row-background-color-customization) section

## Install

```bash
# From GitHub (this fork)
npm install jay-sennalabs/gantt-task-react

```

## How to use it

```javascript
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

let tasks: Task[] = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
    ...
];
<Gantt tasks={tasks} />
```

You may handle actions

```javascript
<Gantt
  tasks={tasks}
  viewMode={view}
  onDateChange={onTaskChange}
  onTaskDelete={onTaskDelete}
  onProgressChange={onProgressChange}
  onDoubleClick={onDblClick}
  onClick={onClick}
/>
```

## How to run example

```
cd ./example
npm install
npm start
```

## Gantt Configuration

### GanttProps

| Parameter Name                  | Type          | Description                                        |
| :------------------------------ | :------------ | :------------------------------------------------- |
| tasks\*                         | [Task](#Task) | Tasks array.                                       |
| [EventOption](#EventOption)     | interface     | Specifies gantt events.                            |
| [DisplayOption](#DisplayOption) | interface     | Specifies view type and display timeline language. |
| [StylingOption](#StylingOption) | interface     | Specifies chart and global tasks styles            |

### EventOption

| Parameter Name     | Type                                                                          | Description                                                                             |
| :----------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| onSelect           | (task: Task, isSelected: boolean) => void                                     | Specifies the function to be executed on the taskbar select or unselect event.          |
| onDoubleClick      | (task: Task) => void                                                          | Specifies the function to be executed on the taskbar onDoubleClick event.               |
| onClick            | (task: Task) => void                                                          | Specifies the function to be executed on the taskbar onClick event.                     |
| onDelete\*         | (task: Task) => void/boolean/Promise<void>/Promise<boolean>                   | Specifies the function to be executed on the taskbar on Delete button press event.      |
| onDateChange\*     | (task: Task, children: Task[]) => void/boolean/Promise<void>/Promise<boolean> | Specifies the function to be executed when drag taskbar event on timeline has finished. |
| onProgressChange\* | (task: Task, children: Task[]) => void/boolean/Promise<void>/Promise<boolean> | Specifies the function to be executed when drag taskbar progress event has finished.    |
| onExpanderClick\*  | onExpanderClick: (task: Task) => void;                                        | Specifies the function to be executed on the table expander click                       |
| timeStep           | number                                                                        | A time step value for onDateChange. Specify in milliseconds.                            |

\* Chart undoes operation if method return false or error. Parameter children returns one level deep records.

### Custom Date Formatter

**New Feature!** You can now customize how dates, months, years, weeks, and hours are displayed using the `dateFormatter` prop.

#### Basic Usage

```typescript
import { Gantt, DateFormatter } from "gantt-task-react";

const customFormatter: DateFormatter = {
  formatDay: (date, locale) => `Day ${date.getDate()}`,
  formatMonth: (date, locale) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  },
  formatYear: (date, locale) => date.getFullYear().toString(),
  // Optional: formatWeek, formatHour
};

<Gantt tasks={tasks} dateFormatter={customFormatter} />;
```

#### Thai Date Format Example

```typescript
const thaiFormatter: DateFormatter = {
  formatDay: date => {
    const thaiDays = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    return `${thaiDays[date.getDay()]} ${date.getDate()}`;
  },
  formatMonth: date => {
    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    return thaiMonths[date.getMonth()];
  },
  formatYear: date => `${date.getFullYear() + 543}`, // Buddhist Era
};

<Gantt tasks={tasks} dateFormatter={thaiFormatter} />;
```

See [full example](./example/src/App.tsx) for more details.

#### DateFormatter Interface

| Property    | Type                                     | Description         | Used in ViewMode               |
| ----------- | ---------------------------------------- | ------------------- | ------------------------------ |
| formatDay   | `(date: Date, locale: string) => string` | Custom day format   | Day, HalfDay, QuarterDay, Hour |
| formatMonth | `(date: Date, locale: string) => string` | Custom month format | Month, Week, Day               |
| formatYear  | `(date: Date, locale: string) => string` | Custom year format  | Year, QuarterYear, Month, Week |
| formatWeek  | `(date: Date, locale: string) => string` | Custom week format  | Week                           |
| formatHour  | `(date: Date, locale: string) => string` | Custom hour format  | Hour, HalfDay, QuarterDay      |

All formatters are optional. If not provided, default formatting will be used.

### Today Highlighting Features

**New Feature!** Control how today's date is highlighted in the Gantt chart.

#### Basic Usage

```typescript
<Gantt
  tasks={tasks}
  showTodayColor={true} // Show/hide column highlight (default: true)
  todayColor="rgba(252, 248, 227, 0.5)" // Column highlight color
  todayHeaderColor="#ffeb3b" // Header highlight color (optional)
/>
```

#### Options

| Option             | Type    | Default                      | Description                                            |
| ------------------ | ------- | ---------------------------- | ------------------------------------------------------ |
| `showTodayColor`   | boolean | `true`                       | Enable/disable today column highlight                  |
| `todayColor`       | string  | `"rgba(252, 248, 227, 0.5)"` | Background color for today's column                    |
| `todayHeaderColor` | string  | `undefined`                  | Background color for today's date in header (Day view) |

#### Examples

**Disable today column highlight:**

```typescript
<Gantt tasks={tasks} showTodayColor={false} />
```

**Custom colors:**

```typescript
<Gantt
  tasks={tasks}
  todayColor="rgba(255, 235, 59, 0.2)"
  todayHeaderColor="#ffeb3b"
/>
```

**Header-only highlight:**

```typescript
<Gantt tasks={tasks} showTodayColor={false} todayHeaderColor="#4CAF50" />
```

### Custom Task Bar Styling

**New Feature!** Fine-grained control over task bar appearance.

#### Basic Usage

```typescript
<Gantt
  tasks={tasks}
  taskBarHeight={32}
  taskBarStrokeWidth={1}
  taskBarStrokeColor="#ffd703"
  taskBarSelectedStrokeColor="#ffd703"
  taskBarBackgroundColor="#fff6c6"
  taskBarSelectedBackgroundColor="#fff6c6"
  taskBarProgressColor="#ffd703"
  taskBarSelectedProgressColor="#ffd703"
/>
```

#### Options

| Option                           | Type   | Description                                     |
| -------------------------------- | ------ | ----------------------------------------------- |
| `taskBarHeight`                  | number | Custom height for task bars (centered in row)   |
| `taskBarStrokeWidth`             | number | Width of task bar stroke border (0 = no stroke) |
| `taskBarStrokeColor`             | string | Color for task bar stroke border                |
| `taskBarSelectedStrokeColor`     | string | Color for task bar stroke border when selected  |
| `taskBarBackgroundColor`         | string | Background color for task bars                  |
| `taskBarSelectedBackgroundColor` | string | Background color for task bars when selected    |
| `taskBarProgressColor`           | string | Color for task bar progress fill                |
| `taskBarSelectedProgressColor`   | string | Color for task bar progress fill when selected  |

All task bar styling options are optional. If not provided, default styling will be used.

### Header Text Color Customization

**New Feature!** Customize the text color for calendar and task list headers.

#### Basic Usage

```typescript
<Gantt
  tasks={tasks}
  headerTextColor="#666" // Custom header text color
/>
```

#### Examples

**Light theme header text:**

```typescript
<Gantt tasks={tasks} headerTextColor="#999" />
```

**Dark theme header text:**

```typescript
<Gantt tasks={tasks} headerTextColor="#fff" />
```

### Row Background Color Customization

**New Feature!** Customize the background color for grid and task list rows.

#### Basic Usage

```typescript
<Gantt
  tasks={tasks}
  gridRowBackgroundColor="#f9f9f9" // Custom grid row background
  taskListRowBackgroundColor="#f5f5f5" // Custom task list row background
/>
```

#### Examples

**Custom row colors:**

```typescript
// Light background for better visibility
<Gantt
  tasks={tasks}
  gridRowBackgroundColor="#fafafa"
  taskListRowBackgroundColor="#f8f8f8"
/>

// Dark theme
<Gantt
  tasks={tasks}
  gridRowBackgroundColor="#1e1e1e"
  taskListRowBackgroundColor="#2a2a2a"
/>
```

### DisplayOption

| Parameter Name | Type                                    | Description                                                                                                              |
| :------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| viewMode       | enum                                    | Specifies the time scale. Hour, Quarter Day, Half Day, Day, Week(ISO-8601, 1st day is Monday), Month, QuarterYear, Year. |
| viewDate       | date                                    | Specifies display date and time for display.                                                                             |
| preStepsCount  | number                                  | Specifies empty space before the fist task                                                                               |
| locale         | string                                  | Specifies the month name language. Able formats: ISO 639-2, Java Locale.                                                 |
| rtl            | boolean                                 | Sets rtl mode.                                                                                                           |
| dateFormatter  | [DateFormatter](#custom-date-formatter) | Custom date formatters for calendar display. See [Custom Date Formatter](#custom-date-formatter) section.                |

### StylingOption

| Parameter Name                 | Type    | Description                                                                                    |
| :----------------------------- | :------ | :--------------------------------------------------------------------------------------------- |
| headerHeight                   | number  | Specifies the header height.                                                                   |
| ganttHeight                    | number  | Specifies the gantt chart height without header. Default is 0. It`s mean no height limitation. |
| columnWidth                    | number  | Specifies the time period width.                                                               |
| listCellWidth                  | string  | Specifies the task list cell width. Empty string is mean "no display".                         |
| rowHeight                      | number  | Specifies the task row height.                                                                 |
| barCornerRadius                | number  | Specifies the taskbar corner rounding.                                                         |
| barFill                        | number  | Specifies the taskbar occupation. Sets in percent from 0 to 100.                               |
| handleWidth                    | number  | Specifies width the taskbar drag event control for start and end dates.                        |
| fontFamily                     | string  | Specifies the application font.                                                                |
| fontSize                       | string  | Specifies the application font size.                                                           |
| barProgressColor               | string  | Specifies the taskbar progress fill color globally.                                            |
| barProgressSelectedColor       | string  | Specifies the taskbar progress fill color globally on select.                                  |
| barBackgroundColor             | string  | Specifies the taskbar background fill color globally.                                          |
| barBackgroundSelectedColor     | string  | Specifies the taskbar background fill color globally on select.                                |
| arrowColor                     | string  | Specifies the relationship arrow fill color.                                                   |
| arrowIndent                    | number  | Specifies the relationship arrow right indent. Sets in px                                      |
| todayColor                     | string  | Specifies the current period column fill color.                                                |
| showTodayColor                 | boolean | Enable/disable today column highlight. Default: `true`                                         |
| todayHeaderColor               | string  | Background color for today's date in calendar header (Day view). Optional.                     |
| headerLineColor                | string  | Color for header border and separator lines. Default: `"#e0e0e0"`                              |
| headerTextColor                | string  | Text color for calendar and task list headers. Default: `"#333"`                               |
| gridRowBackgroundColor         | string  | Background color for grid rows (timeline area). Default: `"#fff"`                              |
| taskListRowBackgroundColor     | string  | Background color for task list rows. Default: `"#fff"`                                         |
| taskBarHeight                  | number  | Custom height for task bars (centered in row). Optional.                                       |
| taskBarStrokeWidth             | number  | Width of task bar stroke border. Optional.                                                     |
| taskBarStrokeColor             | string  | Color for task bar stroke border. Optional.                                                    |
| taskBarSelectedStrokeColor     | string  | Color for task bar stroke border when selected. Optional.                                      |
| taskBarBackgroundColor         | string  | Background color for task bars. Optional.                                                      |
| taskBarSelectedBackgroundColor | string  | Background color for task bars when selected. Optional.                                        |
| taskBarProgressColor           | string  | Color for task bar progress fill. Optional.                                                    |
| taskBarSelectedProgressColor   | string  | Color for task bar progress fill when selected. Optional.                                      |
| hideTaskName                   | boolean | Hide task names inside bars. Optional.                                                         |
| hideTaskNameOnShortTasks       | boolean | Hide task names for shorter tasks only. Optional.                                              |
| TooltipContent                 |         | Specifies the Tooltip view for selected taskbar.                                               |
| TaskListHeader                 |         | Specifies the task list Header view                                                            |
| TaskListTable                  |         | Specifies the task list Table view                                                             |

- TooltipContent: [`React.FC<{ task: Task; fontSize: string; fontFamily: string; }>;`](https://github.com/MaTeMaTuK/gantt-task-react/blob/main/src/components/other/tooltip.tsx#L56)
- TaskListHeader: `React.FC<{ headerHeight: number; rowWidth: string; fontFamily: string; fontSize: string;}>;`
- TaskListTable: `React.FC<{ rowHeight: number; rowWidth: string; fontFamily: string; fontSize: string; locale: string; tasks: Task[]; selectedTaskId: string; setSelectedTask: (taskId: string) => void; }>;`

### Task

| Parameter Name | Type     | Description                                                                                           |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------- |
| id\*           | string   | Task id.                                                                                              |
| name\*         | string   | Task display name.                                                                                    |
| type\*         | string   | Task display type: **task**, **milestone**, **project**                                               |
| start\*        | Date     | Task start date.                                                                                      |
| end\*          | Date     | Task end date.                                                                                        |
| progress\*     | number   | Task progress. Sets in percent from 0 to 100.                                                         |
| dependencies   | string[] | Specifies the parent dependencies ids.                                                                |
| styles         | object   | Specifies the taskbar styling settings locally. Object is passed with the following attributes:       |
|                |          | - **backgroundColor**: String. Specifies the taskbar background fill color locally.                   |
|                |          | - **backgroundSelectedColor**: String. Specifies the taskbar background fill color locally on select. |
|                |          | - **progressColor**: String. Specifies the taskbar progress fill color locally.                       |
|                |          | - **progressSelectedColor**: String. Specifies the taskbar progress fill color globally on select.    |
| isDisabled     | bool     | Disables all action for current task.                                                                 |
| fontSize       | string   | Specifies the taskbar font size locally.                                                              |
| project        | string   | Task project name                                                                                     |
| hideChildren   | bool     | Hide children items. Parameter works with project type only                                           |

\*Required

## License

[MIT](https://oss.ninja/mit/jaredpalmer/)
