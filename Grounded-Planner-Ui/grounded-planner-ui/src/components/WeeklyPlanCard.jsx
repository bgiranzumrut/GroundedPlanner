import "../assets/styles/weekly-plan-card.css";
import PrioritySection from "./PrioritySection";
import TaskSection from "./TaskSection";
import { getModeContent } from "../constants/modeContent";

function WeeklyPlanCard({
  plan,
  priorities,
  tasks,
  newPriorityTitle,
  setNewPriorityTitle,
  onAddPriority,
  onTogglePriority,
  onDeletePriority,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
  newTaskCategory,
  setNewTaskCategory,
  newTaskDueDate,
  setNewTaskDueDate,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  activeFocusTaskId,
  activeSession,
  timeRemaining,
  isTimerRunning,
  onStartFocus,
  onCompleteFocus,
  onToggleTimer,
    sessionCompleted,
  isBreakMode,
  onContinueFocus,
  onStartBreak,
  onEndFocus,
}) {

  const modeContent = getModeContent(plan.mode);
  return (
    <div className="weekly-plan-card">
            <p className="weekly-plan-card__eyebrow">{modeContent.weeklyEyebrow}</p>

      <h2 className="weekly-plan-card__title">{plan.title}</h2>
            <p className="weekly-plan-card__prompt">{modeContent.weeklyPrompt}</p>

      <div className="weekly-plan-card__meta">
        <strong>Mode:</strong> {plan.mode}
      </div>

      <div className="weekly-plan-card__meta">
        <strong>Week Start:</strong>{" "}
        {new Date(plan.weekStartDate).toLocaleDateString()}
      </div>

      <div className="weekly-plan-card__meta weekly-plan-card__meta--last">
        <strong>Focus Note:</strong> {plan.weeklyFocusNote}
      </div>

      <PrioritySection
        priorities={priorities}
        newPriorityTitle={newPriorityTitle}
        setNewPriorityTitle={setNewPriorityTitle}
        onAddPriority={onAddPriority}
        onTogglePriority={onTogglePriority}
        onDeletePriority={onDeletePriority}
      />

         <TaskSection
        tasks={tasks}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        newTaskCategory={newTaskCategory}
        setNewTaskCategory={setNewTaskCategory}
        newTaskDueDate={newTaskDueDate}
        setNewTaskDueDate={setNewTaskDueDate}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        activeFocusTaskId={activeFocusTaskId}
        activeSession={activeSession}
        timeRemaining={timeRemaining}
        isTimerRunning={isTimerRunning}
        onStartFocus={onStartFocus}
        onCompleteFocus={onCompleteFocus}
        onToggleTimer={onToggleTimer}
        sessionCompleted={sessionCompleted}
        isBreakMode={isBreakMode}
        onContinueFocus={onContinueFocus}
        onStartBreak={onStartBreak}
        onEndFocus={onEndFocus}

      />
    </div>
  );
}

export default WeeklyPlanCard;