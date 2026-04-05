import "../assets/styles/task-section.css";

function TaskSection({
  tasks,
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
    <section className="task-section">
      <div className="task-section__form">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="task-section__input"
        />

        <input
          type="text"
          placeholder="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="task-section__input"
        />

        <input
          type="text"
          placeholder="Category"
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          className="task-section__input"
        />

        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="task-section__input"
        />

        <button onClick={onAddTask} className="task-section__button">
          Add Task
        </button>
      </div>

      <div className="task-section__list">
        <h3 className="task-section__title">Tasks</h3>

        {tasks?.length === 0 && (
          <p className="task-section__empty">No tasks yet</p>
        )}

        {tasks.map((task) => (
          <div key={task.id} className="task-section__item">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => onToggleTask(task)}
              className="task-section__checkbox"
            />

            <div className="task-section__content">
              <div
                className={
                  task.isCompleted
                    ? "task-section__task-title task-section__task-title--completed"
                    : "task-section__task-title"
                }
              >
                {task.title}
              </div>

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
  );
}

export default TaskSection;