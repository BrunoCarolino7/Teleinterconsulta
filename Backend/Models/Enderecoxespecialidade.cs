namespace Blog.Models;

public partial class Enderecoxespecialidade
{
    public int Id { get; set; }

    public int? Enderecoid { get; set; }

    public int? Especialidadeid { get; set; }

    public virtual ICollection<Avaliacao> Avaliacaos { get; set; } = new List<Avaliacao>();

    public virtual ICollection<Datahoradisponivel> Datahoradisponivels { get; set; } = new List<Datahoradisponivel>();

    public virtual Endereco? Endereco { get; set; }

    public virtual Especialidade? Especialidade { get; set; }

    public virtual ICollection<Solicitacao> Solicitacaos { get; set; } = new List<Solicitacao>();
}
