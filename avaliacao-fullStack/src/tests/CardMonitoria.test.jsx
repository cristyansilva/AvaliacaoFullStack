import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CardMonitoria from '../components/CardMonitoria/CardMonitoria';

/**
 * REQUISITO AULA 05: Teste de Componente com React Testing Library
 */
describe('Componente CardMonitoria (React Testing Library)', () => {
  const monitoriaMock = {
    id: 999,
    disciplina: 'Programação Web I',
    monitor: 'Taíse da Rosa',
    emailMonitor: 'taise.rosa@aluno.fmp.edu.br',
    data: '2026-09-25',
    horario: '19:00 - 20:30',
    tipo: 'Coletiva',
    local: 'Laboratório 03',
    topico: 'Componentização e Hooks no React',
    vagasDisponiveis: 4,
    vagasTotais: 10,
    status: 'Disponível'
  };

  it('deve renderizar as informações principais da monitoria', () => {
    render(
      <CardMonitoria
        monitoria={monitoriaMock}
        onInscrever={() => {}}
        isInscrito={false}
      />
    );

    expect(screen.getByText('Programação Web I')).toBeInTheDocument();
    expect(screen.getByText(/Taíse da Rosa/)).toBeInTheDocument();
    expect(screen.getByText('Componentização e Hooks no React')).toBeInTheDocument();
    expect(screen.getByText(/Vagas:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reservar Minha Vaga/i })).toBeInTheDocument();
  });

  it('deve disparar a função de callback ao clicar no botão de inscrição', () => {
    const handleInscreverMock = vi.fn();

    render(
      <CardMonitoria
        monitoria={monitoriaMock}
        onInscrever={handleInscreverMock}
        isInscrito={false}
      />
    );

    const botao = screen.getByRole('button', { name: /Reservar Minha Vaga/i });
    fireEvent.click(botao);

    expect(handleInscreverMock).toHaveBeenCalledTimes(1);
    expect(handleInscreverMock).toHaveBeenCalledWith(999);
  });

  it('deve renderizar botão desabilitado quando as vagas estiverem esgotadas', () => {
    const monitoriaEsgotada = {
      ...monitoriaMock,
      vagasDisponiveis: 0,
      status: 'Esgotado'
    };

    render(
      <CardMonitoria
        monitoria={monitoriaEsgotada}
        onInscrever={() => {}}
        isInscrito={false}
      />
    );

    const botao = screen.getByRole('button', { name: /Esgotado/i });
    expect(botao).toBeDisabled();
  });

  it('deve permitir cancelar inscrição quando o usuário já estiver inscrito', () => {
    const handleCancelarMock = vi.fn();

    render(
      <CardMonitoria
        monitoria={monitoriaMock}
        onInscrever={handleCancelarMock}
        isInscrito={true}
      />
    );

    const botao = screen.getByRole('button', { name: /Cancelar Inscrição/i });
    expect(botao).toBeInTheDocument();

    fireEvent.click(botao);
    expect(handleCancelarMock).toHaveBeenCalledWith(999);
  });
});
