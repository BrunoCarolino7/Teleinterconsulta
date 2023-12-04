namespace Blog.Models;

public partial class Exame
{
    public int Id { get; set; }

    public DateTime? Dataexame { get; set; }

    public string? Tipoexame { get; set; }

    public string? Nome { get; set; }

    public string? Descricao { get; set; }

    public string? Laudo { get; set; }

    public int? Imagem { get; set; }

    public string? Imagemlink { get; set; }

    public int? Pacienteid { get; set; }

    public virtual Paciente? Paciente { get; set; }
}
