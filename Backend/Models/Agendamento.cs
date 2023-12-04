namespace Blog.Models;

public partial class Agendamento
{
    public int Agendamentoid { get; set; }

    public DateTime? Datahora { get; set; }

    public string? Linkteleinter { get; set; }

    public string? Statusagendamento { get; set; }

    public string? Descricao { get; set; }

    public virtual Conclusao? Conclusao { get; set; }

    public virtual Solicitacao? Solicitacao { get; set; }
}
