/**
 * PageHeader — reusable section header used at the top of inner pages.
 * Provides a consistent breadcrumb + title + subtitle layout
 * on an ieee-blue gradient background.
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
      className="py-14 sm:py-20"
      style={{
        background:
          "linear-gradient(135deg, var(--color-ieee-blue-dark) 0%, var(--color-ieee-blue) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <p className="text-sm text-blue-200 uppercase tracking-widest font-medium mb-2">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-blue-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
