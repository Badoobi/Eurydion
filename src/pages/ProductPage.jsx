import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../data";
import { asset } from "../lib/utils";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { scrollToId, scrollToTop } from "../lib/smoothScroll";

/** Extracts a YouTube video ID from a full URL, youtu.be link, or raw ID. */
function youTubeId(input) {
  if (!input) return null;
  if (/^[\w-]{11}$/.test(input)) return input;
  const match = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

/** Renders a single content block from a product's `content` array. */
function Block({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="reveal mt-14 text-2xl font-bold tracking-tight sm:text-3xl">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="reveal mt-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="reveal mt-5 space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-px w-4 shrink-0 bg-neutral-400 dark:bg-neutral-600"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="reveal mt-8 border-l-2 border-neutral-900 pl-5 text-lg font-medium tracking-tight text-neutral-900 dark:border-neutral-100 dark:text-neutral-100">
          {block.text}
        </blockquote>
      );
    case "image":
      return (
        <figure className="reveal mt-8">
          <img
            src={asset(block.src)}
            alt={block.caption || ""}
            className="w-full border border-neutral-200 dark:border-neutral-800"
          />
          {block.caption && (
            <figcaption className="mt-3 font-mono text-xs text-neutral-400 dark:text-neutral-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "youtube": {
      const id = youTubeId(block.src || block.url || block.id);
      if (!id) return null;
      return (
        <figure className="reveal mt-8">
          <div className="aspect-video w-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={block.caption || "YouTube video"}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-xs text-neutral-400 dark:text-neutral-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);
  const revealRef = useScrollReveal();

  // Start at the top whenever the product changes
  useEffect(() => {
    scrollToTop(true);
  }, [slug]);

  const goToProducts = () => {
    navigate("/");
    setTimeout(() => scrollToId("products"), 80);
  };

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-28 sm:px-8 md:px-10 md:pt-24">
        <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          Product not found
        </h1>
        <button
          type="button"
          onClick={goToProducts}
          className="mt-8 inline-flex items-center gap-2 border-b border-neutral-300 pb-1 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
        >
          <span aria-hidden="true">←</span> Back to products
        </button>
      </div>
    );
  }

  return (
    <article
      ref={revealRef}
      className="mx-auto max-w-3xl px-6 pt-28 pb-24 sm:px-8 md:px-10 md:pt-24"
    >
      <button
        type="button"
        onClick={goToProducts}
        className="reveal group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Back to products
      </button>

      <header className="reveal mt-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          <span>{product.tag}</span>
          {product.price && (
            <>
              <span aria-hidden="true">·</span>
              <span>{product.price}</span>
            </>
          )}
        </div>
        <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
          {product.description}
        </p>
        {product.buyUrl && (
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 border border-neutral-900 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
          >
            Get it
            <span aria-hidden="true">→</span>
          </a>
        )}
      </header>

      {/* Cover */}
      <div className="reveal mt-10 overflow-hidden border border-neutral-200 dark:border-neutral-800">
        {product.cover ? (
          <img
            src={asset(product.cover)}
            alt={`${product.name} cover`}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="aspect-video w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
              color: "rgba(120,120,120,0.18)",
            }}
          />
        )}
      </div>

      {/* Write-up */}
      <div className="mt-4">
        {product.content?.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <div className="mt-20 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <button
          type="button"
          onClick={goToProducts}
          className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back to products
        </button>
      </div>
    </article>
  );
}
