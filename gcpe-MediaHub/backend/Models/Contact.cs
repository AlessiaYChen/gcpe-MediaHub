namespace MediaHubExplore.Backend.Models
{
    public class Contact
    {
        public Guid Id { get; set; } // Changed back to Guid as requested
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<Outlet> Outlets { get; set; } = new List<Outlet>();
        public string JobTitle { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public bool IsVetted { get; set; }
        public string Email { get; set; } = string.Empty; // Added Email property
        public List<PhoneNumber> PhoneNumbers { get; set; } = new List<PhoneNumber>();
        
        public class PhoneNumber
        {
            public ContactPhoneType ContactPhoneType { get; set; }
            public string Number { get; set; } = string.Empty;
        }
        public string Website { get; set; } = string.Empty;
        public List<SocialMedia> SocialProfiles { get; set; } = new List<SocialMedia>();
        
        public class SocialMedia
        {
            public string SocialMediaType { get; set; } = string.Empty; // e.g., Bluesky, Facebook, Google+, Instagram, Linkedin, X, Other
            public string SocialMediaLink { get; set; } = string.Empty;
        }
        public List<string> DistributionLists { get; set; } = new List<string>();
        public List<string> SubscriptionLists { get; set; } = new List<string>();
        public string Notes { get; set; } = string.Empty;
    }
}