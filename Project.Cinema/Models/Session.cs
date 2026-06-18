using System.ComponentModel.DataAnnotations;

namespace Project.Cinema.Models
{
    public class Session
    {
        [Key]
        public int SessionId { get; set; }

        [Required]
        [StringLength(100)]
        public string MovieTitle { get; set; }

        [Required]
        [StringLength(50)]
        public string HallName { get; set; }

        [Required]
        public DateTime SessionDate { get; set; }

        [Required]
        [StringLength(10)]
        public string SessionTime { get; set; }

        [Required]
        public decimal TicketPrice { get; set; }

        [Required]
        public int EmptySeatCount { get; set; }
    }
}
