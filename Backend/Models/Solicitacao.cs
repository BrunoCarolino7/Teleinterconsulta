namespace Blog.Models;

public partial class Solicitacao
{
    public int Solicitacaoid { get; set; }

    public DateTime? Datasolicitacao { get; set; }

    public string? Statusaprovacao { get; set; }

    public string? Justificativa { get; set; }

    public int? Enderecoid { get; set; }

    public int? Enderecosolicitanteid { get; set; }

    public int? Enderecoxespecialidadeid { get; set; }

    public int? Enderecosolicitadoid { get; set; }

    public int? Enderecoxpessoaid { get; set; }

    public int? Agendamentoid { get; set; }

    public int? Pacienteid { get; set; }

    public virtual Agendamento? Agendamento { get; set; }

    public virtual Endereco? Endereco { get; set; }

    public virtual Endereco? Enderecosolicitado { get; set; }

    public virtual Endereco? Enderecosolicitante { get; set; }

    public virtual Enderecoxespecialidade? Enderecoxespecialidade { get; set; }

    public virtual Enderecoxpessoa? Enderecoxpessoa { get; set; }

    public virtual ICollection<Opcaodatahora> Opcaodatahoras { get; set; } = new List<Opcaodatahora>();

    public virtual Paciente? Paciente { get; set; }

}
