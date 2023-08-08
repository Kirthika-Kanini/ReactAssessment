using System.ComponentModel.DataAnnotations;
using TravelAgent.Models;

public class Agent
{
    [Key]
    public int TravelAgentId { get; set; }

    [StringLength(100, ErrorMessage = "TravelAgentName must not exceed 100 characters.")]
    public string? TravelAgentName { get; set; }

    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
             ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
    public string? TravelAgentPassword { get; set; }


    public string? TravelAgentStatus { get; set; }

    [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone No. must be  10 characters long")]
    public string? TravelAgentContact { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string? TravelAgentEmail { get; set; }

    public string? TravelAgentCompany { get; set; }

    public string? TravelAgentCompanyAddress { get; set; }

    public ICollection<Place>? Place { get; set; }
}
