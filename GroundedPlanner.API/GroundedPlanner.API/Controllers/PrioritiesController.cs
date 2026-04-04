using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/weeklyplans/{weeklyPlanId}/priorities")]
    public class PrioritiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrioritiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePriority([FromRoute] int weeklyPlanId, [FromBody] CreatePriorityDto dto)
        {
            var weeklyPlanExist = await _context.WeeklyPlans
                .AnyAsync(wp => wp.Id == weeklyPlanId);

            if (!weeklyPlanExist)
            {
                return NotFound($"Weekly plan with ID {weeklyPlanId} not found.");
            }

            var priority = new Priority
            {
                WeeklyPlanId = weeklyPlanId,
                Title = dto.Title,
                SortOrder = dto.SortOrder,
                IsCompleted = false
            };

            _context.Priorities.Add(priority);
            await _context.SaveChangesAsync();
            return Ok(priority);

        }

        [HttpGet]
        public async Task<IActionResult> GetPriorities([FromRoute] int weeklyPlanId)
        {
            var weeklyPlanExist = await _context.WeeklyPlans
                .AnyAsync(wp => wp.Id == weeklyPlanId);
            if (!weeklyPlanExist)
            {
                return NotFound($"Weekly plan with ID {weeklyPlanId} not found.");
            }
            var priorities = await _context.Priorities
                .Where(p => p.WeeklyPlanId == weeklyPlanId)
                .OrderBy(p => p.SortOrder)
                .ToListAsync();
            return Ok(priorities);
        }

        [HttpPatch("{priorityId}/complete")]
        public async Task<IActionResult> TogglePriorityComplete([FromRoute] int weeklyPlanId, [FromRoute] int priorityId)
        {
            var priority = await _context.Priorities
                .FirstOrDefaultAsync(p => p.WeeklyPlanId == weeklyPlanId && p.Id == priorityId);

            if (priority == null)
            {
                return NotFound($"Priority with ID {priorityId} for Weekly Plan ID {weeklyPlanId} not found.");
            }

            priority.IsCompleted = !priority.IsCompleted;

            _context.Priorities.Update(priority);
            await _context.SaveChangesAsync();

            return Ok(priority);
        }

        [HttpPut("{priorityId}")]
        public async Task<IActionResult> UpdatePriority([FromRoute] int weeklyPlanId, [FromRoute] int priorityId, [FromBody] UpdatePriorityDto dto)
        {
            var priority = await _context.Priorities
                .FirstOrDefaultAsync(p => p.WeeklyPlanId == weeklyPlanId && p.Id == priorityId);
            if (priority == null)
            {
                return NotFound($"Priority with ID {priorityId} for Weekly Plan ID {weeklyPlanId} not found.");
            }
            priority.Title = dto.Title;
            priority.SortOrder = dto.SortOrder;
            priority.IsCompleted = dto.IsCompleted;
            _context.Priorities.Update(priority);
            await _context.SaveChangesAsync();
            return Ok(priority);
        }

        [HttpDelete("{priorityId}")]
        public async Task<IActionResult> DeletePriority([FromRoute] int weeklyPlanId, [FromRoute] int priorityId)
        {
            var priority = await _context.Priorities
                .FirstOrDefaultAsync(p => p.WeeklyPlanId == weeklyPlanId && p.Id == priorityId);
            if (priority == null)
            {
                return NotFound($"Priority with ID {priorityId} for Weekly Plan ID {weeklyPlanId} not found.");
            }
            _context.Priorities.Remove(priority);
            await _context.SaveChangesAsync();
            return NoContent();




        }
    }


}
