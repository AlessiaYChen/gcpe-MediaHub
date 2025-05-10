using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MediaHubExplore.Backend.Models
{
    public class Outlet
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string MediaType { get; set; } = string.Empty;

        public bool IsMajorMedia { get; set; }

        // Contact Information
        public string Email { get; set; } = string.Empty;

        public string WebsiteUrl { get; set; } = string.Empty;

        public List<OutletPhoneNumber> PhoneNumbers { get; set; } = new List<OutletPhoneNumber>();
        
        public class OutletPhoneNumber
        {
            public string ContactPhoneType { get; set; } = string.Empty;
            public string Number { get; set; } = string.Empty;
        }

        public List<OutletSocialMedia> SocialMedia { get; set; } = new List<OutletSocialMedia>();
        
        public class OutletSocialMedia
        {
            public string SocialMediaType { get; set; } = string.Empty; // e.g., Bluesky, Facebook, Google+, Instagram, Linkedin, X, Other
            public string SocialMediaLink { get; set; } = string.Empty;
        }

        // Address Information
        public string Street { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string ProvinceState { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public string PostalCode { get; set; } = string.Empty;

        // Additional Information
        public List<string> MailingLists { get; set; } = new List<string>();

        public List<string> NewsSubscriptions { get; set; } = new List<string>();

        public List<string> Affiliations { get; set; } = new List<string>();

        public string Audience { get; set; } = string.Empty;
        
        public List<string> Languages { get; set; } = new List<string>();

        public string Description { get; set; } = string.Empty;

        // Legacy location field
        public string Location { get; set; } = string.Empty;
    }
}