namespace Blog.Models;

public partial class TipoProfissional
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public virtual ICollection<Enderecoxpessoa> Enderecoxpessoas { get; set; } = new List<Enderecoxpessoa>();

    public virtual ICollection<Especialidade> Especialidades { get; set; } = new List<Especialidade>();
}
