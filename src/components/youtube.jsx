

export function YouTube({ src }) {
  return (
    <div className="mr-auto my-12">
      <iframe
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerpolicy="strict-origin-when-cross-origin" />
    </div>)
}
