using System.ComponentModel.DataAnnotations;

namespace Project.Cinema.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required]
        [StringLength(100)]
        public string MovieTitle { get; set; }

        [Required]
        [StringLength(50)]
        public string Genre { get; set; }

        [StringLength(80)]
        public string Director { get; set; }

        [Required]
        public int Duration { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }
    }
}
