using gcpe_MediaHub.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Data
{
    public class MediaHubContext: DbContext
    {
        public MediaHubContext(DbContextOptions<MediaHubContext> options)
            : base(options)
        {

        }
        public DbSet<MediaContact> MediaContacts { get; set; } = default!;
        public DbSet<ContactOutlet> ContactOutlets { get; set; }
        public DbSet<MediaOutlet> MediaOutlets { get; set; }
        public DbSet<MediaRequest> MediaRequests { get; set; }
    }
}
