import "../assets/styles/weekly-plan-card.css";
import "../assets/styles/priority-section.css";
import "../assets/styles/task-section.css";
import { getModeContent } from "../constants/modeContent";


function TodayView({ todayData, onTogglePriority, onToggleTask, onDeleteTask }) {
  if (!todayData) {
    return <p className="today-empty-state">Loading today view...</p>;
  }

  const activePriorities = todayData.priorities.filter((p) => !p.isCompleted);
  const incompleteTasks = todayData.tasks.filter((t) => !t.isCompleted);

  const hasNoContent =
    activePriorities.length === 0 &&
    incompleteTasks.length === 0;
 const modeContent = getModeContent(todayData.mode);
   const todayString = new Date().toISOString().split("T")[0];

  return (
    <div className="weekly-plan-card">


      <h2 className="weekly-plan-card__title">Today</h2>
            <p className="weekly-plan-card__meta">
        <strong>This week:</strong> {todayData.title}
      </p>
            <p className="weekly-plan-card__prompt">{modeContent.todayPrompt}</p>

           <p className="weekly-plan-card__eyebrow">{modeContent.todayEyebrow}</p>

          <div className="weekly-plan-card__meta weekly-plan-card__meta--last">
        <strong>Today’s grounding note:</strong> {todayData.weeklyFocusNote}
      </div>

           {hasNoContent && (
        <div className="today-empty-state">
          <h3>You’re clear for today</h3>
          <p>
            No active priorities or tasks.
            <br />
            Use this space to rest, reflect, or move one meaningful thing forward.
          </p>
        </div>
      )}

      {activePriorities.length > 0 && (
        <section className="priority-section">
                   <h3 className="priority-section__title">What matters most today</h3>

          {activePriorities.map((priority) => (
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

      {incompleteTasks.length > 0 && (
        <section className="task-section">
          <div className="task-section__list">
                       <h3 className="task-section__title">Next actions</h3>

            {incompleteTasks.map((task) => (
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
                    <div
                      className={
                        task.dueDate === todayString
                          ? "task-section__meta task-section__meta--due-today"
                          : "task-section__meta"
                      }
                    >
                      {task.dueDate === todayString
                        ? `Due today: ${task.dueDate}`
                        : `Due: ${task.dueDate}`}
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