-- ============================================================
-- SCRIPT DE CRIAÇÃO E POVOAMENTO - MONITORIA FLOW (POSTGRESQL)
-- Disciplina: Módulo 2 - Back-end e Banco de Dados (Aula 10)
-- Projeto Integrador: Monitoria Flow (FMP - ADS)
-- ============================================================

-- ============================================================
-- 1. DDL: CRIAÇÃO DAS TABELAS (Estrutura do Banco de Dados)
-- ============================================================

-- Tabela: usuarios (Armazena alunos, monitores e professores)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('aluno', 'monitor', 'professor'))
);

-- Tabela: disciplinas (Grade curricular do curso de ADS)
CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    semestre INTEGER NOT NULL
);

-- Tabela: monitorias (Ofertas de horários criadas pelos monitores - Relacionamento 1:N)
CREATE TABLE monitorias (
    id SERIAL PRIMARY KEY,
    disciplina_id INTEGER NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
    monitor_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    data_horario TIMESTAMP NOT NULL,
    local_link VARCHAR(150) NOT NULL,
    tipo_atendimento VARCHAR(20) NOT NULL CHECK (tipo_atendimento IN ('individual', 'coletiva')),
    vagas_max INTEGER NOT NULL
);

-- Tabela: agendamentos (Tabela de Junção N:N entre usuarios/alunos e monitorias)
CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    monitoria_id INTEGER NOT NULL REFERENCES monitorias(id) ON DELETE CASCADE,
    data_agendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'cancelado')),
    CONSTRAINT unique_aluno_monitoria UNIQUE (aluno_id, monitoria_id)
);