import Image from 'next/image'

export const DarkAndLightImage = ({ darkSrc, lightSrc, width, height, alt }) => {
    return (
      <picture>
        <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
        <Image
            src={lightSrc}
            alt={alt}
            width={width}
            height={height}
        />
      </picture>
  );
};