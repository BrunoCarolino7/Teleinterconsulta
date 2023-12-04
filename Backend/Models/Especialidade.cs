namespace Blog.Models;

public partial class Especialidade
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public int? TipoProfissionalid { get; set; }

    public virtual ICollection<Enderecoxespecialidade> Enderecoxespecialidades { get; set; } = new List<Enderecoxespecialidade>();

    public virtual ICollection<Enderecoxpessoaxespecialidade> Enderecoxpessoaxespecialidades { get; set; } = new List<Enderecoxpessoaxespecialidade>();

    public virtual TipoProfissional? TipoProfissional { get; set; }
}
