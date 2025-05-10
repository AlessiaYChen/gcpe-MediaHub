using Microsoft.AspNetCore.Mvc;
using gcpe_MediaHub.backend.Models;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;
using System.Linq;
using Microsoft.Extensions.Logging; // Needed for ILogger
namespace gcpe_MediaHub.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : ControllerBase
    {
        private readonly string _filePath = "mock-requests.json";
        private readonly ILogger<RequestsController> _logger;
        private readonly JsonSerializerOptions _jsonOptions;
        public RequestsController(ILogger<RequestsController> logger)
        {
            _logger = logger;
            _jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                PropertyNameCaseInsensitive = true, // To handle camelCase in JSON and PascalCase in C#
                Converters = { new JsonStringEnumConverter() }
            };
        }
        private List<Request> ReadRequestsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                _logger.LogWarning("Mock requests file not found at {FilePath}. Returning empty list.", _filePath);
                return new List<Request>();
            }
            try
            {
                var jsonData = System.IO.File.ReadAllText(_filePath);
                var requests = JsonSerializer.Deserialize<List<Request>>(jsonData, _jsonOptions);
                return requests ?? new List<Request>();
            }
            catch (JsonException jsonEx)
            {
                _logger.LogError(jsonEx, "JSON deserialization error at {FilePath}.", _filePath);
                return new List<Request>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading or deserializing mock requests file at {FilePath}.", _filePath);
                return new List<Request>();
            }
        }
        private void WriteRequestsToFile(List<Request> requests)
        {
            try
            {
                var jsonData = JsonSerializer.Serialize(requests, _jsonOptions);
                System.IO.File.WriteAllText(_filePath, jsonData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error serializing or writing mock requests file at {FilePath}.", _filePath);
            }
        }
        // GET: api/requests
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Request>> GetRequests()
        {
            _logger.LogInformation("Getting all requests from mock file.");
            var requests = ReadRequestsFromFile();
            if (!requests.Any() && !System.IO.File.Exists(_filePath))
            {
                return NotFound("Mock requests file not found or empty.");
            }
            return Ok(requests);
        }
        // GET: api/requests/{id}
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Request> GetRequest(Guid id)
        {
            _logger.LogInformation("Getting request with ID: {RequestId} from mock file.", id);
            var requests = ReadRequestsFromFile();
            var request = requests.FirstOrDefault(c => c.RequestId == id);
            if (request == null)
            {
                _logger.LogWarning("Request with ID: {RequestId} not found in mock file.", id);
                return NotFound();
            }
            return Ok(request);
        }
        // POST: api/requests
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Request> PostRequest(Request request)
        {
            if (request == null)
            {
                _logger.LogWarning("PostRequest failed: Invalid request data.");
                return BadRequest("Invalid request data.");
            }
            _logger.LogInformation("Adding new request: {RequestTitle} to mock file.", request.RequestTitle);
            var requests = ReadRequestsFromFile();
            // Assign a new unique Guid ID
            request.RequestId = Guid.NewGuid();
            requests.Add(request);
            WriteRequestsToFile(requests);
            _logger.LogInformation("Successfully added request with ID: {RequestId}.", request.RequestId);
            return CreatedAtAction(nameof(GetRequest), new { id = request.RequestId }, request);
        }
        // PUT: api/requests/{id}
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult PutRequest(Guid id, Request request)
        {
            if (request == null || (request.RequestId != Guid.Empty && id != request.RequestId))
            {
                _logger.LogWarning("PutRequest failed: Invalid request data or ID mismatch. Route ID: {RouteId}, Body ID: {BodyId}", id, request?.RequestId);
                return BadRequest("Invalid request data or ID mismatch.");
            }
            _logger.LogInformation("Updating request with ID: {RequestId} in mock file.", id);
            var requests = ReadRequestsFromFile();
            var existingRequest = requests.FirstOrDefault(c => c.RequestId == id);
            if (existingRequest == null)
            {
                _logger.LogWarning("Update failed: Request with ID: {RequestId} not found in mock file.", id);
                return NotFound();
            }
            // Update properties of the existing request
            existingRequest.Status = request.Status;
            existingRequest.RequestTitle = request.RequestTitle;
            existingRequest.RequestType = request.RequestType;
            existingRequest.RequestedBy = request.RequestedBy;
            existingRequest.ReceivedOn = request.ReceivedOn;
            existingRequest.Deadline = request.Deadline;
            existingRequest.RequestDetails = request.RequestDetails;
            existingRequest.RequestResolution = request.RequestResolution;
            existingRequest.LeadMinistry = request.LeadMinistry;
            existingRequest.AdditionalMinistry = request.AdditionalMinistry;
            existingRequest.AssignedTo = request.AssignedTo;
            existingRequest.NotifiedRecipients = request.NotifiedRecipients;
            WriteRequestsToFile(requests);
            _logger.LogInformation("Successfully updated request with ID: {RequestId}.", id);
            return NoContent();
        }
        // DELETE: api/requests/{id}
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteRequest(Guid id)
        {
            _logger.LogInformation("Deleting request with ID: {RequestId} from mock file.", id);
            var requests = ReadRequestsFromFile();
            var requestToRemove = requests.FirstOrDefault(c => c.RequestId == id);
            if (requestToRemove == null)
            {
                _logger.LogWarning("Delete failed: Request with ID: {RequestId} not found in mock file.", id);
                return NotFound();
            }
            requests.Remove(requestToRemove);
            WriteRequestsToFile(requests);
            _logger.LogInformation("Successfully deleted request with ID: {RequestId}.", id);
            return NoContent();
        }
    }
}
