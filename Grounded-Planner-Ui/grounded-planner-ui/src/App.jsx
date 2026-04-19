import { useState } from "react";
import WeeklyPlanCard from "./components/WeeklyPlanCard";
import TodayView from "./components/TodayView";
import { useWeeklyPlan } from "./hooks/useWeeklyPlan";
import "./assets/styles/App.css";
import { getModeContent } from "./constants/modeContent";
import ModeSetup from "./components/ModeSetup";
import WeeklyPlanSetup from "./components/WeeklyPlanSetup";
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
    currentMode,
    newMode,
    setNewMode,
    newModeIntention,
    setNewModeIntention,
    handleCreateMode,
    newWeeklyPlanTitle,
    setNewWeeklyPlanTitle,
    newWeekStartDate,
    setNewWeekStartDate,
    newWeeklyFocusNote,
    setNewWeeklyFocusNote,
    handleCreateWeeklyPlan,
    activeFocusTaskId,
    activeSession,
    timeRemaining,
    isTimerRunning,
    handleStartFocus,
    handleCompleteFocus,
    toggleTimer,
    sessionCompleted,
    isBreakMode,
    handleContinueFocus,
    handleStartBreak,
    handleEndFocus,
  } = useWeeklyPlan();

  const activeMode = latestPlan?.mode;
  const modeContent = getModeContent(activeMode);

  return (
    <div className="app-shell">
      <div className="app-container">
        <h1 className="app-title">Grounded Planner</h1>

               <p className="app-subtitle">{modeContent.appSubtitle}</p>

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

                {!loading && !error && !currentMode && (
          <ModeSetup
            newMode={newMode}
            setNewMode={setNewMode}
            newModeIntention={newModeIntention}
            setNewModeIntention={setNewModeIntention}
            onCreateMode={handleCreateMode}
          />
        )}

                   {!loading && !error && currentMode && !latestPlan && (
          <WeeklyPlanSetup
            currentMode={currentMode}
            newWeeklyPlanTitle={newWeeklyPlanTitle}
            setNewWeeklyPlanTitle={setNewWeeklyPlanTitle}
            newWeekStartDate={newWeekStartDate}
            setNewWeekStartDate={setNewWeekStartDate}
            newWeeklyFocusNote={newWeeklyFocusNote}
            setNewWeeklyFocusNote={setNewWeeklyFocusNote}
            onCreateWeeklyPlan={handleCreateWeeklyPlan}
            activeFocusTaskId={activeFocusTaskId}
            activeSession={activeSession}
            timeRemaining={timeRemaining}
            isTimerRunning={isTimerRunning}
            onStartFocus={handleStartFocus}
            onCompleteFocus={handleCompleteFocus}
            onToggleTimer={toggleTimer}

          />
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
            activeFocusTaskId={activeFocusTaskId}
            activeSession={activeSession}
            timeRemaining={timeRemaining}
            isTimerRunning={isTimerRunning}
            onStartFocus={handleStartFocus}
            onCompleteFocus={handleCompleteFocus}
            onToggleTimer={toggleTimer}
            sessionCompleted={sessionCompleted}
            isBreakMode={isBreakMode}
            onContinueFocus={handleContinueFocus}
            onStartBreak={handleStartBreak}
            onEndFocus={handleEndFocus}
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