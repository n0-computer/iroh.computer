import Link from 'next/link';
import clsx from 'clsx';

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  );
}

const variantStyles = {
  primary:
    'rounded-sm bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-irohPurple-400/10 dark:text-irohPurple-400 dark:ring-1 dark:ring-inset dark:ring-irohPurple-400/20 dark:hover:bg-irohPurple-400/10 dark:hover:text-irohPurple-300 dark:hover:ring-irohPurple-300',
  secondary:
    'rounded-sm bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
  filled:
    'rounded-sm bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-irohPurple-500 dark:text-white dark:hover:bg-irohPurple-400',
  outline:
    'rounded-sm py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-irohPurple-500 hover:text-irohPurple-600 dark:text-irohPurple-400 dark:hover:text-irohPurple-500',
};

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}) {
  const Component = props.href ? Link : 'button';

  className = clsx(
      'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
      variantStyles[variant],
      className,
  );

  const arrowIcon = (
    <ArrowIcon
      className={clsx(
          'mt-0.5 h-5 w-5',
          variant === 'text' && 'relative top-px',
          arrow === 'left' && '-ml-1 rotate-180',
          arrow === 'right' && '-mr-1',
      )}
    />
  );

  return (
    <Component className={className} {...props}>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  );
}
