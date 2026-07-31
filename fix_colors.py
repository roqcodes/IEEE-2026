import re
import os

COLORS = "const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];"

def process_about():
    with open('src/app/about/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function AboutPage() {', f'{COLORS}\nexport default function AboutPage() {{')
    c = c.replace('.map((fact) => (', '.map((fact, idx) => (')
    c = c.replace('className="border border-[--color-border] bg-[--color-surface-cream]', 'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]}')
    # the replace above needs closing backtick, wait, `className="..."`
    c = re.sub(r'className="border border-\[--color-border\] bg-\[--color-surface-cream\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c)

    c = c.replace('{values.map((v) => (', '{values.map((v, idx) => (')
    c = re.sub(r'className="bg-white border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[(idx+2) % boxColors.length]} \1`}', c)

    with open('src/app/about/page.tsx', 'w') as f:
        f.write(c)

def process_societies():
    with open('src/app/societies/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function SocietiesPage() {', f'{COLORS}\nexport default function SocietiesPage() {{')
    c = c.replace('societies.map((s) => (', 'societies.map((s, idx) => (')
    c = re.sub(r'className="bg-\[--color-surface-cream\] border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c)
    with open('src/app/societies/page.tsx', 'w') as f:
        f.write(c)

def process_execom():
    with open('src/app/execom/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function ExecomPage() {', f'{COLORS}\nexport default function ExecomPage() {{')
    c = c.replace('leadership.map((m) => (', 'leadership.map((m, idx) => (')
    c = re.sub(r'className="bg-white border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c, count=1) # only first match
    
    # Second map is team
    c = c.replace('team.map((m) => (', 'team.map((m, idx) => (')
    # Need to replace the remaining bg-white boxes
    c = re.sub(r'className="bg-white border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[(idx+4) % boxColors.length]} \1`}', c)

    with open('src/app/execom/page.tsx', 'w') as f:
        f.write(c)

def process_events():
    with open('src/app/events/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function EventsPage() {', f'{COLORS}\nexport default function EventsPage() {{')
    c = c.replace('filtered.map((event) => (', 'filtered.map((event, idx) => (')
    c = re.sub(r'className="bg-white border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c)
    with open('src/app/events/page.tsx', 'w') as f:
        f.write(c)

def process_gallery():
    with open('src/app/gallery/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function GalleryPage() {', f'{COLORS}\nexport default function GalleryPage() {{')
    c = c.replace('filtered.map((album) => (', 'filtered.map((album, idx) => (')
    c = re.sub(r'className="group relative bg-white border border-\[--color-border\] ([^"]+)"', r'className={`group relative border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c)
    with open('src/app/gallery/page.tsx', 'w') as f:
        f.write(c)

def process_achievements():
    with open('src/app/achievements/page.tsx', 'r') as f:
        c = f.read()
    c = c.replace('export default function AchievementsPage() {', f'{COLORS}\nexport default function AchievementsPage() {{')
    c = c.replace('byYear[year].map((a) => {', 'byYear[year].map((a, idx) => {')
    c = re.sub(r'className="bg-white border border-\[--color-border\] ([^"]+)"', r'className={`border border-[--color-border] ${boxColors[idx % boxColors.length]} \1`}', c)
    with open('src/app/achievements/page.tsx', 'w') as f:
        f.write(c)

def process_homepage():
    with open('src/app/page.tsx', 'r') as f:
        c = f.read()
    # Replace Latest Innovations hardcoded cards
    c = c.replace('className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[#FDF1D8]"', 'className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-yellow-50"')
    c = c.replace('className="group flex flex-col md:col-span-2 shadow-sm hover:shadow-xl transition-shadow bg-[#FDF1D8]"', 'className="group flex flex-col md:col-span-2 shadow-sm hover:shadow-xl transition-shadow bg-blue-50"')
    
    with open('src/app/page.tsx', 'w') as f:
        f.write(c)

try:
    process_about()
    process_societies()
    process_execom()
    process_events()
    process_gallery()
    process_achievements()
    process_homepage()
    print("Colors injected!")
except Exception as e:
    print(e)

