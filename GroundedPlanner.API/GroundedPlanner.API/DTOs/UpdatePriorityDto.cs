namespace GroundedPlanner.API.DTOs
{
    public class UpdatePriorityDto
    {
        public string Title { get; set; }
        public int SortOrder { get; set; }
        public bool IsCompleted { get; set; }
    }
}
