using Blog.Context;
using Blog.DTO;
using Blog.Models;
using Blog.ViewModel;
using Blog.ViewModel.EnderecoViewModel;
using Blog.ViewModel.EnderecoXPessoaViewModel;
using Blog.ViewModel.PessoaViewModel;
using Blog.ViewModel.TipoEnderecoViewModel;
using Blog.ViewModel.TipoUnSaudeViewModel;
using Blog.ViewModel.UnSaudeViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controller;

[ApiController]
[Route("unsaude")]
public class UnSaudeController : ControllerBase
{
    [HttpGet("obter/nomatch/{id:int}")]
    public async Task<IActionResult> GetAsync([FromServices] ModelContext context, [FromRoute] int id)
    {
        try
        {
            var todasUnSaude = await context.UnSaudes.Where(b => b.Perfilid == 2).ToListAsync();

            var pessoa = await context
                .Pessoas
                .Include(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.Endereco)
                .ThenInclude(b => b.UnSaude)
                .ThenInclude(b => b.Perfil)
                .FirstOrDefaultAsync(b => b.Id == id);


            if (pessoa == null)
            {
                return NotFound();
            }

            var unSaudeExcluidas = todasUnSaude
                .Where(b => pessoa.Enderecoxpessoas != null && !pessoa.Enderecoxpessoas
                .Any(e => e.Endereco != null && e.Endereco.UnSaude != null && e.Endereco.UnSaude.Id == b.Id))
                .ToList();

            if (unSaudeExcluidas == null)
            {
                return NotFound();
            }

            return Ok(unSaudeExcluidas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Ocorreu um erro interno. Entre em contato com o suporte.");
        }
    }

    [HttpGet("obter/{id:int}")]
    public async Task<IActionResult> ObterTodasUnSaude([FromServices] ModelContext context, [FromRoute] int id)
    {
        var unsaude = await context
            .UnSaudes
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id);

        return Ok(unsaude);
    }

    [HttpGet("obter/espec/{id:int}")]
    public async Task<IActionResult> GetUnSaudePorEspecialidade([FromServices] ModelContext context, [FromRoute] int id)
    {
        var unsaude = await context
            .UnSaudes
            .Include(b => b.Enderecos)
            .ThenInclude(b => b.Enderecoxespecialidades)
            .ThenInclude(b => b.Especialidade)
            .FirstOrDefaultAsync(b => b.Id == id);

        return Ok(unsaude);
    }

    [HttpGet("obter")]
    public async Task<IActionResult> ObterTodasUnSaude([FromServices] ModelContext context)
    {
        var unsaude = await context
            .UnSaudes
            .AsNoTracking()
            .Where(b => b.Perfilid == 2)
            .ToListAsync();

        return Ok(unsaude);
    }

    [HttpGet("obter/cnpj")]
    public async Task<IActionResult> ObterTodasUnSaudePeloCnpj(
    [FromServices] ModelContext context,
    [FromQuery] string cnpj)
    {
        var unsaude = await context
            .UnSaudes
            .Include(b => b.Enderecos)
            .ThenInclude(b => b.Enderecoxpessoas)
            .FirstOrDefaultAsync(b => b.Cnpj == cnpj);

        return Ok(unsaude);
    }



    [HttpGet("obter/externas")]
    public async Task<IActionResult> ObterUnSaudesExternas([FromServices] ModelContext context)
    {
        var unsaude = await context
            .Perfils
            .AsNoTracking()
            .Include(b => b.UnSaudes)
            .ThenInclude(b => b.Enderecos)
            .Where(b => b.Id == 2)
            .ToListAsync();

        return Ok(unsaude);
    }

    [HttpGet("obter/gestor/{id:int}")]
    public async Task<IActionResult> ObterGestorUnSaude([FromServices] ModelContext context, [FromRoute] int id)
    {
        var unsaude = await context
            .UnSaudes
            .Include(b => b.Enderecos)
            .ThenInclude(b => b.Enderecoxpessoas)
            .ThenInclude(b => b.Pessoa)
            .FirstOrDefaultAsync(b => b.Id == id);

        return Ok(unsaude);
    }

