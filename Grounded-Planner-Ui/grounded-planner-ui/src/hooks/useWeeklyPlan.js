import { useEffect, useState } from "react";
import {
  getWeeklyPlans,
  createWeeklyPlan,
  getPriorities,
  createPriority,
  togglePriority,
  deletePriority,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTodayView,
  getCurrentMode,
  createMode,
  startFocusSession,
  completeFocusSession
} from "../services/api";

export function useWeeklyPlan() {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [todayView, setTodayView] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newPriorityTitle, setNewPriorityTitle] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const [currentMode, setCurrentMode] = useState(null);
  const [newMode, setNewMode] = useState("Spring");
  const [newModeIntention, setNewModeIntention] = useState("");

  const [newWeeklyPlanTitle, setNewWeeklyPlanTitle] = useState("");
  const [newWeekStartDate, setNewWeekStartDate] = useState("");
  const [newWeeklyFocusNote, setNewWeeklyFocusNote] = useState("");

const [activeFocusTaskId, setActiveFocusTaskId] = useState(null);
const [activeSession, setActiveSession] = useState(null);
const [timeRemaining, setTimeRemaining] = useState(0);
const [isTimerRunning, setIsTimerRunning] = useState(false);
const [sessionCompleted, setSessionCompleted] = useState(false);
const [isBreakMode, setIsBreakMode] = useState(false);
  const latestPlan = weeklyPlans?.[0] ?? null;

  const refreshPlanData = async (weeklyPlanId) => {
    const prioritiesData = await getPriorities(weeklyPlanId);
    setPriorities(prioritiesData);

    const tasksData = await getTasks(weeklyPlanId);
    setTasks(tasksData);

    const todayViewData = await getTodayView(weeklyPlanId);
    setTodayView(todayViewData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const modeData = await getCurrentMode();
        setCurrentMode(modeData);
        const weeklyPlansData = await getWeeklyPlans();
        setWeeklyPlans(weeklyPlansData);

        if (weeklyPlansData && weeklyPlansData.length > 0) {
          const latest = weeklyPlansData[0];
          await refreshPlanData(latest.id);
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

    const handleCreateMode = async () => {
    try {
      const startedAt = new Date().toISOString();

      const targetEndDate = new Date();
      targetEndDate.setDate(targetEndDate.getDate() + 84);

      await createMode({
        mode: newMode,
        startedAt,
        targetEndDate: targetEndDate.toISOString(),
        intention: newModeIntention || null,
      });

      const modeData = await getCurrentMode();
      setCurrentMode(modeData);
      setNewMode("Spring");
      setNewModeIntention("");
    } catch (err) {
      console.error("Create mode error:", err);
      setError(err.message);
    }
  };

    const handleCreateWeeklyPlan = async () => {
    if (!newWeeklyPlanTitle.trim() || !newWeekStartDate) return;

    try {
      await createWeeklyPlan({
        title: newWeeklyPlanTitle,
        weekStartDate: newWeekStartDate,
        weeklyFocusNote: newWeeklyFocusNote || "",
      });

      const weeklyPlansData = await getWeeklyPlans();
      setWeeklyPlans(weeklyPlansData);

      if (weeklyPlansData && weeklyPlansData.length > 0) {
        const latest = weeklyPlansData[0];
        await refreshPlanData(latest.id);
      }

      setNewWeeklyPlanTitle("");
      setNewWeekStartDate("");
      setNewWeeklyFocusNote("");
    } catch (err) {
      console.error("Create weekly plan error:", err);
      setError(err.message);
    }
  };

  const handleAddPriority = async () => {
    if (!latestPlan || !newPriorityTitle.trim()) return;

    try {
      await createPriority(latestPlan.id, {
        title: newPriorityTitle,
        sortOrder: priorities.length + 1,
      });

      setNewPriorityTitle("");
      await refreshPlanData(latestPlan.id);
    } catch (err) {
      console.error("Create priority error:", err);
      setError(err.message);
    }
  };

  const handleTogglePriority = async (priorityId) => {
    if (!latestPlan) return;

    try {
      await togglePriority(latestPlan.id, priorityId);
      await refreshPlanData(latestPlan.id);
    } catch (err) {
      console.error("Toggle priority error:", err);
      setError(err.message);
    }
  };

  const handleDeletePriority = async (priorityId) => {
    if (!latestPlan) return;

    try {
      await deletePriority(latestPlan.id, priorityId);
      await refreshPlanData(latestPlan.id);
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

      await refreshPlanData(latestPlan.id);
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

      await refreshPlanData(latestPlan.id);
    } catch (err) {
      console.error("Toggle task error:", err);
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!latestPlan) return;

    try {
      await deleteTask(latestPlan.id, taskId);
      await refreshPlanData(latestPlan.id);
    } catch (err) {
      console.error("Delete task error:", err);
      setError(err.message);
    }
  };

  async function handleStartFocus(taskId) {
  const session = await startFocusSession(taskId, 1);

  setActiveFocusTaskId(taskId);
  setActiveSession(session);
  setTimeRemaining(session.durationMinutes * 60);
  setIsTimerRunning(true);
}

async function handleCompleteFocus() {
  if (!activeSession) return;

  await completeFocusSession(
    activeSession.taskItemId,
    activeSession.id
  );

  setActiveFocusTaskId(null);
  setActiveSession(null);
  setIsTimerRunning(false);
  setTimeRemaining(0);
}

async function handleContinueFocus() {
  if (!activeFocusTaskId) return;

  const session = await startFocusSession(activeFocusTaskId, 25);

  setActiveSession(session);
  setTimeRemaining(session.durationMinutes * 60);
  setIsTimerRunning(true);
  setSessionCompleted(false);
}

function handleStartBreak() {
  setIsBreakMode(true);
  setTimeRemaining(5 * 60);
  setIsTimerRunning(true);
  setSessionCompleted(false);
}

async function handleEndFocus() {
  if (activeSession) {
    await completeFocusSession(
      activeSession.taskItemId,
      activeSession.id
    );
  }

  setActiveFocusTaskId(null);
  setActiveSession(null);
  setIsTimerRunning(false);
  setTimeRemaining(0);
  setSessionCompleted(false);
  setIsBreakMode(false);
}

function toggleTimer() {
  setIsTimerRunning(prev => !prev);
}

useEffect(() => {
  if (!isTimerRunning) return;

  const interval = setInterval(() => {
    setTimeRemaining(prev => {
   if (prev <= 1) {
  setIsTimerRunning(false);
  setSessionCompleted(true);
  return 0;
}
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isTimerRunning]);

  return {
    weeklyPlans,
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
    sessionCompleted,
    isBreakMode,
    handleStartFocus,
    handleCompleteFocus,
    toggleTimer,
    handleContinueFocus,
    handleStartBreak,
    handleEndFocus,
  };
}