
/**
 * Página Sobre o Projeto Monitoria Flow
 * Apresentação acadêmica, equipe do Projeto Integrador III e alinhamento com ODS 4
 */
export default function Sobre() {
  const equipe = [
    { nome: 'Cristyan das Neves Silva', papel: 'Desenvolvedor Full Stack • Arquitetura Front-End' },
    { nome: 'Marlon da Silva', papel: 'Desenvolvedor Full Stack • Modelagem e Integração' },
    { nome: 'Lauren Helena De Oliveira Leao', papel: 'Desenvolvedora Full Stack • UI/UX e Requisitos' },
    { nome: 'Taíse da Rosa', papel: 'Desenvolvedora Full Stack • Qualidade e Testes' }
  ];

  const pilaresOds4 = [
    {
      titulo: 'Equidade no Acesso ao Conhecimento',
      descricao: 'Garante que todos os acadêmicos, independente de seu turno ou nível inicial, tenham acesso transparente às monitorias acadêmicas.'
    },
    {
      titulo: 'Qualidade da Aprendizagem',
      descricao: 'Reduz a retenção e as dúvidas acumuladas em disciplinas centrais como Algoritmos, Estruturas de Dados e Bancos de Dados.'
    },
    {
      titulo: 'Aprendizagem Colaborativa Contínua',
      descricao: 'Estimula o intercâmbio de experiências entre alunos veteranos e ingressantes, promovendo comunidade ativa.'
    },
    {
      titulo: 'Transparência e Organização',
      descricao: 'Centraliza dados de atendimentos, métricas de frequência e relatórios para coordenação e professores.'
    }
  ];

  return (
    <div className="pagina-sobre">
      <header className="cabecalho-pagina">
        <span className="cabecalho-pagina__tag">Faculdade Municipal de Palhoça • ADS</span>
        <h1>Sobre o Monitoria Flow</h1>
        <p>
          Projeto Integrador desenvolvido para fortalecer o ecossistema educacional de tecnologia,
          apoiando estudantes e professores na gestão ágil de monitorias.
        </p>
      </header>

      <section className="sobre-secao">
        <h2>Visão Geral da Plataforma</h2>
        <p>
          O <strong>Monitoria Flow</strong> nasceu da necessidade de conectar estudantes em fase de aprendizado
          com monitores qualificados. O sistema organiza agendas, centraliza materiais de apoio, gerencia
          capacidade de vagas e permite tanto agendamentos individuais quanto oficinas coletivas de revisão.
        </p>
      </section>

      <section className="sobre-secao">
        <h2>Compromisso com o ODS 4 da ONU (Educação de Qualidade)</h2>
        <div className="grid-ods">
          {pilaresOds4.map((item, idx) => (
            <div key={idx} className="card-ods">
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sobre-secao">
        <h2>Equipe do Projeto Integrador III</h2>
        <p className="texto-orientacao">
          <strong>Professora Orientadora:</strong> Daniela Amorim
        </p>
        <div className="grid-equipe">
          {equipe.map((membro, idx) => (
            <div key={idx} className="card-membro">
              <div className="card-membro__avatar">
                {membro.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="card-membro__info">
                <h3>{membro.nome}</h3>
                <p>{membro.papel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sobre-secao">
        <h2>Stack Tecnológica & Engenharia</h2>
        <div className="tecnologias-lista">
          <span className="tag-tech">React 19</span>
          <span className="tag-tech">Vite</span>
          <span className="tag-tech">React Router</span>
          <span className="tag-tech">SCSS (Sass)</span>
          <span className="tag-tech">Flexbox & Box Model</span>
          <span className="tag-tech">Mobile-First Media Queries</span>
        </div>
      </section>
    </div>
  );
}
