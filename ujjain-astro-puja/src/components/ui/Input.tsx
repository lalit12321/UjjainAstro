import { cn } from '../../lib/utils';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  name, 
  required, 
  className = '',
  disabled = false 
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-dark-300 text-sm font-medium mb-2">
          {label} {required && <span className="text-gold-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-xl text-dark-50 placeholder-dark-400',
          'focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
          'transition-all duration-300',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}