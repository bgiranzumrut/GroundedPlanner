namespace GroundedPlanner.API.DTOs
{
    public class CreateTaskItemDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public DateOnly? DueDate { get; set; }
    }
}
