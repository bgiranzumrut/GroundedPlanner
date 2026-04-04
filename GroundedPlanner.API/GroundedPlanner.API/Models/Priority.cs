namespace GroundedPlanner.API.Models
{
    public class Priority
    {
        public int Id { get; set; }

        public int WeeklyPlanId { get; set; }
        public WeeklyPlan WeeklyPlan { get; set; }

        public string Title { get; set; }
        public int SortOrder { get; set; }

        public bool IsCompleted { get; set; }   


    }
}
