import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'border border-black/100 dark:border-white text-4xl uppercase w-fit px-6 py-2',
        className,
      )}
    >
      logo
    </div>
  );
};

export { Logo };
