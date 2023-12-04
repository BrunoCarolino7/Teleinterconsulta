using System.Net.Mail;
using System.Security.Cryptography;

namespace Blog.Models;

public partial class Pessoa
{
    public int Id { get; set; }

    public string? Cpf { get; set; }

    public string? Nome { get; set; }

    public string? Usuarioad { get; set; }
    public string? Codigo { get; set; }
    public DateTime? CodigoExpirado { get; set; }

    public int? Ddd { get; set; }

    public int? Telefone { get; set; }

    public int? Ddd2 { get; set; }

    public int? Telefone2 { get; set; }

    public string? Email { get; set; }

    public string? Emailalternativo { get; set; }

    public int? Numeroconselho { get; set; }

    public virtual ICollection<Avaliacao> AvaliacaoPessoaavaliadors { get; set; } = new List<Avaliacao>();

    public virtual ICollection<Avaliacao> AvaliacaoPessoas { get; set; } = new List<Avaliacao>();

    public virtual ICollection<Avaliacao> AvaliacaoPessoasolicidescreds { get; set; } = new List<Avaliacao>();

    public virtual ICollection<Avaliacao> AvaliacaoPessoasolicitantes { get; set; } = new List<Avaliacao>();

    public virtual ICollection<Conclusao> ConclusaoPessoarealizous { get; set; } = new List<Conclusao>();

    public virtual ICollection<Conclusao> ConclusaoPessoarecebeus { get; set; } = new List<Conclusao>();

    public virtual ICollection<Conclusao> ConclusaoPessoas { get; set; } = new List<Conclusao>();

    public virtual ICollection<Enderecoxpessoa> Enderecoxpessoas { get; set; } = new List<Enderecoxpessoa>();


    public void EnviaToken()
    {
        MailMessage mail = new MailMessage();
        SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
        string meuEmail = "lopesb073@gmail.com";
        string meuPassword = "nzwx bots utvm lzum";

        mail.From = new MailAddress(meuEmail, "Bruno Lopes");
        mail.To.Add(Email!);
        mail.Priority = MailPriority.High;
        mail.Subject = "Token para validação do acesso";

        string nome = Nome!;

        Codigo = GerarToken();
        CodigoExpirado = DateTime.Now.AddMinutes(1);


        // Ajuste do diretório de trabalho
        string diretorioDoProjeto = AppDomain.CurrentDomain.BaseDirectory;
        Directory.SetCurrentDirectory(diretorioDoProjeto);

        mail.Body = corpoDaMensagem(nome, Codigo);
        mail.IsBodyHtml = true;
        smtpServer.Port = 587;

        smtpServer.Credentials = new System.Net.NetworkCredential(meuEmail, meuPassword);
        smtpServer.EnableSsl = true;
        smtpServer.Send(mail);

    }

    public static string corpoDaMensagem(string nome, string token)
    {
        string body =

        "< div style = 'padding: 5%; font-family: Arial, Helvetica, sans-serif; text-align:center; margin-top: 0;' >" +
    "< div style = 'background: #343635; display: inline-block; padding: 5%; font-family: Arial, Helvetica, sans-serif; text-align:center; max-width: 700px; margin: auto;' >" +
        "< img src = 'https://www.hc.fm.usp.br/hc/assets/images/logo.png' alt = 'Imagem de exemplo' width = '100%' style = 'border-radius: 10px;' >" +
        "< img src = 'https://yt3.googleusercontent.com/ytc/APkrFKYZRYY4GfvX7fpGmoZJJtAu-4aEonGGfUSUXYrQ=s176-c-k-c0x00ffffff-no-rj' alt = 'Imagem de exemplo' width = '50%' style = 'border-radius: 10px;' >" +
        "< p style = 'border-bottom: 1px solid #657275; padding-bottom: 2%;' ></ p>" +
        "< div style = 'text-align: left;' >" +
            "< p style = 'color: #fff; font-size: 4vw; font-style: italic;' > Seu token para validação é:  < span style = 'font-size: 5vw; font-weight: bold; color: #00a8c6;' >{ token}</ span ></ p >" +
            "< p style = 'color: #fff; font-size: 3vw;' > " + $"Olá, {nome}!" + "</ p >" +
            "< p style = 'color: #fff; font-size: 3vw;font-style: italic;' > " + " < span style = 'color: #fff' > " + "Nota: " + " </ span > " + "O código irá expirar em 5 minutos, portanto faça a verificação o mais rápido possível!" + " </ p>" +
            "< br >< p style = 'color: #fff; font-size: 2.5vw;' > " + "Bem vindo(a) ao sistema de Teleinterconsulta!" + " </ p >" +
        "</ div >" +
    "</ div >" +
    "< div style = 'background: #3c3f3d; display: block; padding: 5%; font-family: Arial, Helvetica, sans-serif; text-align: left; max-width: 700px; margin: auto;' > " +
        "< p style = 'color: #fff; font-size: 1.5vw;text-align: center' > " + "® Todos os Direitos Reservados. Instituto da Criança e do Adolescente" + " </ p >" +
    "</ div >" +
    "</div>";


        return body;
    }

    public string GerarToken()
    {
        int length = 4;
        const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var rng = new RNGCryptoServiceProvider();
        byte[] tokenData = new byte[length];
        rng.GetBytes(tokenData);
        var token = new char[length];
        for (int i = 0; i < length; i++)
        {
            token[i] = validChars[tokenData[i] % validChars.Length];
        }
        return new string(token);
    }

}
