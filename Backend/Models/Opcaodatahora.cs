namespace Blog.Models;

public partial class Opcaodatahora
{
    public int Id { get; set; }

    public DateTime? Datahora { get; set; }

    public int? Solicitacaoid { get; set; }

    public virtual Solicitacao? Solicitacao { get; set; }
}
