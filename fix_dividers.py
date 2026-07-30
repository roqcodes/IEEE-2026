import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove all old internal top/bottom lines
content = re.sub(r'\{\s*/\*\s*Top Line\s*\*/\s*\}\s*<div className="absolute -top-24 w-\[1px\] h-16 bg-\[#00629B\]/40 hidden md:block"></div>', '', content)
content = re.sub(r'\{\s*/\*\s*Bottom Line\s*\*/\s*\}\s*<div className="absolute left-1/2 -translate-x-1/2 w-\[1px\] h-24 bg-\[#00629B\]/40 hidden md:block mt-8"></div>', '', content)
content = re.sub(r'\{\s*/\*\s*Bottom Line\s*\*/\s*\}\s*<div className="relative h-24 mt-12 hidden md:block">\s*<div className="absolute left-1/2 -translate-x-1/2 w-\[1px\] h-full bg-\[#00629B\]/40"></div>\s*</div>', '', content)

# 2. Add divider block to section tags
def add_divider(match):
    tag = match.group(0)
    if 'relative' not in tag:
        tag = tag.replace('">', ' relative">')
    if 'border-t border-gray-200' not in tag:
        tag = tag.replace('">', ' border-t border-gray-200">')
    return tag + '\n        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>'

content = re.sub(r'<section className="py-24 bg-\[#FAFAFA\]">', add_divider, content)
content = re.sub(r'<section className="py-24 bg-white">', add_divider, content)
content = re.sub(r'<section className="py-24 bg-red-50">', add_divider, content)
content = re.sub(r'<section className="py-24 bg-\[--color-surface-blue\]">', add_divider, content)
content = re.sub(r'<section className="pt-12 pb-32 bg-white">', add_divider, content)
content = re.sub(r'<section className="bg-\[--color-navy\] py-20">', add_divider, content)

# 3. Add divider before HomeTabs
home_tabs_divider = """      {/* DIVIDER BEFORE HOME TABS */}
      <div className="w-full relative h-0 border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
      </div>
      
      {/* 5. "FIND YOUR PATH" — TABBED AUDIENCE SELECTOR */}"""
content = content.replace('{/* 5. "FIND YOUR PATH" — TABBED AUDIENCE SELECTOR */}', home_tabs_divider)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

