namespace Blog.Models;

public partial class Credenciamento
{
    public int Id { get; set; }
    public DateTime? Datasolicred { get; set; }
    public int? Enderecosolicitanteid { get; set; }
    public int? Enderecosolicitadoid { get; set; }
    public int? Enderecoxpessoaid { get; set; }
    public int? Status { get; set; }

    public virtual ICollection<Avaliacao> Avaliacaos { get; set; } = new List<Avaliacao>();

    public virtual Endereco? Enderecosolicitado { get; set; }

    public virtual Endereco? Enderecosolicitante { get; set; }

    public virtual Enderecoxpessoa? Enderecoxpessoa { get; set; }
}
