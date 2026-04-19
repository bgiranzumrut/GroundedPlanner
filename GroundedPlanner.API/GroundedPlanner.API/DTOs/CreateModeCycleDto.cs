namespace GroundedPlanner.API.DTOs
{
    public class CreateModeCycleDto
    {
        public string Mode { get; set; } = string.Empty;
        public DateTime StartedAt { get; set; }
        public DateTime? TargetEndDate { get; set; }
        public string? Intention { get; set; }
    }
}