namespace Blog.Models;

public partial class Avaliacao
{
    public int Id { get; set; }

    public string? Textosolicitacao { get; set; }

    public int? Resultadoavaliacao { get; set; }

    public DateTime? Dataaprovacao { get; set; }

    public DateTime? Datadescredenciamento { get; set; }

    public string? Justificativadescred { get; set; }

    public int? Statuscredenciamento { get; set; }

    public int? Pessoaid { get; set; }

    public int? Pessoaavaliadorid { get; set; }

    public int? Pessoasolicitanteid { get; set; }

    public int? Pessoasolicidescredid { get; set; }

    public int? Enderecoxespecialidadeid { get; set; }

    public int? Credenciamentoid { get; set; }

    public virtual Credenciamento? Credenciamento { get; set; }

    public virtual Enderecoxespecialidade? Enderecoxespecialidade { get; set; }

    public virtual Pessoa? Pessoa { get; set; }

    public virtual Pessoa? Pessoaavaliador { get; set; }

    public virtual Pessoa? Pessoasolicidescred { get; set; }

    public virtual Pessoa? Pessoasolicitante { get; set; }
}
