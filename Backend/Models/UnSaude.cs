namespace Blog.Models;

public partial class UnSaude
{
    public int Id { get; set; }

    public string? Cnpj { get; set; }

    public string? Razaosocial { get; set; }

    public string? Nomefantasia { get; set; }

    public int? Perfilid { get; set; }

    public virtual ICollection<Endereco> Enderecos { get; set; } = new List<Endereco>();

    public virtual Perfil? Perfil { get; set; }
}
