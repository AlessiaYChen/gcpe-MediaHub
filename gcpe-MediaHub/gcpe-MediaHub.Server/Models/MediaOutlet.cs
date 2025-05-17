using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaOutlet
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PrimaryPhone { get; set; }
        [Required]
        public string NewsDeskPhone { get; set; }
        [Required]
        public IEnumerable<string> MediaTypes { get; set; }
        //[Required]
        //public IEnumerable<string> Languages { get; set; }
        [Required]
        public string Language { get; set; }
        public string? LanguageShortName { get; set; }
        [Required]
        public bool IsMajorMedia { get; set; }
        [Required]
        public string? WebsiteURL { get; set; }
        public string? SocialMediaXURL { get; set; }
        public string? SocialMediaInstagramURL { get; set; }
        public string? Address { get; set; }
        public string? Location { get; set; }


        //public MediaOutlet(string name, string email, string phone, List<string> mediaTypes, List<string> languages) 
        //{
        //    Name = name;
        //    Email = email;
        //    Phone = phone;
        //    MediaTypes = mediaTypes;
        //    Languages = languages;
        //}


    }
}
