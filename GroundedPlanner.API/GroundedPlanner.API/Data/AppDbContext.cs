using Microsoft.EntityFrameworkCore;
using GroundedPlanner.API.Models;

namespace GroundedPlanner.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<WeeklyPlan> WeeklyPlans { get; set; }

        public DbSet<Priority> Priorities { get; set; }


        public DbSet<TaskItem> TaskItems { get; set; }

        public DbSet<ModeCycle> ModeCycles { get; set; }

        public DbSet<FocusSession> FocusSessions { get; set; }

    }
}
