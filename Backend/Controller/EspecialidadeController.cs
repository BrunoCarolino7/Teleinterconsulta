using Blog.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controller
{
    [ApiController]
    [Route("especialidade")]
    public class EspecialidadeController : ControllerBase
    {
        [HttpGet("obter")]
        public async Task<IActionResult> GetEspecialidadePorUnSaude([FromServices] ModelContext context)
        {
            var especPorUnSaude = await context
            .Especialidades
            .AsNoTracking()
            .Include(b => b.Enderecoxespecialidades)
            .ThenInclude(b => b.Endereco)
            .ThenInclude(b => b!.UnSaude)
            .ToListAsync();

            return Ok(especPorUnSaude);
        }
    }
}
