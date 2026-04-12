import { useState } from "react";
import WeeklyPlanCard from "./components/WeeklyPlanCard";
import TodayView from "./components/TodayView";
import { useWeeklyPlan } from "./hooks/useWeeklyPlan";
import "./assets/styles/App.css";

function App() {
  const [activeView, setActiveView] = useState("weekly");

  const {
    priorities,
    tasks,
    todayView,
    latestPlan,
    loading,
    error,
    newPriorityTitle,
    setNewPriorityTitle,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskCategory,
    setNewTaskCategory,
    newTaskDueDate,
    setNewTaskDueDate,
    handleAddPriority,
    handleTogglePriority,
    handleDeletePriority,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
  } = useWeeklyPlan();

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