export default function InstitutionalHome() {
  const estatisticas = [
    { valor: '+250', rotulo: 'Atendimentos Realizados', destaque: 'No último semestre' },
    { valor: '99.2%', rotulo: 'Aprovação dos Assistidos', destaque: 'Índice de retenção reduzido' },
    { valor: '4.9/5', rotulo: 'Avaliação Média', destaque: 'Feedback dos discentes' },
    { valor: '100%', rotulo: 'Gratuito e Acessível', destaque: 'Alinhado à ODS 4 da ONU' },
  ];

  const pilaresOds4 = [
    {
      titulo: 'Equidade no Acesso',
      desc: 'Democratização do apoio acadêmico para todos os estudantes do turno noturno e matutino.',
      tag: 'Meta 4.3'
    },
    {
      titulo: 'Educação Técnica de Qualidade',
      desc: 'Aceleração do aprendizado em programação, lógica, banco de dados e arquitetura de software.',
      tag: 'Meta 4.4'
    },
    {
      titulo: 'Inclusão e Não Discriminação',
      desc: 'Espaço acolhedor e seguro onde tirar dúvidas é valorizado como etapa essencial do crescimento.',
      tag: 'Meta 4.5'
    },
    {
      titulo: 'Comunidade de Aprendizagem',
      desc: 'Formação de veteranos como líderes monitores e suporte contínuo aos ingressantes.',
      tag: 'Meta 4.c'
    }
  ];

  const funcionalidades = [
    {
      icone: '📅',
      titulo: 'Agendamento Simplificado (RF07/RF08)',
      desc: 'Escolha se prefere monitoria individual 1 a 1 ou oficinas coletivas pré-avaliações.'
    },
    {
      icone: '👥',
      titulo: 'Corpo Docente & Monitores (RF06/RF13)',
      desc: 'Acesso rápido aos perfis dos monitores, especialidades, horários e canais de contato.'
    },
    {
      icone: '🌐',
      titulo: 'Modalidade Híbrida',
      desc: 'Atendimentos presenciais nos laboratórios da FMP e sessões remotas via Google Meet.'
    },
    {
      icone: '📊',
      titulo: 'Gestão de Frequência e Horas (RF16/RF17)',
      desc: 'Validação automática de presença e emissão consolidada de relatórios para horas complementares.'
    },
    {
      icone: '⭐',
      titulo: 'Feedback Contínuo (RF18/RF23)',
      desc: 'Avaliação transparente de cada sessão para garantir a excelência pedagógica constante.'
    },
    {
      icone: '🔒',
      titulo: 'Privacidade e LGPD (RNF01)',
      desc: 'Credenciais seguras, comunicação exclusiva via e-mail institucional e proteção de dados.'
    }
  ];

  const equipe = [
    { nome: 'Cristyan das Neves Silva', papel: 'Desenvolvedor Full Stack • Front-End Lead', matricula: 'ADS FMP' },
    { nome: 'Marlon da Silva', papel: 'Desenvolvedor Full Stack • Integração e Banco', matricula: 'ADS FMP' },
    { nome: 'Lauren Helena De Oliveira Leao', papel: 'Desenvolvedora Full Stack • UI/UX & Requisitos', matricula: 'ADS FMP' },
    { nome: 'Taíse da Rosa', papel: 'Desenvolvedora Full Stack • Qualidade e Testes', matricula: 'ADS FMP' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. NAVEGAÇÃO INSTITUCIONAL (RESPONSIVIDADE COM SM / MD / LG) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl sm:text-3xl">⚡</span>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-blue-600 tracking-tight">Monitoria Flow</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                ADS • FMP
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-slate-600">
            <a href="#visao" className="hover:text-blue-600 transition">Visão</a>
            <a href="#funcionalidades" className="hover:text-blue-600 transition">Recursos</a>
            <a href="#ods4" className="hover:text-blue-600 transition">ODS 4 ONU</a>
            <a href="#equipe" className="hover:text-blue-600 transition">Equipe</a>
            <a href="#faq" className="hover:text-blue-600 transition">Dúvidas</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="https://avaliacao-fullstack.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition"
            >
              Acessar App React →
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION COM TAILWIND (SM / MD / LG) */}
        <section id="visao" className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 mb-6">
                🚀 Projeto Integrador III • Faculdade Municipal de Palhoça
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Transformando a experiência de <span className="text-blue-600 underline decoration-blue-300">aprendizagem</span> em tecnologia.
              </h1>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                O <strong>Monitoria Flow</strong> é a plataforma oficial desenvolvida para organizar, aproximar e impulsionar
                o programa de monitorias do curso de Análise e Desenvolvimento de Sistemas. Conecte-se com monitores, agende atendimentos e alcance seu potencial máximo.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#funcionalidades"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition text-center"
                >
                  Conhecer Funcionalidades
                </a>
                <a
                  href="#ods4"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold rounded-lg bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 transition text-center"
                >
                  Impacto Social (ODS 4)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BARRA DE ESTATÍSTICAS (RESPONSIVIDADE COM SM / MD / LG) */}
        <section className="border-y border-slate-200 bg-white py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center">
              {estatisticas.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-blue-600">
                    {item.valor}
                  </span>
                  <span className="mt-1 font-semibold text-slate-800 text-xs sm:text-sm lg:text-base">
                    {item.rotulo}
                  </span>
                  <span className="text-slate-500 text-xs hidden sm:block mt-0.5">
                    {item.destaque}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FUNCIONALIDADES DA PLATAFORMA (GRID SM / MD / LG) */}
        <section id="funcionalidades" className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
                Arquitetura e Recursos
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900">
                Construído para atender as demandas reais dos estudantes
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Todas as funcionalidades foram desenhadas a partir dos requisitos levantados pela equipe acadêmica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {funcionalidades.map((func, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl sm:text-4xl mb-4 inline-block">{func.icone}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{func.titulo}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{func.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                    Disponível no Sistema • ADS FMP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COMPROMISSO COM ODS 4 DA ONU (GRID SM / MD / LG) */}
        <section id="ods4" className="py-16 sm:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-600 text-white rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-md text-xs font-bold uppercase tracking-wider mb-4">
                  Objetivo de Desenvolvimento Sustentável 4
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Garantir educação inclusiva, equitativa e de qualidade para todos.
                </h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed">
                  O <strong>Monitoria Flow</strong> responde diretamente aos desafios identificados no ensino superior público,
                  criando mecanismos tecnológicos que mitigam evasão escolar e nivelam conhecimentos fundamentais.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
                {pilaresOds4.map((pilar, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                      {pilar.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
                      {pilar.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                      {pilar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. EQUIPE DO PROJETO INTEGRADOR III (GRID SM / MD / LG) */}
        <section id="equipe" className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
                Quem Faz Acontecer
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900">
                Equipe de Desenvolvimento & Orientação
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Alunos da Faculdade Municipal de Palhoça sob orientação da Profa. Daniela Amorim.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipe.map((membro, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mb-4 shadow-sm">
                    {membro.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{membro.nome}</h3>
                  <p className="text-xs font-semibold text-blue-600 mt-1">{membro.papel}</p>
                  <span className="text-xs text-slate-400 mt-2">{membro.matricula}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs sm:text-sm text-slate-500">
              Professora Orientadora: <strong className="text-slate-800">Daniela Amorim</strong> • Projeto Integrador III
            </div>
          </div>
        </section>

        {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
        <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
              Perguntas Frequentes (FAQ)
            </h2>

            <div className="space-y-4">
              <details className="bg-slate-50 rounded-lg p-5 border border-slate-200 cursor-pointer">
                <summary className="font-semibold text-slate-800 text-sm sm:text-base">
                  Como faço para agendar uma monitoria individual?
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Basta acessar o aplicativo web do Monitoria Flow, clicar na aba "Solicitar Atendimento", selecionar sua disciplina e informar os tópicos em que necessita de suporte. O monitor responsável receberá sua solicitação e entrará em contato.
                </p>
              </details>

              <details className="bg-slate-50 rounded-lg p-5 border border-slate-200 cursor-pointer">
                <summary className="font-semibold text-slate-800 text-sm sm:text-base">
                  As monitorias contam como horas complementares?
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sim! Tanto para o monitor (que atua como facilitador) quanto para os participantes, a plataforma gera registros de frequência que podem ser validados pela coordenação do curso de ADS.
                </p>
              </details>

              <details className="bg-slate-50 rounded-lg p-5 border border-slate-200 cursor-pointer">
                <summary className="font-semibold text-slate-800 text-sm sm:text-base">
                  Qual a tecnologia utilizada no desenvolvimento deste projeto?
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  O projeto integra um ecossistema completo: Front-End SPA em React 19 com Vite e SCSS estruturado, testes automatizados com Vitest e Testing Library, consumo de API REST via Axios, e esta página institucional construída em Next.js com Tailwind CSS.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER INSTITUCIONAL */}
      <footer className="bg-slate-900 text-slate-400 py-10 sm:py-14 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-white font-bold text-base">Monitoria Flow</span>
            <p className="mt-1 text-slate-400">
              Faculdade Municipal de Palhoça • ADS • Projeto Integrador III
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://github.com/cristyansilva/AvaliacaoFullStack" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Repositório GitHub
            </a>
            <a href="https://avaliacao-fullstack.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition">
              Aplicação React
            </a>
          </div>

          <div className="text-center md:text-right text-slate-500">
            © 2026 Monitoria Flow. Desenvolvido para fins acadêmicos.
          </div>
        </div>
      </footer>
    </div>
  );
}
