namespace GroundedPlanner.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public int WeeklyPlanId { get; set; }
        public WeeklyPlan WeeklyPlan { get; set; }

        public string Title { get; set; }
        public string? Description { get; set;}
        public string? Category { get; set; }
        public DateOnly? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; internal set; }

        public List<FocusSession> FocusSessions { get; set; } = new();
    }
}
