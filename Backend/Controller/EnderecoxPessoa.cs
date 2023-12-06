using Blog.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controller
{
    [ApiController]
    [Route("enderecoxpessoas")]
    public class EnderecoxPessoa : ControllerBase
    {
        [HttpGet("obter/{id:int}")]
        public async Task<IActionResult> ObterEnderecoxPessoaPeloUsuario(
          [FromRoute] int id,
          [FromServices] ModelContext context)
        {
            try
            {
                var endereco = await context
                    .Enderecos
                    .Include(e => e.Enderecoxpessoas)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (endereco == null)
                {
                    return NotFound();
                }

                var enderecoxpessoa = endereco.Enderecoxpessoas.ToList();

                return Ok(enderecoxpessoa);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Não foi possível obter as informações");
            }
        }

        [HttpDelete("deletar/{id:int}")]
        public async Task<IActionResult> DeletarUsuario(
            [FromRoute] int id,
            [FromServices] ModelContext context)
        {
            try
            {
                var enderecoxpessoa = await context.Enderecoxpessoas.FindAsync(id);

                if (enderecoxpessoa == null)
                {
                    return NotFound("Enderecoxpessoa não encontrado");
                }

                var pessoa = enderecoxpessoa.Pessoa;

                context.Enderecoxpessoas.Remove(enderecoxpessoa);
                await context.SaveChangesAsync();

                if (pessoa != null)
                {
                    context.Pessoas.Remove(pessoa);
                    await context.SaveChangesAsync();
                }

                return Ok("Usuário deletado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Não foi possível deletar o usuário");
            }
        }

    }
}
