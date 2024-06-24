import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'w-fit border border-black/100 px-6 py-2 text-4xl uppercase dark:border-white',
        className,
      )}
    >
      logo
    </div>
  );
};

export { Logo };
