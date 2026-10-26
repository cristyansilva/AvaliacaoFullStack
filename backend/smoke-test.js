// SMOKE TEST: percorre todas as rotas da API e confere os Status Codes esperados.
// Uso: com o servidor rodando (npm run dev), em outro terminal execute:
//   node smoke-test.js
// Requer Node 18+ (fetch nativo). Não altera nada além dos dados em memória do servidor.
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

async function executar() {
    console.log(`Testando API em ${BASE_URL}\n`);

    console.log('Usuários:');
    await testar('lista todos', 'GET', '/api/usuarios', 200);
    await testar('busca por ID', 'GET', '/api/usuarios/1', 200);
    await testar('ID inexistente', 'GET', '/api/usuarios/9999', 404);
    await testar('sem nome', 'POST', '/api/usuarios', 400, { email: 'teste@email.com' });
    await testar('sem e-mail', 'POST', '/api/usuarios', 400, { nome: 'Teste' });
    const usuario = await testar('cria usuário', 'POST', '/api/usuarios', 201, { nome: 'Teste', email: 'teste@email.com' });
    await testar('atualiza usuário', 'PUT', `/api/usuarios/${usuario.id}`, 200, { nome: 'Teste Editado', email: 'editado@email.com' });
    await testar('atualiza inexistente', 'PUT', '/api/usuarios/9999', 404, { nome: 'X', email: 'x@email.com' });
    await testar('remove usuário', 'DELETE', `/api/usuarios/${usuario.id}`, 200);
    await testar('remove inexistente', 'DELETE', `/api/usuarios/${usuario.id}`, 404);

    console.log('\nMonitorias:');
    await testar('lista todas', 'GET', '/api/monitorias', 200);
    await testar('busca por ID', 'GET', '/api/monitorias/1', 200);
    await testar('ID inexistente', 'GET', '/api/monitorias/9999', 404);
    await testar('sem disciplina', 'POST', '/api/monitorias', 400, { monitor: 'Fulano', data: '2026-11-01' });
    await testar('sem monitor', 'POST', '/api/monitorias', 400, { disciplina: 'Cálculo', data: '2026-11-01' });
    await testar('sem data', 'POST', '/api/monitorias', 400, { disciplina: 'Cálculo', monitor: 'Fulano' });
    const monitoria = await testar('cria monitoria', 'POST', '/api/monitorias', 201, { disciplina: 'Cálculo', monitor: 'Fulano', data: '2026-11-01' });
    await testar('atualiza monitoria', 'PUT', `/api/monitorias/${monitoria.id}`, 200, { disciplina: 'Cálculo II', monitor: 'Fulano', data: '2026-11-02' });
    await testar('atualiza inexistente', 'PUT', '/api/monitorias/9999', 404, { disciplina: 'X', monitor: 'X', data: '2026-11-01' });
    await testar('remove monitoria', 'DELETE', `/api/monitorias/${monitoria.id}`, 200);
    await testar('remove inexistente', 'DELETE', `/api/monitorias/${monitoria.id}`, 404);

    console.log('\nOutros:');
    await testar('rota inexistente', 'GET', '/api/nao-existe', 404);

    console.log(`\nResultado: ${aprovados} aprovados, ${reprovados} reprovados.`);
    process.exitCode = reprovados > 0 ? 1 : 0;
}

executar().catch((erro) => {
    console.error(`Não foi possível conectar em ${BASE_URL}. O servidor está rodando? (${erro.message})`);
    process.exitCode = 1;
});
