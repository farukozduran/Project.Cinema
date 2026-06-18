using Microsoft.EntityFrameworkCore;
using Project.Cinema.Models;

namespace Project.Cinema.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
    }
}
