namespace GroundedPlanner.API.DTOs
{
    public class CreateWeeklyPlanDto
    {
       
        public string Title { get; set; }
        public DateTime WeekStartDate { get; set; }
        public string WeeklyFocusNote { get; set; }
    }
}