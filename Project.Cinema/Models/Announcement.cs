using System.ComponentModel.DataAnnotations;

namespace Project.Cinema.Models
{
    public class Announcement
    {
        [Key]
        public int AnnouncementId { get; set; }

        [Required]
        [StringLength(120)]
        public string Title { get; set; }

        [Required]
        [StringLength(700)]
        public string Content { get; set; }

        public DateTime PublishDate { get; set; } = DateTime.Now;

        [Required]
        public bool IsActive { get; set; }
    }
}
