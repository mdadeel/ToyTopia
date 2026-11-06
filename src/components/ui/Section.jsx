export default function Section({ eyebrow, title, subtitle, action, children, className = '', containerClassName = '' }) {
  return (
    <section className={`py-14 sm:py-20 ${className}`}>
      <div className={`shell ${containerClassName}`}>
        {(eyebrow || title || action) && (
          <div className="flex flex-wrap items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
              {title && (
                <h2 className="text-3xl sm:text-4xl font-extrabold text-balance">{title}</h2>
              )}
              {subtitle && <p className="mt-3 text-ink/75 text-lg">{subtitle}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
