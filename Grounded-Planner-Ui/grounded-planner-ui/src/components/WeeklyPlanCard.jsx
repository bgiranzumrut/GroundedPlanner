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
}) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#8a7f76",
          marginBottom: "10px",
        }}
      >
        Current Weekly Plan
      </p>

      <h2
        style={{
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        {plan.title}
      </h2>

      <div style={{ marginBottom: "14px" }}>
        <strong>Mode:</strong> {plan.mode}
      </div>

      <div style={{ marginBottom: "14px" }}>
        <strong>Week Start:</strong>{" "}
        {new Date(plan.weekStartDate).toLocaleDateString()}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Focus Note:</strong> {plan.weeklyFocusNote}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "10px" }}>Priorities</h3>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            value={newPriorityTitle}
            onChange={(e) => setNewPriorityTitle(e.target.value)}
            placeholder="Add a priority"
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
          <button
            onClick={onAddPriority}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2f2a26",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {priorities.length === 0 && (
          <p style={{ color: "#777" }}>No priorities yet</p>
        )}

   {priorities.map((priority) => (
  <div
    key={priority.id}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 0",
      borderBottom: "1px solid #eee",
    }}
  >
    <input
      type="checkbox"
      checked={priority.isCompleted}
      onChange={() => onTogglePriority(priority.id)}
    />

   <span
  style={{
    flex: 1,
    textDecoration: priority.isCompleted ? "line-through" : "none",
    color: priority.isCompleted ? "#999" : "#000",
  }}
>
  {priority.title}
</span>

<button
  onClick={() => onDeletePriority(priority.id)}
  style={{
    background: "transparent",
    border: "none",
    color: "#b00020",
    cursor: "pointer",
    fontSize: "14px",
  }}
>
  Delete
</button>
  </div>
))}
      </div>
<div style={{ marginBottom: "20px", marginTop: "10px" }}>
  <input
    type="text"
    placeholder="Task title"
    value={newTaskTitle}
    onChange={(e) => setNewTaskTitle(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "8px",
    }}
  />

  <input
    type="text"
    placeholder="Description"
    value={newTaskDescription}
    onChange={(e) => setNewTaskDescription(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "8px",
    }}
  />

  <input
    type="text"
    placeholder="Category"
    value={newTaskCategory}
    onChange={(e) => setNewTaskCategory(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "8px",
    }}
  />

  <input
    type="date"
    value={newTaskDueDate}
    onChange={(e) => setNewTaskDueDate(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "10px",
    }}
  />

  <button
    onClick={onAddTask}
    style={{
      padding: "10px 16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2f2a26",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    Add Task
  </button>
</div>

      <div style={{ marginTop: "35px" }}>
  <h3 style={{ marginBottom: "10px" }}>Tasks</h3>

  {tasks?.length === 0 && (
    <p style={{ color: "#777" }}>No tasks yet</p>
  )}

{tasks.map((task) => (
  <div
    key={task.id}
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      padding: "10px 0",
      borderBottom: "1px solid #eee",
    }}
  >
    <input
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => onToggleTask(task)}
      style={{ marginTop: "4px" }}
    />

    <div style={{ flex: 1 }}>
      <div
        style={{
          fontWeight: "500",
          textDecoration: task.isCompleted ? "line-through" : "none",
          color: task.isCompleted ? "#999" : "#000",
        }}
      >
        {task.title}
      </div>

      {task.description && (
        <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
          {task.description}
        </div>
      )}

      {task.category && (
        <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
          Category: {task.category}
        </div>
      )}

      {task.dueDate && (
        <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
          Due: {task.dueDate}
        </div>
      )}
    </div>

    <button
      onClick={() => onDeleteTask(task.id)}
      style={{
        background: "transparent",
        border: "none",
        color: "#b00020",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Delete
    </button>
  </div>
))}
</div>
    </div>
  );
}

export default WeeklyPlanCard;