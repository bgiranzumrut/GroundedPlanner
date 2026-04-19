using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeeklyPlansController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WeeklyPlansController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWeeklyPlan(CreateWeeklyPlanDto dto)
        {
            var activeModeCycle = await _context.ModeCycles
        .FirstOrDefaultAsync(m => m.IsActive);

            if (activeModeCycle == null)
            {
                return BadRequest("No active mode found. Please set a current mode before creating a weekly plan.");
            }

            var weekStartUtc = DateTime.SpecifyKind(dto.WeekStartDate, DateTimeKind.Utc);

            var weeklyPlan = new WeeklyPlan
            {
                Mode = activeModeCycle.Mode,
                Title = dto.Title,
                WeekStartDate = weekStartUtc,
                WeeklyFocusNote = dto.WeeklyFocusNote,
                CreatedAt = DateTime.UtcNow
            };

            _context.WeeklyPlans.Add(weeklyPlan);
            await _context.SaveChangesAsync();

            return Ok(weeklyPlan);
        }

        [HttpGet]
        public IActionResult GetWeeklyPlans()
        {
            var weeklyPlans = _context.WeeklyPlans
                .OrderByDescending(w => w.CreatedAt)
                .ToList();
            return Ok(weeklyPlans);
        }
    }
}