namespace Blog.Models;

public partial class Conclusao
{
    public int Solicitacaoid { get; set; }

    public string? Descredorientacao { get; set; }

    public int? Acompanhanovateleinter { get; set; }

    public DateTime? Prazo { get; set; }

    public int? Pessoaid { get; set; }

    public int? Pessoarecebeuid { get; set; }

    public int? Pessoarealizouid { get; set; }

    public int? Agendamentoid { get; set; }

    public virtual Agendamento? Agendamento { get; set; }

    public virtual Pessoa? Pessoa { get; set; }

    public virtual Pessoa? Pessoarealizou { get; set; }

    public virtual Pessoa? Pessoarecebeu { get; set; }
}
