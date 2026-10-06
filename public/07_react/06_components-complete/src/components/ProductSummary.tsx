type ProductSummaryProps = {
  product: {
    name: string;
    brand: string;
    price: string;
    details: string;
    rating: string;
    imageSrc: string;
    imageAlt: string;
  };
};

export default function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <section className="border-top py-s px-s border-bottom row" aria-label="Produkt">
      <img src={product.imageSrc} alt={product.imageAlt} className="col-4" />
      <div className="col-8 d-flex flex-column">
        <p className="my-0 product-label">im Überblick</p>
        <p className="mt-xxs mb-0 font-13 font-color-highlight">{product.name}</p>
        <p className="my-0 font-16"><strong>{product.price}</strong></p>
        <p className="my-0 font-16"><strong>{product.brand}</strong> {product.name}</p>
        <p className="my-0 font-13 font-color-light">{product.details}</p>
        <p className="mt-xs font-13">{product.rating}</p>
      </div>
    </section>
  );
}