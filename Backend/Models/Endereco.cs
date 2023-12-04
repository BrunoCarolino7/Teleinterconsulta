namespace Blog.Models;

public partial class Endereco
{
    public int Id { get; set; }

    public string? Nome { get; set; }

    public string? Logradouro { get; set; }

    public int? Numero { get; set; }

    public string? Bairro { get; set; }

    public string? Cidade { get; set; }

    public string? Estado { get; set; }

    public string? Cep { get; set; }

    public string? Pais { get; set; }

    public int? Telefone { get; set; }

    public int? Telefone2 { get; set; }

    public int? TipoEnderecoid { get; set; }

    public int? TipoUnSaudeid { get; set; }

    public int? UnSaudeid { get; set; }

    public virtual ICollection<Credenciamento> CredenciamentoEnderecosolicitados { get; set; } = new List<Credenciamento>();

    public virtual ICollection<Credenciamento> CredenciamentoEnderecosolicitantes { get; set; } = new List<Credenciamento>();

    public virtual ICollection<Enderecoxespecialidade> Enderecoxespecialidades { get; set; } = new List<Enderecoxespecialidade>();

    public virtual ICollection<Enderecoxpessoa> Enderecoxpessoas { get; set; } = new List<Enderecoxpessoa>();

    public virtual ICollection<Solicitacao> SolicitacaoEnderecos { get; set; } = new List<Solicitacao>();

    public virtual ICollection<Solicitacao> SolicitacaoEnderecosolicitados { get; set; } = new List<Solicitacao>();

    public virtual ICollection<Solicitacao> SolicitacaoEnderecosolicitantes { get; set; } = new List<Solicitacao>();

    public virtual TipoEndereco? TipoEndereco { get; set; }

    public virtual TipoUnSaude? TipoUnSaude { get; set; }

    public virtual UnSaude? UnSaude { get; set; }
}
