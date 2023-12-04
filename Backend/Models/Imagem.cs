namespace Blog.Models;

public partial class Imagem
{
    public int Id { get; set; }

    public DateTime? Dataimagem { get; set; }

    public string? Descricao { get; set; }

    public int? Pacienteid { get; set; }

    public virtual Paciente? Paciente { get; set; }
}
