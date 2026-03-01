 
import { cn } from '../../lib/utils';

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  name?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export default function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  error, 
  name, 
  required, 
  className = '',
  placeholder 
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-dark-300 text-sm font-medium mb-2">
          {label} {required && <span className="text-gold-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={cn(
          'w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-xl text-dark-50',
          'focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
          'transition-all duration-300',
          error && 'border-red-500 focus:border-red-500',
          !value && 'text-dark-400',
          className
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}