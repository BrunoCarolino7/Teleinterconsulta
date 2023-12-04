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
add constraint FK_PacienteId_Solic
foreign key (PacienteId)
references Paciente (PacienteId);

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