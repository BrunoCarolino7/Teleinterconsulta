namespace Blog.Models;

public partial class Enderecoxpessoaxespecialidade
{
    public int Id { get; set; }

    public int? Enderecoxpessoaid { get; set; }

    public int? Especialidadeid { get; set; }

    public virtual Enderecoxpessoa? Enderecoxpessoa { get; set; }

    public virtual Especialidade? Especialidade { get; set; }
}
