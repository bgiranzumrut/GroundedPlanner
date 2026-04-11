import {
  getWeeklyPlans,
  getPriorities,
  createPriority,
  togglePriority,
  deletePriority,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTodayView,
} from "./services/api";
import { useEffect, useState } from "react";
import WeeklyPlanCard from "./components/WeeklyPlanCard";
import TodayView from "./components/TodayView";
import "./assets/styles/App.css";

function App() {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPriorityTitle, setNewPriorityTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [activeView, setActiveView] = useState("weekly");
  const [todayView, setTodayView] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      const weeklyPlansData = await getWeeklyPlans();
      setWeeklyPlans(weeklyPlansData);

      if (weeklyPlansData && weeklyPlansData.length > 0) {
        const latestPlan = weeklyPlansData[0];

        const prioritiesData = await getPriorities(latestPlan.id);
        setPriorities(prioritiesData);

        const tasksData = await getTasks(latestPlan.id);
        setTasks(tasksData);

        const todayViewData = await getTodayView(latestPlan.id  );
        setTodayView(todayViewData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

const latestPlan = weeklyPlans?.[0] ?? null;

const handleAddPriority = async () => {
  if (!latestPlan || !newPriorityTitle.trim()) return;

  try {
    await createPriority(latestPlan.id, {
      title: newPriorityTitle,
      sortOrder: priorities.length + 1,
    });

    setNewPriorityTitle("");

    const updatedPriorities = await getPriorities(latestPlan.id);
    setPriorities(updatedPriorities);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);

  } catch (err) {
    console.error("Create priority error:", err);
    setError(err.message);
  }
};

const handleTogglePriority = async (priorityId) => {
  if (!latestPlan) return;

  try {
    await togglePriority(latestPlan.id, priorityId);

    const updatedPriorities = await getPriorities(latestPlan.id);
    setPriorities(updatedPriorities);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);

  } catch (err) {
    console.error("Toggle priority error:", err);
    setError(err.message);
  }
};

const handleDeletePriority = async (priorityId) => {
  if (!latestPlan) return;

  try {
    await deletePriority(latestPlan.id, priorityId);

    const updatedPriorities = await getPriorities(latestPlan.id);
    setPriorities(updatedPriorities);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);
  } catch (err) {
    console.error("Delete priority error:", err);
    setError(err.message);
  }
};

const handleAddTask = async () => {
  if (!latestPlan || !newTaskTitle.trim()) return;

  try {
    await createTask(latestPlan.id, {
      title: newTaskTitle,
      description: newTaskDescription || null,
      category: newTaskCategory || null,
      dueDate: newTaskDueDate || null,
    });

    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskCategory("");
    setNewTaskDueDate("");

    const updatedTasks = await getTasks(latestPlan.id);
    setTasks(updatedTasks);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);
  } catch (err) {
    console.error("Create task error:", err);
    setError(err.message);
  }
};

const handleToggleTask = async (task) => {
  if (!latestPlan) return;

  try {
    await updateTask(latestPlan.id, task.id, {
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
      isCompleted: !task.isCompleted,
    });

    const updatedTasks = await getTasks(latestPlan.id);
    setTasks(updatedTasks);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);
  } catch (err) {
    console.error("Toggle task error:", err);
    setError(err.message);
  }
};
const handleDeleteTask = async (taskId) => {
  if (!latestPlan) return;

  try {
    await deleteTask(latestPlan.id, taskId);

    const updatedTasks = await getTasks(latestPlan.id);
    setTasks(updatedTasks);

    const updatedTodayView = await getTodayView(latestPlan.id);
    setTodayView(updatedTodayView);
  } catch (err) {
    console.error("Delete task error:", err);
    setError(err.message);
  }
};
  return (
  <div className="app-shell">
    <div className="app-container">
      <h1 className="app-title">Grounded Planner</h1>

      <p className="app-subtitle">
        A calm space for your week and next steps.
      </p>

<div className="app-view-toggle">
  <button
    className={
      activeView === "weekly"
        ? "app-view-toggle__button app-view-toggle__button--active"
        : "app-view-toggle__button"
    }
    onClick={() => setActiveView("weekly")}
  >
    Weekly View
  </button>

  <button
    className={
      activeView === "today"
        ? "app-view-toggle__button app-view-toggle__button--active"
        : "app-view-toggle__button"
    }
    onClick={() => setActiveView("today")}
  >
    Today View
  </button>
</div>

      {loading && (
        <p className="app-message">Loading your weekly plan...</p>
      )}

      {error && (
        <p className="app-message app-message--error">{error}</p>
      )}

      {!loading && !error && !latestPlan && (
        <div className="empty-state">
          <h2>No weekly plan yet</h2>
          <p>Create your first weekly plan to get started.</p>
        </div>
      )}

 {!loading && !error && latestPlan && activeView === "weekly" && (
  <WeeklyPlanCard
    plan={latestPlan}
    priorities={priorities}
    tasks={tasks}
    newPriorityTitle={newPriorityTitle}
    setNewPriorityTitle={setNewPriorityTitle}
    onAddPriority={handleAddPriority}
    onTogglePriority={handleTogglePriority}
    onDeletePriority={handleDeletePriority}
    newTaskTitle={newTaskTitle}
    setNewTaskTitle={setNewTaskTitle}
    newTaskDescription={newTaskDescription}
    setNewTaskDescription={setNewTaskDescription}
    newTaskCategory={newTaskCategory}
    setNewTaskCategory={setNewTaskCategory}
    newTaskDueDate={newTaskDueDate}
    setNewTaskDueDate={setNewTaskDueDate}
    onAddTask={handleAddTask}
    onToggleTask={handleToggleTask}
    onDeleteTask={handleDeleteTask}
  />
)}

{!loading && !error && latestPlan && activeView === "today" && (
  <TodayView
    todayData={todayView}
    onTogglePriority={handleTogglePriority}
    onToggleTask={handleToggleTask}
    onDeleteTask={handleDeleteTask}
  />
)}
    </div>
  </div>
);
}

export default App;