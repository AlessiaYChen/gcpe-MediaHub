using MediaHubExplore.Backend.Models;
using static MediaHubExplore.Backend.Models.Contact;
using MediaHubExplore.Backend.Models;
using System.Collections.Generic;
using MediaHubExplore.Backend.Models;
using System.Collections.Generic;
using MediaHubExplore.Backend.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace MediaHubExplore.Backend.Data
{
    public interface IContactStore
    {
        Task<Contact?> GetContactByIdAsync(Guid id);
        Task<IEnumerable<Contact>> GetAllContactsAsync();
        Task<Contact> AddContactAsync(Contact contact);
        Task<Contact?> UpdateContactAsync(Guid id, Contact contact);
        Task<bool> DeleteContactAsync(Guid id);
    }

    public class InMemoryContactStore : IContactStore
    {
        // Using ConcurrentDictionary for thread safety, although with a single instance it might be overkill for now.
        private static readonly ConcurrentDictionary<Guid, Contact> _contacts = new ConcurrentDictionary<Guid, Contact>();

        // Optional: Seed with some initial data for testing
        static InMemoryContactStore()
        {
            var sampleContact1 = new Contact
            {
                Id = Guid.NewGuid(),
                FirstName = "Jane",
                LastName = "Doe",
                Outlets = new List<Outlet>
                {
                    new Outlet { Id = Guid.NewGuid(), Name = "Tech News Daily" }
                },
                JobTitle = "Senior Reporter",
                Language = "English",
                Location = "New York, USA",
                IsVetted = true,
                PhoneNumbers = new List<PhoneNumber>
                {
                    new PhoneNumber { ContactPhoneType = ContactPhoneType.Primary, Number = "555-1234" }
                },
                Website = "technewsdaily.com",
                SocialProfiles = new List<Contact.SocialMedia>
                {
                    new Contact.SocialMedia
                    {
                        SocialMediaType = "Linkedin",
                        SocialMediaLink = "linkedin.com/in/janedoe"
                    }
                },
                DistributionLists = new List<string> { "Tech", "AI" },
                SubscriptionLists = new List<string> { "Newsletter" },
                Notes = "Focuses on AI and machine learning."
            };
            _contacts.TryAdd(sampleContact1.Id, sampleContact1);

             var sampleContact2 = new Contact
            {
                Id = Guid.NewGuid(),
                FirstName = "John",
                LastName = "Smith",
                Outlets = new List<Outlet>
                {
                    new Outlet { Id = Guid.NewGuid(), Name = "Global Press Agency" }
                },
                JobTitle = "Photographer",
                Language = "English",
                Location = "London, UK",
                IsVetted = false,
                PhoneNumbers = new List<PhoneNumber>
                {
                    new PhoneNumber { ContactPhoneType = ContactPhoneType.Primary, Number = "555-5678" }
                },
                Website = "globalpress.com",
                SocialProfiles = new List<Contact.SocialMedia>
                {
                    new Contact.SocialMedia
                    {
                        SocialMediaType = "Instagram",
                        SocialMediaLink = "instagram.com/johnsmithphoto"
                    }
                },
                DistributionLists = new List<string> { "Photography", "Events" },
                SubscriptionLists = new List<string>(),
                Notes = "Available for freelance assignments."
            };
            _contacts.TryAdd(sampleContact2.Id, sampleContact2);
        }

        public Task<Contact?> GetContactByIdAsync(Guid id)
        {
            _contacts.TryGetValue(id, out var contact);
            return Task.FromResult(contact);
        }

        public Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return Task.FromResult<IEnumerable<Contact>>(_contacts.Values.ToList());
        }

        public Task<Contact> AddContactAsync(Contact contact)
        {
            contact.Id = Guid.NewGuid(); // Ensure a new ID is assigned
            _contacts.TryAdd(contact.Id, contact);
            return Task.FromResult(contact);
        }

        public Task<Contact?> UpdateContactAsync(Guid id, Contact contact)
        {
            if (_contacts.TryGetValue(id, out var existingContact))
            {
                // Ensure the ID remains the same
                contact.Id = id;
                _contacts[id] = contact;
                return Task.FromResult<Contact?>(contact);
            }
            return Task.FromResult<Contact?>(null); // Not found
        }

        public Task<bool> DeleteContactAsync(Guid id)
        {
            return Task.FromResult(_contacts.TryRemove(id, out _));
        }
    }
}