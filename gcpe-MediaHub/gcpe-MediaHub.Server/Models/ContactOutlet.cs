using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gcpe_MediaHub.Server.Models
{
    public class ContactOutlet
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public virtual MediaContact? Contact { get; set; }

        [Required]
        public int OutletId { get; set; }
        [ForeignKey("OutletId")]
        public virtual MediaOutlet? Outlet { get; set; }

        [Required]
        public string? ContactEmail { get; set; }

        public ContactOutlet(int id, int contactId, int outletId, string contactEmail )
        {
            Id = id;
            ContactId = contactId;
            OutletId = outletId;
            ContactEmail = contactEmail;
        }
    }
}
