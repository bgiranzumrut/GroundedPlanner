function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function FocusSessionPanel({
  taskId,
  activeFocusTaskId,
  timeRemaining,
  isTimerRunning,
  sessionCompleted,
  isBreakMode,
  onStart,
  onToggle,
  onContinue,
  onBreak,
  onEnd
}) {
  const isActive = taskId === activeFocusTaskId;

  if (!isActive) {
    return (
      <div className="focus-panel">
        <button onClick={() => onStart(taskId)}>
          Start Focus
        </button>
      </div>
    );
  }

  return (
    <div className="focus-panel">
         {!sessionCompleted ? (
        <div>
          <p>⏱ {formatTime(timeRemaining)}</p>

          <button onClick={onToggle}>
            {isTimerRunning ? "Pause" : "Resume"}
          </button>

          <button onClick={onEnd}>
            End Session
          </button>
        </div>
      ) : (
        <div>
          <p>
            {isBreakMode ? "Break complete" : "Session complete"}
          </p>

          {!isBreakMode && (
            <button onClick={onContinue}>
              Start Another Session
            </button>
          )}

          {!isBreakMode && (
            <button onClick={onBreak}>
              Take 5 min Break
            </button>
          )}

          <button onClick={onEnd}>
            End for Now
          </button>
        </div>
      )}
    </div>
  );
}

export default FocusSessionPanel;