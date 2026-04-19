using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/mode")]
    public class ModeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ModeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentMode()
        {
            var currentMode = await _context.ModeCycles
                .Where(m => m.IsActive)
                .OrderByDescending(m => m.StartedAt)
                .FirstOrDefaultAsync();

            return Ok(currentMode);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMode([FromBody] CreateModeCycleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Mode))
            {
                return BadRequest("Mode is required.");
            }

            var allowedModes = new[] { "Spring", "Summer", "Autumn", "Winter" };

            if (!allowedModes.Contains(dto.Mode))
            {
                return BadRequest("Mode must be Spring, Summer, Autumn, or Winter.");
            }

            var activeModes = await _context.ModeCycles
                .Where(m => m.IsActive)
                .ToListAsync();

            foreach (var mode in activeModes)
            {
                mode.IsActive = false;
                mode.EndedAt = DateTime.UtcNow;
            }

            var newMode = new ModeCycle
            {
                Mode = dto.Mode,
                StartedAt = dto.StartedAt == default ? DateTime.UtcNow : dto.StartedAt,
                TargetEndDate = dto.TargetEndDate,
                Intention = dto.Intention,
                IsActive = true
            };

            _context.ModeCycles.Add(newMode);
            await _context.SaveChangesAsync();

            return Ok(newMode);
        }
    }
}