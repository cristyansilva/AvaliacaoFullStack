import './globals.css';

export const metadata = {
  title: 'Monitoria Flow | Plataforma Institucional de Monitorias ADS FMP',
  description: 'Plataforma integrada de monitorias acadêmicas da Faculdade Municipal de Palhoça. Alinhada ao ODS 4 da ONU (Educação de Qualidade).',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
