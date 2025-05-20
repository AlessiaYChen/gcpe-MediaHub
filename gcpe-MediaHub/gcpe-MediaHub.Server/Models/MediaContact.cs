﻿using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaContact
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public bool IsPressGallery { get; set; }
        public string? JobTitle { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string? CallInPhone { get; set; }
        public string? SocialMediaXURL { get; set; }
        public string? SocialMediaInstagramURL { get; set; }
        [Required]
        public string? Location { get; set; }
         public string[]? Outlets { get; set; }

        //[ForeignKey ("Id")]
        //public virtual IEnumerable<ContactOutlet> Outlets { get; set; }
     //   public IEnumerable<MediaRequest>? Requests { get; set; }
        public string[]? Requests { get; set; } // TODO: should ultimately be a collection, not a string
        public DateTime? LastActive { get; set; }

        public MediaContact()
        {

        }

        public MediaContact(string firstName, string lastName, string email, string phone, string location, string[] outlets, string[] requests, DateTime? lastActive)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
            Location = location;
            Outlets = outlets;
            Requests = requests;
            LastActive = lastActive;
        }
    }
}
