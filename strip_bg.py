import re
import glob

# 1. Update globals.css
with open('src/app/globals.css', 'r') as f:
    css = f.read()
css = css.replace('@apply bg-[#FAFAFA] text-[--color-charcoal];', '@apply bg-white text-[--color-charcoal];')
with open('src/app/globals.css', 'w') as f:
    f.write(css)

# 2. Update PageHeader.tsx
header_code = """import React from "react";

interface PageHeaderProps {
  breadcrumb?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section className="py-16 sm:py-24 bg-white relative border-t border-gray-200">
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <p className="text-sm text-[--color-gold] uppercase tracking-widest font-bold mb-4">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[--color-navy] font-serif leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-[--color-charcoal] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
"""
with open('src/components/PageHeader.tsx', 'w') as f:
    f.write(header_code)

# 3. Strip section backgrounds from all inner pages
files = glob.glob('src/app/**/page.tsx', recursive=True)
for filepath in files:
    if filepath == 'src/app/page.tsx':
        continue # Skip home page
        
    with open(filepath, 'r') as f:
        content = f.read()

    # We want to replace these classes inside <section className="...">
    def remove_bg(match):
        attrs = match.group(1)
        classes_to_remove = ['bg-[#FAFAFA]', 'bg-[--color-surface-blue]', 'bg-[--color-surface-cream]', 'bg-[--color-navy]', 'bg-white', 'text-white']
        for cls in classes_to_remove:
            attrs = attrs.replace(f' {cls}', '').replace(f'{cls} ', '').replace(cls, '')
        return f'<section{attrs}>'

    content = re.sub(r'<section([^>]*)>', remove_bg, content)
    
    # In join/page.tsx, if we removed text-white from hero, we should ensure the text has a good color (it uses default or charcoal)
    # The subtitle in join/page.tsx had text-[--color-light-gray], let's replace it with text-[--color-charcoal]
    if 'join/page.tsx' in filepath:
        content = content.replace('text-[--color-light-gray]', 'text-[--color-charcoal]')
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Backgrounds stripped")
