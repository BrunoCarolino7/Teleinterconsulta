namespace Blog.Models;

public partial class Role
{
    public int Id { get; set; }

    public string? Nome { get; set; }

    public virtual ICollection<Enderecoxpessoa> Enderecoxpessoas { get; set; } = new List<Enderecoxpessoa>();
}
