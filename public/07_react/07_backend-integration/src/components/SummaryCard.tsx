import type { ReactNode } from "react";

type SummaryCardProps = {
  image: {
    src: string;
    alt: string;
  };
  children: ReactNode;
  className?: string;
};

export default function SummaryCard({ image, children, className = "" }: SummaryCardProps) {
  return (
    <div className={`row align-items-start border-bottom py-s px-s ${className}`}>
      <img src={image.src} alt={image.alt} className="col-4" />
      <div className="col-8 d-flex flex-column">{children}</div>
    </div>
  );
}