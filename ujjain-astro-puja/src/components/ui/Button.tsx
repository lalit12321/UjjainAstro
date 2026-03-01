 
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, href, variant = 'primary', size = 'md', className = '', onClick }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 active:translate-y-0';
  
  const variants = {
    primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5',
    secondary: 'bg-dark-800 text-dark-50 border border-dark-600 hover:bg-dark-700 hover:-translate-y-0.5',
    outline: 'bg-transparent text-gold-400 border border-gold-400 hover:bg-gold-400 hover:text-dark-950 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type="button" onClick={onClick} className={classes}>{children}</button>;
}
