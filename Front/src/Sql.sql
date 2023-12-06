-- #region

delete perfil
delete tipo_profissional
delete tipo_usuario
delete roles

delete pessoa
delete un_saude
delete endereco
delete enderecoxespecialidade
delete enderecoxpessoa
delete credenciamento
delete solicitacao

SELECT * FROM PERFIL
INSERT INTO PERFIL (DESCRICAO) VALUES ('Interno');
INSERT INTO PERFIL (DESCRICAO) VALUES ('Externo');

SELECT * FROM Tipo_Profissional
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Médico');
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Enfermeiro');
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Fisioterapeuta');
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Nutricionista');

SELECT * FROM Tipo_Usuario
INSERT INTO Tipo_Usuario (DESCRICAO) VALUES ('Administrador');
INSERT INTO Tipo_Usuario (DESCRICAO) VALUES ('Comum');

SELECT * FROM Roles
INSERT INTO Roles (Nome) VALUES ('Master');
INSERT INTO Roles (Nome) VALUES ('GestorEspecialidade');
INSERT INTO Roles (Nome) VALUES ('Comum');

SELECT * FROM pessoa;
SELECT * FROM endereco where ;
SELECT * FROM un_saude order by id;
SELECT * FROM enderecoxpessoa where pessoaid = 60
SELECT * FROM ROLES;
SELECT * FROM Pessoa
SELECT * FROM solicitacao
SELECT * FROM enderecoxespecialidade
SELECT * FROM especialidade
SELECT * FROM agendamento
SELECT * FROM paciente
SELECT * FROM credenciamento order by id 

update credenciamento
set status = 1
where id = 14

delete un_saude where id = 14


