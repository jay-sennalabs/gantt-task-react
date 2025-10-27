import React from "react";
import { Task, ViewMode, Gantt, DateFormatter } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";

// Custom Thai Date Formatter
const thaiDateFormatter: DateFormatter = {
  formatDay: (date: Date) => {
    const thaiDays = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    return `${thaiDays[date.getDay()]} ${date.getDate()}`;
  },
  formatMonth: (date: Date) => {
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
  formatYear: (date: Date) => {
    return `${date.getFullYear() + 543}`;
  },
  formatWeek: (date: Date) => {
    const week = Math.ceil(date.getDate() / 7);
    return `สัปดาห์ ${week}`;
  },
  formatHour: (date: Date) => {
    return `${date.getHours()}:00 น.`;
  },
};

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  const [useThaiFormat, setUseThaiFormat] = React.useState(false);
  const [showTodayColor, setShowTodayColor] = React.useState(true);
  const [showTodayHeader, setShowTodayHeader] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setUseThaiFormat(!useThaiFormat)}>
          {useThaiFormat
            ? "Switch to English Format"
            : "Switch to Thai Format (ภาษาไทย)"}
        </button>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            checked={showTodayColor}
            onChange={e => setShowTodayColor(e.target.checked)}
          />
          Show Today Column Highlight
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            checked={showTodayHeader}
            onChange={e => setShowTodayHeader(e.target.checked)}
          />
          Highlight Today in Header
        </label>
      </div>
      <h3>Gantt With Unlimited Height {useThaiFormat && "(Thai Format)"}</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        headerHeight={78}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        dateFormatter={useThaiFormat ? thaiDateFormatter : undefined}
        showTodayColor={showTodayColor}
        todayHeaderColor={showTodayHeader ? "#ffeb3b" : undefined}
      />
      <h3>Gantt With Limited Height {useThaiFormat && "(Thai Format)"}</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
        dateFormatter={useThaiFormat ? thaiDateFormatter : undefined}
        showTodayColor={showTodayColor}
        todayHeaderColor={showTodayHeader ? "#ffeb3b" : undefined}
      />
    </div>
  );
};

export default App;
