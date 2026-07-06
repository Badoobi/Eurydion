import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data";
import { asset } from "../../lib/utils";

const INITIAL_COUNT = 8;

function Thumbnail({ product }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
      {product.cover ? (
        <img
          src={asset(product.cover)}
          alt=""
          className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 12px)",
            color: "rgba(120,120,120,0.18)",
          }}
        />
      )}
      <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
        {product.tag}
      </span>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col border border-neutral-200 transition-colors duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Thumbnail product={product} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight">
            {product.name}
          </h3>
          {product.price && (
            <span className="shrink-0 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              {product.price}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {product.description}
        </p>
      </div>
    </Link>
  );
}

export default function Products() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PRODUCTS : PRODUCTS.slice(0, INITIAL_COUNT);

  return (
    <section
      id="products"
      className="border-b border-neutral-200 py-24 dark:border-neutral-800"
    >
      <div className="reveal flex items-end justify-between">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Products
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {String(PRODUCTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="reveal mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {PRODUCTS.length > INITIAL_COUNT && (
        <div className="reveal mt-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 border-b border-neutral-300 pb-1 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
          >
            {expanded ? "Show less" : "View all products"}
            <span
              aria-hidden="true"
              className={
                "transition-transform duration-300 " +
                (expanded ? "-rotate-90" : "rotate-90")
              }
            >
              →
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
