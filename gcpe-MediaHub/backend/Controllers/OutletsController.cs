using MediaHubExplore.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace MediaHubExplore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OutletsController : ControllerBase
    {
        private readonly string _filePath = "mock-outlets.json";
        private readonly ILogger<OutletsController> _logger;
        private readonly JsonSerializerOptions _jsonOptions;

        public OutletsController(ILogger<OutletsController> logger)
        {
            _logger = logger;
            _jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                PropertyNameCaseInsensitive = true
            };
        }

        private List<Outlet> ReadOutletsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                _logger.LogWarning("Mock outlets file not found at {FilePath}. Returning empty list.", _filePath);
                return new List<Outlet>();
            }
            try
            {
                var jsonData = System.IO.File.ReadAllText(_filePath);
                var outletsWrapper = JsonSerializer.Deserialize<OutletsWrapper>(jsonData, _jsonOptions);
                return outletsWrapper?.Outlets ?? new List<Outlet>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading or deserializing mock outlets file at {FilePath}. Returning empty list.", _filePath);
                return new List<Outlet>();
            }
        }

        private void WriteOutletsToFile(List<Outlet> outlets)
        {
            try
            {
                var outletsWrapper = new OutletsWrapper { Outlets = outlets };
                var jsonData = JsonSerializer.Serialize(outletsWrapper, _jsonOptions);
                System.IO.File.WriteAllText(_filePath, jsonData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error serializing or writing mock outlets file at {FilePath}.", _filePath);
            }
        }

        private class OutletsWrapper
        {
            [JsonPropertyName("outlets")]
            public List<Outlet> Outlets { get; set; } = new List<Outlet>();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Outlet>> GetOutlets()
        {
            _logger.LogInformation("Getting all outlets from mock file.");
            var outlets = ReadOutletsFromFile();
            if (!outlets.Any() && !System.IO.File.Exists(_filePath))
            {
                return NotFound("Mock outlets file not found or empty.");
            }
            return Ok(outlets);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Outlet> GetOutlet(Guid id)
        {
            _logger.LogInformation("Getting outlet with ID: {OutletId} from mock file.", id);
            var outlets = ReadOutletsFromFile();
            var outlet = outlets.FirstOrDefault(o => o.Id == id);

            if (outlet == null)
            {
                _logger.LogWarning("Outlet with ID: {OutletId} not found in mock file.", id);
                return NotFound();
            }

            return Ok(outlet);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Outlet> PostOutlet(Outlet outlet)
        {
            if (outlet == null || string.IsNullOrWhiteSpace(outlet.Name))
            {
                _logger.LogWarning("PostOutlet failed: Invalid outlet data.");
                return BadRequest("Invalid outlet data.");
            }

            _logger.LogInformation("Adding new outlet: {OutletName} to mock file.", outlet.Name);
            var outlets = ReadOutletsFromFile();

            outlet.Id = Guid.NewGuid();
            outlets.Add(outlet);

            WriteOutletsToFile(outlets);

            _logger.LogInformation("Successfully added outlet with ID: {OutletId}.", outlet.Id);
            return CreatedAtAction(nameof(GetOutlet), new { id = outlet.Id }, outlet);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult PutOutlet(Guid id, Outlet outlet)
        {
            if (outlet == null || (outlet.Id != Guid.Empty && id != outlet.Id))
            {
                _logger.LogWarning("PutOutlet failed: Invalid data or ID mismatch. Route ID: {RouteId}, Body ID: {BodyId}", id, outlet?.Id);
                return BadRequest("Invalid outlet data or ID mismatch.");
            }

            _logger.LogInformation("Updating outlet with ID: {OutletId} in mock file.", id);
            var outlets = ReadOutletsFromFile();
            var existingOutlet = outlets.FirstOrDefault(o => o.Id == id);

            if (existingOutlet == null)
            {
                _logger.LogWarning("Update failed: Outlet with ID: {OutletId} not found in mock file.", id);
                return NotFound();
            }

            // Update all properties
            existingOutlet.Name = outlet.Name;
            existingOutlet.MediaType = outlet.MediaType;
            existingOutlet.IsMajorMedia = outlet.IsMajorMedia;
            existingOutlet.Description = outlet.Description;
            existingOutlet.Email = outlet.Email;
            existingOutlet.WebsiteUrl = outlet.WebsiteUrl;
            existingOutlet.PhoneNumbers = outlet.PhoneNumbers;
            existingOutlet.SocialMedia = outlet.SocialMedia;
            existingOutlet.Street = outlet.Street;
            existingOutlet.City = outlet.City;
            existingOutlet.ProvinceState = outlet.ProvinceState;
            existingOutlet.Country = outlet.Country;
            existingOutlet.PostalCode = outlet.PostalCode;
            existingOutlet.MailingLists = outlet.MailingLists;
            existingOutlet.NewsSubscriptions = outlet.NewsSubscriptions;
            existingOutlet.Affiliations = outlet.Affiliations;
            existingOutlet.Audience = outlet.Audience;
            existingOutlet.Location = outlet.Location;

            WriteOutletsToFile(outlets);
            _logger.LogInformation("Successfully updated outlet with ID: {OutletId}.", id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteOutlet(Guid id)
        {
            _logger.LogInformation("Deleting outlet with ID: {OutletId} from mock file.", id);
            var outlets = ReadOutletsFromFile();
            var outletToRemove = outlets.FirstOrDefault(o => o.Id == id);

            if (outletToRemove == null)
            {
                _logger.LogWarning("Delete failed: Outlet with ID: {OutletId} not found in mock file.", id);
                return NotFound();
            }

            outlets.Remove(outletToRemove);
            WriteOutletsToFile(outlets);
            _logger.LogInformation("Successfully deleted outlet with ID: {OutletId}.", id);
            return NoContent();
        }
    }
}