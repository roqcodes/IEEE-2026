import os
import glob

def fix_file(filepath):
    with open(filepath, 'r') as f:
        c = f.read()
    
    # In about/page.tsx:
    c = c.replace('className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} p-8 text-center shadow-sm"', 'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} p-8 text-center shadow-sm`}')
    
    with open(filepath, 'w') as f:
        f.write(c)

files = glob.glob('src/app/**/page.tsx', recursive=True)
for f in files:
    fix_file(f)

print("Syntax fixed")
