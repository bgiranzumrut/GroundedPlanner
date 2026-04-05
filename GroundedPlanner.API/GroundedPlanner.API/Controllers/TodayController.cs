using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/weeklyplans/{weeklyPlanId}/today")]
    public class TodayController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodayController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodayView([FromRoute] int weeklyPlanId)
        {
            var weeklyPlan = await _context.WeeklyPlans
                .FirstOrDefaultAsync(wp => wp.Id == weeklyPlanId);

            if (weeklyPlan == null)
            {
                return NotFound($"Weekly plan with ID {weeklyPlanId} not found.");
            }

            // Update query to include only incompleted priorities
            var priorities = await _context.Priorities
                .Where(p => p.WeeklyPlanId == weeklyPlanId && !p.IsCompleted)
                .OrderBy(p => p.SortOrder)
                .Select(p => new TodayPriorityDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    SortOrder = p.SortOrder,
                    IsCompleted = p.IsCompleted
                })
                .ToListAsync();

            var tasks = await _context.TaskItems
                .Where(t => t.WeeklyPlanId == weeklyPlanId && !t.IsCompleted)
                .OrderBy(t => t.DueDate ?? DateOnly.MaxValue)
                .ThenBy(t => t.CreatedAt)
                .Select(t => new TodayTaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Category = t.Category,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted
                })
                .ToListAsync();

            var result = new TodayViewDto
            {
                WeeklyPlanId = weeklyPlan.Id,
                Mode = weeklyPlan.Mode,
                Title = weeklyPlan.Title,
                WeeklyFocusNote = weeklyPlan.WeeklyFocusNote,
                Priorities = priorities,
                Tasks = tasks
            };

            return Ok(result);
        }
    }
}
