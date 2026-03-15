using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class TaskUpdateDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsDone { get; set; }
    }
}