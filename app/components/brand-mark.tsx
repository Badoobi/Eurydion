export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 44" role="img" aria-label="Eurydion mark">
      <path d="M26 3 3 40h12l11-19 11 19h12L26 3Z" fill="currentColor" />
      <path d="m26 23-7 12h14l-7-12Z" fill="currentColor" opacity=".3" />
    </svg>
  );
}
