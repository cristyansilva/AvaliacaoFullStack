import { useEffect, useState } from 'react';
import api from '../api';

export default function MonitoriasApi() {
  const [monitorias, setMonitorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativa = true;
    api.get('/api/monitorias')
      .then(({ data }) => { if (ativa) setMonitorias(Array.isArray(data) ? data : []); })
      .catch((error) => { if (ativa) setErro(error.response?.data?.mensagem || 'Falha ao carregar monitorias da API.'); })
      .finally(() => { if (ativa) setCarregando(false); });
    return () => { ativa = false; };
  }, []);

  return (
    <section className="pagina-comunidade">
      <header className="cabecalho-pagina"><span className="cabecalho-pagina__tag">API real</span><h1>Monitorias cadastradas</h1><p>Dados carregados com Axios do endpoint público da API.</p></header>
      {carregando && <div className="estado-carregando" role="status"><p>Carregando monitorias…</p></div>}
      {erro && <div className="alerta alerta--erro" role="alert">{erro}</div>}
      {!carregando && !erro && monitorias.length === 0 && <p>Nenhuma monitoria cadastrada.</p>}
      {!carregando && !erro && <div className="grid-monitorias">
        {monitorias.map((item) => <article className="card-post-api" key={item.id}>
          <h2 className="card-post-api__titulo">Monitoria #{item.id}</h2>
          <p><strong>ID da disciplina:</strong> {item.disciplina_id}</p>
          <p><strong>ID do monitor:</strong> {item.monitor_id}</p>
          <p><strong>Data e horário:</strong> {new Date(item.data_horario).toLocaleString('pt-BR')}</p>
          <p><strong>Atendimento:</strong> {item.tipo_atendimento}</p>
          <p><strong>Vagas:</strong> {item.vagas_max}</p>
          <p><strong>Local/link:</strong> {item.local_link}</p>
        </article>)}
      </div>}
    </section>
  );
}
