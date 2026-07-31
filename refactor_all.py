import os
import glob
import re

files = glob.glob('src/app/**/page.tsx', recursive=True)

# CSS for the crosshair
CROSSHAIR = '\n        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>'

for filepath in files:
    if filepath == 'src/app/page.tsx':
        continue # Already perfect
        
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Add relative border-t border-gray-200 and crosshair to all <section> tags
    def section_repl(match):
        attrs = match.group(1)
        if 'className="' in attrs:
            # Prevent double application
            if 'border-t' not in attrs:
                attrs = attrs.replace('className="', 'className="relative border-t border-gray-200 ')
            elif 'relative' not in attrs:
                attrs = attrs.replace('className="', 'className="relative ')
        else:
            attrs += ' className="relative border-t border-gray-200"'
            
        return f'<section{attrs}>{CROSSHAIR}'
        
    # First remove any existing crosshairs to prevent duplication if script is run twice
    content = content.replace(CROSSHAIR, '')
    
    # Then apply it
    content = re.sub(r'<section([^>]*)>', section_repl, content)

    # 2. Remove old tick-marks
    content = re.sub(r'<div className="tick-mark[^"]*"></div>', '', content)
    
    # 3. Standardize H2 headers to match homepage
    # Find h2 with text-[--color-navy] and font-serif and replace with the light font-sans design
    content = re.sub(
        r'className="[^"]*text-4xl[^"]*font-bold font-serif text-\[--color-navy\][^"]*"',
        r'className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center"',
        content
    )
    
    # 4. Standardize outline buttons to gold pop on hover
    content = content.replace(
        'hover:bg-[--color-navy] hover:text-white transition-colors',
        'hover:bg-[--color-gold] hover:border-[--color-gold] hover:text-[--color-navy] hover:-translate-y-1 hover:shadow-lg transition-all duration-300'
    )
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Refactored {len(files)} pages")
