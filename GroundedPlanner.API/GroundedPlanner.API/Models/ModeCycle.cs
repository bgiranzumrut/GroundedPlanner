namespace GroundedPlanner.API.Models
{
    public class ModeCycle
    {
        public int Id { get; set; }

        public string Mode { get; set; } // Spring, Summer, etc.

        public DateTime StartedAt { get; set; }

        public DateTime? TargetEndDate { get; set; }

        public DateTime? EndedAt { get; set; }

        public string? Intention { get; set; }

        public bool IsActive { get; set; } = true;
    }
}