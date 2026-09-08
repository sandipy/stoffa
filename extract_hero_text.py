import re

with open("src/data/heroPairingsData.ts", "r", encoding="utf-8") as f:
    pairings_content = f.read()

titles = re.findall(r"title:\s*'([^']+)'", pairings_content)
subtitles = re.findall(r"subtitle:\s*'([^']+)'", pairings_content)
shoes = re.findall(r"suggestedShoes:\s*'([^']+)'", pairings_content)
bags = re.findall(r"suggestedBag:\s*'([^']+)'", pairings_content)

print("Unique Hero Titles:", len(set(titles)))
for t in set(titles):
    print(" - Title:", t)

print("\nUnique Hero Subtitles:", len(set(subtitles)))
for s in set(subtitles):
    print(" - Subtitle:", s)
