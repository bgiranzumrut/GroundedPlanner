namespace GroundedPlanner.API.DTOs
{
    public class CreateWeeklyPlanDto
    {
        public string Mode { get; set; }
        public string Title { get; set; }
        public DateTime WeekStartDate { get; set; }
        public string WeeklyFocusNote { get; set; }
    }
}