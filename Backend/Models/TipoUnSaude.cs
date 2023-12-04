namespace Blog.Models;

public partial class TipoUnSaude
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public virtual ICollection<Endereco> Enderecos { get; set; } = new List<Endereco>();
}
