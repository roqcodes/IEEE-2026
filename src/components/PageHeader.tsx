/**
 * PageHeader — reusable section header used at the top of inner pages.
 * Provides a consistent breadcrumb + title + subtitle layout
 * on a navy-to-purple gradient background.
 */

interface PageHeaderProps {
  /** Breadcrumb label shown before the title */
  breadcrumb?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section
      className="py-16 sm:py-24"
      style={{
        background: "linear-gradient(135deg, var(--color-navy-light) 0%, #4B2E83 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <p className="text-sm text-[--color-gold] uppercase tracking-widest font-bold mb-4">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-white/80 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
