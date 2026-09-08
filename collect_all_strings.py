import re
import json

strings_to_translate = set()

def extract_from_file(filename, patterns):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        for p in patterns:
            matches = re.findall(p, content)
            for m in matches:
                if isinstance(m, tuple):
                    for part in m:
                        if part and len(part.strip()) > 1:
                            strings_to_translate.add(part.strip())
                elif isinstance(m, str) and len(m.strip()) > 1:
                    strings_to_translate.add(m.strip())
    except Exception as e:
        print(f"Error reading {filename}: {e}")

# 1. heroPairingsData
extract_from_file('src/data/heroPairingsData.ts', [
    r"title:\s*'([^']+)'",
    r"subtitle:\s*'([^']+)'",
    r"suggestedShoes:\s*'([^']+)'",
    r"suggestedBag:\s*'([^']+)'",
])

# 2. heroCollectionsData
extract_from_file('src/data/heroCollectionsData.ts', [
    r"categoryTarget:\s*'([^']+)'",
    r"badge:\s*'([^']+)'",
    r"title:\s*'([^']+)'",
    r"subtitle:\s*'([^']+)'",
])

# 3. pageHeroManager
extract_from_file('src/data/pageHeroManager.ts', [
    r"defaultTitle:\s*'([^']+)'",
    r"defaultSubtitle:\s*'([^']+)'",
    r"name:\s*'([^']+)'",
])

# 4. Navbar categories and labels
extract_from_file('src/components/Navbar.tsx', [
    r"label:\s*'([^']+)'",
    r"theme:\s*'([^']+)'",
    r"filterValue:\s*'([^']+)'",
    r"t\('([^']+)'",
])

# 5. FourCategoryLinks
extract_from_file('src/components/FourCategoryLinks.tsx', [
    r"title:\s*'([^']+)'",
    r"subtitle:\s*'([^']+)'",
])

# 6. CategoryCollectionSection
extract_from_file('src/components/CategoryCollectionSection.tsx', [
    r"name:\s*'([^']+)'",
    r"t\('([^']+)'",
])

# 7. Specific known user strings
strings_to_translate.add("Women's luxury footwear & artisanal bags handcrafted in master workshops. Signature Kolhapuri wedges, architectural block heels, authentic flats, and bridal couture exclusively priced in USD.")
strings_to_translate.add("Designed for All-Day Comfort • Dual-Density Memory Foam")
strings_to_translate.add("Madison Avenue Atelier, New York, NY 10022")
strings_to_translate.add("Mon – Sat: 10:00 AM – 7:00 PM EST")
strings_to_translate.add("Personal styling & bridal fitting consultations available worldwide via WhatsApp or private appointment.")
strings_to_translate.add("© 2026 Accesoire Luxury Footwear & Bags. All Rights Reserved.")
strings_to_translate.add("Exchanges & Returns")
strings_to_translate.add("Complimentary 30-day pre-paid return shipping worldwide")
strings_to_translate.add("Customer Care")
strings_to_translate.add("Personal styling & sizing concierge available 7 days a week")
strings_to_translate.add("Artisanal Quality")
strings_to_translate.add("Dual-density memory foam footbed with custom hand embroidery")
strings_to_translate.add("Instant Gift Cards")
strings_to_translate.add("Delivered digitally with personalized messages for bridal & gifts")
strings_to_translate.add("About Us")
strings_to_translate.add("Our Atelier")
strings_to_translate.add("Artisanship")
strings_to_translate.add("Press & Editorial")
strings_to_translate.add("Wholesale & B2B")
strings_to_translate.add("Bespoke Bridal Inquiry")
strings_to_translate.add("Customer Care & Concierge")
strings_to_translate.add("Shipping & Delivery")
strings_to_translate.add("Shoe Size Guide")
strings_to_translate.add("Client Inquiries & FAQ")
strings_to_translate.add("Join Our VIP Circle")
strings_to_translate.add("Subscribe for private trunk show announcements, early drops, and 15% off your first order.")
strings_to_translate.add("Enter your email")
strings_to_translate.add("JOIN")
strings_to_translate.add("JOINED")
strings_to_translate.add("Welcome to Accesoire! Check your inbox for your welcome voucher.")
strings_to_translate.add("Follow @Accesoire")
strings_to_translate.add("Staff Access")
strings_to_translate.add("Admin Authenticated")
strings_to_translate.add("Stripe 256-Bit SSL Encrypted")
strings_to_translate.add("Currency")
strings_to_translate.add("Paired with Shoe:")
strings_to_translate.add("Shop Collection")
strings_to_translate.add("Explore Shoes & Bags")

# Filter out code identifiers or CSS classes
cleaned = []
for s in sorted(strings_to_translate):
    if s.startswith('/') or s.startswith('#') or s.startswith('http') or s.startswith('bg-') or s.startswith('text-'):
        continue
    if len(s) > 1 and not s.isdigit():
        cleaned.append(s)

print(f"Total unique strings extracted: {len(cleaned)}")
with open('extracted_strings.json', 'w', encoding='utf-8') as out:
    json.dump(cleaned, out, indent=2, ensure_ascii=False)
