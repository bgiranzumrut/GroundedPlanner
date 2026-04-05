import "../assets/styles/priority-section.css";

function PrioritySection({
  priorities,
  newPriorityTitle,
  setNewPriorityTitle,
  onAddPriority,
  onTogglePriority,
  onDeletePriority,
}) {
  return (
    <section className="priority-section">
      <h3 className="priority-section__title">Priorities</h3>

      <div className="priority-section__form">
        <input
          type="text"
          value={newPriorityTitle}
          onChange={(e) => setNewPriorityTitle(e.target.value)}
          placeholder="Add a priority"
          className="priority-section__input"
        />
        <button onClick={onAddPriority} className="priority-section__button">
          Add
        </button>
      </div>

      {priorities.length === 0 && (
        <p className="priority-section__empty">No priorities yet</p>
      )}

      {priorities.map((priority) => (
        <div key={priority.id} className="priority-section__item">
          <input
            type="checkbox"
            checked={priority.isCompleted}
            onChange={() => onTogglePriority(priority.id)}
          />

          <span
            className={
              priority.isCompleted
                ? "priority-section__text priority-section__text--completed"
                : "priority-section__text"
            }
          >
            {priority.title}
          </span>

          <button
            onClick={() => onDeletePriority(priority.id)}
            className="priority-section__delete"
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

export default PrioritySection;