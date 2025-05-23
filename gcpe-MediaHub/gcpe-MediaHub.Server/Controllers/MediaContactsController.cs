﻿using gcpe_MediaHub.Server.Models;
using gcpe_MediaHub.Server.TestData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaContactsController : Controller
    {
        private readonly InMemoryDataContext _context;
        public MediaContactsController(InMemoryDataContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet(Name = "GetMediaContacts")]
        public ActionResult<IEnumerable<MediaContact>> GetMediaContacts()
        {
            return Ok(_context.MediaContacts);
        }
    }
}
