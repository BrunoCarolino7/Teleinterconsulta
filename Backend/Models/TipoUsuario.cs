namespace Blog.Models;

public partial class TipoUsuario
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public virtual ICollection<Enderecoxpessoa> Enderecoxpessoas { get; set; } = new List<Enderecoxpessoa>();
}