    [HttpGet("profissionais/{id:int}")]
    public async Task<IActionResult> GetProfissionaisAsync(
        [FromServices] ModelContext context,
        [FromRoute] int id)
    {
        var unsaude = await context
             .UnSaudes
            .Include(b => b.Enderecos)
            .ThenInclude(b => b.Enderecoxpessoas)
            .ThenInclude(b => b.Pessoa)
            .Where(c => c.Id == id)
            .ToListAsync();


        return Ok(unsaude);
    }

    [HttpPost("cadastrar")]
    public async Task<IActionResult> Post(
        [FromServices] ModelContext context,
        [FromBody] CadastroUnSaudeEnderecoDTO cadastroUnSaudeEnderecoDTO)
    {
        RegisterUnSaudeViewModel unSaude = cadastroUnSaudeEnderecoDTO.RegisterUnSaudeEnderecoViewModel;
        RegisterEnderecoViewModel Endereco = cadastroUnSaudeEnderecoDTO.RegisterEnderecoViewModel;
        RegisterTipoEnderecoViewModel TipoEndereco = cadastroUnSaudeEnderecoDTO.RegisterTipoEnderecoViewModel;
        RegisterTipoUnSaudeViewModel TipoUnSaude = cadastroUnSaudeEnderecoDTO.RegisterTipoUnSaudeViewModel;
        RegisterEnderecoXPessoaViewModel enderecoxpessoa = cadastroUnSaudeEnderecoDTO.RegisterEnderecoXPessoaViewModel;

        //var unsaudes = context.UnSaudes.FirstOrDefaultAsync(b => b.Cnpj == unSaude.Cnpj);

        //if (unsaudes is not null)
        //    return StatusCode(401, new ResultViewModel<string>("Unidade de saude ja cadastrada"));

        //var x = await context.TipoProfissionals.FindAsync(2);


        try
        {
            var perfil = await context.Perfils.FindAsync(2);
            var roles = await context.Roles.FindAsync(3);

            var unsaude = new UnSaude
            {
                Cnpj = unSaude.Cnpj,
                Razaosocial = unSaude.Razaosocial,
                Nomefantasia = unSaude.Nomefantasia,
                Perfilid = perfil?.Id ?? 2
            };

            await context.UnSaudes.AddAsync(unsaude);
            await context.SaveChangesAsync();

            var tipoendereco = new TipoEndereco
            {
                Descricao = TipoEndereco.Descricao,
            };

            await context.TipoEnderecos.AddAsync(tipoendereco);
            await context.SaveChangesAsync();

            var tipounsaude = new TipoUnSaude
            {
                Descricao = TipoUnSaude.Descricao,
            };

            await context.TipoUnSaudes.AddAsync(tipounsaude);
            await context.SaveChangesAsync();

            var endereco = new Endereco
            {
                Cep = Endereco.Cep,
                Pais = Endereco.Pais,
                Estado = Endereco.Estado,
                Cidade = Endereco.Cidade,
                Bairro = Endereco.Bairro,
                Logradouro = Endereco.Logradouro,
                Numero = Endereco.Numero,
                Nome = Endereco.Nome,
                Telefone = Endereco.Telefone,
                Telefone2 = Endereco.Telefone2,
                TipoEnderecoid = tipoendereco.Id,
                TipoUnSaudeid = tipounsaude.Id,
                UnSaudeid = unsaude.Id,
            };

            await context.Enderecos.AddAsync(endereco);
            await context.SaveChangesAsync();

            var enderecoxpessoas = new Enderecoxpessoa
            {
                Enderecoid = endereco.Id,
                Pessoaid = enderecoxpessoa.PessoaId,
                TipoUsuario = context.TipoUsuarios.Find(2),
                TipoProfissionalid = enderecoxpessoa.TipoProfissionalId,
                Roles = roles,
            };

            await context.Enderecoxpessoas.AddAsync(enderecoxpessoas);
            await context.SaveChangesAsync();

            return Ok("Criado");
        }
        catch (DbUpdateException)
        {
            return StatusCode(400, new ResultViewModel<string>("Erro no banco de dados!"));
        }
        catch
        {
            return StatusCode(500, "Erro interno");
        }
    }