insert into agendamento (datahora,linkteleinter,statusagendamento, descricao) values(TO_DATE('2023-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'htttp://teleinter/dasd24das', 'aprovado', 'Caso aprovado pela complexidade' );
insert into paciente (nome,datanascimento,genero,nomemae,cpf,justificativasolicitacao,historiapaciente) values('Enzo Silva', '02/08/2021', 'masculino', 'Kelly Silva','4703215321','kfbdkbfsklbfklsbfldsbflsdbflsdb','Paciente Enzo sofre desde que nasceu');
insert into enderecoxespecialidade (enderecoid, especialidadeid) values (15, 1);
insert into Especialidade (Descricao,Tipo_Profissionalid) values ('Cardiologia', 1);
insert into un_saude (cnpj,razaosocial,nomefantasia,perfilid) values ('65454321321', 'Hospital Nossa Senhora de Fátima', 'Hospital Nossa Senhora de Fátima', 2);
insert into endereco (nome,logradouro,numero, bairro, cidade, estado, cep, pais,telefone, telefone2,tipo_enderecoid,tipo_un_saudeid,un_saudeid) 
values ('frente tres', 'Rua Sideropolis', 148, 'Jardim Maria Sampaio', 'Taboão da Serra', 'SP', '06773260','Brasil', 1354161, 2121321, 13, 13, 15 );
insert into pessoa (cpf,nome,ddd,telefone,ddd2,telefone2,email,emailalternativo,numeroconselho) values('28213927885','Fabiano Gomes',11,994112577,11,994112577,'teste@teste.com','teste@teste.com', 65421 )
insert into enderecoxpessoa(rolesid,enderecoid,pessoaid,tipo_usuarioid,tipo_profissionalid) values(3,13,60,2,1)

insert into Solicitacao 
(Datasolicitacao,
Statusaprovacao,
Justificativa,
Enderecoid,
Enderecosolicitanteid,
Enderecoxespecialidadeid,
Enderecosolicitadoid,
Enderecoxpessoaid,
Agendamentoid,
Pacienteid)
values
(TO_DATE('2023-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 'aprovado',
 'Paciente precisa urgentemente de um procedimento invasivo, pois esta com',
 1,
 1,
 1,
 1,
 1,
 1,
 1)


-- #endregion



create table Perfil (

    Id integer primary key,
    Descricao varchar2(50)
);

create table Un_Saude(

    Id integer primary key,
    Cnpj varchar2(20),
    RazaoSocial varchar2(105),
    NomeFantasia varchar2(105),    

    PerfilId integer ---
);

create table Endereco(
    Id integer primary key,
    Nome varchar2(200),
    Logradouro varchar2(200),
    Numero integer, 
    Bairro varchar2(50),
    Cidade varchar2(50),
    Estado varchar2(50),
    Cep varchar2(15),
    Pais varchar2(30),    
    Telefone integer,
    Telefone2 integer,

    Tipo_EnderecoId integer, --
    Tipo_Un_SaudeId integer,--
    Un_SaudeId integer --
);

create table Tipo_Endereco(

    Id integer primary key,
    Descricao varchar2(50)
);

create table Tipo_Un_Saude(
    Id integer primary key,
    Descricao varchar2(50)
);

CREATE TABLE Solicitacao (
    SolicitacaoId integer PRIMARY KEY,
    DataSolicitacao timestamp,
    StatusAprovacao varchar2(50),
    Justificativa varchar2(500),
    EnderecoId integer,
    EnderecoSolicitanteId integer,
    EnderecoXEspecialidadeId integer,
    EnderecoSolicitadoId integer,
    EnderecoXPessoaId integer,
    AgendamentoId integer,
    PacienteId integer
);

create table Agendamento(
    AgendamentoId integer primary key,
    DataHora timestamp,
    LinkTeleinter varchar2(100),
    StatusAgendamento varchar2(50),
    Descricao varchar2(500)
);

create table Paciente(
    PacienteId integer primary key,
    Nome varchar2(150),
    DataNascimento timestamp,
    Genero varchar2(20),
    NomeMae varchar2(150),
    Cpf varchar2(20),
    JustificativaSolicitacao varchar2(1000),
    HistoriaPaciente varchar2(1000)     
);

create table Conclusao(
    SolicitacaoId integer primary key,--
    DescredOrientacao varchar2(2000),
    AcompanhaNovaTeleinter int,
    Prazo timestamp,

    PessoaId integer, ---
    PessoaRecebeuId integer, --
    PessoaRealizouId integer, --   
    AgendamentoId integer
);

create table OpcaoDataHora(

    Id integer primary key,
    DataHora timestamp,

    SolicitacaoId integer --
);

create table Imagem(
    Id integer primary key,
    DataImagem timestamp,
    Descricao varchar2(100),

    PacienteId integer --
);

create table Exame(
    Id integer primary key,
    DataExame timestamp,
    TipoExame varchar2(50),
    Nome varchar2(50),
    Descricao varchar2(300),
    Laudo varchar2(300),
    Imagem int,
    ImagemLink varchar2(150),
    
    PacienteId integer --
);

create table Credenciamento (
    Id integer primary key,
    DataSoliCred timestamp,

    EnderecoSolicitanteId integer, --
    EnderecoSolicitadoId integer, --
    EnderecoXPessoaId integer --
);


create table EnderecoXPessoa(
    Id integer primary key,
    Telefone integer,
    Email varchar2(100),
    
    RolesId integer,
    EnderecoId integer, --
    PessoaId integer, --
    Tipo_UsuarioId integer, --
    Tipo_ProfissionalId integer --
);

create table Roles (

    Id integer primary key,
    Nome varchar2(22)
);


create table Tipo_Usuario(
    Id integer primary key,
    Descricao varchar2(50)
);

create table Tipo_Profissional(
    Id integer primary key,
    Descricao varchar2(50)
);

create table Pessoa(
    Id integer primary key,
    Cpf varchar2(15),
    Nome varchar2(150),
    UsuarioAd varchar2(50),
    DDD integer,
    Telefone integer,
    DDD2 integer,
    Telefone2 integer,
    Email varchar2(150),
    EmailAlternativo varchar2(150),
    NumeroConselho integer
);

create table Avaliacao(
    Id integer primary key,
    TextoSolicitacao varchar2(2000),
    ResultadoAvaliacao int,
    DataAprovacao timestamp,
    DataDescredenciamento timestamp,
    JustificativaDescred varchar2(2000),
    StatusCredenciamento int,

    PessoaId integer, --
    PessoaAvaliadorId integer, --
    PessoaSolicitanteId integer,--
    PessoaSoliciDescredId integer, --
    EnderecoXEspecialidadeId integer, --
    CredenciamentoId integer --
);

create table EnderecoXEspecialidade(
    Id integer primary key,    

    EnderecoId integer, --
    EspecialidadeId integer --
);

create table DataHoraDisponivel(
    Id integer primary key,
    DataHoraInicial timestamp,
    DataHoraFinal timestamp,

    EnderecoXEspecialidadeId integer --
);

create table Especialidade(
    Id integer primary key,
    Descricao varchar2(50),

    Tipo_ProfissionalId integer--
);

create table EnderecoXPessoaXEspecialidade(
    Id integer primary key,

    EnderecoXPessoaId integer,--
    EspecialidadeId integer --
);

--------------------------------------------------------------------------------

alter table Un_Saude 
add constraint FK_PerfilId
foreign key (PerfilId)
references Perfil (Id);

alter table EnderecoXPessoa
add constraint FK_EndxPes_Roles
foreign key (RolesId)
references Roles (Id);

alter table Endereco
add constraint FK_UnSaudeId
foreign key (Un_SaudeId)
references Un_Saude (Id);

ALTER TABLE Endereco
add constraint FK_TipoEnderecoId
foreign key (Tipo_EnderecoId)
references Tipo_Endereco (Id);

ALTER TABLE Endereco
add constraint FK_TipoUnSaudeId
foreign key (Tipo_Un_SaudeId)
references Tipo_Un_Saude (Id);

alter table Solicitacao
add constraint FK_EnderecoId
foreign key (EnderecoId)
references Endereco (Id);

alter table Solicitacao
add constraint FK_EnderecoSolicitanteId
foreign key (EnderecoSolicitanteId)
references Endereco (Id);

alter table Solicitacao
add constraint FK_EnderecoSolicitadoId
foreign key (EnderecoSolicitadoId)
references Endereco (Id);

ALTER table Solicitacao
add constraint FK_EnderecoXEspecialidadeId
foreign key (EnderecoXEspecialidadeId)
references EnderecoXEspecialidade (Id);

alter table Solicitacao
add constraint FK_EnderecoXPessoaId
foreign key (EnderecoXPessoaId)
references EnderecoXPessoa (Id);

------------------------------------------------------


alter table Solicitacao
add CONSTRAINT FK_Agendamento
FOREIGN KEY (AgendamentoId)
REFERENCES Agendamento (AgendamentoId);

alter table Solicitacao
add constraint UQ_Agendamento UNIQUE (AgendamentoId);

alter table Solicitacao
add CONSTRAINT FK_Paciente_Solic
foreign key (PacienteId)
references Paciente (PacienteId);

alter table Solicitacao
add constraint UQ_Paciente UNIQUE (PacienteId);


------------------------------------------------------------------------
alter table Conclusao
add constraint FK_PessoaId
foreign key (PessoaId)
references Pessoa (Id);

alter table Conclusao
add constraint FK_PessoaRecebeuId
foreign key (PessoaRecebeuId)
references Pessoa (Id);

alter table Conclusao
add constraint FK_PessoaRealizouId
foreign key (PessoaRealizouId)
references Pessoa (Id);

------------------------------------------------------------------------


alter table Conclusao
add constraint FK_Conclusao_Agendamento
Foreign Key (AgendamentoId)
references Agendamento (AgendamentoId);

alter table Conclusao
add constraint UQ_Conslusao unique (AgendamentoId);


------------------------------------------------------------------------

alter table OpcaoDataHora
add constraint FK_SolicitacaoId
foreign key (SolicitacaoId)
references Solicitacao (SolicitacaoId);

alter table Imagem
add constraint FK_ImagemId
foreign key (PacienteId)
references Paciente (PacienteId);

alter table Exame 
add constraint FK_PacienteId
foreign key (PacienteId)
references Paciente (PacienteId);

alter table Credenciamento
add constraint FK_Cred_EndSolicitanteId
foreign key (EnderecoSolicitanteId)
references Endereco (Id);

alter table Credenciamento
add constraint FK_Cred_EndSolicitadoId
foreign key (EnderecoSolicitadoId)
references Endereco (Id);

alter table Credenciamento
add constraint FK_Cred_EndXPessoaId
foreign key (EnderecoXPessoaId)
references EnderecoXPessoa (Id);

alter table EnderecoXPessoa
add constraint FK_EndXPes_EndId
foreign key (EnderecoId)
references Endereco (Id);

alter table EnderecoXPessoa
add constraint FK_EndXPes_PesId
foreign key (PessoaId)
references Pessoa (Id);

alter table EnderecoXPessoa
add constraint FK_TipoUsuarioId
foreign key (Tipo_UsuarioId)
references Tipo_Usuario (Id);

alter table EnderecoXPessoa
add constraint FK_TipoProfissionalId
foreign key (Tipo_ProfissionalId)
references Tipo_Profissional (Id);

alter table Avaliacao
add constraint FK_AvaliacaoPessoaId
foreign key (PessoaId)
references Pessoa (Id);

alter table Avaliacao
add constraint FK_PessoaAvaliadorId
foreign key (PessoaAvaliadorId)
references Pessoa (Id);

alter table Avaliacao
add constraint FK_PessoaSolicitanteId
foreign key (PessoaSolicitanteId)
references Pessoa (Id);

alter table Avaliacao
add constraint FK_PessoaSoliciDescredId
foreign key (PessoaSoliciDescredId)
references Pessoa (Id);

alter table Avaliacao
add constraint FK_AvaliacaoEndXEspecId
foreign key (EnderecoXEspecialidadeId)
references EnderecoXEspecialidade (Id);

alter table Avaliacao
add constraint FK_CredenciamentoId
foreign key (CredenciamentoId)
references Credenciamento (Id);

alter table EnderecoXEspecialidade
add constraint FK_EndXEspec_EndId
foreign key (EnderecoId)
references Endereco (Id);

alter table EnderecoXEspecialidade
add constraint FK_EndXEspecId
foreign key (EspecialidadeId)
references Especialidade (Id);

alter table DataHoraDisponivel
add constraint FK_DtHrEndXEspecId
foreign key (EnderecoXEspecialidadeId)
references EnderecoXEspecialidade (Id);

alter table Especialidade
add constraint FK_Espec_TipoProfId
foreign key (Tipo_ProfissionalId)
references Tipo_Profissional (Id);

alter table EnderecoXPessoaXEspecialidade
add constraint FK_EndXPesXEspecId
foreign key (EnderecoXPessoaId)
references EnderecoXPessoa (Id);

alter table EnderecoXPessoaXEspecialidade
add constraint FK_EspecialidadeId
foreign key (EspecialidadeId)
references Especialidade (Id);


--------------------------------------------------------------------------------------------------------------------------------
-- TRIGGERS E SEQUENCES


CREATE SEQUENCE AGENDAMENTOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE AVALIACAOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE CONCLUSAOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ROLESSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE CREDENCIAMENTOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE DATAHORADISPONIVELSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDERECOXESPECIALIDADESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDERECOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDXPESSOAXESPECIALIDADESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDERECOXPESSOASEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ESPECIALIDADESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE EXAMESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE IMAGEMSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE OPCAODATAHORASEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE PACIENTESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE PERFILSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE PESSOASEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE SOLICITACAOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE TIPO_ENDERECOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE TIPO_PROFISSIONALSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE TIPO_UN_SAUDESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE TIPO_USUARIOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE UN_SAUDESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE OR REPLACE TRIGGER AGENDAMENTOTRG
BEFORE INSERT ON AGENDAMENTO
FOR EACH ROW   
BEGIN
   SELECT AGENDAMENTOSEQ.NEXTVAL INTO :NEW.SOLICITACAOID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER AVALIACAOTRG
BEFORE INSERT ON AVALIACAO
FOR EACH ROW   
BEGIN
   SELECT AVALIACAOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER CONCLUSAOTRG
BEFORE INSERT ON CONCLUSAO
FOR EACH ROW   
BEGIN
   SELECT CONCLUSAOSEQ.NEXTVAL INTO :NEW.SOLICITACAOID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ROLESTRG
BEFORE INSERT ON ROLES
FOR EACH ROW
BEGIN 
    SELECT ROLESSEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;

CREATE OR REPLACE TRIGGER CREDENCIAMENTOTRG
BEFORE INSERT ON CREDENCIAMENTO
FOR EACH ROW   
BEGIN
   SELECT CREDENCIAMENTOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER DATAHORADISPONIVELTRG
BEFORE INSERT ON DATAHORADISPONIVEL
FOR EACH ROW   
BEGIN
   SELECT DATAHORADISPONIVELSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ENDERECOTRG
BEFORE INSERT ON ENDERECO
FOR EACH ROW   
BEGIN
   SELECT ENDERECOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ENDERECOXESPECIALIDADETRG
BEFORE INSERT ON ENDERECOXESPECIALIDADE
FOR EACH ROW   
BEGIN
   SELECT ENDERECOXESPECIALIDADESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ENDERECOXPESSOATRG
BEFORE INSERT ON ENDERECOXPESSOA
FOR EACH ROW   
BEGIN
   SELECT ENDERECOXPESSOASEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ENDXPESSOAXESPECIALIDADETRG
BEFORE INSERT ON ENDERECOXPESSOAXESPECIALIDADE
FOR EACH ROW   
BEGIN
   SELECT ENDXPESSOAXESPECIALIDADESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ESPECIALIDADETRG
BEFORE INSERT ON ESPECIALIDADE
FOR EACH ROW   
BEGIN
   SELECT ESPECIALIDADESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER EXAMETRG
BEFORE INSERT ON EXAME
FOR EACH ROW   
BEGIN
   SELECT EXAMESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER IMAGEMTRG
BEFORE INSERT ON IMAGEM
FOR EACH ROW   
BEGIN
   SELECT IMAGEMSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER OPCAODATAHORATRG
BEFORE INSERT ON OPCAODATAHORA
FOR EACH ROW   
BEGIN
   SELECT OPCAODATAHORASEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER PACIENTETRG
BEFORE INSERT ON PACIENTE
FOR EACH ROW   
BEGIN
   SELECT PACIENTESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER PERFILTRG
BEFORE INSERT ON PERFIL
FOR EACH ROW   
BEGIN
   SELECT PERFILSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER PESSOATRG
BEFORE INSERT ON PESSOA
FOR EACH ROW   
BEGIN
   SELECT PESSOASEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER SOLICITACAOTRG
BEFORE INSERT ON SOLICITACAO
FOR EACH ROW   
BEGIN
   SELECT SOLICITACAOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER TIPO_ENDERECOTRG
BEFORE INSERT ON TIPO_ENDERECO
FOR EACH ROW   
BEGIN
   SELECT TIPO_ENDERECOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER TIPO_PROFISSIONALTRG
BEFORE INSERT ON TIPO_PROFISSIONAL
FOR EACH ROW   
BEGIN
   SELECT TIPO_PROFISSIONALSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER TIPO_UN_SAUDETRG
BEFORE INSERT ON TIPO_UN_SAUDE
FOR EACH ROW   
BEGIN
   SELECT TIPO_UN_SAUDESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER TIPO_USUARIOTRG
BEFORE INSERT ON TIPO_USUARIO
FOR EACH ROW   
BEGIN
   SELECT TIPO_USUARIOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER UN_SAUDETRG
BEFORE INSERT ON UN_SAUDE
FOR EACH ROW   
BEGIN
   SELECT UN_SAUDESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

-- #region


using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Migrations
{
    /// <inheritdoc />
    public partial class x : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "USR_TELEINTER");

            migrationBuilder.CreateTable(
              name: "AGENDAMENTO",
              schema: "USR_TELEINTER",
              columns: table => new
              {
                  SOLICITACAOID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                      .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                  DATAHORA = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                  LINKTELEINTER = table.Column<string>(type: "VARCHAR2(100)", unicode: false, maxLength: 100, nullable: true),
                  STATUSAGENDAMENTO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                  DESCRICAO = table.Column<string>(type: "VARCHAR2(500)", unicode: false, maxLength: 500, nullable: true)
              },
              constraints: table =>
              {
                  table.PrimaryKey("SYS_C0096162858", x => x.SOLICITACAOID);
              });

            migrationBuilder.CreateTable(
                name: "PERFIL",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162852", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PESSOA",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CPF = table.Column<string>(type: "VARCHAR2(15)", unicode: false, maxLength: 15, nullable: true),
                    NOME = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    USUARIOAD = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    DDD = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TELEFONE = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    DDD2 = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TELEFONE2 = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    EMAIL = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    EMAILALTERNATIVO = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    NUMEROCONSELHO = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162869", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ROLES",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NOME = table.Column<string>(type: "VARCHAR2(22)", unicode: false, maxLength: 22, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162866", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TIPO_ENDERECO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162855", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TIPO_PROFISSIONAL",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162868", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TIPO_UN_SAUDE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162856", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TIPO_USUARIO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162867", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UN_SAUDE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CNPJ = table.Column<string>(type: "VARCHAR2(20)", unicode: false, maxLength: 20, nullable: true),
                    RAZAOSOCIAL = table.Column<string>(type: "VARCHAR2(105)", unicode: false, maxLength: 105, nullable: true),
                    NOMEFANTASIA = table.Column<string>(type: "VARCHAR2(105)", unicode: false, maxLength: 105, nullable: true),
                    PERFILID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162853", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PERFILID",
                        column: x => x.PERFILID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PERFIL",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "CONCLUSAO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    SOLICITACAOID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCREDORIENTACAO = table.Column<string>(type: "VARCHAR2(2000)", unicode: false, maxLength: 2000, nullable: true),
                    ACOMPANHANOVATELEINTER = table.Column<bool>(type: "NUMBER(1)", precision: 1, nullable: true),
                    PRAZO = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    PESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOARECEBEUID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOAREALIZOUID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162859", x => x.SOLICITACAOID);
                    table.ForeignKey(
                        name: "FK_PESSOAID",
                        column: x => x.PESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PESSOAREALIZOUID",
                        column: x => x.PESSOAREALIZOUID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PESSOARECEBEUID",
                        column: x => x.PESSOARECEBEUID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ESPECIALIDADE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    TIPO_PROFISSIONALID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162873", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ESPEC_TIPOPROFID",
                        column: x => x.TIPO_PROFISSIONALID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "TIPO_PROFISSIONAL",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ENDERECO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NOME = table.Column<string>(type: "VARCHAR2(200)", unicode: false, maxLength: 200, nullable: true),
                    LOGRADOURO = table.Column<string>(type: "VARCHAR2(200)", unicode: false, maxLength: 200, nullable: true),
                    NUMERO = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    BAIRRO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    CIDADE = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    ESTADO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    CEP = table.Column<string>(type: "VARCHAR2(15)", unicode: false, maxLength: 15, nullable: true),
                    PAIS = table.Column<string>(type: "VARCHAR2(30)", unicode: false, maxLength: 30, nullable: true),
                    TELEFONE = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TELEFONE2 = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TIPO_ENDERECOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TIPO_UN_SAUDEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    UN_SAUDEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162854", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TIPOENDERECOID",
                        column: x => x.TIPO_ENDERECOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "TIPO_ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_TIPOUNSAUDEID",
                        column: x => x.TIPO_UN_SAUDEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "TIPO_UN_SAUDE",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_UNSAUDEID",
                        column: x => x.UN_SAUDEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "UN_SAUDE",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ENDERECOXESPECIALIDADE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ENDERECOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ESPECIALIDADEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162871", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ENDXESPECID",
                        column: x => x.ESPECIALIDADEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ESPECIALIDADE",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDXESPEC_ENDID",
                        column: x => x.ENDERECOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ENDERECOXPESSOA",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TELEFONE = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    EMAIL = table.Column<string>(type: "VARCHAR2(100)", unicode: false, maxLength: 100, nullable: true),
                    ROLESID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TIPO_USUARIOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    TIPO_PROFISSIONALID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162865", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ENDXPES_ENDID",
                        column: x => x.ENDERECOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDXPES_PESID",
                        column: x => x.PESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDXPES_ROLES",
                        column: x => x.ROLESID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ROLES",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_TIPOPROFISSIONALID",
                        column: x => x.TIPO_PROFISSIONALID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "TIPO_PROFISSIONAL",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_TIPOUSUARIOID",
                        column: x => x.TIPO_USUARIOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "TIPO_USUARIO",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "DATAHORADISPONIVEL",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATAHORAINICIAL = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    DATAHORAFINAL = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    ENDERECOXESPECIALIDADEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162872", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DTHRENDXESPECID",
                        column: x => x.ENDERECOXESPECIALIDADEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXESPECIALIDADE",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "CREDENCIAMENTO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATASOLICRED = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    ENDERECOSOLICITANTEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOSOLICITADOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOXPESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162864", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CRED_ENDSOLICITADOID",
                        column: x => x.ENDERECOSOLICITADOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_CRED_ENDSOLICITANTEID",
                        column: x => x.ENDERECOSOLICITANTEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_CRED_ENDXPESSOAID",
                        column: x => x.ENDERECOXPESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXPESSOA",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ENDERECOXPESSOAXESPECIALIDADE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ENDERECOXPESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ESPECIALIDADEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162874", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ENDXPESXESPECID",
                        column: x => x.ENDERECOXPESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXPESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ESPECIALIDADEID",
                        column: x => x.ESPECIALIDADEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ESPECIALIDADE",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SOLICITACAO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATASOLICITACAO = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    STATUSAPROVACAO = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    JUSTIFICATIVA = table.Column<string>(type: "VARCHAR2(500)", unicode: false, maxLength: 500, nullable: true),
                    ENDERECOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOSOLICITANTEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOXESPECIALIDADEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOSOLICITADOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOXPESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    AGENDAMENTOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162857", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AGENDAMENTOID",
                        column: x => x.AGENDAMENTOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "AGENDAMENTO",
                        principalColumn: "SOLICITACAOID");
                    table.ForeignKey(
                        name: "FK_ENDERECOID",
                        column: x => x.ENDERECOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDERECOSOLICITADOID",
                        column: x => x.ENDERECOSOLICITADOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDERECOSOLICITANTEID",
                        column: x => x.ENDERECOSOLICITANTEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDERECOXESPECIALIDADEID",
                        column: x => x.ENDERECOXESPECIALIDADEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXESPECIALIDADE",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ENDERECOXPESSOAID",
                        column: x => x.ENDERECOXPESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXPESSOA",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "AVALIACAO",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TEXTOSOLICITACAO = table.Column<string>(type: "VARCHAR2(2000)", unicode: false, maxLength: 2000, nullable: true),
                    RESULTADOAVALIACAO = table.Column<bool>(type: "NUMBER(1)", precision: 1, nullable: true),
                    DATAAPROVACAO = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    DATADESCREDENCIAMENTO = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    JUSTIFICATIVADESCRED = table.Column<string>(type: "VARCHAR2(2000)", unicode: false, maxLength: 2000, nullable: true),
                    STATUSCREDENCIAMENTO = table.Column<bool>(type: "NUMBER(1)", precision: 1, nullable: true),
                    PESSOAID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOAAVALIADORID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOASOLICITANTEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    PESSOASOLICIDESCREDID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    ENDERECOXESPECIALIDADEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true),
                    CREDENCIAMENTOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162870", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AVALIACAOENDXESPECID",
                        column: x => x.ENDERECOXESPECIALIDADEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "ENDERECOXESPECIALIDADE",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_AVALIACAOPESSOAID",
                        column: x => x.PESSOAID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_CREDENCIAMENTOID",
                        column: x => x.CREDENCIAMENTOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "CREDENCIAMENTO",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PESSOAAVALIADORID",
                        column: x => x.PESSOAAVALIADORID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PESSOASOLICIDESCREDID",
                        column: x => x.PESSOASOLICIDESCREDID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PESSOASOLICITANTEID",
                        column: x => x.PESSOASOLICITANTEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PESSOA",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "OPCAODATAHORA",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATAHORA = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    SOLICITACAOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162860", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SOLICITACAOID",
                        column: x => x.SOLICITACAOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "SOLICITACAO",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PACIENTE",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NOME = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    DATANASCIMENTO = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    GENERO = table.Column<string>(type: "VARCHAR2(20)", unicode: false, maxLength: 20, nullable: true),
                    NOMEMAE = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    CPF = table.Column<string>(type: "VARCHAR2(20)", unicode: false, maxLength: 20, nullable: true),
                    JUSTIFICATIVASOLICITACAO = table.Column<string>(type: "VARCHAR2(1000)", unicode: false, maxLength: 1000, nullable: true),
                    HISTORIAPACIENTE = table.Column<string>(type: "VARCHAR2(1000)", unicode: false, maxLength: 1000, nullable: true),
                    SOLICITACAOID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162861", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PACISOLICID",
                        column: x => x.SOLICITACAOID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "SOLICITACAO",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "EXAME",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATAEXAME = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    TIPOEXAME = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    NOME = table.Column<string>(type: "VARCHAR2(50)", unicode: false, maxLength: 50, nullable: true),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(300)", unicode: false, maxLength: 300, nullable: true),
                    LAUDO = table.Column<string>(type: "VARCHAR2(300)", unicode: false, maxLength: 300, nullable: true),
                    IMAGEM = table.Column<byte[]>(type: "BLOB", nullable: true),
                    IMAGEMLINK = table.Column<string>(type: "VARCHAR2(150)", unicode: false, maxLength: 150, nullable: true),
                    PACIENTEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162863", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PACIENTEID",
                        column: x => x.PACIENTEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PACIENTE",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "IMAGEM",
                schema: "USR_TELEINTER",
                columns: table => new
                {
                    ID = table.Column<decimal>(type: "NUMBER(38)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DATAIMAGEM = table.Column<DateTime>(type: "TIMESTAMP(6)", precision: 6, nullable: true),
                    DESCRICAO = table.Column<string>(type: "VARCHAR2(100)", unicode: false, maxLength: 100, nullable: true),
                    PACIENTEID = table.Column<decimal>(type: "NUMBER(38)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("SYS_C0096162862", x => x.ID);
                    table.ForeignKey(
                        name: "FK_IMAGEMID",
                        column: x => x.PACIENTEID,
                        principalSchema: "USR_TELEINTER",
                        principalTable: "PACIENTE",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AVALIACAO_CREDENCIAMENTOID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "CREDENCIAMENTOID");

            migrationBuilder.CreateIndex(
                name: "IX_AVALIACAO_ENDXESPID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "ENDERECOXESPECIALIDADEID");

            migrationBuilder.CreateIndex(
                name: "IX_AVAL_PESAVALIADORID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "PESSOAAVALIADORID");

            migrationBuilder.CreateIndex(
                name: "IX_AVALIACAO_PESSOAID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "PESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_AVAL_PESSOLICDESCREDID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "PESSOASOLICIDESCREDID");

            migrationBuilder.CreateIndex(
                name: "IX_AVAL_PESSOLICITANTEID",
                schema: "USR_TELEINTER",
                table: "AVALIACAO",
                column: "PESSOASOLICITANTEID");

            migrationBuilder.CreateIndex(
                name: "IX_CONCLUSAO_PESSOAID",
                schema: "USR_TELEINTER",
                table: "CONCLUSAO",
                column: "PESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_CONC_PESREALIZOUID",
                schema: "USR_TELEINTER",
                table: "CONCLUSAO",
                column: "PESSOAREALIZOUID");

            migrationBuilder.CreateIndex(
                name: "IX_CONC_PESRECEBEUID",
                schema: "USR_TELEINTER",
                table: "CONCLUSAO",
                column: "PESSOARECEBEUID");

            migrationBuilder.CreateIndex(
                name: "IX_CRED_ENDSOLICITADOID",
                schema: "USR_TELEINTER",
                table: "CREDENCIAMENTO",
                column: "ENDERECOSOLICITADOID");

            migrationBuilder.CreateIndex(
                name: "IX_CRED_ENDSOLICITANTEID",
                schema: "USR_TELEINTER",
                table: "CREDENCIAMENTO",
                column: "ENDERECOSOLICITANTEID");

            migrationBuilder.CreateIndex(
                name: "IX_CRED_ENDXPESSOAID",
                schema: "USR_TELEINTER",
                table: "CREDENCIAMENTO",
                column: "ENDERECOXPESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_DTHORADISP_ENDXESPID",
                schema: "USR_TELEINTER",
                table: "DATAHORADISPONIVEL",
                column: "ENDERECOXESPECIALIDADEID");

            migrationBuilder.CreateIndex(
                name: "IX_END_TIPO_ENDERECOID",
                schema: "USR_TELEINTER",
                table: "ENDERECO",
                column: "TIPO_ENDERECOID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDERECO_TIPO_UN_SAUDEID",
                schema: "USR_TELEINTER",
                table: "ENDERECO",
                column: "TIPO_UN_SAUDEID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDERECO_UN_SAUDEID",
                schema: "USR_TELEINTER",
                table: "ENDERECO",
                column: "UN_SAUDEID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXESPEC_ENDERECOID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXESPECIALIDADE",
                column: "ENDERECOID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXESPEC_ESPECID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXESPECIALIDADE",
                column: "ESPECIALIDADEID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDERECOXPESSOA_ENDERECOID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOA",
                column: "ENDERECOID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDERECOXPESSOA_PESSOAID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOA",
                column: "PESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDERECOXPESSOA_ROLESID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOA",
                column: "ROLESID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXPES_TIP_PROFID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOA",
                column: "TIPO_PROFISSIONALID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXPES_TIP_USUARIOID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOA",
                column: "TIPO_USUARIOID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXPESXESP_ENDXPESID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOAXESPECIALIDADE",
                column: "ENDERECOXPESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_ENDXPESXESP_ESPID",
                schema: "USR_TELEINTER",
                table: "ENDERECOXPESSOAXESPECIALIDADE",
                column: "ESPECIALIDADEID");

            migrationBuilder.CreateIndex(
                name: "IX_ESP_TIPO_PROFID",
                schema: "USR_TELEINTER",
                table: "ESPECIALIDADE",
                column: "TIPO_PROFISSIONALID");

            migrationBuilder.CreateIndex(
                name: "IX_EXAME_PACIENTEID",
                schema: "USR_TELEINTER",
                table: "EXAME",
                column: "PACIENTEID");

            migrationBuilder.CreateIndex(
                name: "IX_IMAGEM_PACIENTEID",
                schema: "USR_TELEINTER",
                table: "IMAGEM",
                column: "PACIENTEID");

            migrationBuilder.CreateIndex(
                name: "IX_OPCAODTHORA_SOLICID",
                schema: "USR_TELEINTER",
                table: "OPCAODATAHORA",
                column: "SOLICITACAOID");

            migrationBuilder.CreateIndex(
                name: "IX_PACI_SOLICOID",
                schema: "USR_TELEINTER",
                table: "PACIENTE",
                column: "SOLICITACAOID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLIC_AGENDID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "AGENDAMENTOID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLICITACAO_ENDERECOID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "ENDERECOID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLIC_ENDSOLICITADOID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "ENDERECOSOLICITADOID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLIC_ENDSOLICITANTEID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "ENDERECOSOLICITANTEID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLIC_ENDXESPID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "ENDERECOXESPECIALIDADEID");

            migrationBuilder.CreateIndex(
                name: "IX_SOLIC_ENDXPESID",
                schema: "USR_TELEINTER",
                table: "SOLICITACAO",
                column: "ENDERECOXPESSOAID");

            migrationBuilder.CreateIndex(
                name: "IX_UN_SAUDE_PERFILID",
                schema: "USR_TELEINTER",
                table: "UN_SAUDE",
                column: "PERFILID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AVALIACAO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "CONCLUSAO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "DATAHORADISPONIVEL",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ENDERECOXPESSOAXESPECIALIDADE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "EXAME",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "IMAGEM",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "OPCAODATAHORA",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "CREDENCIAMENTO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "PACIENTE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "SOLICITACAO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "AGENDAMENTO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ENDERECOXESPECIALIDADE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ENDERECOXPESSOA",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ESPECIALIDADE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ENDERECO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "PESSOA",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "ROLES",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "TIPO_USUARIO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "TIPO_PROFISSIONAL",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "TIPO_ENDERECO",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "TIPO_UN_SAUDE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "UN_SAUDE",
                schema: "USR_TELEINTER");

            migrationBuilder.DropTable(
                name: "PERFIL",
                schema: "USR_TELEINTER");

        }
    }
}

-- #endregion


delete perfil
delete tipo_profissional
delete tipo_usuario
delete roles

delete pessoa
delete enderecoxpessoa
delete endereco
delete un_saude


SELECT * FROM endereco;
SELECT * FROM un_saude;
SELECT * FROM pessoa;
SELECT * FROM enderecoxpessoa;
SELECT * FROM ROLES;


SELECT * FROM PERFIL
INSERT INTO PERFIL (DESCRICAO) VALUES ('Interno');
INSERT INTO PERFIL (DESCRICAO) VALUES ('Externo');

SELECT * FROM Tipo_Profissional
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Médico');
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Enfermeiro');
INSERT INTO Tipo_Profissional (DESCRICAO) VALUES ('Fisioterapeuta');

SELECT * FROM Tipo_Usuario
INSERT INTO Tipo_Usuario (DESCRICAO) VALUES ('Administrador');
INSERT INTO Tipo_Usuario (DESCRICAO) VALUES ('Comum');

SELECT * FROM Roles
INSERT INTO Roles (Nome) VALUES ('Master');
INSERT INTO Roles (Nome) VALUES ('GestorEspecialidade');
INSERT INTO Roles (Nome) VALUES ('Comum');

SELECT * FROM Pessoa
SELECT * FROM Un_Saude



CREATE SEQUENCE PESSOASEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDERECOXPESSOASEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE ENDERECOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE UN_SAUDESEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE OR REPLACE TRIGGER ENDERECOTRG
BEFORE INSERT ON ENDERECO
FOR EACH ROW   
BEGIN
   SELECT ENDERECOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;


CREATE OR REPLACE TRIGGER ENDERECOXPESSOATRG
BEFORE INSERT ON ENDERECOXPESSOA
FOR EACH ROW   
BEGIN
   SELECT ENDERECOXPESSOASEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER PESSOATRG
BEFORE INSERT ON PESSOA
FOR EACH ROW   
BEGIN
   SELECT PESSOASEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER UN_SAUDETRG
BEFORE INSERT ON UN_SAUDE
FOR EACH ROW   
BEGIN
   SELECT UN_SAUDESEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;





CREATE SEQUENCE ROLESSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE TIPO_USUARIOSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE PERFILSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE TIPO_PROFISSIONALSEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

CREATE OR REPLACE TRIGGER TIPO_PROFISSIONALTRG
BEFORE INSERT ON TIPO_PROFISSIONAL
FOR EACH ROW   
BEGIN
   SELECT TIPO_PROFISSIONALSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER TIPO_USUARIOTRG
BEFORE INSERT ON TIPO_USUARIO
FOR EACH ROW   
BEGIN
   SELECT TIPO_USUARIOSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER PERFILTRG
BEFORE INSERT ON PERFIL
FOR EACH ROW   
BEGIN
   SELECT PERFILSEQ.NEXTVAL INTO :NEW.ID FROM DUAL; 
END;

CREATE OR REPLACE TRIGGER ROLESTRG
BEFORE INSERT ON ROLES
FOR EACH ROW
BEGIN 
    SELECT ROLESSEQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;



















----------------------------------------------SQL SERVER----------------------------------------------------


create table Perfil (

    Id integer primary key,
    Descricao varchar(50)
);


create table Un_Saude(

    Id integer primary key,
    Cnpj varchar(20),
    RazaoSocial varchar(105),
    NomeFantasia varchar(105),    

    PerfilId integer ---
);


create table Endereco(
    Id integer primary key,
    Nome varchar(200),
    Logradouro varchar(200),
    Numero integer, 
    Bairro varchar(50),
    Cidade varchar(50),
    Estado varchar(50),
    Cep varchar(15),
    Pais varchar(30),    
    Telefone integer,
    Telefone2 integer,

    Tipo_EnderecoId integer, --
    Tipo_Un_SaudeId integer,--
    Un_SaudeId integer --
);


create table Tipo_Endereco(

    Id integer primary key,
    Descricao varchar(50)
);

create table Tipo_Un_Saude(
    Id integer primary key,
    Descricao varchar(50)
);

create table Solicitacao(

    Id integer primary key,
    DataSolicitacao datetime,
    StatusAprovacao varchar(50),
    Justificativa varchar(500),

    EnderecoId integer, --
    EnderecoSolicitanteId integer, --
    EnderecoXEspecialidadeId integer,--
    EnderecoSolicitadoId integer, --
    EnderecoXPessoaId integer,--
    AgendamentoId integer, --    
    -- PacienteId integer
);

create table Agendamento(
    SolicitacaoId integer primary key,
    DataHora datetime,
    LinkTeleinter varchar(100),
    StatusAgendamento varchar(50),
    Descricao varchar(500)    
);



create table Conclusao(
    SolicitacaoId integer primary key,--
    DescredOrientacao varchar(2000),
    AcompanhaNovaTeleinter int,
    Prazo datetime,

    PessoaId integer, ---
    PessoaRecebeuId integer, --
    PessoaRealizouId integer --   
);


create table OpcaoDataHora(

    Id integer primary key,
    DataHora datetime,

    SolicitacaoId integer --
);


create table Paciente(

    Id integer primary key,
    Nome varchar(150),
    DataNascimento datetime,
    Genero varchar(20),
    NomeMae varchar(150),
    Cpf varchar(20),
    JustificativaSolicitacao varchar(1000),
    HistoriaPaciente varchar(1000)     
);

create table Imagem(
    Id integer primary key,
    DataImagem datetime,
    Descricao varchar(100),

    PacienteId integer --
);

create table Exame(
    Id integer primary key,
    DataExame datetime,
    TipoExame varchar(50),
    Nome varchar(50),
    Descricao varchar(300),
    Laudo varchar(300),
    Imagem int,
    ImagemLink varchar(150),
    
    PacienteId integer --
);

create table Credenciamento (
    Id integer primary key,
    DataSoliCred datetime,

    EnderecoSolicitanteId integer, --
    EnderecoSolicitadoId integer, --
    EnderecoXPessoaId integer --
);


create table EnderecoXPessoa(
    Id integer primary key,
    Telefone integer,
    Email varchar(100),
    
    RolesId integer,
    EnderecoId integer, --
    PessoaId integer, --
    Tipo_UsuarioId integer, --
    Tipo_ProfissionalId integer --
);

create table Roles (

    Id integer primary key,
    Nome varchar(22)
);


create table Tipo_Usuario(
    Id integer primary key,
    Descricao varchar(50)
);

create table Tipo_Profissional(
    Id integer primary key,
    Descricao varchar(50)
);


create table Pessoa(
    Id integer primary key,
    Cpf varchar(15),
    Nome varchar(150),
    UsuarioAd varchar(50),
    DDD integer,
    Telefone integer,
    DDD2 integer,
    Telefone2 integer,
    Email varchar(150),
    EmailAlternativo varchar(150),
    NumeroConselho integer
);


create table Avaliacao(
    Id integer primary key,
    TextoSolicitacao varchar(2000),
    ResultadoAvaliacao int,
    DataAprovacao datetime,
    DataDescredenciamento datetime,
    JustificativaDescred varchar(2000),
    StatusCredenciamento int,

    PessoaId integer, --
    PessoaAvaliadorId integer, --
    PessoaSolicitanteId integer,--
    PessoaSoliciDescredId integer, --
    EnderecoXEspecialidadeId integer, --
    CredenciamentoId integer --
);


create table EnderecoXEspecialidade(
    Id integer primary key,    

    EnderecoId integer, --
    EspecialidadeId integer --
);


create table DataHoraDisponivel(
    Id integer primary key,
    DataHoraInicial datetime,
    DataHoraFinal datetime,

    EnderecoXEspecialidadeId integer --
);


create table Especialidade(
    Id integer primary key,
    Descricao varchar(50),

    Tipo_ProfissionalId integer--
);


create table EnderecoXPessoaXEspecialidade(
    Id integer primary key,

    EnderecoXPessoaId integer,--
    EspecialidadeId integer --
);









create table Agendamento (
    AgendamentoId integer primary key,
    DataHora timestamp,
    LinkTeleinter varchar2(100),
    StatusAgendamento varchar2(50),
    Descricao varchar2(500),
    SolicitacaoId integer unique
);

create table Solicitacao (
    SolicitacaoId integer primary key,
    DataSolicitacao timestamp,
    StatusAprovacao varchar2(50),
    Justificativa varchar2(500),
    EnderecoId integer,
    EnderecoSolicitanteId integer,
    EnderecoXEspecialidadeId integer,
    EnderecoSolicitadoId integer,
    EnderecoXPessoaId integer,
    AgendamentoId integer unique
);


alter table Solicitacao
add constraint FK_AgendamentoId
foreign key (AgendamentoId)
references Agendamento (SolicitacaoId);
