
using gcpe_MediaHub.Server.TestData;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Models.Repositories
{
    public class MediaContactRepository : IMediaContactRepository
    {
        private readonly InMemoryDataContext _context;
        public MediaContactRepository(InMemoryDataContext context)
        {
            _context = context;
        }
        public IEnumerable<MediaContact> GetAll()
        {
            return _context.MediaContacts;
        }

    }
}
