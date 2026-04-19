function ModeSetup({
  newMode,
  setNewMode,
  newModeIntention,
  setNewModeIntention,
  onCreateMode,
}) {
  return (
    <div className="empty-state">
      <h2>Choose your current season</h2>
      <p>
        A season gives emotional direction. You can change it later if your
        reflection shows a shift is needed.
      </p>

      <div className="mode-setup__form">
        <label className="mode-setup__label">Current Mode</label>
        <select
          value={newMode}
          onChange={(e) => setNewMode(e.target.value)}
          className="mode-setup__input"
        >
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>

        <label className="mode-setup__label">Season Intention (optional)</label>
        <textarea
          value={newModeIntention}
          onChange={(e) => setNewModeIntention(e.target.value)}
          className="mode-setup__textarea"
          rows="4"
          placeholder="What is this season about for you?"
        />

        <button onClick={onCreateMode} className="mode-setup__button">
          Start This Season
        </button>
      </div>
    </div>
  );
}

export default ModeSetup;