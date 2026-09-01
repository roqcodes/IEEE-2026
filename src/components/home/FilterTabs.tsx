"use client";

interface FilterTabsProps<T extends string> {
  tabs: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export default function FilterTabs<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
}: FilterTabsProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-12" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const active = value === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            id={`tab-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] border transition-colors duration-200 ease-linear delay-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue ${
              active
                ? "bg-ieee-blue border-ieee-blue text-white"
                : "bg-white border-ieee-border text-ieee-navy hover:border-ieee-blue/40 hover:bg-ieee-sky-muted"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
