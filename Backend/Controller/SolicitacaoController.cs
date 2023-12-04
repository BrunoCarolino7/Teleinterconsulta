using Blog.Context;
using Blog.DTO;
using Blog.Models;
using Blog.ViewModel.PacienteViewModel;
using Blog.ViewModel.SolicitacaoViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controller
{
    [ApiController]
    [Route("solicitacao")]
    public class SolicitacaoController : ControllerBase
    {
        [HttpPost("criar")]
        public async Task<IActionResult> CriarSolicitacao(
            [FromServices] ModelContext context,
            [FromBody] CadastroSolicitacaoDTO cadastroSolicitacaoDTO)
        {
            RegisterPacienteViewModel paciente = cadastroSolicitacaoDTO.RegisterPacienteViewModel;
            RegisterSolicitacaoViewModel solicitacao = cadastroSolicitacaoDTO.RegisterSolicitacaoViewModel;

            try
            {
                Paciente novoPaciente = new()
                {
                    Nome = paciente.Nome,
                    Datanascimento = paciente.Datanascimento,
                    Genero = paciente.Genero,
                    Nomemae = paciente.Nomemae,
                    Cpf = paciente.Cpf,
                    Justificativasolicitacao = paciente.Justificativasolicitacao,
                    Historiapaciente = paciente.Historiapaciente,
                };

                await context.Pacientes.AddAsync(novoPaciente);
                await context.SaveChangesAsync();

                Solicitacao novaSolicitacao = new()
                {
                    Datasolicitacao = DateTime.UtcNow,
                    Statusaprovacao = solicitacao.Statusaprovacao,
                    Justificativa = solicitacao.Justificativa,
                    Enderecoid = solicitacao.Enderecoid,
                    Enderecosolicitanteid = solicitacao.Enderecosolicitanteid,
                    Enderecoxespecialidadeid = solicitacao.Enderecoxespecialidadeid,
                    Enderecosolicitadoid = solicitacao.Enderecosolicitadoid,
                    Enderecoxpessoaid = solicitacao.Enderecoxpessoaid,
                    //Agendamentoid = solicitacao.Agendamentoid,
                    Pacienteid = novoPaciente.Pacienteid
                };

                await context.Solicitacaos.AddAsync(novaSolicitacao);
                await context.SaveChangesAsync();

                return Ok("Criado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("obter")]
        public async Task<IActionResult> ObterAsync(
           [FromServices] ModelContext context)
        {
            var solicitacao = await context.Solicitacaos.FirstOrDefaultAsync();
            return Ok(solicitacao);
        }
    }
}


