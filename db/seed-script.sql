
-- ============================================================
-- 2. DML: INSERÇÃO DE DADOS DE EXEMPLO (Pelo menos 3 por tabela)
-- ============================================================

-- Inserindo Usuários (Monitores e Alunos)
INSERT INTO usuarios (nome, email, tipo) VALUES
('Cristyan das Neves Silva', 'cristyan@aluno.fmpsc.edu.br', 'monitor'),
('Marlon da Silva', 'marlon@aluno.fmpsc.edu.br', 'monitor'),
('Lauren Helena De Oliveira Leao', 'lauren.leac@aluno.fmpsc.edu.br', 'aluno'),
('Taíse da Rosa', 'taise@aluno.fmpsc.edu.br', 'aluno');

-- Inserindo Disciplinas
INSERT INTO disciplinas (codigo, nome, semestre) VALUES
('ADS101', 'Algoritmos e Programação', 1),
('ADS202', 'Estrutura de Dados', 2),
('ADS303', 'Banco de Dados I', 3),
('ADS404', 'Programação Web', 4);

-- Inserindo Ofertas de Monitoria
INSERT INTO monitorias (disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max) VALUES
(2, 1, '2026-10-22 19:00:00', 'Lab 03 - Bloco B', 'individual', 1),
(3, 2, '2026-10-24 18:00:00', 'Meet: meet.google.com/abc-defg-hij', 'coletiva', 15),
(1, 1, '2026-10-25 20:00:00', 'Lab 01 - Bloco A', 'coletiva', 10),
(4, 2, '2026-10-28 19:30:00', 'Meet: meet.google.com/xyz-uvwx-rst', 'individual', 1);

-- Inserindo Agendamentos (Inscrição N:N de Alunos nas Monitorias)
INSERT INTO agendamentos (aluno_id, monitoria_id, status) VALUES
(3, 1, 'confirmado'),
(3, 2, 'confirmado'),
(4, 2, 'confirmado'),
(4, 4, 'confirmado');
