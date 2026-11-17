// SMOKE TEST: percorre todas as rotas da API e confere os Status Codes esperados.
// Uso: com o servidor rodando (npm run dev), em outro terminal execute:
//   node smoke-test.js
// Requer Node 18+ (fetch nativo) e o banco povoado (db/script.sql e db/seed-script.sql).
// Os registros criados aqui são removidos no próprio teste.
require('dotenv').config();

const BASE_URL = `http://localhost:${process.env.PORT || 3001}`;

let aprovados = 0;
let reprovados = 0;

// Faz a requisição e compara o status recebido com o esperado
async function testar(descricao, metodo, rota, statusEsperado, body) {
    const opcoes = { method: metodo, headers: { 'Content-Type': 'application/json' } };
    if (body) {
        opcoes.body = JSON.stringify(body);
    }

    const resposta = await fetch(BASE_URL + rota, opcoes);
    const json = await resposta.json();

    if (resposta.status === statusEsperado) {
        aprovados++;
        console.log(`  OK    ${metodo} ${rota} -> ${resposta.status} (${descricao})`);
    } else {
        reprovados++;
        console.log(`  FALHA ${metodo} ${rota} -> ${resposta.status}, esperado ${statusEsperado} (${descricao})`);
    }

    return json;
}

// Confere um detalhe da resposta, além do Status Code
function conferir(descricao, condicao) {
    if (condicao) {
        aprovados++;
        console.log(`  OK    ${descricao}`);
    } else {
        reprovados++;
        console.log(`  FALHA ${descricao}`);
    }
}

