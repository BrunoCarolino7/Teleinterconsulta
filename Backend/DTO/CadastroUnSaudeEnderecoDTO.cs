using Blog.ViewModel.EnderecoViewModel;
using Blog.ViewModel.EnderecoXPessoaViewModel;
using Blog.ViewModel.PessoaViewModel;
using Blog.ViewModel.TipoEnderecoViewModel;
using Blog.ViewModel.TipoUnSaudeViewModel;
using Blog.ViewModel.UnSaudeViewModel;

namespace Blog.DTO
{
    public class CadastroUnSaudeEnderecoDTO
    {
        public RegisterEnderecoViewModel RegisterEnderecoViewModel { get; set; }
        public RegisterUnSaudeViewModel RegisterUnSaudeEnderecoViewModel { get; set; }
        public RegisterPessoaViewModel RegisterPessoaViewModel { get; set; }
        public RegisterTipoEnderecoViewModel RegisterTipoEnderecoViewModel { get; set; }
        public RegisterTipoUnSaudeViewModel RegisterTipoUnSaudeViewModel { get; set; }
        public RegisterEnderecoXPessoaViewModel RegisterEnderecoXPessoaViewModel { get; set; }
    }
}
