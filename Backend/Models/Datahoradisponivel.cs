namespace Blog.Models;

public partial class Datahoradisponivel
{
    public int Id { get; set; }

    public DateTime? Datahorainicial { get; set; }

    public DateTime? Datahorafinal { get; set; }

    public int? Enderecoxespecialidadeid { get; set; }

    public virtual Enderecoxespecialidade? Enderecoxespecialidade { get; set; }
}
