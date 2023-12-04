using Blog.Context;
using Blog.DTO;
using Blog.Models;
using Blog.ViewModel;
using Blog.ViewModel.CredenciamentoViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Xml.Linq;

namespace Blog.Controller
{
    [ApiController]
    [Route("credenciamento")]
    public class CredenciamentoController : ControllerBase
    {

        [HttpGet("obter/{id:int}")]
        public async Task<IActionResult> ObterCredenciamentosAsync(
             [FromServices] ModelContext context,
             [FromRoute] int id)
        {
            var listarCredenciamentos = await context
                .Credenciamentos
                .AsNoTracking()
                .Include(b => b.Enderecosolicitante)
                .ThenInclude(b => b.UnSaude)
                .Include(b => b.Avaliacaos)
                .Include(b => b.Enderecosolicitado)
                .ThenInclude(b => b.UnSaude)
                .Include(b => b.Enderecosolicitado)
                .ThenInclude(b => b.Enderecoxespecialidades)
                .ThenInclude(b => b.Especialidade)
                .Include(b => b.Enderecosolicitante)
                .ThenInclude(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.Pessoa)
                .Where(c => c.Enderecosolicitante!.Id == id)
                .Where(b => b.Status == 1)
                .ToListAsync();

            return Ok(listarCredenciamentos);
        }


        [HttpPost("criar")]
        public async Task<IActionResult> CriarCredenciamentoAsync(
            [FromServices] ModelContext context,
            [FromBody] CadastroCredenciamentoDTO credenciamentoDTO)
        {
            RegisterCredenciamentoViewModel registerCredenciamento = credenciamentoDTO.RegisterCredenciamentoViewModel;            

            try
            {
                Credenciamento credenciamento = new()
                {
                    Enderecosolicitanteid = registerCredenciamento.Enderecosolicitanteid,
                    Enderecosolicitadoid = registerCredenciamento.Enderecosolicitadoid,
                    Enderecoxpessoaid = registerCredenciamento.Enderecoxpessoaid,
                    Status = 1
                };                

                var date = DateTime.Now;
                date = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second, date.Kind);
                credenciamento.Datasolicred = date;

                await context.AddAsync(credenciamento);
                await context.SaveChangesAsync();

                return Ok(new ResultViewModel<string>("Criado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("deletar/{id:int}")]
        public async Task<IActionResult> DeletarCredenciamento(
            [FromServices] ModelContext context,
            [FromRoute] int id)
        {

            var credenciamento = await context
                .Credenciamentos
                .FirstOrDefaultAsync(b => b.Id == id);

            credenciamento!.Status = 0;

            context.Update(credenciamento!);
            await context.SaveChangesAsync();

            return Ok(new ResultViewModel<string>("Deletado com sucesso"));
        }
    }
}
