using System.Security.Cryptography.X509Certificates;

namespace GroundedPlanner.API.DTOs
{
    public class TodayViewDto
    {
        public int WeeklyPlanId { get; set; }
        public string Mode { get; set; }
        public string Title { get; set; }
        public string WeeklyFocusNote { get; set; } 

        public List<TodayPriorityDto> PriorityDtos { get; set; } = new();

        public List<TodayTaskItemDto> Tasks { get; set; } = new();
        public List<TodayPriorityDto> Priorities { get; internal set; }
    }

    public class TodayPriorityDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int SortOrder { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class TodayTaskItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}
