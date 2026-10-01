
/**
 * Componente Reutilizável de Badge / Etiqueta de Status
 * @param {string} variant - 'success' | 'warning' | 'info' | 'danger'
 * @param {React.ReactNode} children - Conteúdo do badge
 */
export default function Badge({ variant = 'info', children }) {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
}
