 
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={cn(
      'bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-6 transition-all duration-300',
      hover && 'hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/10 hover:-translate-y-1',
      className
    )}>
      {children}
    </div>
  );
}