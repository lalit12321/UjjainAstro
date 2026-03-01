 
interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'darker' | 'gradient';
}

export default function Section({ id, children, className = '', background = 'dark' }: SectionProps) {
  const backgrounds = {
    dark: 'bg-dark-900',
    darker: 'bg-dark-950',
    gradient: 'bg-gradient-to-b from-dark-900 to-dark-950',
  };

  return (
    <section 
      id={id} 
      className={`${backgrounds[background]} py-16 md:py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}