    [HttpPost("cadastrar/pessoa")]
    public async Task<IActionResult> CadastrarPessoaUnSaude(
        [FromServices] ModelContext context,
        [FromBody] CadastroUnSaudeEnderecoDTO cadastroUnSaudeEnderecoDTO)
    {
        RegisterPessoaViewModel pessoa = cadastroUnSaudeEnderecoDTO.RegisterPessoaViewModel;
        RegisterEnderecoXPessoaViewModel enderecoxpessoa = cadastroUnSaudeEnderecoDTO.RegisterEnderecoXPessoaViewModel;

        try
        {
            var perfil = await context.Perfils.FindAsync(2);
            var roles = await context.Roles.FindAsync(3);

            Pessoa novaPessoa = new()
            {
                Cpf = pessoa.Cpf,
                Nome = pessoa.Nome,
                Ddd = pessoa.Ddd,
                Telefone = pessoa.Telefone,
                Ddd2 = pessoa.Ddd2,
                Telefone2 = pessoa.Telefone2,
                Email = pessoa.Email,
                Emailalternativo = pessoa.Emailalternativo,
                Numeroconselho = pessoa.Numeroconselho
            };

            await context.AddAsync(novaPessoa);
            await context.SaveChangesAsync();


            var enderecoxpessoas = new Enderecoxpessoa
            {
                Enderecoid = enderecoxpessoa.Enderecoid,
                Pessoaid = novaPessoa.Id,
                TipoUsuario = context.TipoUsuarios.Find(2),
                TipoProfissionalid = enderecoxpessoa.TipoProfissionalId,
                Roles = roles,
            };

            await context.Enderecoxpessoas.AddAsync(enderecoxpessoas);
            await context.SaveChangesAsync();

            return Ok("Criado");
        }
        catch (DbUpdateException)
        {
            return StatusCode(400, new ResultViewModel<string>("Erro no banco de dados!"));
        }
        catch
        {
            return StatusCode(500, "Erro interno");
        }
    }

    [HttpPost("cadastrar/existente/{id:int}")]
    public async Task<IActionResult> CadastrarUnSaudeExistente(
        [FromServices] ModelContext context,
        [FromBody] CadastroUnSaudeEnderecoDTO cadastroUnSaudeEnderecoDTO,
        [FromRoute] int id)
    {
        RegisterEnderecoXPessoaViewModel enderecoxpessoa = cadastroUnSaudeEnderecoDTO.RegisterEnderecoXPessoaViewModel;

        try
        {
            var pessoa = await context
                .Pessoas
                .Include(b => b.Enderecoxpessoas)
                .ThenInclude(b => b.Roles)
                .FirstOrDefaultAsync(b => b.Id == id);

            var enderecoxpessoas = new Enderecoxpessoa
            {
                Enderecoid = enderecoxpessoa.Enderecoid,
                Pessoaid = pessoa!.Id,
                TipoUsuario = context.TipoUsuarios.Find(2),
                TipoProfissional = context.TipoProfissionals.Find(1),
                Roles = context.Roles.Find(3),
            };

            await context.Enderecoxpessoas.AddAsync(enderecoxpessoas);
            await context.SaveChangesAsync();

            return Ok("Criado");
        }
        catch (DbUpdateException)
        {
            return StatusCode(400, new ResultViewModel<string>("Erro no banco de dados!"));
        }
        catch
        {
            return StatusCode(500, "Erro interno");
        }
    }
}