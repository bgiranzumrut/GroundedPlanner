import { useEffect, useState } from "react";
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
  };
}