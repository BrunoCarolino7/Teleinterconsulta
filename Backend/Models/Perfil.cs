namespace Blog.Models;

public partial class Perfil
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public virtual ICollection<UnSaude> UnSaudes { get; set; } = new List<UnSaude>();
}
