using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/weeklyplans/{weeklyPlanId}/tasks")]

    public class TaskItemsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TaskItemsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateTaskItem([FromRoute] int weeklyPlanId, [FromBody] CreateTaskItemDto dto)
        {
            var weeklyPlanExist = await _context.WeeklyPlans
                .AnyAsync(wp => wp.Id == weeklyPlanId);
            if (!weeklyPlanExist)
            {
                return NotFound($"Weekly plan with ID {weeklyPlanId} not found.");
            }
            var taskItem = new TaskItem
            {
                WeeklyPlanId = weeklyPlanId,
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                DueDate = dto.DueDate,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };
            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();
            return Ok(taskItem);
        }
        [HttpGet]
        public async Task<IActionResult> GetTasksForWeeklyPlan([FromRoute] int weeklyPlanId)
        {
            var weeklyPlanExist = await _context.WeeklyPlans
                .AnyAsync(wp => wp.Id == weeklyPlanId);
            if (!weeklyPlanExist)
            {
                return NotFound($"Weekly plan with ID {weeklyPlanId} not found.");
            }
            var taskItems = await _context.TaskItems
                .Where(t => t.WeeklyPlanId == weeklyPlanId)
                .OrderBy(t => t.DueDate ?? DateTime.MaxValue)
                .ThenBy(t => t.CreatedAt)
                .ToListAsync();
            return Ok(taskItems);
        }

        [HttpPut("{taskItemId}")]
        public async Task<IActionResult> UpdateTaskItem([FromRoute] int weeklyPlanId, [FromRoute] int taskItemId, [FromBody] UpdateTaskItemDto dto)
        {
            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == taskItemId && t.WeeklyPlanId == weeklyPlanId);
            if (taskItem == null)
            {
                return NotFound($"Task item with ID {taskItemId} not found in weekly plan {weeklyPlanId}.");
            }
            taskItem.Title = dto.Title;
            taskItem.Description = dto.Description;
            taskItem.Category = dto.Category;
            taskItem.DueDate = dto.DueDate;
            taskItem.IsCompleted = dto.IsCompleted;
            await _context.SaveChangesAsync();
            return Ok(taskItem);
        }

        [HttpDelete("{taskItemId}")]

        public async Task<IActionResult> DeleteTaskItem([FromRoute] int weeklyPlanId, [FromRoute] int taskItemId)
        {
            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == taskItemId && t.WeeklyPlanId == weeklyPlanId);
            if (taskItem == null)
            {
                return NotFound($"Task item with ID {taskItemId} not found in weekly plan {weeklyPlanId}.");
            }
            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
