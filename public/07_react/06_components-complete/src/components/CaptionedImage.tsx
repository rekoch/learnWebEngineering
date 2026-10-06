type CaptionedImageProps = {
  src: string;
  alt: string;
  caption: string;
};

export default function CaptionedImage({ src, alt, caption }: CaptionedImageProps) {
  return (
    <figure className="my-0 mx-0">
      <img src={src} alt={alt} />
      <figcaption className="font-caption">{caption}</figcaption>
    </figure>
  );
}