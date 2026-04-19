function WeeklyPlanSetup({
  currentMode,
  newWeeklyPlanTitle,
  setNewWeeklyPlanTitle,
  newWeekStartDate,
  setNewWeekStartDate,
  newWeeklyFocusNote,
  setNewWeeklyFocusNote,
  onCreateWeeklyPlan,
}) {
  return (
    <div className="empty-state">
      <h2>Create your weekly plan</h2>
      <p>
        Your current season is <strong>{currentMode?.mode}</strong>. Now give
        this week a practical direction.
      </p>

      <div className="mode-setup__form">
        <label className="mode-setup__label">Weekly Title</label>
        <input
          type="text"
          value={newWeeklyPlanTitle}
          onChange={(e) => setNewWeeklyPlanTitle(e.target.value)}
          className="mode-setup__input"
          placeholder="What is this week about?"
        />

        <label className="mode-setup__label">Week Start Date</label>
        <input
          type="date"
          value={newWeekStartDate}
          onChange={(e) => setNewWeekStartDate(e.target.value)}
          className="mode-setup__input"
        />

        <label className="mode-setup__label">Focus Note</label>
        <textarea
          value={newWeeklyFocusNote}
          onChange={(e) => setNewWeeklyFocusNote(e.target.value)}
          className="mode-setup__textarea"
          rows="4"
          placeholder="What do you want to stay connected to this week?"
        />

        <button onClick={onCreateWeeklyPlan} className="mode-setup__button">
          Create Weekly Plan
        </button>
      </div>
    </div>
  );
}

export default WeeklyPlanSetup;