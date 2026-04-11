import "../assets/styles/weekly-plan-card.css";
import "../assets/styles/priority-section.css";
import "../assets/styles/task-section.css";

function TodayView({ todayData, onTogglePriority, onToggleTask, onDeleteTask }) {
  if (!todayData) return null;

  const hasNoContent =
    todayData.priorities.length === 0 &&
    todayData.tasks.length === 0;

  return (
    <div className="weekly-plan-card">
      <p className="weekly-plan-card__eyebrow">Today View</p>

      <h2 className="weekly-plan-card__title">{todayData.title}</h2>

      <div className="weekly-plan-card__meta">
        <strong>Mode:</strong> {todayData.mode}
      </div>

      <div className="weekly-plan-card__meta weekly-plan-card__meta--last">
        <strong>Focus Note:</strong> {todayData.weeklyFocusNote}
      </div>

      {hasNoContent && (
        <div className="today-empty-state">
          <h3>You’re clear for today</h3>
          <p>No active priorities or tasks. Take a breath or plan something meaningful.</p>
        </div>
      )}

      {todayData.priorities.length > 0 && (
        <section className="priority-section">
          <h3 className="priority-section__title">Active Priorities</h3>

          {todayData.priorities.map((priority) => (
            <div key={priority.id} className="priority-section__item">
              <input
                type="checkbox"
                checked={priority.isCompleted}
                onChange={() => onTogglePriority(priority.id)}
              />

              <span className="priority-section__text">
                {priority.title}
              </span>
            </div>
          ))}
        </section>
      )}

      {todayData.tasks.length > 0 && (
        <section className="task-section">
          <div className="task-section__list">
            <h3 className="task-section__title">Incomplete Tasks</h3>

            {todayData.tasks.map((task) => (
              <div key={task.id} className="task-section__item">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => onToggleTask(task)}
                  className="task-section__checkbox"
                />

                <div className="task-section__content">
                  <div className="task-section__task-title">{task.title}</div>

                  {task.description && (
                    <div className="task-section__description">
                      {task.description}
                    </div>
                  )}

                  {task.category && (
                    <div className="task-section__meta">
                      Category: {task.category}
                    </div>
                  )}

                  {task.dueDate && (
                    <div className="task-section__meta">
                      Due: {task.dueDate}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="task-section__delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default TodayView;