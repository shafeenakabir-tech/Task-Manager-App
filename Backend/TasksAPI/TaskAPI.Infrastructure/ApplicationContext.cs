using Microsoft.EntityFrameworkCore;
using TasksAPI.Domain.Models;

namespace TaskAPI.Infrastructure
{
    public class ApplicationContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
    }
}
