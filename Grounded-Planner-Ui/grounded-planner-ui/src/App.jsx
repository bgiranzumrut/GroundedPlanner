import { useEffect, useState } from "react";
import WeeklyPlanCard from "./components/WeeklyPlanCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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


  useEffect(() => {
  const fetchData = async () => {
    try {
      const weeklyPlansResponse = await fetch(`${API_BASE_URL}/api/WeeklyPlans`);

      if (!weeklyPlansResponse.ok) {
        throw new Error("Failed to fetch weekly plans.");
      }

      const weeklyPlansData = await weeklyPlansResponse.json();
      setWeeklyPlans(weeklyPlansData);

      if (weeklyPlansData && weeklyPlansData.length > 0) {
        const latestPlan = weeklyPlansData[0];

        const prioritiesResponse = await fetch(
          `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities`
        );

        if (!prioritiesResponse.ok) {
          throw new Error("Failed to fetch priorities.");
        }

        const prioritiesData = await prioritiesResponse.json();
        setPriorities(prioritiesData);

        const tasksResponse = await fetch(
          `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/tasks`
        );

        if (!tasksResponse.ok) {
          throw new Error("Failed to fetch tasks.");
        }

        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
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
    const response = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPriorityTitle,
          sortOrder: priorities.length + 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create priority.");
    }

    setNewPriorityTitle("");

    const prioritiesResponse = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities`
    );

    const updatedPriorities = await prioritiesResponse.json();
    setPriorities(updatedPriorities);
  } catch (err) {
    console.error("Create priority error:", err);
    setError(err.message);
  }
};

const handleTogglePriority = async (priorityId) => {
  if (!latestPlan) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities/${priorityId}/complete`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update priority.");
    }

    // re-fetch priorities
    const prioritiesResponse = await fetch(`${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities`
    );

    const updatedPriorities = await prioritiesResponse.json();
    setPriorities(updatedPriorities);

  } catch (err) {
    console.error(err);
  }
};

const handleDeletePriority = async (priorityId) => {
  if (!latestPlan) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities/${priorityId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete priority.");
    }

    const prioritiesResponse = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/priorities`
    );

    const updatedPriorities = await prioritiesResponse.json();
    setPriorities(updatedPriorities);

  } catch (err) {
    console.error(err);
  }
};
const handleAddTask = async () => {
  if (!latestPlan || !newTaskTitle.trim()) return;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDescription,
          category: newTaskCategory,
          dueDate: newTaskDueDate || null,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task.");
    }

    // reset inputs
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskCategory("");
    setNewTaskDueDate("");

    // re-fetch tasks
    const tasksResponse = await fetch(
      `${API_BASE_URL}/api/weeklyplans/${latestPlan.id}/tasks`
    );

    const updatedTasks = await tasksResponse.json();
    setTasks(updatedTasks);

  } catch (err) {
    console.error(err);
  }
};
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f5f2",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#2f2a26",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Grounded Planner
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "40px",
            color: "#6b625b",
          }}
        >
          A calm space for your week and next steps.
        </p>

        {loading && (
          <p style={{ textAlign: "center" }}>Loading your weekly plan...</p>
        )}

        {error && (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        )}

        {!loading && !error && !latestPlan && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <h2>No weekly plan yet</h2>
            <p>Create your first weekly plan to get started.</p>
          </div>
        )}

        {!loading && !error && latestPlan && (
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
/>
        )}
      </div>
    </div>
  );
}

export default App;