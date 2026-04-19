using System.Text.Json.Serialization;
namespace GroundedPlanner.API.Models

{
    public class FocusSession
    {
        public int Id { get; set; }

        public int TaskItemId { get; set; }
        public TaskItem TaskItem { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public int DurationMinutes { get; set; }

        public bool IsCompleted { get; set; }
    }
}