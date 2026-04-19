using GroundedPlanner.API.Data;
using GroundedPlanner.API.DTOs;
using GroundedPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroundedPlanner.API.Controllers
{
    [ApiController]
    [Route("api/tasks/{taskItemId}/focus-sessions")]
    public class FocusSessionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FocusSessionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSessionsForTask([FromRoute] int taskItemId)
        {
            var taskExists = await _context.TaskItems.AnyAsync(t => t.Id == taskItemId);

            if (!taskExists)
            {
                return NotFound($"Task with ID {taskItemId} not found.");
            }

            var sessions = await _context.FocusSessions
                .Where(fs => fs.TaskItemId == taskItemId)
                .OrderByDescending(fs => fs.StartTime)
                .ToListAsync();

            return Ok(sessions);
        }

        [HttpPost]
        public async Task<IActionResult> StartSession(
            [FromRoute] int taskItemId,
            [FromBody] StartFocusSessionDto dto)
        {
            var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == taskItemId);

            if (task == null)
            {
                return NotFound($"Task with ID {taskItemId} not found.");
            }

            var session = new FocusSession
            {
                TaskItemId = taskItemId,
                StartTime = DateTime.UtcNow,
                EndTime = null,
                DurationMinutes = dto.DurationMinutes <= 0 ? 25 : dto.DurationMinutes,
                IsCompleted = false
            };

            _context.FocusSessions.Add(session);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                session.Id,
                session.TaskItemId,
                session.StartTime,
                session.EndTime,
                session.DurationMinutes,
                session.IsCompleted
            });
        }

        [HttpPut("{focusSessionId}/complete")]
        public async Task<IActionResult> CompleteSession(
            [FromRoute] int taskItemId,
            [FromRoute] int focusSessionId,
            [FromBody] CompleteFocusSessionDto dto)
        {
            var session = await _context.FocusSessions
                .FirstOrDefaultAsync(fs => fs.Id == focusSessionId && fs.TaskItemId == taskItemId);

            if (session == null)
            {
                return NotFound($"Focus session with ID {focusSessionId} for task {taskItemId} not found.");
            }

            session.EndTime = dto.EndTime.Kind == DateTimeKind.Utc
                ? dto.EndTime
                : DateTime.SpecifyKind(dto.EndTime, DateTimeKind.Utc);

            session.IsCompleted = true;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                session.Id,
                session.TaskItemId,
                session.StartTime,
                session.EndTime,
                session.DurationMinutes,
                session.IsCompleted
            });
        }
    }
}