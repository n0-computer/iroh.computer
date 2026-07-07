import { clsx } from 'clsx';
import Image from 'next/image'

export const ThemeImage = ({ darkSrc, lightSrc, width, height, alt, className }) => {
  return (
    <>
      <Image
          className={clsx(className, 'not-prose mx-auto hidden dark:block')}
          src={darkSrc}
          alt={alt}
          width={width}
          height={height}
      />
      <Image
        className={clsx(className, 'not-prose mx-auto block dark:hidden')}
          src={lightSrc}
          alt={alt}
          width={width}
          height={height}
      />
    </>
  );
};
