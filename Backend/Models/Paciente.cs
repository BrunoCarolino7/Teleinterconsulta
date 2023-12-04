namespace Blog.Models;

public partial class Paciente
{
    public int Pacienteid { get; set; }

    public string? Nome { get; set; }

    public DateTime? Datanascimento { get; set; }

    public string? Genero { get; set; }

    public string? Nomemae { get; set; }

    public string? Cpf { get; set; }

    public string? Justificativasolicitacao { get; set; }

    public string? Historiapaciente { get; set; }

    public virtual ICollection<Exame> Exames { get; set; } = new List<Exame>();

    public virtual ICollection<Imagem> Imagems { get; set; } = new List<Imagem>();

    public virtual Solicitacao? Solicitacao { get; set; }
}