async function executar() {
    console.log(`Testando API em ${BASE_URL}\n`);

    console.log('Usuários:');
    await testar('lista todos', 'GET', '/api/usuarios', 200);
    const existente = await testar('busca por ID', 'GET', '/api/usuarios/1', 200);
    await testar('ID inexistente', 'GET', '/api/usuarios/9999', 404);
    await testar('ID não numérico', 'GET', '/api/usuarios/abc', 400);
    await testar('sem nome', 'POST', '/api/usuarios', 400, { email: 'teste@email.com' });
    await testar('sem e-mail', 'POST', '/api/usuarios', 400, { nome: 'Teste' });
    await testar('sem body', 'POST', '/api/usuarios', 400);
    const emailInvalido = await testar('e-mail inválido', 'POST', '/api/usuarios', 400, { nome: 'Teste', email: 'nao-e-email' });
    conferir('erro explica o que está errado', /email deve ser um e-mail válido/.test(emailInvalido.mensagem));
    await testar('nome muito curto', 'POST', '/api/usuarios', 400, { nome: 'Te', email: 'teste@email.com' });
    await testar('nome muito longo', 'POST', '/api/usuarios', 400, { nome: 'T'.repeat(101), email: 'teste@email.com' });
    await testar('tipo inválido', 'POST', '/api/usuarios', 400, { nome: 'Teste', email: 'teste@email.com', tipo: 'admin' });
    const variosErros = await testar('vários erros', 'POST', '/api/usuarios', 400, { nome: 'Te', email: 'nao-e-email' });
    conferir('erro lista todos os campos', /nome/.test(variosErros.mensagem) && /email/.test(variosErros.mensagem));
    const usuario = await testar('cria usuário', 'POST', '/api/usuarios', 201, { nome: '  Teste  ', email: 'teste@email.com' });
    conferir('tipo padrão é aluno', usuario.tipo === 'aluno');
    conferir('nome salvo sem espaços nas pontas', usuario.nome === 'Teste');
    await testar('PUT com e-mail inválido', 'PUT', `/api/usuarios/${usuario.id}`, 400, { nome: 'Teste', email: 'nao-e-email' });
    await testar('PUT com ID não numérico', 'PUT', '/api/usuarios/abc', 400, { nome: 'Fulano', email: 'fulano@email.com' });
    await testar('e-mail duplicado', 'POST', '/api/usuarios', 409, { nome: 'Outro', email: 'teste@email.com' });
    await testar('PUT com e-mail de outro usuário', 'PUT', `/api/usuarios/${usuario.id}`, 409, { nome: 'Teste', email: existente.email });
    await testar('DELETE com ID não numérico', 'DELETE', '/api/usuarios/abc', 400);
    await testar('atualiza usuário', 'PUT', `/api/usuarios/${usuario.id}`, 200, { nome: 'Teste Editado', email: 'editado@email.com' });
    await testar('atualiza inexistente', 'PUT', '/api/usuarios/9999', 404, { nome: 'Fulano', email: 'fulano@email.com' });
    await testar('remove usuário', 'DELETE', `/api/usuarios/${usuario.id}`, 200);
    await testar('remove inexistente', 'DELETE', `/api/usuarios/${usuario.id}`, 404);

    console.log('\nMonitorias:');
    await testar('lista todas', 'GET', '/api/monitorias', 200);
    await testar('busca por ID', 'GET', '/api/monitorias/1', 200);
    await testar('ID inexistente', 'GET', '/api/monitorias/9999', 404);
    await testar('ID não numérico', 'GET', '/api/monitorias/abc', 400);
    await testar('DELETE com ID não numérico', 'DELETE', '/api/monitorias/abc', 400);
    const monitoriaValida = {
        disciplina_id: 1,
        monitor_id: 1,
        data_horario: '2026-11-20 19:00:00',
        local_link: 'Lab 01 - Bloco A',
        tipo_atendimento: 'coletiva',
        vagas_max: 10
    };
    await testar('sem disciplina', 'POST', '/api/monitorias', 400, { ...monitoriaValida, disciplina_id: undefined });
    await testar('sem monitor', 'POST', '/api/monitorias', 400, { ...monitoriaValida, monitor_id: undefined });
    await testar('sem data', 'POST', '/api/monitorias', 400, { ...monitoriaValida, data_horario: undefined });
    await testar('disciplina não numérica', 'POST', '/api/monitorias', 400, { ...monitoriaValida, disciplina_id: 'abc' });
    await testar('data inválida', 'POST', '/api/monitorias', 400, { ...monitoriaValida, data_horario: 'amanhã' });
    await testar('data que não existe', 'POST', '/api/monitorias', 400, { ...monitoriaValida, data_horario: '2026-02-31 10:00:00' });
    await testar('tipo de atendimento inválido', 'POST', '/api/monitorias', 400, { ...monitoriaValida, tipo_atendimento: 'dupla' });
    await testar('vagas zeradas', 'POST', '/api/monitorias', 400, { ...monitoriaValida, vagas_max: 0 });
    await testar('vagas fracionadas', 'POST', '/api/monitorias', 400, { ...monitoriaValida, vagas_max: 1.5 });
    await testar('local longo demais', 'POST', '/api/monitorias', 400, { ...monitoriaValida, local_link: 'L'.repeat(151) });
    const monitoria = await testar('cria monitoria', 'POST', '/api/monitorias', 201, monitoriaValida);
    conferir('data salva com o horário enviado', new Date(monitoria.data_horario).getTime() === new Date('2026-11-20T19:00:00').getTime());
    const semDisciplina = await testar('disciplina inexistente', 'POST', '/api/monitorias', 400, { ...monitoriaValida, disciplina_id: 9999 });
    conferir('erro aponta a disciplina', /disciplina_id/.test(semDisciplina.mensagem));
    const semMonitor = await testar('monitor inexistente', 'POST', '/api/monitorias', 400, { ...monitoriaValida, monitor_id: 9999 });
    conferir('erro aponta o monitor', /monitor_id/.test(semMonitor.mensagem));
    await testar('PUT com disciplina inexistente', 'PUT', `/api/monitorias/${monitoria.id}`, 400, { ...monitoriaValida, disciplina_id: 9999 });
    await testar('PUT com ID não numérico', 'PUT', '/api/monitorias/abc', 400, monitoriaValida);
    await testar('atualiza monitoria', 'PUT', `/api/monitorias/${monitoria.id}`, 200, { ...monitoriaValida, vagas_max: 20 });
    await testar('atualiza inexistente', 'PUT', '/api/monitorias/9999', 404, monitoriaValida);
    await testar('remove monitoria', 'DELETE', `/api/monitorias/${monitoria.id}`, 200);
    await testar('remove inexistente', 'DELETE', `/api/monitorias/${monitoria.id}`, 404);

    console.log('\nOutros:');
    await testar('rota inexistente', 'GET', '/api/nao-existe', 404);
    const demo = await fetch(`${BASE_URL}/demo`);
    conferir('página de demonstração abre', demo.ok && (await demo.text()).includes('<html'));

    console.log(`\nResultado: ${aprovados} aprovados, ${reprovados} reprovados.`);
    process.exitCode = reprovados > 0 ? 1 : 0;
}

executar().catch((erro) => {
    console.error(`Não foi possível conectar em ${BASE_URL}. O servidor está rodando? (${erro.message})`);
    process.exitCode = 1;
});
