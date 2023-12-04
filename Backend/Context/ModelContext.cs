using Blog.Models;
using Microsoft.EntityFrameworkCore;

namespace Blog.Context;

public partial class ModelContext : DbContext
{
    public ModelContext()
    {
    }

    public ModelContext(DbContextOptions<ModelContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agendamento> Agendamentos { get; set; }

    public virtual DbSet<Avaliacao> Avaliacaos { get; set; }

    public virtual DbSet<Conclusao> Conclusaos { get; set; }

    public virtual DbSet<Credenciamento> Credenciamentos { get; set; }

    public virtual DbSet<Datahoradisponivel> Datahoradisponivels { get; set; }

    public virtual DbSet<Endereco> Enderecos { get; set; }

    public virtual DbSet<Enderecoxespecialidade> Enderecoxespecialidades { get; set; }

    public virtual DbSet<Enderecoxpessoa> Enderecoxpessoas { get; set; }

    public virtual DbSet<Enderecoxpessoaxespecialidade> Enderecoxpessoaxespecialidades { get; set; }

    public virtual DbSet<Especialidade> Especialidades { get; set; }

    public virtual DbSet<Exame> Exames { get; set; }

    public virtual DbSet<Imagem> Imagems { get; set; }

    public virtual DbSet<Opcaodatahora> Opcaodatahoras { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<Perfil> Perfils { get; set; }

    public virtual DbSet<Pessoa> Pessoas { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Solicitacao> Solicitacaos { get; set; }

    public virtual DbSet<TipoEndereco> TipoEnderecos { get; set; }

    public virtual DbSet<TipoProfissional> TipoProfissionals { get; set; }

    public virtual DbSet<TipoUnSaude> TipoUnSaudes { get; set; }

    public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }

    public virtual DbSet<UnSaude> UnSaudes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseOracle("Data Source=AGE;User Id=usr_teleinter;Password=interconsulta");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("USR_TELEINTER");

        modelBuilder.Entity<Agendamento>(entity =>
        {
            entity.HasKey(e => e.Agendamentoid).HasName("SYS_C0096169764");

            entity.ToTable("AGENDAMENTO");

            entity.Property(e => e.Agendamentoid)

                .HasColumnName("AGENDAMENTOID");
            entity.Property(e => e.Datahora)
                .HasPrecision(6)
                .HasColumnName("DATAHORA");
            entity.Property(e => e.Descricao)
                .HasMaxLength(500)

                .HasColumnName("DESCRICAO");
            entity.Property(e => e.Linkteleinter)
                .HasMaxLength(100)

                .HasColumnName("LINKTELEINTER");
            entity.Property(e => e.Statusagendamento)
                .HasMaxLength(50)

                .HasColumnName("STATUSAGENDAMENTO");
        });

        modelBuilder.Entity<Avaliacao>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169776");

            entity.ToTable("AVALIACAO");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Credenciamentoid)

                .HasColumnName("CREDENCIAMENTOID");
            entity.Property(e => e.Dataaprovacao)
                .HasPrecision(6)
                .HasColumnName("DATAAPROVACAO");
            entity.Property(e => e.Datadescredenciamento)
                .HasPrecision(6)
                .HasColumnName("DATADESCREDENCIAMENTO");
            entity.Property(e => e.Enderecoxespecialidadeid)

                .HasColumnName("ENDERECOXESPECIALIDADEID");
            entity.Property(e => e.Justificativadescred)
                .HasMaxLength(2000)

                .HasColumnName("JUSTIFICATIVADESCRED");
            entity.Property(e => e.Pessoaavaliadorid)

                .HasColumnName("PESSOAAVALIADORID");
            entity.Property(e => e.Pessoaid)

                .HasColumnName("PESSOAID");
            entity.Property(e => e.Pessoasolicidescredid)

                .HasColumnName("PESSOASOLICIDESCREDID");
            entity.Property(e => e.Pessoasolicitanteid)

                .HasColumnName("PESSOASOLICITANTEID");
            entity.Property(e => e.Resultadoavaliacao)

                .HasColumnName("RESULTADOAVALIACAO");
            entity.Property(e => e.Statuscredenciamento)

                .HasColumnName("STATUSCREDENCIAMENTO");
            entity.Property(e => e.Textosolicitacao)
                .HasMaxLength(2000)

                .HasColumnName("TEXTOSOLICITACAO");

            entity.HasOne(d => d.Credenciamento).WithMany(p => p.Avaliacaos)
                .HasForeignKey(d => d.Credenciamentoid)
                .HasConstraintName("FK_CREDENCIAMENTOID");

            entity.HasOne(d => d.Enderecoxespecialidade).WithMany(p => p.Avaliacaos)
                .HasForeignKey(d => d.Enderecoxespecialidadeid)
                .HasConstraintName("FK_AVALIACAOENDXESPECID");

            entity.HasOne(d => d.Pessoaavaliador).WithMany(p => p.AvaliacaoPessoaavaliadors)
                .HasForeignKey(d => d.Pessoaavaliadorid)
                .HasConstraintName("FK_PESSOAAVALIADORID");

            entity.HasOne(d => d.Pessoa).WithMany(p => p.AvaliacaoPessoas)
                .HasForeignKey(d => d.Pessoaid)
                .HasConstraintName("FK_AVALIACAOPESSOAID");

            entity.HasOne(d => d.Pessoasolicidescred).WithMany(p => p.AvaliacaoPessoasolicidescreds)
                .HasForeignKey(d => d.Pessoasolicidescredid)
                .HasConstraintName("FK_PESSOASOLICIDESCREDID");

            entity.HasOne(d => d.Pessoasolicitante).WithMany(p => p.AvaliacaoPessoasolicitantes)
                .HasForeignKey(d => d.Pessoasolicitanteid)
                .HasConstraintName("FK_PESSOASOLICITANTEID");
        });

        modelBuilder.Entity<Conclusao>(entity =>
        {
            entity.HasKey(e => e.Solicitacaoid).HasName("SYS_C0096169766");

            entity.ToTable("CONCLUSAO");

            entity.HasIndex(e => e.Agendamentoid, "UQ_CONSLUSAO").IsUnique();

            entity.Property(e => e.Solicitacaoid)

                .HasColumnName("SOLICITACAOID");
            entity.Property(e => e.Acompanhanovateleinter)

                .HasColumnName("ACOMPANHANOVATELEINTER");
            entity.Property(e => e.Agendamentoid)

                .HasColumnName("AGENDAMENTOID");
            entity.Property(e => e.Descredorientacao)
                .HasMaxLength(2000)

                .HasColumnName("DESCREDORIENTACAO");
            entity.Property(e => e.Pessoaid)

                .HasColumnName("PESSOAID");
            entity.Property(e => e.Pessoarealizouid)

                .HasColumnName("PESSOAREALIZOUID");
            entity.Property(e => e.Pessoarecebeuid)

                .HasColumnName("PESSOARECEBEUID");
            entity.Property(e => e.Prazo)
                .HasPrecision(6)
                .HasColumnName("PRAZO");

            entity.HasOne(d => d.Agendamento).WithOne(p => p.Conclusao)
                .HasForeignKey<Conclusao>(d => d.Agendamentoid)
                .HasConstraintName("FK_CONCLUSAO_AGENDAMENTO");

            entity.HasOne(d => d.Pessoa).WithMany(p => p.ConclusaoPessoas)
                .HasForeignKey(d => d.Pessoaid)
                .HasConstraintName("FK_PESSOAID");

            entity.HasOne(d => d.Pessoarealizou).WithMany(p => p.ConclusaoPessoarealizous)
                .HasForeignKey(d => d.Pessoarealizouid)
                .HasConstraintName("FK_PESSOAREALIZOUID");

            entity.HasOne(d => d.Pessoarecebeu).WithMany(p => p.ConclusaoPessoarecebeus)
                .HasForeignKey(d => d.Pessoarecebeuid)
                .HasConstraintName("FK_PESSOARECEBEUID");
        });

        modelBuilder.Entity<Credenciamento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169770");

            entity.ToTable("CREDENCIAMENTO");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Datasolicred)
                .HasPrecision(6)               
                .HasColumnName("DATASOLICRED");
            entity.Property(e => e.Enderecosolicitadoid)
                .HasColumnName("ENDERECOSOLICITADOID");
            entity.Property(e => e.Enderecosolicitanteid)
                .HasColumnName("ENDERECOSOLICITANTEID");
            entity.Property(e => e.Enderecoxpessoaid)
                .HasColumnName("ENDERECOXPESSOAID");
            entity.Property(d => d.Status)
                .HasColumnName("STATUS");

            entity.HasOne(d => d.Enderecosolicitado).WithMany(p => p.CredenciamentoEnderecosolicitados)
                .HasForeignKey(d => d.Enderecosolicitadoid)
                .HasConstraintName("FK_CRED_ENDSOLICITADOID");

            entity.HasOne(d => d.Enderecosolicitante).WithMany(p => p.CredenciamentoEnderecosolicitantes)
                .HasForeignKey(d => d.Enderecosolicitanteid)
                .HasConstraintName("FK_CRED_ENDSOLICITANTEID");

            entity.HasOne(d => d.Enderecoxpessoa).WithMany(p => p.Credenciamentos)
                .HasForeignKey(d => d.Enderecoxpessoaid)
                .HasConstraintName("FK_CRED_ENDXPESSOAID");


        });

        modelBuilder.Entity<Datahoradisponivel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169778");

            entity.ToTable("DATAHORADISPONIVEL");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Datahorafinal)
                .HasPrecision(6)
                .HasColumnName("DATAHORAFINAL");
            entity.Property(e => e.Datahorainicial)
                .HasPrecision(6)
                .HasColumnName("DATAHORAINICIAL");
            entity.Property(e => e.Enderecoxespecialidadeid)

                .HasColumnName("ENDERECOXESPECIALIDADEID");

            entity.HasOne(d => d.Enderecoxespecialidade).WithMany(p => p.Datahoradisponivels)
                .HasForeignKey(d => d.Enderecoxespecialidadeid)
                .HasConstraintName("FK_DTHRENDXESPECID");
        });

        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169760");

            entity.ToTable("ENDERECO");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Bairro)
                .HasMaxLength(50)

                .HasColumnName("BAIRRO");
            entity.Property(e => e.Cep)
                .HasMaxLength(15)

                .HasColumnName("CEP");
            entity.Property(e => e.Cidade)
                .HasMaxLength(50)

                .HasColumnName("CIDADE");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)

                .HasColumnName("ESTADO");
            entity.Property(e => e.Logradouro)
                .HasMaxLength(200)

                .HasColumnName("LOGRADOURO");
            entity.Property(e => e.Nome)
                .HasMaxLength(200)

                .HasColumnName("NOME");
            entity.Property(e => e.Numero)

                .HasColumnName("NUMERO");
            entity.Property(e => e.Pais)
                .HasMaxLength(30)

                .HasColumnName("PAIS");
            entity.Property(e => e.Telefone)

                .HasColumnName("TELEFONE");
            entity.Property(e => e.Telefone2)

                .HasColumnName("TELEFONE2");
            entity.Property(e => e.TipoEnderecoid)

                .HasColumnName("TIPO_ENDERECOID");
            entity.Property(e => e.TipoUnSaudeid)

                .HasColumnName("TIPO_UN_SAUDEID");
            entity.Property(e => e.UnSaudeid)

                .HasColumnName("UN_SAUDEID");

            entity.HasOne(d => d.TipoEndereco).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.TipoEnderecoid)
                .HasConstraintName("FK_TIPOENDERECOID");

            entity.HasOne(d => d.TipoUnSaude).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.TipoUnSaudeid)
                .HasConstraintName("FK_TIPOUNSAUDEID");

            entity.HasOne(d => d.UnSaude).WithMany(p => p.Enderecos)
                .HasForeignKey(d => d.UnSaudeid)
                .HasConstraintName("FK_UNSAUDEID");
        });

        modelBuilder.Entity<Enderecoxespecialidade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169777");

            entity.ToTable("ENDERECOXESPECIALIDADE");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Enderecoid)

                .HasColumnName("ENDERECOID");
            entity.Property(e => e.Especialidadeid)

                .HasColumnName("ESPECIALIDADEID");

            entity.HasOne(d => d.Endereco).WithMany(p => p.Enderecoxespecialidades)
                .HasForeignKey(d => d.Enderecoid)
                .HasConstraintName("FK_ENDXESPEC_ENDID");

            entity.HasOne(d => d.Especialidade).WithMany(p => p.Enderecoxespecialidades)
                .HasForeignKey(d => d.Especialidadeid)
                .HasConstraintName("FK_ENDXESPECID");
        });

        modelBuilder.Entity<Enderecoxpessoa>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169771");

            entity.ToTable("ENDERECOXPESSOA");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)

                .HasColumnName("EMAIL");
            entity.Property(e => e.Enderecoid)

                .HasColumnName("ENDERECOID");
            entity.Property(e => e.Pessoaid)

                .HasColumnName("PESSOAID");
            entity.Property(e => e.Rolesid)

                .HasColumnName("ROLESID");
            entity.Property(e => e.Telefone)

                .HasColumnName("TELEFONE");
            entity.Property(e => e.TipoProfissionalid)

                .HasColumnName("TIPO_PROFISSIONALID");
            entity.Property(e => e.TipoUsuarioid)

                .HasColumnName("TIPO_USUARIOID");

            entity.HasOne(d => d.Endereco).WithMany(p => p.Enderecoxpessoas)
                .HasForeignKey(d => d.Enderecoid)
                .HasConstraintName("FK_ENDXPES_ENDID");

            entity.HasOne(d => d.Pessoa).WithMany(p => p.Enderecoxpessoas)
                .HasForeignKey(d => d.Pessoaid)
                .HasConstraintName("FK_ENDXPES_PESID");

            entity.HasOne(d => d.Roles).WithMany(p => p.Enderecoxpessoas)
                .HasForeignKey(d => d.Rolesid)
                .HasConstraintName("FK_ENDXPES_ROLES");

            entity.HasOne(d => d.TipoProfissional).WithMany(p => p.Enderecoxpessoas)
                .HasForeignKey(d => d.TipoProfissionalid)
                .HasConstraintName("FK_TIPOPROFISSIONALID");

            entity.HasOne(d => d.TipoUsuario).WithMany(p => p.Enderecoxpessoas)
                .HasForeignKey(d => d.TipoUsuarioid)
                .HasConstraintName("FK_TIPOUSUARIOID");
        });

        modelBuilder.Entity<Enderecoxpessoaxespecialidade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169780");

            entity.ToTable("ENDERECOXPESSOAXESPECIALIDADE");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Enderecoxpessoaid)

                .HasColumnName("ENDERECOXPESSOAID");
            entity.Property(e => e.Especialidadeid)

                .HasColumnName("ESPECIALIDADEID");

            entity.HasOne(d => d.Enderecoxpessoa).WithMany(p => p.Enderecoxpessoaxespecialidades)
                .HasForeignKey(d => d.Enderecoxpessoaid)
                .HasConstraintName("FK_ENDXPESXESPECID");

            entity.HasOne(d => d.Especialidade).WithMany(p => p.Enderecoxpessoaxespecialidades)
                .HasForeignKey(d => d.Especialidadeid)
                .HasConstraintName("FK_ESPECIALIDADEID");
        });

        modelBuilder.Entity<Especialidade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169779");

            entity.ToTable("ESPECIALIDADE");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
            entity.Property(e => e.TipoProfissionalid)

                .HasColumnName("TIPO_PROFISSIONALID");

            entity.HasOne(d => d.TipoProfissional).WithMany(p => p.Especialidades)
                .HasForeignKey(d => d.TipoProfissionalid)
                .HasConstraintName("FK_ESPEC_TIPOPROFID");
        });

        modelBuilder.Entity<Exame>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169769");

            entity.ToTable("EXAME");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Dataexame)
                .HasPrecision(6)
                .HasColumnName("DATAEXAME");
            entity.Property(e => e.Descricao)
                .HasMaxLength(300)

                .HasColumnName("DESCRICAO");
            entity.Property(e => e.Imagem)

                .HasColumnName("IMAGEM");
            entity.Property(e => e.Imagemlink)
                .HasMaxLength(150)

                .HasColumnName("IMAGEMLINK");
            entity.Property(e => e.Laudo)
                .HasMaxLength(300)

                .HasColumnName("LAUDO");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)

                .HasColumnName("NOME");
            entity.Property(e => e.Pacienteid)

                .HasColumnName("PACIENTEID");
            entity.Property(e => e.Tipoexame)
                .HasMaxLength(50)

                .HasColumnName("TIPOEXAME");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Exames)
                .HasForeignKey(d => d.Pacienteid)
                .HasConstraintName("FK_PACIENTEID");
        });

        modelBuilder.Entity<Imagem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169768");

            entity.ToTable("IMAGEM");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Dataimagem)
                .HasPrecision(6)
                .HasColumnName("DATAIMAGEM");
            entity.Property(e => e.Descricao)
                .HasMaxLength(100)

                .HasColumnName("DESCRICAO");
            entity.Property(e => e.Pacienteid)

                .HasColumnName("PACIENTEID");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Imagems)
                .HasForeignKey(d => d.Pacienteid)
                .HasConstraintName("FK_IMAGEMID");
        });

        modelBuilder.Entity<Opcaodatahora>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169767");

            entity.ToTable("OPCAODATAHORA");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Datahora)
                .HasPrecision(6)
                .HasColumnName("DATAHORA");
            entity.Property(e => e.Solicitacaoid)

                .HasColumnName("SOLICITACAOID");

            entity.HasOne(d => d.Solicitacao).WithMany(p => p.Opcaodatahoras)
                .HasForeignKey(d => d.Solicitacaoid)
                .HasConstraintName("FK_SOLICITACAOID");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.Pacienteid).HasName("SYS_C0096169765");

            entity.ToTable("PACIENTE");

            entity.Property(e => e.Pacienteid)

                .HasColumnName("PACIENTEID");
            entity.Property(e => e.Cpf)
                .HasMaxLength(20)

                .HasColumnName("CPF");
            entity.Property(e => e.Datanascimento)
                .HasPrecision(6)
                .HasColumnName("DATANASCIMENTO");
            entity.Property(e => e.Genero)
                .HasMaxLength(20)

                .HasColumnName("GENERO");
            entity.Property(e => e.Historiapaciente)
                .HasMaxLength(1000)

                .HasColumnName("HISTORIAPACIENTE");
            entity.Property(e => e.Justificativasolicitacao)
                .HasMaxLength(1000)

                .HasColumnName("JUSTIFICATIVASOLICITACAO");
            entity.Property(e => e.Nome)
                .HasMaxLength(150)

                .HasColumnName("NOME");
            entity.Property(e => e.Nomemae)
                .HasMaxLength(150)

                .HasColumnName("NOMEMAE");
        });

        modelBuilder.Entity<Perfil>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169758");

            entity.ToTable("PERFIL");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
        });

        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169775");

            entity.ToTable("PESSOA");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Cpf)
                .HasMaxLength(15)

                .HasColumnName("CPF");
            entity.Property(e => e.Ddd)

                .HasColumnName("DDD");
            entity.Property(e => e.Ddd2)

                .HasColumnName("DDD2");
            entity.Property(e => e.Email)
                .HasMaxLength(150)

                .HasColumnName("EMAIL");
            entity.Property(e => e.Emailalternativo)
                .HasMaxLength(150)

                .HasColumnName("EMAILALTERNATIVO");
            entity.Property(e => e.Nome)
                .HasMaxLength(150)

                .HasColumnName("NOME");
            entity.Property(e => e.Numeroconselho)

                .HasColumnName("NUMEROCONSELHO");
            entity.Property(e => e.Telefone)

                .HasColumnName("TELEFONE");
            entity.Property(e => e.Telefone2)

                .HasColumnName("TELEFONE2");
            entity.Property(e => e.Usuarioad)
                .HasMaxLength(50)
                .HasColumnName("USUARIOAD");

            entity.Property(b => b.Codigo)
                .HasMaxLength(4)
                .HasColumnName("CODIGO");

            entity.Property(b => b.CodigoExpirado)
                .HasPrecision(6)
                .HasColumnName("CODIGOEXPIRADO");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169772");

            entity.ToTable("ROLES");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Nome)
                .HasMaxLength(22)

                .HasColumnName("NOME");
        });

        modelBuilder.Entity<Solicitacao>(entity =>
        {
            entity.HasKey(e => e.Solicitacaoid).HasName("SYS_C0096169763");

            entity.ToTable("SOLICITACAO");

            entity.HasIndex(e => e.Agendamentoid, "UQ_AGENDAMENTO").IsUnique();

            entity.HasIndex(e => e.Pacienteid, "UQ_PACIENTE").IsUnique();

            entity.Property(e => e.Solicitacaoid)

                .HasColumnName("SOLICITACAOID");
            entity.Property(e => e.Agendamentoid)

                .HasColumnName("AGENDAMENTOID");
            entity.Property(e => e.Datasolicitacao)
                .HasPrecision(6)
                .HasColumnName("DATASOLICITACAO");
            entity.Property(e => e.Enderecoid)

                .HasColumnName("ENDERECOID");
            entity.Property(e => e.Enderecosolicitadoid)

                .HasColumnName("ENDERECOSOLICITADOID");
            entity.Property(e => e.Enderecosolicitanteid)

                .HasColumnName("ENDERECOSOLICITANTEID");
            entity.Property(e => e.Enderecoxespecialidadeid)

                .HasColumnName("ENDERECOXESPECIALIDADEID");
            entity.Property(e => e.Enderecoxpessoaid)

                .HasColumnName("ENDERECOXPESSOAID");
            entity.Property(e => e.Justificativa)
                .HasMaxLength(500)

                .HasColumnName("JUSTIFICATIVA");
            entity.Property(e => e.Pacienteid)

                .HasColumnName("PACIENTEID");
            entity.Property(e => e.Statusaprovacao)
                .HasMaxLength(50)

                .HasColumnName("STATUSAPROVACAO");

            entity.HasOne(d => d.Agendamento).WithOne(p => p.Solicitacao)
                .HasForeignKey<Solicitacao>(d => d.Agendamentoid)
                .HasConstraintName("FK_AGENDAMENTO");

            entity.HasOne(d => d.Endereco).WithMany(p => p.SolicitacaoEnderecos)
                .HasForeignKey(d => d.Enderecoid)
                .HasConstraintName("FK_ENDERECOID");

            entity.HasOne(d => d.Enderecosolicitado).WithMany(p => p.SolicitacaoEnderecosolicitados)
                .HasForeignKey(d => d.Enderecosolicitadoid)
                .HasConstraintName("FK_ENDERECOSOLICITADOID");

            entity.HasOne(d => d.Enderecosolicitante).WithMany(p => p.SolicitacaoEnderecosolicitantes)
                .HasForeignKey(d => d.Enderecosolicitanteid)
                .HasConstraintName("FK_ENDERECOSOLICITANTEID");

            entity.HasOne(d => d.Enderecoxespecialidade).WithMany(p => p.Solicitacaos)
                .HasForeignKey(d => d.Enderecoxespecialidadeid)
                .HasConstraintName("FK_ENDERECOXESPECIALIDADEID");

            entity.HasOne(d => d.Enderecoxpessoa).WithMany(p => p.Solicitacaos)
                .HasForeignKey(d => d.Enderecoxpessoaid)
                .HasConstraintName("FK_ENDERECOXPESSOAID");

            entity.HasOne(d => d.Paciente).WithOne(p => p.Solicitacao)
                .HasForeignKey<Solicitacao>(d => d.Pacienteid)
                .HasConstraintName("FK_PACIENTE_SOLIC");
        });

        modelBuilder.Entity<TipoEndereco>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169761");

            entity.ToTable("TIPO_ENDERECO");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
        });

        modelBuilder.Entity<TipoProfissional>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169774");

            entity.ToTable("TIPO_PROFISSIONAL");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
        });

        modelBuilder.Entity<TipoUnSaude>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169762");

            entity.ToTable("TIPO_UN_SAUDE");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
        });

        modelBuilder.Entity<TipoUsuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169773");

            entity.ToTable("TIPO_USUARIO");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)

                .HasColumnName("DESCRICAO");
        });

        modelBuilder.Entity<UnSaude>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SYS_C0096169759");

            entity.ToTable("UN_SAUDE");

            entity.Property(e => e.Id)

                .HasColumnName("ID");
            entity.Property(e => e.Cnpj)
                .HasMaxLength(20)

                .HasColumnName("CNPJ");
            entity.Property(e => e.Nomefantasia)
                .HasMaxLength(105)

                .HasColumnName("NOMEFANTASIA");
            entity.Property(e => e.Perfilid)

                .HasColumnName("PERFILID");
            entity.Property(e => e.Razaosocial)
                .HasMaxLength(105)

                .HasColumnName("RAZAOSOCIAL");

            entity.HasOne(d => d.Perfil).WithMany(p => p.UnSaudes)
                .HasForeignKey(d => d.Perfilid)
                .HasConstraintName("FK_PERFILID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
