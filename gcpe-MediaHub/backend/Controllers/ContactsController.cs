using MediaHubExplore.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging; // Needed for ILogger

namespace MediaHubExplore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize] // Add authorization if needed
    // TODO: Add [RequiredScope("YourApiScope")] below once defined
    public class ContactsController : ControllerBase
    {
        // Corrected file path to navigate from the application's base directory to the workspace root
        private readonly string _filePath = "mock-contacts.json";
        private readonly ILogger<ContactsController> _logger;
        private readonly JsonSerializerOptions _jsonOptions;

        public ContactsController(ILogger<ContactsController> logger)
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

        private List<Contact> ReadContactsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                _logger.LogWarning("Mock contacts file not found at {FilePath}. Returning empty list.", _filePath);
                return new List<Contact>();
            }
            try
            {
                var jsonData = System.IO.File.ReadAllText(_filePath);
                var contactsWrapper = JsonSerializer.Deserialize<ContactsWrapper>(jsonData, _jsonOptions);
                return contactsWrapper?.Contacts ?? new List<Contact>();
            }
            catch (JsonException jsonEx)
            {
                _logger.LogError(jsonEx, "JSON deserialization error at {FilePath}. Path: {Path}, LineNumber: {LineNumber}, BytePositionInLine: {BytePositionInLine}",
                    _filePath, jsonEx.Path, jsonEx.LineNumber, jsonEx.BytePositionInLine);
                return new List<Contact>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading or deserializing mock contacts file at {FilePath}. Returning empty list.", _filePath);
                return new List<Contact>();
            }
        }

        private void WriteContactsToFile(List<Contact> contacts)
        {
            try
            {
                var contactsWrapper = new ContactsWrapper { Contacts = contacts };
                var jsonData = JsonSerializer.Serialize(contactsWrapper, _jsonOptions);
                System.IO.File.WriteAllText(_filePath, jsonData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error serializing or writing mock contacts file at {FilePath}.", _filePath);
                // Depending on requirements, you might want to re-throw or handle differently
            }
        }

        // Helper class to match the JSON structure
        private class ContactsWrapper
        {
            [JsonPropertyName("contacts")]
            public List<Contact> Contacts { get; set; } = new List<Contact>();
        }

        // GET: api/contacts
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<Contact>> GetContacts()
        {
            _logger.LogInformation("Getting all contacts from mock file.");
            var contacts = ReadContactsFromFile();
            if (!contacts.Any() && !System.IO.File.Exists(_filePath))
            {
                 return NotFound("Mock contacts file not found or empty.");
            }
            return Ok(contacts);
        }

        // GET: api/contacts/{id}
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Contact> GetContact(Guid id)
        {
            _logger.LogInformation("Getting contact with ID: {ContactId} from mock file.", id);
            var contacts = ReadContactsFromFile();
            var contact = contacts.FirstOrDefault(c => c.Id == id);

            if (contact == null)
            {
                _logger.LogWarning("Contact with ID: {ContactId} not found in mock file.", id);
                return NotFound();
            }

            return Ok(contact);
        }

        // POST: api/contacts
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Contact> PostContact(Contact contact)
        {
            if (contact == null || string.IsNullOrWhiteSpace(contact.FirstName) || string.IsNullOrWhiteSpace(contact.LastName))
            {
                _logger.LogWarning("PostContact failed: Invalid contact data.");
                return BadRequest("Invalid contact data.");
            }

            _logger.LogInformation("Adding new contact: {ContactName} to mock file.", $"{contact.FirstName} {contact.LastName}");
            var contacts = ReadContactsFromFile();

            // Assign a new unique Guid ID
            contact.Id = Guid.NewGuid();
            contacts.Add(contact);

            WriteContactsToFile(contacts);

            _logger.LogInformation("Successfully added contact with ID: {ContactId}.", contact.Id);
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        // PUT: api/contacts/{id}
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult PutContact(Guid id, Contact contact)
        {
            if (contact == null || (contact.Id != Guid.Empty && id != contact.Id))
            {
                 _logger.LogWarning("PutContact failed: Invalid data or ID mismatch. Route ID: {RouteId}, Body ID: {BodyId}", id, contact?.Id);
                return BadRequest("Invalid contact data or ID mismatch.");
            }

            _logger.LogInformation("Updating contact with ID: {ContactId} in mock file.", id);
            var contacts = ReadContactsFromFile();
            var existingContact = contacts.FirstOrDefault(c => c.Id == id);

            if (existingContact == null)
            {
                 _logger.LogWarning("Update failed: Contact with ID: {ContactId} not found in mock file.", id);
                return NotFound();
            }

            // Update properties of the existing contact
            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Outlets = contact.Outlets;
            existingContact.JobTitle = contact.JobTitle;
            existingContact.Language = contact.Language;
            existingContact.Location = contact.Location;
            existingContact.IsVetted = contact.IsVetted;
            existingContact.PhoneNumbers = contact.PhoneNumbers;
            existingContact.Website = contact.Website;
            existingContact.SocialProfiles = contact.SocialProfiles;
            existingContact.DistributionLists = contact.DistributionLists;
            existingContact.SubscriptionLists = contact.SubscriptionLists;
            existingContact.Notes = contact.Notes;
            // Assuming Email is also part of the Contact model based on frontend usage
            // If not, remove this line
            // existingContact.Email = contact.Email;


            WriteContactsToFile(contacts);
            _logger.LogInformation("Successfully updated contact with ID: {ContactId}.", id);
            return NoContent();
        }

        // DELETE: api/contacts/{id}
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteContact(Guid id)
        {
            _logger.LogInformation("Deleting contact with ID: {ContactId} from mock file.", id);
            var contacts = ReadContactsFromFile();
            var contactToRemove = contacts.FirstOrDefault(c => c.Id == id);

            if (contactToRemove == null)
            {
                 _logger.LogWarning("Delete failed: Contact with ID: {ContactId} not found in mock file.", id);
                return NotFound();
            }

            contacts.Remove(contactToRemove);
            WriteContactsToFile(contacts);
            _logger.LogInformation("Successfully deleted contact with ID: {ContactId}.", id);
            return NoContent();
        }
    }
}