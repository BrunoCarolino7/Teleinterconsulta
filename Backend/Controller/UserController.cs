using Blog.Context;
using Blog.DTO;
using Blog.Extensions;
using Blog.Models;
using Blog.Services;
using Blog.ViewModel;
using Blog.ViewModel.PessoaViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controller
{
    [ApiController]
    [Route("usuario")]
    public class UserController : ControllerBase
    {
        [HttpGet("get")]
        public async Task<IActionResult> GetTotalUnSaudeAsync([FromServices] ModelContext context)
        {
            var pessoas = await context
                .Pessoas
                .AsNoTracking()
                .Include(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.Endereco)
                .ThenInclude(b => b!.UnSaude)
                .ToListAsync();
            return Ok(pessoas);
        }

        [HttpPost("obter/cpf")]
        public async Task<IActionResult> ObterProfissionalPeloCpf(
            [FromServices] ModelContext context,
            [FromBody] LoginPessoaViewModel model)
        {
            try
            {
                var pessoas = await context
                    .Pessoas
                    .AsNoTracking()
                    .FirstOrDefaultAsync(b => b.Cpf == model.Cpf);

                if (pessoas == null)
                    return StatusCode(404, "usuario não encontrado");


                return Ok(pessoas);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("obter/{id:int}")]
        public async Task<IActionResult> GetPessoaUnSaudeId(
        [FromServices] ModelContext context,
        [FromRoute] int id)
        {
            var unsaude = await context
                .Pessoas
                .AsNoTracking()
                .Include(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.Endereco)
                .ThenInclude(b => b!.UnSaude)
                .FirstOrDefaultAsync(b => b.Id == id);

            return Ok(unsaude);
        }


        [HttpGet("obter/meuperfil/{id:int}")]
        public async Task<IActionResult> ObterMeuPerifilAsync(
         [FromServices] ModelContext context,
         [FromRoute] int id)
        {
            var unsaude = await context
                .Pessoas
                .AsNoTracking()
                .Include(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.TipoProfissional)
                .FirstOrDefaultAsync(b => b.Id == id);

            return Ok(unsaude);
        }

        [HttpPost("envia-codigo")]
        public async Task<IActionResult> EnviaCodigo(
            [FromServices] ModelContext context,
            [FromBody] RegisterPessoaViewModel model)
        {

            if (model.Settoken == "2")
            {
                Pessoa pessoa = new()
                {
                    Cpf = model.Cpf,
                    Email = model.Email
                };

                pessoa.EnviaTokenPorEmail();

                context.Update(pessoa);
                await context.SaveChangesAsync();
                return StatusCode(200, pessoa);
            }
            else
            {
                Pessoa pessoa = new()
                {
                    Cpf = model.Cpf,
                    Telefone = model.Telefone
                };

                //pessoa.EnviaTokenPorSms();

                context.Update(pessoa);
                await context.SaveChangesAsync();
                return StatusCode(200, pessoa);
            }
        }

        [HttpPut("verifica-codigo")]
        public async Task<IActionResult> PrimeiroCadastroAsync(
            [FromBody] RegisterPessoaViewModel model,
            [FromServices] ModelContext context)
        {
            var pessoa = await context.Pessoas.FirstOrDefaultAsync(b => b.Cpf == model.Cpf);
            if (pessoa == null)
                return StatusCode(404, new ResultViewModel<string>("Pessoa não encontrada!"));
            try
            {
                pessoa.Codigo = model.Codigo;
                return Ok(new ResultViewModel<string>("Informações da pessoa atualizadas com sucesso!"));
            }
            catch (DbUpdateException)
            {
                return StatusCode(400, new ResultViewModel<string>("Erro no banco de dados!"));
            }
            catch (Exception)
            {
                return StatusCode(500, new ResultViewModel<string>("05X04 - Falha interna no servidor"));
            }
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> PostAsync(
        [FromBody] CadastroUsuarioComumDTO cadastroUsuComDTO,
        [FromServices] ModelContext context,
        [FromServices] TokenServices tokenServices)
        {
            RegisterPessoaViewModel Pessoa = cadastroUsuComDTO.RegisterPessoaViewModel!;

            //var perfil = await context.Perfils.FindAsync(1); //Externo
            //var tipousuario = await context.TipoUsuarios.FindAsync(2); //Comum ou adm ( comum )
            //var tipoprofissional = await context.TipoProfissionals.FindAsync(1); // master, Gestorespecialidade, comum (comum)
            {
                var BuscaPessoa = await context
                    .Pessoas
                    .FirstOrDefaultAsync(b => b.Cpf == Pessoa.Cpf);

                if (BuscaPessoa is not null)
                    return StatusCode(401, "Usúário já cadastrado");


                var pessoa = new Pessoa
                {
                    Cpf = Pessoa.Cpf,
                    Nome = Pessoa.Nome,
                    Ddd = Pessoa.Ddd,
                    Telefone = Pessoa.Telefone,
                    Ddd2 = Pessoa.Ddd2,
                    Telefone2 = Pessoa.Telefone2,
                    Email = Pessoa.Email,
                    Emailalternativo = Pessoa.Emailalternativo,
                    Numeroconselho = Pessoa.Numeroconselho
                };
                await context.Pessoas.AddAsync(pessoa);
                await context.SaveChangesAsync();

                var usuario = await context
                     .Pessoas
                     .AsNoTracking()
                     .Include(b => b.Enderecoxpessoas)
                     .ThenInclude(b => b.Roles)
                     .FirstOrDefaultAsync(b => b.Id == pessoa.Id);
                try
                {
                    var token = tokenServices.GerarToken(usuario!, null!);
                    return Ok(new ResultViewModel<string>(token, null!));
                }
                catch (DbUpdateException)
                {
                    return StatusCode(400, new ResultViewModel<string>("Erro no banco de dados!"));
                }
                catch
                {
                    return StatusCode(500, new ResultViewModel<string>("05X04 - Falha interna no servidor"));
                }
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginPessoaViewModel model,
            [FromServices] ModelContext context,
            [FromServices] TokenServices tokenServices)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ResultViewModel<string>(ModelState.GetErrors()));

            var usuario = await context
                 .Pessoas
                 .Include(b => b.Enderecoxpessoas)
                 .ThenInclude(b => b.Roles)
                 .FirstOrDefaultAsync(b => b.Cpf == model.Cpf);

            if (usuario is null)
                return StatusCode(404, "usuario não encontrado");


            if (usuario!.Cpf == model.Cpf && usuario!.Codigo is not null)
            {
                DateTime codigoExpirado = usuario.CodigoExpirado ?? DateTime.MinValue;

                if (DateTime.Now >= codigoExpirado)
                {
                    // Código expirou
                    usuario.Codigo = null;
                    context.Update(usuario);
                    await context.SaveChangesAsync();
                    return StatusCode(405, "codigo expirado");
                }
                else
                {
                    if (usuario.Codigo == model.Codigo)
                    {

                        var enderecoxpessoas = await context
                       .Enderecoxpessoas
                       .Include(b => b.Pessoa)
                       .Include(b => b.Roles)
                       .FirstOrDefaultAsync(b => b.Id == usuario.Id);

                        usuario.Codigo = null;
                        context.Update(usuario);
                        await context.SaveChangesAsync();
                        var token = tokenServices.GerarToken(usuario, enderecoxpessoas);
                        return Ok(new ResultViewModel<string>(token, null!));
                    }
                    else
                    {
                        return StatusCode(406, "codigo inválido");
                    }
                }
            }
            else if (usuario!.Cpf == model.Cpf && model.SetToken == "1" && usuario!.Codigo is null)
            {
                await usuario!.EnviaTokenPorSms();
                context.Update(usuario);
                await context.SaveChangesAsync();
                return Ok(usuario);
            }
            else if (usuario!.Cpf == model.Cpf && model.SetToken == "2" && usuario!.Codigo is null)
            {
                usuario!.EnviaTokenPorEmail();
                context.Update(usuario);
                await context.SaveChangesAsync();
                return Ok(usuario);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("altera-permissao/{id:int}")]
        public async Task<IActionResult> AlteraPermissaoProfissional(
            [FromServices] ModelContext context,
            [FromRoute] int id)
        {
            try
            {
                var endereco = await context
                    .Enderecoxpessoas
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (endereco == null)
                {
                    return NotFound();
                }

                if (endereco.Rolesid == 1 || endereco.Rolesid == 2)
                {
                    endereco.Rolesid = (endereco.Rolesid == 1) ? 2 : 1;
                    context.Update(endereco);
                    await context.SaveChangesAsync();
                    return Ok(endereco);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpPost("permissao/{id:int}/{idend:int}")]
        public async Task<IActionResult> PostPermissao(
            [FromServices] ModelContext context,
            [FromRoute] int id,
            [FromRoute] int idend,
            [FromServices] TokenServices tokenServices)
        {
            var usuario = await context
                        .Pessoas
                        .AsNoTracking()
                        .Include(b => b.Enderecoxpessoas)
                        .ThenInclude(b => b.Roles)
                        .FirstOrDefaultAsync(b => b.Id == id);

            if (usuario == null)
                return StatusCode(401, new ResultViewModel<string>("Usuário não encontrado"));

            var enderecoxpessoas = await context
             .Enderecoxpessoas
             .AsNoTracking()
             .Include(b => b.Pessoa)
             .Include(b => b.Roles)
             .FirstOrDefaultAsync(b => b.Id == idend);

            var token = tokenServices.GerarToken(usuario, enderecoxpessoas);

            return Ok(new ResultViewModel<string>(token, null));
        }

        [HttpPut("editar/{id:int}")]
        public async Task<IActionResult> EditarUsuarioAsync(
            [FromServices] ModelContext context,
            [FromBody] EditarPessoaViewModel model,
            [FromRoute] int id)

        {
            try
            {
                var usuario = await context
                        .Pessoas
                        .Include(b => b.Enderecoxpessoas)
                        .FirstOrDefaultAsync(b => b.Id == id);


                if (usuario is not null)
                {
                    usuario.Nome = model.Nome;
                    usuario.Ddd = model.Ddd;
                    usuario.Telefone = model.Telefone;
                    usuario.Ddd2 = model.Ddd2;
                    usuario.Telefone2 = model.Telefone2;
                    usuario.Email = model.Email;
                    usuario.Emailalternativo = model.Emailalternativo;
                    usuario.Numeroconselho = model.Numeroconselho;

                }
                context.Pessoas.Update(usuario!);
                await context.SaveChangesAsync();

                return Ok("Usuario atualizado");

            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new ResultViewModel<Pessoa>("05XE8 - Não foi possível alterar a categoria"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultViewModel<Pessoa>("05X11 - Falha interna no servidor"));
            }
        }

        [HttpPut("editar")]
        public async Task<IActionResult> EditarUsuarioPeloCpfAsync(
           [FromServices] ModelContext context,
           [FromBody] EditarPessoaViewModel model,
           [FromServices] TokenServices tokenServices)

        {
            var usuario = await context
                    .Pessoas
                    .FirstOrDefaultAsync(b => b.Cpf == model.Cpf);
            try
            {
                if (usuario is not null)
                {
                    usuario.Nome = model.Nome;
                    usuario.Ddd = model.Ddd;
                    usuario.Telefone = model.Telefone;
                    usuario.Ddd2 = model.Ddd2;
                    usuario.Telefone2 = model.Telefone2;
                    usuario.Email = model.Email;
                    usuario.Emailalternativo = model.Emailalternativo;
                    usuario.Numeroconselho = model.Numeroconselho;
                }

                var pessoa = await context
                     .Pessoas
                     .AsNoTracking()
                     .Include(b => b.Enderecoxpessoas)
                     .ThenInclude(b => b.Roles)
                     .FirstOrDefaultAsync(b => b.Id == usuario!.Id);

                context.Update(usuario!);
                await context.SaveChangesAsync();
                var token = tokenServices.GerarToken(usuario!, null!);
                return Ok(new ResultViewModel<string>(token, null!));
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new ResultViewModel<Pessoa>("05XE8 - Não foi possível alterar a os dados"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResultViewModel<Pessoa>("05X11 - Falha interna no servidor"));
            }
        }
    }
}