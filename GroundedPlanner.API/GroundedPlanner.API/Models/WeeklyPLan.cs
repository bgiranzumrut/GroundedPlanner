namespace GroundedPlanner.API.Models
{
    public class WeeklyPlan
    {
        public int Id { get; set; }
        public string Mode { get; set; }
        public string Title { get; set; }
        public DateTime WeekStartDate { get; set; }
        public string WeeklyFocusNote { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<Priority> Priorities { get; set; } = new();

        public List<TaskItem> Tasks { get; set; } = new();

    }
}
