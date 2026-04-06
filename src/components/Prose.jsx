import clsx from 'clsx';

export function Prose({as: Component = 'div', className, ...props}) {
  return (
    <Component
      className={clsx(className, 'prose dark:prose-invert font-space')}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      {...props}
    />
  );
}
