using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;

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
            var weeklyPlan = new WeeklyPlan
            {
                Mode = dto.Mode,
                Title = dto.Title,
                WeekStartDate = dto.WeekStartDate,
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