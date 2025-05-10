using System;
using System.Collections.Generic;
using System.Linq;
using MediaHubExplore.Backend.Models;

namespace MediaHubExplore.Backend.Data
{
    public class InMemoryOutletStore : IOutletStore
    {
        private readonly List<Outlet> _outlets;

        public InMemoryOutletStore()
        {
            _outlets = new List<Outlet>
            {
                new Outlet
                {
                    Id = Guid.NewGuid(),
                    Name = "City News Times",
                    MediaType = "Newspaper",
                    IsMajorMedia = true,
                    Description = "Leading daily newspaper covering local and national news",
                    Email = "contact@citynewstimes.fake",
                    WebsiteUrl = "https://citynewstimes.fake",
                    PhoneNumbers = new List<Outlet.OutletPhoneNumber>
                    {
                        new Outlet.OutletPhoneNumber { ContactPhoneType = "Primary", Number = "555-0123" },
                        new Outlet.OutletPhoneNumber { ContactPhoneType = "Backup", Number = "555-0124" }
                    },
                    SocialMedia = new List<Outlet.OutletSocialMedia>
                    {
                        new Outlet.OutletSocialMedia
                        {
                            SocialMediaType = "Twitter",
                            SocialMediaLink = "https://twitter.com/citynewstimes"
                        },
                        new Outlet.OutletSocialMedia
                        {
                            SocialMediaType = "Facebook",
                            SocialMediaLink = "https://facebook.com/citynewstimes"
                        }
                    },
                    Street = "123 News Street",
                    City = "Metropolis",
                    ProvinceState = "NY",
                    Country = "USA",
                    PostalCode = "10001",
                    MailingLists = new List<string> { "Daily News", "Breaking News" },
                    NewsSubscriptions = new List<string> { "Morning Edition", "Evening Edition" },
                    Affiliations = new List<string> { "Press Association", "Digital Publishers Alliance" },
                    Audience = "General Public",
                    Location = "New York, USA",
                    Languages = new List<string> { "EN", "SPA" }
                },
                new Outlet
                {
                    Id = Guid.NewGuid(),
                    Name = "Tech Talk Radio",
                    MediaType = "Radio",
                    IsMajorMedia = false,
                    Description = "Technology-focused radio station covering latest tech trends",
                    Email = "info@techtalkradio.fake",
                    WebsiteUrl = "https://techtalkradio.fake",
                    PhoneNumbers = new List<Outlet.OutletPhoneNumber>
                    {
                        new Outlet.OutletPhoneNumber { ContactPhoneType = "Primary", Number = "555-0125" },
                        new Outlet.OutletPhoneNumber { ContactPhoneType = "Backup", Number = "555-0126" }
                    },
                    SocialMedia = new List<Outlet.OutletSocialMedia>
                    {
                        new Outlet.OutletSocialMedia
                        {
                            SocialMediaType = "Twitter",
                            SocialMediaLink = "https://twitter.com/techtalkradio"
                        },
                        new Outlet.OutletSocialMedia
                        {
                            SocialMediaType = "Linkedin",
                            SocialMediaLink = "https://linkedin.com/company/techtalkradio"
                        }
                    },
                    Street = "456 Tech Avenue",
                    City = "San Francisco",
                    ProvinceState = "CA",
                    Country = "USA",
                    PostalCode = "94105",
                    MailingLists = new List<string> { "Tech News", "Product Updates" },
                    NewsSubscriptions = new List<string> { "Daily Tech Digest", "Weekly Tech Review" },
                    Affiliations = new List<string> { "Tech Broadcasters Association", "Digital Media Alliance" },
                    Audience = "Tech Enthusiasts",
                    Location = "San Francisco, USA",
                    Languages = new List<string> { "EN", "KO" }
                }
            };
        }

        public IEnumerable<Outlet> GetAll() => _outlets;

        public Outlet? GetById(Guid id) => _outlets.FirstOrDefault(o => o.Id == id);

        public void Add(Outlet outlet)
        {
            outlet.Id = Guid.NewGuid();
            _outlets.Add(outlet);
        }

        public void Update(Outlet outlet)
        {
            var index = _outlets.FindIndex(o => o.Id == outlet.Id);
            if (index != -1)
            {
                _outlets[index] = outlet;
            }
        }

        public void Delete(Guid id)
        {
            var outlet = _outlets.FirstOrDefault(o => o.Id == id);
            if (outlet != null)
            {
                _outlets.Remove(outlet);
            }
        }
    }
}