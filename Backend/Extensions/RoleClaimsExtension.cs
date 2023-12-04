using Blog.Models;
using System.Security.Claims;

namespace Blog.Extensions
{
    public static class RoleClaimsExtension
    {
        public static IEnumerable<Claim> ObterClaims(this Pessoa pessoa, Enderecoxpessoa enderecoxpessoa)
        {
            var result = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, pessoa.Id.ToString()),
                new(ClaimTypes.Name, pessoa.Nome!),
            };

            if (pessoa.Enderecoxpessoas != null && enderecoxpessoa != null)
            {
                var matchingEnderecoxpessoa = pessoa.Enderecoxpessoas.FirstOrDefault(ep => ep.Id == enderecoxpessoa.Id);

                if (matchingEnderecoxpessoa != null && matchingEnderecoxpessoa.Roles != null)
                {
                    result.Add(new Claim(ClaimTypes.Role, matchingEnderecoxpessoa.Roles!.Nome!));
                }
            }

            return result;
        }

        public static IEnumerable<Claim> ObterClaim(this Pessoa pessoa)
        {
            var result = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, pessoa.Id.ToString()),
                new(ClaimTypes.Name, pessoa.Nome!),
            };

            return result;
        }

    }
}

//    // Adiciona reivindicações com base nas informações relacionadas à pessoa
//    if (pessoa.EnderecoxPessoas != null)
//    {
//        foreach (var enderecoPessoa in pessoa.EnderecoxPessoas)
//        {
//            // Aqui, você precisa ajustar de acordo com a sua estrutura real
//            if (enderecoPessoa.TipoProfissional != null)
//            {
//                result.Add(new Claim(ClaimTypes.Role, enderecoPessoa.TipoProfissional.Nome));
//                // Adicione mais reivindicações conforme necessário
//            }
//        }
//    }

//    return result;
//}
