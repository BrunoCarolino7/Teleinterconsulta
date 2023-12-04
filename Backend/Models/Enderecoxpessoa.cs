namespace Blog.Models;

public partial class Enderecoxpessoa
{
    public int Id { get; set; }

    public int? Telefone { get; set; }

    public string? Email { get; set; }

    public int? Rolesid { get; set; }

    public int? Enderecoid { get; set; }

    public int? Pessoaid { get; set; }

    public int? TipoUsuarioid { get; set; }

    public int? TipoProfissionalid { get; set; }

    public virtual ICollection<Credenciamento> Credenciamentos { get; set; } = new List<Credenciamento>();

    public virtual Endereco? Endereco { get; set; }

    public virtual ICollection<Enderecoxpessoaxespecialidade> Enderecoxpessoaxespecialidades { get; set; } = new List<Enderecoxpessoaxespecialidade>();

    public virtual Pessoa? Pessoa { get; set; }

    public virtual Role? Roles { get; set; }

    public virtual ICollection<Solicitacao> Solicitacaos { get; set; } = new List<Solicitacao>();

    public virtual TipoProfissional? TipoProfissional { get; set; }

    public virtual TipoUsuario? TipoUsuario { get; set; }
}
