using Blog.Context;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controller
{
    [ApiController]
    [Route("enderecoxpessoa")]
    public class EnderecoxPessoa : ControllerBase
    {

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
