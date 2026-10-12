import SummaryCard from "./SummaryCard";

type ProductSummaryProps = {
  product: {
    category: string;
    name: string;
    price: string;
    details: string;
    rating: {
      average: number;
      count: number;
    };
    imageSrc: string;
    imageAlt: string;
  };
};

export default function ProductSummary({ product }: ProductSummaryProps) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(product.rating.average)));
  const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);

  return (
    <section aria-label="Produkt">
      <SummaryCard image={{ src: product.imageSrc, alt: product.imageAlt }} className="border-top">
        <p className="content-category my-0 font-13">{product.category}</p>
        <p className="mt-xxs mb-0 font-20 font-weight-regular">{product.name}</p>
        <p className="my-0 font-16"><strong>{product.price}</strong></p>
        <p className="my-0 font-13 font-color-light">{product.details}</p>
        <p className="mt-xs font-13">
          <span role="img" aria-label={`${product.rating.average.toFixed(1)} von 5 Sternen`}>
            {stars}
          </span>{" "}
          {product.rating.average.toFixed(1)} ({product.rating.count} Bewertungen)
        </p>
      </SummaryCard>
    </section>
  );
}