-- ============================================================
-- 3. DQL: CONSULTAS DE VALIDAÇÃO (SELECT Simples e com JOIN)
-- ============================================================

-- Consulta 1: Listagem simples de todas as monitorias cadastradas
SELECT * FROM monitorias;

-- Consulta 2 (JOIN Completo): Lista todos os agendamentos relacionando o Aluno, a Disciplina, o Monitor e o Horário
SELECT 
    a.id AS id_agendamento,
    u_aluno.nome AS aluno,
    d.nome AS disciplina,
    u_monitor.nome AS monitor,
    m.data_horario,
    m.tipo_atendimento,
    m.local_link,
    a.status AS status_agendamento
FROM agendamentos a
JOIN usuarios u_aluno ON a.aluno_id = u_aluno.id
JOIN monitorias m ON a.monitoria_id = m.id
JOIN disciplinas d ON m.disciplina_id = d.id
JOIN usuarios u_monitor ON m.monitor_id = u_monitor.id
ORDER BY m.data_horario ASC;