// Ícones SVG em linha (traço de 1.75px), no lugar de emojis
const ICONES = {
  calendario: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  pessoas: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  globo: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  grafico: (
    <>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  estrela: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  escudo: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  seta: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  mais: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
};

function Icone({ nome, className = 'w-5 h-5' }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONES[nome]}
    </svg>
  );
}

// Iniciais do primeiro e do último nome (ignora preposições como "da" e "das")
function obterIniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  return `${partes[0][0]}${partes.length > 1 ? partes[partes.length - 1][0] : ''}`.toUpperCase();
}

export default function InstitutionalHome() {
  const estatisticas = [
    { valor: '+250', rotulo: 'Atendimentos realizados', destaque: 'No último semestre' },
    { valor: '99,2%', rotulo: 'Aprovação dos assistidos', destaque: 'Retenção reduzida' },
    { valor: '4,9/5', rotulo: 'Avaliação média', destaque: 'Feedback dos discentes' },
    { valor: '100%', rotulo: 'Gratuito e acessível', destaque: 'Alinhado ao ODS 4' },
  ];

  const pilaresOds4 = [
    {
      titulo: 'Equidade no acesso',
      desc: 'Democratização do apoio acadêmico para todos os estudantes do turno noturno e matutino.',
      tag: 'Meta 4.3'
    },
    {
      titulo: 'Educação técnica de qualidade',
      desc: 'Aceleração do aprendizado em programação, lógica, banco de dados e arquitetura de software.',
      tag: 'Meta 4.4'
    },
    {
      titulo: 'Inclusão e não discriminação',
      desc: 'Espaço acolhedor e seguro onde tirar dúvidas é valorizado como etapa essencial do crescimento.',
      tag: 'Meta 4.5'
    },
    {
      titulo: 'Comunidade de aprendizagem',
      desc: 'Formação de veteranos como líderes monitores e suporte contínuo aos ingressantes.',
      tag: 'Meta 4.c'
    }
  ];

  const funcionalidades = [
    {
      icone: 'calendario',
      titulo: 'Agendamento simplificado',
      requisito: 'RF07 · RF08',
      desc: 'Escolha entre monitoria individual 1 a 1 ou oficinas coletivas antes das avaliações.'
    },
    {
      icone: 'pessoas',
      titulo: 'Corpo de monitores',
      requisito: 'RF06 · RF13',
      desc: 'Acesso rápido aos perfis dos monitores, especialidades, horários e canais de contato.'
    },
    {
      icone: 'globo',
      titulo: 'Modalidade híbrida',
      requisito: 'Presencial e remoto',
      desc: 'Atendimentos presenciais nos laboratórios da FMP e sessões remotas via Google Meet.'
    },
    {
      icone: 'grafico',
      titulo: 'Frequência e horas',
      requisito: 'RF16 · RF17',
      desc: 'Validação de presença e relatórios consolidados para horas complementares.'
    },
    {
      icone: 'estrela',
      titulo: 'Feedback contínuo',
      requisito: 'RF18 · RF23',
      desc: 'Avaliação transparente de cada sessão para manter a qualidade pedagógica.'
    },
    {
      icone: 'escudo',
      titulo: 'Privacidade e LGPD',
      requisito: 'RNF01',
      desc: 'Credenciais seguras, comunicação exclusiva via e-mail institucional e proteção de dados.'
    }
  ];

  const equipe = [
    { nome: 'Cristyan das Neves Silva', papel: 'Desenvolvedor Full Stack', foco: 'Front-end' },
    { nome: 'Marlon da Silva', papel: 'Desenvolvedor Full Stack', foco: 'Integração e banco de dados' },
    { nome: 'Lauren Helena De Oliveira Leao', papel: 'Desenvolvedora Full Stack', foco: 'UI/UX e requisitos' },
    { nome: 'Taíse da Rosa', papel: 'Desenvolvedora Full Stack', foco: 'Qualidade e testes' },
  ];

  const destaquesHero = [
    'Atendimento individual ou em grupo',
    'Presencial e remoto',
    'Gratuito para todo o curso'
  ];

  const perguntas = [
    {
      pergunta: 'Como faço para agendar uma monitoria individual?',
      resposta: 'Acesse o aplicativo do Monitoria Flow, abra a aba "Solicitar atendimento", selecione a disciplina e descreva o conteúdo em que precisa de apoio. O monitor responsável recebe a solicitação e entra em contato.'
    },
    {
      pergunta: 'As monitorias contam como horas complementares?',
      resposta: 'Sim. Tanto para o monitor quanto para os participantes, a plataforma gera registros de frequência que podem ser validados pela coordenação do curso de ADS.'
    },
    {
      pergunta: 'Qual a tecnologia utilizada no desenvolvimento deste projeto?',
      resposta: 'Front-end SPA em React 19 com Vite e SCSS, testes automatizados com Vitest e Testing Library, consumo de API REST via Axios, e esta página institucional em Next.js com Tailwind CSS.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. NAVEGAÇÃO INSTITUCIONAL (RESPONSIVIDADE COM SM / MD / LG) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#visao" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-md bg-fmp-ink text-white font-serif font-semibold text-[15px] flex items-center justify-center">
              MF
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-[15px] text-slate-900 tracking-tight">Monitoria Flow</span>
              <span className="text-[11px] uppercase tracking-[0.08em] text-slate-500">ADS · FMP</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600" aria-label="Seções">
            <a href="#funcionalidades" className="hover:text-slate-900 transition-colors">Recursos</a>
            <a href="#ods4" className="hover:text-slate-900 transition-colors">ODS 4</a>
            <a href="#equipe" className="hover:text-slate-900 transition-colors">Equipe</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">Dúvidas</a>
          </nav>

          <a
            href="https://avaliacao-full-stack.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 h-9 text-xs sm:text-sm font-semibold rounded-md bg-fmp-ink text-white hover:bg-fmp-inkHover transition-colors"
          >
            Acessar o app
            <Icone nome="seta" className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION COM TAILWIND (SM / MD / LG) */}
        <section id="visao" className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-5">
                Projeto Integrador III · Faculdade Municipal de Palhoça
              </p>
              <h1 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.08]">
                Monitorias acadêmicas organizadas, do agendamento à frequência.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                O <strong className="font-semibold text-slate-900">Monitoria Flow</strong> organiza o programa de monitorias do
                curso de Análise e Desenvolvimento de Sistemas: conecta estudantes a monitores, agenda
                atendimentos e registra a participação de cada sessão.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#funcionalidades"
                  className="inline-flex items-center justify-center gap-2 px-5 h-11 text-sm font-semibold rounded-md bg-fmp-ink text-white hover:bg-fmp-inkHover transition-colors"
                >
                  Conhecer os recursos
                  <Icone nome="seta" className="w-4 h-4" />
                </a>
                <a
                  href="#ods4"
                  className="inline-flex items-center justify-center px-5 h-11 text-sm font-semibold rounded-md bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Impacto social (ODS 4)
                </a>
              </div>
            </div>

            <ul className="lg:col-span-4 space-y-2 text-sm text-slate-600 lg:justify-self-end">
              {destaquesHero.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-fmp-ocre" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. BARRA DE ESTATÍSTICAS (RESPONSIVIDADE COM SM / MD / LG) */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border-x border-b border-slate-200 rounded-b-lg overflow-hidden">
            {estatisticas.map((item) => (
              <div key={item.rotulo} className="bg-white px-5 py-6 sm:px-6 sm:py-7">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                  {item.valor}
                </span>
                <span className="block mt-1 text-xs sm:text-sm font-medium text-slate-700">{item.rotulo}</span>
                <span className="hidden sm:block mt-0.5 text-xs text-slate-500">{item.destaque}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FUNCIONALIDADES DA PLATAFORMA (GRID SM / MD / LG) */}
        <section id="funcionalidades" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Recursos</p>
              <h2 className="mt-3 font-serif font-semibold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Construído a partir das demandas reais dos estudantes
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada recurso corresponde a requisitos levantados pela equipe junto à coordenação do curso.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {funcionalidades.map((func) => (
                <div key={func.titulo} className="bg-white p-6 sm:p-7">
                  <span className="w-10 h-10 rounded-md bg-fmp-soft text-fmp-ink flex items-center justify-center">
                    <Icone nome={func.icone} />
                  </span>
                  <h3 className="mt-5 text-base sm:text-lg font-semibold text-slate-900">{func.titulo}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{func.desc}</p>
                  <p className="mt-4 text-xs font-medium text-slate-500 tabular-nums">{func.requisito}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COMPROMISSO COM ODS 4 DA ONU (GRID SM / MD / LG) */}
        <section id="ods4" className="bg-fmp-inkDeep text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-300">
                Objetivo de Desenvolvimento Sustentável 4
              </p>
              <h2 className="mt-3 font-serif font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Educação inclusiva, equitativa e de qualidade para todos.
              </h2>
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                O Monitoria Flow responde a desafios do ensino superior com mecanismos que reduzem a evasão
                e nivelam conhecimentos fundamentais.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15 rounded-lg overflow-hidden mt-12">
              {pilaresOds4.map((pilar) => (
                <div key={pilar.tag} className="bg-fmp-inkDeep p-6">
                  <span className="block w-6 h-0.5 bg-fmp-ocre mb-4" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400 tabular-nums">
                    {pilar.tag}
                  </span>
                  <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-white">{pilar.titulo}</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. EQUIPE DO PROJETO INTEGRADOR III (GRID SM / MD / LG) */}
        <section id="equipe" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Equipe</p>
                <h2 className="mt-3 font-serif font-semibold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Desenvolvimento e orientação
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                Orientação: <strong className="font-semibold text-slate-900">Profa. Daniela Amorim</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {equipe.map((membro) => (
                <div key={membro.nome} className="bg-white p-5 rounded-lg border border-slate-200">
                  <div className="w-11 h-11 rounded-full bg-fmp-soft text-fmp-ink font-serif font-semibold flex items-center justify-center">
                    {obterIniciais(membro.nome)}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{membro.nome}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">{membro.papel}</p>
                  <p className="mt-3 pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">{membro.foco}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
        <section id="faq" className="bg-white border-t border-slate-200 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-8 sm:mb-10">
              Perguntas frequentes
            </h2>

            <div className="border-t border-slate-200">
              {perguntas.map((item) => (
                <details key={item.pergunta} className="group border-b border-slate-200">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-semibold text-slate-900 text-sm sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.pergunta}
                    <Icone nome="mais" className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 -mt-1 text-sm text-slate-600 leading-relaxed max-w-2xl">{item.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER INSTITUCIONAL */}
      <footer className="bg-white border-t border-slate-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <span className="font-semibold text-slate-900">Monitoria Flow</span>
            <p className="mt-0.5 text-slate-500">
              Faculdade Municipal de Palhoça · ADS · Projeto Integrador III
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <a href="https://github.com/cristyansilva/AvaliacaoFullStack" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
              Repositório no GitHub
            </a>
            <a href="https://avaliacao-full-stack.vercel.app" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
              Aplicação React
            </a>
          </div>

          <p className="text-slate-500 md:text-right">© 2026 Monitoria Flow · Projeto acadêmico</p>
        </div>
      </footer>
    </div>
  );
}
