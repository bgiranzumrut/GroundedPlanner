function WeeklyPlanCard({
  plan,
  priorities,
  newPriorityTitle,
  setNewPriorityTitle,
  onAddPriority,
  onTogglePriority,
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
        textDecoration: priority.isCompleted ? "line-through" : "none",
        color: priority.isCompleted ? "#999" : "#000",
      }}
    >
      {priority.title}
    </span>
  </div>
))}
      </div>
    </div>
  );
}

export default WeeklyPlanCard;