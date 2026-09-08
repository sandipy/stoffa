import json
import re
import os

with open('extracted_strings.json', 'r', encoding='utf-8') as f:
    all_strings = json.load(f)

print(f"Loaded {len(all_strings)} extracted strings.")

# Core dictionary of translations for our luxury footwear & handbag storefront
# covering all categories, hero titles, subtitles, shoe heights, badges, footer text, etc.
TRANSLATION_MAP = {
    # Shoe Heights & Categories
    'All Shoes': {
        'fr': 'Toutes les Chaussures', 'es': 'Todo el Calzado', 'de': 'Alle Schuhe',
        'it': 'Tutte le Scarpe', 'pt': 'Todo o Calçado', 'ar': 'جميع الأحذية',
        'hi': 'सभी जूते', 'ja': 'すべてのシューズ', 'nl': 'Alle Schoenen',
        'zh': '全部鞋履', 'ko': '모든 슈즈'
    },
    '2.5" Wedges': {
        'fr': 'Compensées 6,5 cm (2.5")', 'es': 'Cuñas 6,5 cm (2.5")', 'de': '6,5 cm Keilabsätze (2.5")',
        'it': 'Zeppe 6,5 cm (2.5")', 'pt': 'Cunhas 6,5 cm (2.5")', 'ar': 'كعوب ويدج 2.5 بوصة',
        'hi': '2.5 इंच वेजेस', 'ja': '2.5インチ ウェッジ', 'nl': '2.5" Wedges',
        'zh': '2.5英寸坡跟鞋', 'ko': '2.5인치 웨지'
    },
    '3.5" Wedges': {
        'fr': 'Compensées 9 cm (3.5")', 'es': 'Cuñas 9 cm (3.5")', 'de': '9 cm Keilabsätze (3.5")',
        'it': 'Zeppe 9 cm (3.5")', 'pt': 'Cunhas 9 cm (3.5")', 'ar': 'كعوب ويدج 3.5 بوصة',
        'hi': '3.5 इंच वेजेस', 'ja': '3.5インチ ウェッジ', 'nl': '3.5" Wedges',
        'zh': '3.5英寸坡跟鞋', 'ko': '3.5인치 웨지'
    },
    '4.25" Wedges': {
        'fr': 'Compensées Hautes 11 cm (4.25")', 'es': 'Cuñas Altas 11 cm (4.25")', 'de': '11 cm Keilabsätze (4.25")',
        'it': 'Zeppe Alte 11 cm (4.25")', 'pt': 'Cunhas Altas 11 cm (4.25")', 'ar': 'كعوب ويدج 4.25 بوصة',
        'hi': '4.25 इंच वेजेस', 'ja': '4.25インチ ウェッジ', 'nl': '4.25" Wedges',
        'zh': '4.25英寸高坡跟鞋', 'ko': '4.25인치 웨지'
    },
    'Low wedges - 2.5 inch': {
        'fr': 'Compensées Basses - 6,5 cm', 'es': 'Cuñas Bajas - 6,5 cm', 'de': 'Niedrige Keilabsätze - 6,5 cm',
        'it': 'Zeppe Basse - 6,5 cm', 'pt': 'Cunhas Baixas - 6,5 cm', 'ar': 'كعوب ويدج منخفضة - 2.5 بوصة',
        'hi': 'लो वेजेस - 2.5 इंच', 'ja': 'ローウェッジ - 2.5インチ', 'nl': 'Lage wedges - 2.5 inch',
        'zh': '低坡跟鞋 - 2.5英寸', 'ko': '로우 웨지 - 2.5인치'
    },
    'Low Wedges - 2.5"': {
        'fr': 'Compensées Basses - 2.5"', 'es': 'Cuñas Bajas - 2.5"', 'de': 'Niedrige Keilabsätze - 2.5"',
        'it': 'Zeppe Basse - 2.5"', 'pt': 'Cunhas Baixas - 2.5"', 'ar': 'كعوب ويدج منخفضة - 2.5 بوصة',
        'hi': 'लो वेजेस - 2.5"', 'ja': 'ローウェッジ - 2.5"', 'nl': 'Lage wedges - 2.5"',
        'zh': '低坡跟鞋 - 2.5"', 'ko': '로우 웨지 - 2.5"'
    },
    'High wedges - 3.5 inch': {
        'fr': 'Compensées Hautes - 9 cm', 'es': 'Cuñas Altas - 9 cm', 'de': 'Hohe Keilabsätze - 9 cm',
        'it': 'Zeppe Alte - 9 cm', 'pt': 'Cunhas Altas - 9 cm', 'ar': 'كعوب ويدج عالية - 3.5 بوصة',
        'hi': 'हाई वेजेस - 3.5 इंच', 'ja': 'ハイウェッジ - 3.5インチ', 'nl': 'Hoge wedges - 3.5 inch',
        'zh': '高坡跟鞋 - 3.5英寸', 'ko': '하이 웨지 - 3.5인치'
    },
    'High Wedges - 3.5"': {
        'fr': 'Compensées Hautes - 3.5"', 'es': 'Cuñas Altas - 3.5"', 'de': 'Hohe Keilabsätze - 3.5"',
        'it': 'Zeppe Alte - 3.5"', 'pt': 'Cunhas Altas - 3.5"', 'ar': 'كعوب ويدج عالية - 3.5 بوصة',
        'hi': 'हाई वेजेस - 3.5"', 'ja': 'ハイウェッジ - 3.5"', 'nl': 'Hoge wedges - 3.5"',
        'zh': '高坡跟鞋 - 3.5"', 'ko': '하이 웨지 - 3.5"'
    },
    'Higher wedge - 4.25 inch': {
        'fr': 'Compensées Trés Hautes - 11 cm', 'es': 'Cuñas Muy Altas - 11 cm', 'de': 'Höchste Keilabsätze - 11 cm',
        'it': 'Zeppe Molto Alte - 11 cm', 'pt': 'Cunhas Muito Altas - 11 cm', 'ar': 'كعوب ويدج شاهقة - 4.25 بوصة',
        'hi': 'हायर वेज - 4.25 इंच', 'ja': 'ハイヤーウェッジ - 4.25インチ', 'nl': 'Hogere wedge - 4.25 inch',
        'zh': '超高坡跟鞋 - 4.25英寸', 'ko': '하이어 웨지 - 4.25인치'
    },
    'Higher Wedge - 4.25"': {
        'fr': 'Compensées Très Hautes - 4.25"', 'es': 'Cuñas Muy Altas - 4.25"', 'de': 'Höchste Keilabsätze - 4.25"',
        'it': 'Zeppe Molto Alte - 4.25"', 'pt': 'Cunhas Muito Altas - 4.25"', 'ar': 'كعوب ويدج شاهقة - 4.25 بوصة',
        'hi': 'हायर वेज - 4.25"', 'ja': 'ハイヤーウェッジ - 4.25"', 'nl': 'Hogere wedge - 4.25"',
        'zh': '超高坡跟鞋 - 4.25"', 'ko': '하이어 웨지 - 4.25"'
    },
    'Block Heels': {
        'fr': 'Talons Blocs', 'es': 'Tacones en Bloque', 'de': 'Blockabsätze',
        'it': 'Tacchi a Blocco', 'pt': 'Saltos de Bloco', 'ar': 'كعوب عريضة مربعة',
        'hi': 'ब्लॉक हील्स', 'ja': 'ブロックヒール', 'nl': 'Blokhakken',
        'zh': '粗跟鞋', 'ko': '블록 힐'
    },
    'Flats': {
        'fr': 'Plats & Ballerines', 'es': 'Zapatos Planos', 'de': 'Flache Schuhe',
        'it': 'Scarpe Basse', 'pt': 'Sabrinas & Rasos', 'ar': 'أحذية مسطحة',
        'hi': 'फ्लैट्स', 'ja': 'フラットシューズ', 'nl': 'Platte schoenen',
        'zh': '平底鞋', 'ko': '플랫 슈즈'
    },
    'Flats & Loafers': {
        'fr': 'Plats & Mocassins', 'es': 'Planos y Mocasines', 'de': 'Flache Schuhe & Loafer',
        'it': 'Basse e Mocassini', 'pt': 'Rasos e Mocassins', 'ar': 'أحذية مسطحة ولوفر',
        'hi': 'फ्लैट्स और लोफर्स', 'ja': 'フラット＆ローファー', 'nl': 'Platte schoenen & loafers',
        'zh': '平底鞋与乐福鞋', 'ko': '플랫 & 로퍼'
    },
    'Platform Wedges': {
        'fr': 'Compensées Plateforme', 'es': 'Cuñas de Plataforma', 'de': 'Plateau-Keilabsätze',
        'it': 'Zeppe con Plateau', 'pt': 'Cunhas Plataforma', 'ar': 'كعوب ويدج بلاتفورم',
        'hi': 'प्लेटफ़ॉर्म वेजेस', 'ja': 'プラットフォームウェッジ', 'nl': 'Plateau wedges',
        'zh': '厚底坡跟鞋', 'ko': '플랫폼 웨지'
    },
    'View All Shoes': {
        'fr': 'Voir Toutes les Chaussures', 'es': 'Ver Todo el Calzado', 'de': 'Alle Schuhe anzeigen',
        'it': 'Vedi Tutte le Scarpe', 'pt': 'Ver Todo o Calçado', 'ar': 'عرض جميع الأحذية',
        'hi': 'सभी जूते देखें', 'ja': 'すべてのシューズを見る', 'nl': 'Bekijk alle schoenen',
        'zh': '查看全部鞋履', 'ko': '모든 슈즈 보기'
    },

    # Collections Menu & Categories
    'Wedding & Ceremonies': {
        'fr': 'Mariages & Cérémonies', 'es': 'Bodas y Ceremonias', 'de': 'Hochzeit & Zeremonien',
        'it': 'Matrimoni e Cerimonie', 'pt': 'Casamentos e Cerimónias', 'ar': 'الأعراس والمناسبات',
        'hi': 'विवाह और समारोह', 'ja': 'ウェディング＆セレモニー', 'nl': 'Bruiloften & Ceremonies',
        'zh': '婚礼与庆典系列', 'ko': '웨딩 & 세레모니'
    },
    'Galas & Celebrations': {
        'fr': 'Galas & Célébrations', 'es': 'Galas y Celebraciones', 'de': 'Galas & Feierlichkeiten',
        'it': 'Gala e Feste', 'pt': 'Galas e Festas', 'ar': 'الحفلات والاحتفالات',
        'hi': 'गाला और उत्सव', 'ja': 'ガラ＆セレブレーション', 'nl': 'Gala\'s & Feesten',
        'zh': '盛典与宴会系列', 'ko': '갈라 & 축하 연회'
    },
    'Resort & Evenings': {
        'fr': 'Resort & Soirées', 'es': 'Resort y Noches', 'de': 'Resort & Abendveranstaltungen',
        'it': 'Resort e Serate', 'pt': 'Resort e Noites', 'ar': 'المنتجعات والأمسيات',
        'hi': 'रिसॉर्ट और शाम', 'ja': 'リゾート＆イブニング', 'nl': 'Resort & Avonden',
        'zh': '度假与晚宴系列', 'ko': '리조트 & 이브닝'
    },
    'Bride on Her Feet': {
        'fr': 'La Mariée en Confort', 'es': 'Novia Radiante y Cómoda', 'de': 'Die Braut auf Schritt & Tritt',
        'it': 'La Sposa in Piena Eleganza', 'pt': 'A Noiva em Pleno Conforto', 'ar': 'عروس مفعمة بالراحة والأناقة',
        'hi': 'ब्राइड ऑन हर फीट', 'ja': 'ブライド・オン・ハー・フィート', 'nl': 'De Bruid in alle Comfort',
        'zh': '舒适随行新娘系列', 'ko': '편안한 브라이덜 에디션'
    },
    'Mother of the Bride': {
        'fr': 'Mère de la Mariée', 'es': 'Madre de la Novia', 'de': 'Mutter der Braut',
        'it': 'Madre della Sposa', 'pt': 'Mãe da Noiva', 'ar': 'والدة العروس',
        'hi': 'मदर ऑफ द ब्राइड', 'ja': 'マザー・オブ・ザ・ブライド', 'nl': 'Moeder van de Bruid',
        'zh': '尊荣新娘母亲系列', 'ko': '혼주 모친 에디션'
    },
    'The Bridesmaid Edit': {
        'fr': 'Sélection Demoiselles d’Honneur', 'es': 'Colección Damas de Honor', 'de': 'Die Brautjungfern-Kollektion',
        'it': 'La Selezione Damigelle', 'pt': 'A Seleção Madrinhas', 'ar': 'تشكيلة وصيفات العروس',
        'hi': 'द ब्राइड्समेड एडिट', 'ja': 'ブライズメイド・エディット', 'nl': 'De Bruidsmeisjes Selectie',
        'zh': '伴娘优雅精选', 'ko': '브ライズ메이드 에디션'
    },
    'The Destination Bride': {
        'fr': 'La Mariée Destination', 'es': 'Novia en Destino Exclusivo', 'de': 'Die Reise-Braut',
        'it': 'La Sposa da Sogno oltremare', 'pt': 'A Noiva de Destino', 'ar': 'عروس الوجهات الساحلية',
        'hi': 'द डेस्टिनेशन ब्राइड', 'ja': 'デスティネーション・ブライド', 'nl': 'De Bestemmingsbruid',
        'zh': '目的地度假新娘系列', 'ko': '데스티네이션 브라이드'
    },
    'The Sangeet Ceremony': {
        'fr': 'La Cérémonie du Sangeet', 'es': 'La Fiesta del Sangeet', 'de': 'Die Sangeet-Zeremonie',
        'it': 'La Cerimonia Sangeet', 'pt': 'A Cerimónia Sangeet', 'ar': 'احتفال السانجيت',
        'hi': 'संगीत समारोह', 'ja': 'サンギート・セレモニー', 'nl': 'De Sangeet Ceremonie',
        'zh': '欢歌载舞Sangeet庆典', 'ko': '상기트 세레모니'
    },
    'Something Blue': {
        'fr': 'Une Touche de Bleu', 'es': 'Un Toque de Azul', 'de': 'Etwas Blaues',
        'it': 'Qualcosa di Blu', 'pt': 'Algo Azul', 'ar': 'لمسة زرقاء مباركة',
        'hi': 'समथिंग ब्लू', 'ja': 'サムシング・ブルー', 'nl': 'Iets Blauws',
        'zh': '宛若初见蔚蓝之约', 'ko': '썸띵 블루'
    },
    'Prom Night': {
        'fr': 'Bal de Promo', 'es': 'Noche de Graduación', 'de': 'Abschlussball',
        'it': 'Ballo di Fine Anno', 'pt': 'Baile de Finalistas', 'ar': 'حفلة التخرج الراقصة',
        'hi': 'प्रॉम नाइट', 'ja': 'プロム・ナイト', 'nl': 'Gala / Prom Avond',
        'zh': '毕业舞会璀璨之夜', 'ko': '프롬 나이트'
    },
    'Quinceañera Glam': {
        'fr': 'Éclat Quinceañera', 'es': 'Glamour Quinceañera', 'de': 'Quinceañera Glanz',
        'it': 'Glamour Quinceañera', 'pt': 'Glamour Quinceañera', 'ar': 'أناقة الكينسينيرا',
        'hi': 'क्विनसेनाएरा ग्लैम', 'ja': 'キンセアニェーラ・グラム', 'nl': 'Quinceañera Glam',
        'zh': '十五岁盛典礼服鞋', 'ko': '킨세아녜라 글램'
    },
    'Cruise Ready': {
        'fr': 'Prête pour la Croisière', 'es': 'Lista para el Crucero', 'de': 'Bereit für die Kreuzfahrt',
        'it': 'Pronta per la Crociera', 'pt': 'Pronta para o Cruzeiro', 'ar': 'إطلالات الرحلات البحرية',
        'hi': 'क्रूज़ रेडी', 'ja': 'クルーズ・レディ', 'nl': 'Cruise Ready',
        'zh': '豪华游轮度假甄选', 'ko': '크루즈 레디'
    },
    'The Holiday Edit': {
        'fr': 'La Sélection des Fêtes', 'es': 'Edición Festividades', 'de': 'Die Festtags-Kollektion',
        'it': 'La Collezione delle Feste', 'pt': 'A Edição de Festas', 'ar': 'تشكيلة العطلات والأعياد',
        'hi': 'द हॉलिडे एडिट', 'ja': 'ホリデー・エディット', 'nl': 'De Vakantie Collectie',
        'zh': '假日绚烂特辑', 'ko': '홀리데이 에디션'
    },
    'Garden Party': {
        'fr': 'Fête Champêtre & Jardin', 'es': 'Fiesta en el Jardín', 'de': 'Gartenfest',
        'it': 'Festa in Giardino', 'pt': 'Festa de Jardim', 'ar': 'حفلات الحدائق المشمسة',
        'hi': 'गार्डन पार्टी', 'ja': 'ガーデン・パーティー', 'nl': 'Tuinfeest',
        'zh': '花园漫步茶会精选', 'ko': '가든 파티'
    },
    'Red Carpet Ready': {
        'fr': 'Prête pour le Tapis Rouge', 'es': 'Estilo Alfombra Roja', 'de': 'Bereit für den Roten Teppich',
        'it': 'Pronta per il Red Carpet', 'pt': 'Pronta para a Passadeira Vermelha', 'ar': 'إطلالة السجادة الحمراء',
        'hi': 'रेड कार्पेट रेडी', 'ja': 'レッドカーペット・レディ', 'nl': 'Rode Loper Klaar',
        'zh': '红毯焦点星光系列', 'ko': '레드카펫 레디'
    },
    'Christmas Brunch': {
        'fr': 'Brunch de Noël', 'es': 'Brunch de Navidad', 'de': 'Weihnachtsbrunch',
        'it': 'Brunch di Natale', 'pt': 'Brunch de Natal', 'ar': 'برانش عيد الميلاد',
        'hi': 'क्रिसमस ब्रंच', 'ja': 'クリスマス・ブランチ', 'nl': 'Kerstbrunch',
        'zh': '圣诞早午餐雅致之选', 'ko': '크리스마스 브런치'
    },
    "Girls' Night Out": {
        'fr': 'Soirée Entre Filles', 'es': 'Noche de Chicas', 'de': 'Mädelsabend',
        'it': 'Serata tra Amiche', 'pt': 'Noite de Meninas', 'ar': 'سهرة الأصدقاء المميزة',
        'hi': 'गर्ल्स नाइट आउट', 'ja': 'ガールズ・ナイト・アウト', 'nl': 'Vriendinnenavond',
        'zh': '闺蜜聚会狂欢之夜', 'ko': '걸스 나이트 아웃'
    },
    'Date Night': {
        'fr': 'Rendez-vous Romantique', 'es': 'Cita Romántica', 'de': 'Date-Abend',
        'it': 'Serata Romantica', 'pt': 'Encontro Romântico', 'ar': 'سهرة رومانسية',
        'hi': 'डेट नाइट', 'ja': 'デート・ナイト', 'nl': 'Date Avond',
        'zh': '浪漫约会唯美之夜', 'ko': '데이트 나이트'
    },
    'The Curated Collections': {
        'fr': 'Les Collections Sélectionnées', 'es': 'Colecciones Exclusivas', 'de': 'Die kuratierten Kollektionen',
        'it': 'Le Collezioni Selezionate', 'pt': 'As Coleções Selecionadas', 'ar': 'المجموعات المختارة بعناية',
        'hi': 'क्युरेटेड कलेक्शंस', 'ja': 'キュレーテッド・コレクション', 'nl': 'De Samengestelde Collecties',
        'zh': '甄选限定系列', 'ko': '큐레이티드 컬렉션'
    },

    # Main Top Nav
    'Just In': {
        'fr': 'Nouveautés', 'es': 'Novedades', 'de': 'Neuheiten',
        'it': 'Novità', 'pt': 'Novidades', 'ar': 'وصل حديثاً',
        'hi': 'नवीनतम आगमन', 'ja': '新着アイテム', 'nl': 'Nieuw binnen',
        'zh': '新品上市', 'ko': '신상품'
    },
    'Shoes': {
        'fr': 'Chaussures', 'es': 'Calzado', 'de': 'Schuhe',
        'it': 'Scarpe', 'pt': 'Calçado', 'ar': 'أحذية',
        'hi': 'जूते', 'ja': 'シューズ', 'nl': 'Schoenen',
        'zh': '鞋履系列', 'ko': '슈즈'
    },
    'Bags': {
        'fr': 'Sacs & Pochettes', 'es': 'Bolsos y Carteras', 'de': 'Taschen & Clutches',
        'it': 'Borse & Pochette', 'pt': 'Malas & Carteiras', 'ar': 'حقائب يد',
        'hi': 'बैग', 'ja': 'バッグ', 'nl': 'Tassen',
        'zh': '手袋与包袋', 'ko': '백'
    },
    'Collections': {
        'fr': 'Collections', 'es': 'Colecciones', 'de': 'Kollektionen',
        'it': 'Collezioni', 'pt': 'Coleções', 'ar': 'المجموعات',
        'hi': 'कलेक्शंस', 'ja': 'コレクション', 'nl': 'Collecties',
        'zh': '经典系列', 'ko': '컬렉션'
    },
    'Sale': {
        'fr': 'Archives & Soldes', 'es': 'Rebajas y Archivo', 'de': 'Sale & Archiv',
        'it': 'Saldi & Archivio', 'pt': 'Saldos & Arquivo', 'ar': 'تخفيضات الأرشيف',
        'hi': 'सेल', 'ja': 'セール', 'nl': 'Sale',
        'zh': '特惠档案', 'ko': '세일'
    },
    'Ready to Ship': {
        'fr': 'Prêt à Expédier', 'es': 'Listo para Enviar', 'de': 'Sofort versandfertig',
        'it': 'Pronto per la Spedizione', 'pt': 'Pronto para Envio', 'ar': 'جاهز للشحن الفوري',
        'hi': 'शिपिंग के लिए तैयार', 'ja': '即日発送アイテム', 'nl': 'Klaar voor verzending',
        'zh': '现货速发', 'ko': '당일 발송'
    },

    # 4 Category Cards in FourCategoryLinks
    'Architectural Wedges & Hand-Braided Straps': {
        'fr': 'Compensées Architecturales & Brides Tressées Main', 'es': 'Cuñas Arquitectónicas y Tiras Trenzadas a Mano', 'de': 'Architektonische Keilabsätze & handgeflochtene Riemen',
        'it': 'Zeppe Architettoniche e Cinturini Intrecciati a Mano', 'pt': 'Cunhas Arquitetónicas e Tiras Trançadas à Mão', 'ar': 'كعوب ويدج هندسية وأحزمة مضفورة يدوياً',
        'hi': 'वास्तुशिल्प वेज और हाथ से बुने हुए पट्टे', 'ja': '建築美のウェッジ＆手編みストラップ', 'nl': 'Architectonische wedges & handgevlochten bandjes',
        'zh': '建筑感坡跟与纯手工编织系带', 'ko': '건축적 웨지 & 핸드 브레이디드 스트랩'
    },
    'Hand-Embroidered Antique Zardozi Potlis': {
        'fr': 'Sacs Potlis Brodés Main en Zardozi Ancien', 'es': 'Bolsos Potli Bordados a Mano en Zardozi Antiguo', 'de': 'Handbestickte antike Zardozi-Potlis',
        'it': 'Borse Potli Ricamate a Mano in Zardozi Antico', 'pt': 'Malas Potli Bordadas à Mão em Zardozi Antigo', 'ar': 'حقائب بوتلي مطرزة يدوياً بتقنية الزاردوزي التراثية',
        'hi': 'हाथ से कशीदाकारी किए गए एंटीक जरदोजी पोटली बैग', 'ja': '手刺繍のアンティークザルドジ・ポトリバッグ', 'nl': 'Handgeborduurde antieke Zardozi potli-tassen',
        'zh': '纯手工古董Zardozi金丝刺绣束口袋', 'ko': '수작업 자르도지 자수 앤틱 포틀리 백'
    },
    'Curated Heritage & Rare Archive Editions': {
        'fr': 'Héritage d’Exception & Éditions Rares d’Archives', 'es': 'Piezas Icónicas de Archivo y Ediciones Limitadas', 'de': 'Kuratierte Archive & seltene Meisterstücke',
        'it': 'Pezzi d’Archivio Esclusivi ed Edizioni Rare', 'pt': 'Herança Selecionada e Edições Raras de Arquivo', 'ar': 'قطع تراثية نادرة من الأرشيف الحصري',
        'hi': 'विशिष्ट हेरिटेज और दुर्लभ आर्काइव संस्करण', 'ja': '厳選されたヘリテージ＆アーカイブ限定エディション', 'nl': 'Gecureerd erfgoed & zeldzame archiefedities',
        'zh': '臻选典藏绝版与罕见工坊档案', 'ko': '엄선된 헤리티지 & 희귀 아카이브 에디션'
    },
    'Express 48-Hour Dispatch Worldwide': {
        'fr': 'Expédition Express Mondiale en 48 Heures', 'es': 'Envío Exprés Mundial en 48 Horas', 'de': 'Weltweiter 48-Stunden-Expressversand',
        'it': 'Spedizione Express Mondiale in 48 Ore', 'pt': 'Expedição Expresso Mundial em 48 Horas', 'ar': 'شحن عالمي سريع ومباشر خلال 48 ساعة',
        'hi': 'दुनिया भर में 48 घंटे में एक्सप्रेस डिस्पैच', 'ja': '48時間以内の世界速達発送', 'nl': 'Wereldwijde 48-uurs expressverzending',
        'zh': '全球48小时极速顺丰及DHL专线出货', 'ko': '48시간 전 세계 특급 발송'
    },
    'Dispatched Within 24 Hours Worldwide': {
        'fr': 'Expédié sous 24h dans le monde entier', 'es': 'Enviado en 24 horas a todo el mundo', 'de': 'Weltweiter Versand innerhalb von 24 Stunden',
        'it': 'Spedito in 24 ore in tutto il mondo', 'pt': 'Expedido em 24 horas para todo o mundo', 'ar': 'شحن عالمي خلال 24 ساعة',
        'hi': '24 घंटे के भीतर दुनिया भर में भेजा गया', 'ja': '24時間以内に世界中へ発送', 'nl': 'Wereldwijd verzonden binnen 24 uur',
        'zh': '全球24小时内闪电发货', 'ko': '24시간 이내 전 세계 배송'
    },
    'Shop Collection': {
        'fr': 'Découvrir la Collection', 'es': 'Comprar Colección', 'de': 'Kollektion entdecken',
        'it': 'Esplora la Collezione', 'pt': 'Ver Coleção', 'ar': 'تسوق المجموعة',
        'hi': 'कलेक्शन खरीदें', 'ja': 'コレクションを見る', 'nl': 'Shop de Collectie',
        'zh': '探索此系列', 'ko': '컬렉션 쇼핑하기'
    },

    # Sorting & Counts
    'Featured': {
        'fr': 'En Vedette', 'es': 'Destacados', 'de': 'Ausgewählt',
        'it': 'In Evidenza', 'pt': 'Destaques', 'ar': 'المختارة',
        'hi': 'विशेष', 'ja': 'おすすめ順', 'nl': 'Aanbevolen',
        'zh': '精选推荐', 'ko': '추천순'
    },
    'Best Selling': {
        'fr': 'Meilleures Ventes', 'es': 'Más Vendidos', 'de': 'Bestseller',
        'it': 'I Più Venduti', 'pt': 'Mais Vendidos', 'ar': 'الأكثر مبيعاً',
        'hi': 'सर्वाधिक बिकने वाले', 'ja': 'ベストセラー', 'nl': 'Best verkocht',
        'zh': '热销榜单', 'ko': '베스트셀러'
    },
    'Price: Low to High': {
        'fr': 'Prix: Croissant', 'es': 'Precio: de Menor a Mayor', 'de': 'Preis: aufsteigend',
        'it': 'Prezzo: dal più Basso', 'pt': 'Preço: Baixo para Alto', 'ar': 'السعر: من الأقل للأعلى',
        'hi': 'कीमत: कम से ज्यादा', 'ja': '価格: 安い順', 'nl': 'Prijs: Laag naar hoog',
        'zh': '价格：由低到高', 'ko': '가격: 낮은 순'
    },
    'Price: High to Low': {
        'fr': 'Prix: Décroissant', 'es': 'Precio: de Mayor a Menor', 'de': 'Preis: absteigend',
        'it': 'Prezzo: dal più Alto', 'pt': 'Preço: Alto para Baixo', 'ar': 'السعر: من الأعلى للأقل',
        'hi': 'कीमत: ज्यादा से कम', 'ja': '価格: 高い順', 'nl': 'Prijs: Hoog naar laag',
        'zh': '价格：由高到低', 'ko': '가격: 높은 순'
    },
    'Date: New to Old': {
        'fr': 'Date: Récent à Ancien', 'es': 'Fecha: Más Reciente', 'de': 'Datum: Neu nach Alt',
        'it': 'Data: dal più Recente', 'pt': 'Data: Mais Recente', 'ar': 'التاريخ: من الأحدث للأقدم',
        'hi': 'दिनांक: नए से पुराने', 'ja': '新着順', 'nl': 'Datum: Nieuw naar oud',
        'zh': '上架时间：由新到旧', 'ko': '등록일: 최신순'
    },
    'Designs': {
        'fr': 'Modèles', 'es': 'Diseños', 'de': 'Modelle',
        'it': 'Modelli', 'pt': 'Modelos', 'ar': 'تصميماً',
        'hi': 'डिज़ाइन', 'ja': 'アイテム', 'nl': 'Ontwerpen',
        'zh': '件精美设计', 'ko': '개 디자인'
    },
    'No pieces match this specific combination': {
        'fr': 'Aucune pièce ne correspond à cette sélection', 'es': 'Ninguna pieza coincide con esta selección', 'de': 'Keine Stücke entsprechen dieser Kombination',
        'it': 'Nessun articolo corrisponde a questa combinazione', 'pt': 'Nenhuma peça corresponde a esta seleção', 'ar': 'لا توجد قطع مطابقة لهذه التصفية المحددة',
        'hi': 'कोई भी उत्पाद इस विशिष्ट संयोजन से मेल नहीं खाता', 'ja': '条件に一致するアイテムが見つかりません', 'nl': 'Geen items gevonden voor deze combinatie',
        'zh': '当前筛选条件下暂无相符作品', 'ko': '해당 조건과 일치하는 제품이 없습니다'
    },
    'Try resetting filters to explore all handcrafted Stöffa styles.': {
        'fr': 'Essayez de réinitialiser vos filtres pour découvrir toutes nos créations Stöffa.', 'es': 'Restablece los filtros para descubrir todos los diseños artesanales de Stöffa.', 'de': 'Setzen Sie die Filter zurück, um alle handgefertigten Stöffa-Modelle zu entdecken.',
        'it': 'Reimposta i filtri per scoprire tutti i modelli artigianali Stöffa.', 'pt': 'Redefina os filtros para explorar todos os modelos artesanais da Stöffa.', 'ar': 'يرجى إعادة ضبط الفلاتر لاستكشاف جميع تصاميم ستوفا الحرفية الراقية.',
        'hi': 'सभी हस्तनिर्मित स्टॉफ़ा शैलियों का पता लगाने के लिए फ़िल्टर रीसेट करने का प्रयास करें।', 'ja': 'フィルターをリセットして、すべてのStöffaスタイルをご覧ください。', 'nl': 'Reset de filters om alle handgemaakte Stöffa-ontwerpen te ontdekken.',
        'zh': '请重置筛选条件，尽情探索Stöffa全系列手工定制经典。', 'ko': '필터를 재설정하여 모든 수작업 Stöffa 스타일을 확인해보세요.'
    },

    # Hero Titles & Subtitles
    'Palace Matriarch': {
        'fr': 'Matriarche du Palais', 'es': 'Matriarca de Palacio', 'de': 'Palast-Matriarchin',
        'it': 'Matriarca di Palazzo', 'pt': 'Matriarca do Palácio', 'ar': 'سيدة القصر التراثي',
        'hi': 'पैलेस मैट्रिआर्क', 'ja': 'パレス・マトリヤーク', 'nl': 'Paleis Matriarch',
        'zh': '宫廷名媛家族长', 'ko': '팰리스 매트리아크'
    },
    'Timeless Heritage & Poise': {
        'fr': 'Héritage Intemporel & Sérénité', 'es': 'Herencia Eterna y Distinción', 'de': 'Zeitloses Erbe & Haltung',
        'it': 'Eleganza Eterna e Portamento', 'pt': 'Herança Intemporal e Postura', 'ar': 'أصالة متجذرة ووقار أزلي',
        'hi': 'कालातीत विरासत और गरिमा', 'ja': '時を超えたヘリテージ＆気品', 'nl': 'Tijdloos erfgoed & evenwicht',
        'zh': '永恒传世底蕴与从容姿态', 'ko': '시대를 초월한 헤리티지와 품격'
    },
    'Amalfi Terrace': {
        'fr': 'Terrasse d’Amalfi', 'es': 'Terraza de Amalfi', 'de': 'Amalfi-Terrasse',
        'it': 'Terrazza di Amalfi', 'pt': 'Terraço de Amalfi', 'ar': 'تراس أمالفي الساحر',
        'hi': 'अमाल्फी टेरेस', 'ja': 'アマルフィ・テラス', 'nl': 'Amalfi Terras',
        'zh': '阿玛菲悬崖海景露台', 'ko': '아말피 테라스'
    },
    'Sun-Drenched Coastal Glamour': {
        'fr': 'Éclat Côtier Baigné de Soleil', 'es': 'Glamour Costero Iluminado por el Sol', 'de': 'Sonnendurchfluteter Küstenglanz',
        'it': 'Fascino Costiero Baciato dal Sole', 'pt': 'Glamour Costeiro Banhado pelo Sol', 'ar': 'سحر ساحلي مشمس وفاتن',
        'hi': 'धूप से जगमगाता तटीय ग्लैमर', 'ja': '陽光あふれる海岸のグラマラス', 'nl': 'Zonnige kustglamour',
        'zh': '明媚日光海滨奢雅度假风情', 'ko': '햇살 가득한 해안의 화려함'
    },
    'Amalfi Terrace — Cliffside Lounge': {
        'fr': 'Terrasse d’Amalfi — Salon de Falaise', 'es': 'Terraza de Amalfi — Salón del Acantilado', 'de': 'Amalfi-Terrasse — Klippen-Lounge',
        'it': 'Terrazza di Amalfi — Lounge sulla Scogliera', 'pt': 'Terraço de Amalfi — Salão de Falésia', 'ar': 'تراس أمالفي — لاونج المنحدر البحري',
        'hi': 'अमाल्फी टेरेस — क्लिफसाइड लाउंज', 'ja': 'アマルフィ・テラス — クリフサイドラウンジ', 'nl': 'Amalfi Terras — Klif Lounge',
        'zh': '阿玛菲露台 — 悬崖私享酒廊', 'ko': '아말피 테라스 — 클리프사이드 라운지'
    },
    'Emerald Gala — Grand Limestone Steps': {
        'fr': 'Gala Émeraude — Grands Escaliers en Pierre', 'es': 'Gala Esmeralda — Grandes Escalinatas de Piedra Caliza', 'de': 'Smaragd-Gala — Große Kalksteintreppen',
        'it': 'Gala Smeraldo — Grandi Scalinate in Pietra', 'pt': 'Gala Esmeralda — Grandes Degraus de Calcário', 'ar': 'حفل الزمرد — درجات الحجر الجيري العظيمة',
        'hi': 'एमराल्ड गाला — ग्रांड लाइमस्टोन स्टेप्स', 'ja': 'エメラルド・ガラ — 石灰岩の大階段', 'nl': 'Smaragd Gala — Monumentale Trappen',
        'zh': '翡翠之夜盛宴 — 皇家石阶迎宾', 'ko': '에메랄드 갈라 — 대리석 계단'
    },
    'Sculptural Atelier — Olive Garden Bench': {
        'fr': 'Atelier Sculptural — Banc du Jardin d’Oliviers', 'es': 'Atelier Escultórico — Banco del Jardín de Olivos', 'de': 'Skulpturales Atelier — Olivengarten-Bank',
        'it': 'Atelier Scultoreo — Panchina del Giardino di Ulivi', 'pt': 'Atelier Escultural — Banco do Jardim de Oliveiras', 'ar': 'المرسم النحتي — مقعد حديقة الزيتون',
        'hi': 'मूर्तिकला एटेलियर — जैतून उद्यान बेंच', 'ja': '彫刻のアトリエ — オリーブガーデンベンチ', 'nl': 'Sculpturaal Atelier — Olijfgaarden Bank',
        'zh': '雕塑美学工坊 — 橄榄园静谧长椅', 'ko': '조각적 아틀리에 — 올리브 정원 벤치'
    },
    'Courtyard Sangeet — Celebratory Step': {
        'fr': 'Sangeet en Cour Intérieure — Pas de Fête', 'es': 'Sangeet en el Patio — Paso Festivo', 'de': 'Innenhof-Sangeet — Feierlicher Schritt',
        'it': 'Sangeet nel Cortile — Passo Festoso', 'pt': 'Sangeet no Pátio — Passo Comemorativo', 'ar': 'سانجيت الفناء — خطوات احتفالية بهيجة',
        'hi': 'आंगन संगीत — उत्सव का कदम', 'ja': '中庭のサンギート — 歓喜のステップ', 'nl': 'Binnenplaats Sangeet — Feestelijke Pas',
        'zh': '庭院Sangeet夜宴 — 欢腾起舞步态', 'ko': '코트야드 상기트 — 축제의 스텝'
    },
    'Royal Desert Palace — Floor Cushions': {
        'fr': 'Palais Royal du Désert — Coussins au Sol', 'es': 'Palacio Real del Desierto — Cojines en el Suelo', 'de': 'Königlicher Wüstenpalast — Bodenkissen',
        'it': 'Palazzo Reale del Deserto — Cuscini da Pavimento', 'pt': 'Palácio Real do Deserto — Almofadas de Chão', 'ar': 'قصر الصحراء الملكي — وسائد الجلسة الأرضية',
        'hi': 'रॉयल डेजर्ट पैलेस — फर्श के कुशन', 'ja': 'ロイヤル・デザート・パレス — フロアクッション', 'nl': 'Koninklijk Woestijnpaleis — Vloerkussens',
        'zh': '大漠皇家行宫 — 锦缎地垫沉憩', 'ko': '로열 데저트 팰리스 — 플로어 쿠션'
    },
    'Generations of Grace — Villa Lawn Steps': {
        'fr': 'Générations de Grâce — Escaliers de la Villa', 'es': 'Generaciones de Gracia — Escalinata de la Villa', 'de': 'Generationen der Anmut — Villa-Rasentreppen',
        'it': 'Generazioni di Grazia — Gradini del Giardino della Villa', 'pt': 'Gerações de Graça — Degraus do Jardim da Villa', 'ar': 'أجيال من الرقي والجمال — درجات حديقة القصر',
        'hi': 'पीढ़ियों की शालीनता — विला लॉन स्टेप्स', 'ja': '受け継がれる気品 — ヴィラの芝生階段', 'nl': 'Generaties van Gratie — Villa Gazontrap',
        'zh': '世代相传的从容雅韵 — 庄园草坪台阶', 'ko': '세대를 잇는 우아함 — 빌라 잔디 계단'
    },
    'Riviera Yacht Deck — Sun Lounger': {
        'fr': 'Pont de Yacht Riviera — Bain de Soleil', 'es': 'Cubierta de Yate en la Riviera — Tumbona al Sol', 'de': 'Riviera-Yachtdeck — Sonnenliege',
        'it': 'Ponte Yacht Riviera — Lettino Prendisole', 'pt': 'Deck de Iate Riviera — Espreguiçadeira', 'ar': 'سطح يخت الريفييرا — أريكة التشميس الفاخرة',
        'hi': 'रिविएरा यॉट डेक — सन लाउन्जर', 'ja': 'リビエラ・ヨットデッキ — サンラウンジャー', 'nl': 'Riviera Jachtdek — Zonnebed',
        'zh': '里维埃拉奢华游艇甲板 — 阳光日光浴榻', 'ko': '리비에라 요트 데크 — 선 라운저'
    },
    'Botanical Sanctuary — Terrace Wall': {
        'fr': 'Sanctuaire Botanique — Mur de Terrasse', 'es': 'Santuario Botánico — Muro de la Terraza', 'de': 'Botanisches Refugium — Terrassenmauer',
        'it': 'Santuario Botanico — Muro della Terrazza', 'pt': 'Santuário Botânico — Muro do Terraço', 'ar': 'الواحة النباتية الساحرة — جدار التراس',
        'hi': 'बॉटनिकल सैंक्चुअरी — छत की दीवार', 'ja': 'ボタニカル・サンクチュアリ — テラスウォール', 'nl': 'Botanisch Heiligdom — Terrasmuur',
        'zh': '植萃秘境花园 — 绿植石雕露台', 'ko': '보태니컬 생추어리 — 테라스 월'
    },
    'Coastal Promenade — Teak Daybed': {
        'fr': 'Promenade Côtière — Lit de Jour en Teck', 'es': 'Paseo Costero — Cama de Día en Teca', 'de': 'Küstenpromenade — Teakholz-Daybed',
        'it': 'Passeggiata Costiera — Daybed in Teak', 'pt': 'Passeio Costeiro — Cama de Dia em Teca', 'ar': 'الكورنيش الساحلي — سرير نهاري من خشب الساج',
        'hi': 'कोस्टल प्रोमेनेड — टीक डेबेड', 'ja': 'コースタル・プロムナード — チーク材デイベッド', 'nl': 'Kustpromenade — Teak Daybed',
        'zh': '海岸观景林荫道 — 柚木贵妃软榻', 'ko': '코스탈 프로므나드 — 티크 데이베드'
    },
    'Sunny Boardwalk — Casual Denim Edit': {
        'fr': 'Planches Ensoleillées — Édition Denim Décontracté', 'es': 'Paseo Marítimo Soleado — Edición Denim Casual', 'de': 'Sonnige Promenade — Casual Denim Kollektion',
        'it': 'Passeggiata Soleggiata — Selezione Denim Casual', 'pt': 'Passadiço Ensolarado — Edição Denim Casual', 'ar': 'الممشى الخشبي المشمس — تشكيلة الدينيم العصرية',
        'hi': 'सनी बोर्डवॉक — कैजुअल डेनिम एडिट', 'ja': 'サニー・ボードウォーク — カジュアルデニムエディット', 'nl': 'Zonnige Boardwalk — Casual Denim Editie',
        'zh': '明媚木栈道漫步 — 闲适丹宁牛仔精选', 'ko': '써니 보드워크 — 캐주얼 데님 에디션'
    },
    'Sunny Sidewalk Café — Denim & Wedges': {
        'fr': 'Café en Terrasse — Denim & Compensées', 'es': 'Café al Aire Libre — Denim y Cuñas', 'de': 'Sonniges Straßencafé — Denim & Wedges',
        'it': 'Caffè all’Aperto — Denim e Zeppe', 'pt': 'Café de Esplanada — Denim e Cunhas', 'ar': 'مقهى الرصيف المشمس — دينيم وكعوب ويدج مريحة',
        'hi': 'सनी साइडवॉक कैफे — डेनिम और वेजेस', 'ja': 'サニー・サイドウォークカフェ — デニム＆ウェッジ', 'nl': 'Zonnig Terrascafé — Denim & Wedges',
        'zh': '街角日光咖啡馆 — 牛仔裤配坡跟鞋', 'ko': '햇살 가득한 노천 카페 — 데님 & 웨지'
    },
    'White Denim Sun Terrace': {
        'fr': 'Terrasse Ensoleillée Denim Blanc', 'es': 'Terraza al Sol con Denim Blanco', 'de': 'Sonnenterrasse mit weißem Denim',
        'it': 'Terrazza Soleggiata in Denim Bianco', 'pt': 'Terraço Ensolarado com Denim Branco', 'ar': 'تراس مشمس بإطلالة الدينيم الأبيض',
        'hi': 'व्हाइट डेनिम सन टेरेस', 'ja': 'ホワイトデニム・サンテラス', 'nl': 'Witte Denim Zonterras',
        'zh': '纯白丹宁日光露台', 'ko': '화이트 데님 선 테라스'
    },
    'Palm Garden — Casual Luxe': {
        'fr': 'Jardin de Palmiers — Luxe Décontracté', 'es': 'Jardín de Palmeras — Lujo Relajado', 'de': 'Palmgarten — Lässiger Luxus',
        'it': 'Giardino di Palme — Lusso Disinvolto', 'pt': 'Jardim de Palmeiras — Luxo Descontraído', 'ar': 'حديقة النخيل — رفاهية عفوية أنيقة',
        'hi': 'पाम गार्डन — कैजुअल लक्स', 'ja': 'パームガーデン — カジュアルラグジュアリー', 'nl': 'Palm Garden — Casual Luxe',
        'zh': '椰影棕榈绿洲 — 惬意松弛轻奢', 'ko': '팜 가든 — 캐주얼 럭스'
    },
    'Prom Night Couple — Grand Ballroom Chandelier': {
        'fr': 'Couple Bal de Promo — Lustre de la Grande Salle', 'es': 'Pareja de Graduación — Araña del Gran Salón', 'de': 'Abschlussball-Paar — Großer Festsaal-Kronleuchter',
        'it': 'Coppia al Ballo — Lampadario del Gran Salone', 'pt': 'Casal do Baile de Finalistas — Lustre do Grande Salão', 'ar': 'ثنائي حفل التخرج — ثريا قاعة الاحتفالات الكبرى',
        'hi': 'प्रॉम नाइट कपल — ग्रैंड बॉलरूम चांडेलियर', 'ja': 'プロムナイト・カップル — 大宴会場のシャンデリア', 'nl': 'Gala Koppel — Balzaal Kroonluchter',
        'zh': '舞会眷侣 — 璀璨水晶吊灯大舞厅', 'ko': '프롬 나이트 커플 — 그랜드 볼룸 샹들리에'
    },
    'Prom Night Couple — Golden Hour Estate Terrace': {
        'fr': 'Couple Bal de Promo — Terrasse au Soleil Couchant', 'es': 'Pareja de Graduación — Terraza al Atardecer Dorado', 'de': 'Abschlussball-Paar — Anwesen-Terrasse zur Goldenen Stunde',
        'it': 'Coppia al Ballo — Terrazza della Tenuta alla Golden Hour', 'pt': 'Casal do Baile — Terraço na Hora Dourada', 'ar': 'ثنائي حفل التخرج — تراس القصر في الساعة الذهبية',
        'hi': 'प्रॉम नाइट कपल — गोल्डन ऑवर एस्टेट टेरेस', 'ja': 'プロムナイト・カップル — 夕陽に染まるエステートテラス', 'nl': 'Gala Koppel — Landgoed Terras Golden Hour',
        'zh': '舞会眷侣 — 庄园落日金晖露台', 'ko': '프롬 나이트 커플 — 골든 아워 에스테이트 테라스'
    },
    'Prom Night Couple — Red Carpet Gala Entrance': {
        'fr': 'Couple Bal de Promo — Entrée Tapis Rouge', 'es': 'Pareja de Graduación — Entrada Alfombra Roja', 'de': 'Abschlussball-Paar — Roter Teppich Gala-Eingang',
        'it': 'Coppia al Ballo — Ingresso Gala Red Carpet', 'pt': 'Casal do Baile — Entrada Passadeira Vermelha', 'ar': 'ثنائي حفل التخرج — مدخل السجادة الحمراء',
        'hi': 'प्रॉम नाइट कपल — रेड कार्पेट गाला प्रवेश', 'ja': 'プロムナイト・カップル — レッドカーペット入場', 'nl': 'Gala Koppel — Rode Loper Entree',
        'zh': '舞会眷侣 — 红毯盛宴闪耀登场', 'ko': '프롬 나이트 커플 — 레드카펫 갈라 입장'
    },
    'Prom Night Couple — Fairy-Lit Conservatory': {
        'fr': 'Couple Bal de Promo — Verrière Illuminée de Guirlandes', 'es': 'Pareja de Graduación — Invernadero con Luces Feéricas', 'de': 'Abschlussball-Paar — Lichtergeschmückter Wintergarten',
        'it': 'Coppia al Ballo — Giardino d’Inverno con Lucine', 'pt': 'Casal do Baile — Estufa com Luzes de Fadas', 'ar': 'ثنائي حفل التخرج — حديقة زجاجية مضاءة بالأنوار الساحرة',
        'hi': 'प्रॉम नाइट कपल — परी-जगमगाता कंज़र्वेटरी', 'ja': 'プロムナイト・カップル — フェアリーライト輝く温室', 'nl': 'Gala Koppel — Verlichte Wintertuin',
        'zh': '舞会眷侣 — 满天星光梦幻玻璃花房', 'ko': '프롬 나이트 커플 — 불빛 가득한 온실'
    },
    'Prom Night Couple — Starlit City Skyline': {
        'fr': 'Couple Bal de Promo — Vue Nocturne Étoilée sur la Ville', 'es': 'Pareja de Graduación — Horizonte Urbano Estrellado', 'de': 'Abschlussball-Paar — Sternenklare Skyline',
        'it': 'Coppia al Ballo — Skyline Stellata della Città', 'pt': 'Casal do Baile — Horizonte da Cidade Sob as Estrelas', 'ar': 'ثنائي حفل التخرج — أفق المدينة المتلألئ بالنجوم',
        'hi': 'प्रॉम नाइट कपल — तारों भरा सिटी स्काईलाइन', 'ja': 'プロムナイト・カップル — 星降る摩天楼のスカイライン', 'nl': 'Gala Koppel — Stadsskyline onder de Sterren',
        'zh': '舞会眷侣 — 星辰璀璨城市天际线', 'ko': '프롬 나이트 커플 — 별빛 아래 도시 스카이라인'
    },
    'Date Night Couple — Penthouse Rooftop Lounge': {
        'fr': 'Couple en Rendez-vous — Lounge sur le Toit du Penthouse', 'es': 'Pareja de Cita — Terraza Lounge en el Ático', 'de': 'Date-Paar — Penthouse-Dachterrasse Lounge',
        'it': 'Coppia in Serata — Lounge sul Tetto del Penthouse', 'pt': 'Casal em Encontro — Lounge no Telhado do Penthouse', 'ar': 'ثنائي السهرة — لاونج سطح البنتهاوس الفاخر',
        'hi': 'डेट नाइट कपल — पेंटहाउस रूफटॉप लाउंज', 'ja': 'デートナイト・カップル — ペントハウス・ルーフトップラウンジ', 'nl': 'Date Koppel — Penthouse Rooftop Lounge',
        'zh': '浪漫眷侣 — 顶层空中观景酒廊', 'ko': '데이트 나이트 커플 — 펜트하우스 루프탑 라운지'
    },
    'Date Night Couple — Intimate Velvet Speakeasy': {
        'fr': 'Couple en Rendez-vous — Bar Clandestin en Velours', 'es': 'Pareja de Cita — Clandestino de Terciopelo Íntimo', 'de': 'Date-Paar — Intime Samt-Speakeasy Bar',
        'it': 'Coppia in Serata — Speakeasy Intimo in Velluto', 'pt': 'Casal em Encontro — Speakeasy Íntimo de Veludo', 'ar': 'ثنائي السهرة — صالة مخملية دافئة وحميمية',
        'hi': 'डेट नाइट कपल — इंटिमेट वेलवेट स्पीकईज़ी', 'ja': 'デートナイト・カップル — ベルベットの隠れ家バー', 'nl': 'Date Koppel — Intieme Fluwelen Speakeasy',
        'zh': '浪漫眷侣 — 私密丝绒隐秘酒吧', 'ko': '데이트 나이트 커플 — 은밀한 벨벳 스피크이지'
    },
    'Date Night Couple — Lantern-Lit Bistro Courtyard': {
        'fr': 'Couple en Rendez-vous — Cour de Bistro Éclairée aux Lanternes', 'es': 'Pareja de Cita — Patio del Bistró con Linternas', 'de': 'Date-Paar — Laternenerleuchteter Bistro-Hof',
        'it': 'Coppia in Serata — Cortile del Bistrot Illuminato da Lanterne', 'pt': 'Casal em Encontro — Pátio de Bistrô Iluminado por Lanternas', 'ar': 'ثنائي السهرة — فناء البيسترو المضاء بالفوانيس',
        'hi': 'डेट नाइट कपल — लालटेन की रोशनी में बिस्ट्रो आंगन', 'ja': 'デートナイト・カップル — ランタン揺れるビストロ中庭', 'nl': 'Date Koppel — Lantaarn-Verlichte Bistro Binnenplaats',
        'zh': '浪漫眷侣 — 暖光灯笼小酒馆庭院', 'ko': '데이트 나이트 커플 — 은은한 랜턴 빛 비스트로 안뜰'
    },
    'Date Night Couple — Sunset Yacht Harbor Pier': {
        'fr': 'Couple en Rendez-vous — Jetée du Port au Coucher du Soleil', 'es': 'Pareja de Cita — Muelle del Puerto al Atardecer', 'de': 'Date-Paar — Jachthafen-Steg bei Sonnenuntergang',
        'it': 'Coppia in Serata — Molo del Porto Turistico al Tramonto', 'pt': 'Casal em Encontro — Cais da Marina ao Pôr do Sol', 'ar': 'ثنائي السهرة — رصيف ميناء اليخوت عند الغروب',
        'hi': 'डेट नाइट कपल — सूर्यास्त यॉट हार्बर पियर', 'ja': 'デートナイト・カップル — 夕陽に染まるヨットハーバー桟橋', 'nl': 'Date Koppel — Zonsondergang Jachthavensteiger',
        'zh': '浪漫眷侣 — 落日游艇港湾栈桥', 'ko': '데이트 나이트 커플 — 노을빛 요트 선착장'
    },
    'Date Night Couple — Cozy Fireside Villa Lounge': {
        'fr': 'Couple en Rendez-vous — Salon au Coin du Feu', 'es': 'Pareja de Cita — Salón Acogedor junto a la Chimenea', 'de': 'Date-Paar — Gemütliche Kamin-Villa-Lounge',
        'it': 'Coppia in Serata — Salotto Accogliente con Camino', 'pt': 'Casal em Encontro — Salão Aconchegante com Lareira', 'ar': 'ثنائي السهرة — لاونج الفيلا الدافئ أمام المدفأة',
        'hi': 'डेट नाइट कपल — आरामदायक फायरसाइड विला लाउंज', 'ja': 'デートナイト・カップル — 暖炉揺れるヴィララウンジ', 'nl': 'Date Koppel — Knusse Villa Haardlounge',
        'zh': '浪漫眷侣 — 暖炉壁火私享庄园沙龙', 'ko': '데이트 나이트 커플 — 아늑한 벽난로 빌라 라운지'
    },

    # Subtitles & Comfort Badges
    '2-Inch Dual-Density Comfort': {
        'fr': 'Confort Bi-Densité 5 cm', 'es': 'Comodidad de Doble Densidad 5 cm', 'de': '5 cm Dual-Density Tragekomfort',
        'it': 'Comfort a Doppia Densità 5 cm', 'pt': 'Conforto de Dupla Densidade 5 cm', 'ar': 'راحة متطورة مع وسادة ثنائية الكثافة بارتفاع 2 بوصة',
        'hi': '2-इंच डुअल-डेंसिटी आराम', 'ja': '2インチ 2層高密度クッションコンフォート', 'nl': '2-Inch Dubbele Dichtheid Comfort',
        'zh': '2英寸双重密度云端缓震舒适底', 'ko': '2인치 이중 밀도 컴포트'
    },
    'High Wedge Architectural Arches': {
        'fr': 'Compensées Hautes à Arches Architecturales', 'es': 'Cuñas Altas con Arcos Arquitectónicos', 'de': 'Hohe Keilabsätze mit architektonischen Bögen',
        'it': 'Zeppe Alte con Archi Architettonici', 'pt': 'Cunhas Altas com Arcos Arquitetónicos', 'ar': 'كعوب ويدج عالية بقناطر معمارية منحوتة',
        'hi': 'हाई वेज वास्तुशिल्प मेहराब', 'ja': 'ハイウェッジ・アーキテクチュラルアーチ', 'nl': 'Hoge Wedge Architectonische Bogen',
        'zh': '高坡跟鞋建筑流线足弓弧度', 'ko': '하이 웨지 아키텍처럴 아치'
    },
    'Low Wedge Garden & All-Day Comfort': {
        'fr': 'Compensées Basses Jardin & Confort Continu', 'es': 'Cuñas Bajas para Jardín y Confort Diario', 'de': 'Niedrige Keilabsätze für den Garten & ganztägigen Komfort',
        'it': 'Zeppe Basse per Giardino e Comfort Continuo', 'pt': 'Cunhas Baixas de Jardim e Conforto o Dia Todo', 'ar': 'كعوب ويدج منخفضة للحدائق وراحة تدوم طوال اليوم',
        'hi': 'लो वेज गार्डन और पूरे दिन का आराम', 'ja': 'ローウェッジ・ガーデン＆一日中続く快適さ', 'nl': 'Lage Wedge Tuin & Hele Dag Comfort',
        'zh': '低坡跟花园漫游与全天候无倦步履', 'ko': '로우 웨지 가든 & 종일 편안함'
    },
    'Architectural Block Heel Edit': {
        'fr': 'Édition Talons Blocs Architecturaux', 'es': 'Edición Tacones en Bloque Arquitectónicos', 'de': 'Architektonische Blockabsatz-Kollektion',
        'it': 'Selezione Tacchi a Blocco Architettonici', 'pt': 'Edição Saltos de Bloco Arquitetónicos', 'ar': 'تشكيلة الكعوب المعمارية العريضة',
        'hi': 'आर्किटेक्चरल ब्लॉक हील एडिट', 'ja': 'アーキテクチュラル・ブロックヒールエディット', 'nl': 'Architectonische Blokhak Editie',
        'zh': '雕塑感方跟建筑美学系列', 'ko': '건축적 블록 힐 에디션'
    },
    'Higher Wedge Red Carpet Couture': {
        'fr': 'Compensées Très Hautes Couture Tapis Rouge', 'es': 'Cuñas Muy Altas Couture de Alfombra Roja', 'de': 'Höchste Keilabsätze Roter Teppich Couture',
        'it': 'Zeppe Altissime Couture per Red Carpet', 'pt': 'Cunhas Muito Altas Alta-Costura Passadeira Vermelha', 'ar': 'كعوب ويدج شاهقة كوتور للسجادة الحمراء',
        'hi': 'हायर वेज रेड कार्पेट कॉउचर', 'ja': 'ハイヤーウェッジ・レッドカーペットクチュール', 'nl': 'Hogere Wedge Rode Loper Couture',
        'zh': '超高坡跟红毯高级定制系列', 'ko': '하이어 웨지 레드카펫 쿠튀르'
    },
    'Artisanal Kolhapuri Flats': {
        'fr': 'Sandales Plates Kolhapuri Artisanales', 'es': 'Sandalias Planas Kolhapuri Artesanales', 'de': 'Handgefertigte Kolhapuri-Flats',
        'it': 'Ciabattine Kolhapuri Artigianali', 'pt': 'Sandálias Rasas Kolhapuri Artesanais', 'ar': 'أحذية كولهابوري المسطحة الحرفية',
        'hi': 'कारीगरी कोल्हापुरी फ्लैट्स', 'ja': '職人仕立てのコルハプリフラット', 'nl': 'Ambachtelijke Kolhapuri Flats',
        'zh': '纯手工古法Kolhapuri平底凉拖', 'ko': '장인 제작 콜하푸리 플랫'
    },
    'Celebration & Sangeet Nights': {
        'fr': 'Nuits de Fête & Sangeet', 'es': 'Noches de Fiesta y Sangeet', 'de': 'Feierlichkeiten & Sangeet-Nächte',
        'it': 'Notti di Festa e Sangeet', 'pt': 'Noites de Festa e Sangeet', 'ar': 'أمسيات الاحتفال والسانجيت',
        'hi': 'उत्सव और संगीत की रातें', 'ja': 'セレブレーション＆サンギートの夜', 'nl': 'Feest & Sangeet Nachten',
        'zh': '庆典欢聚与Sangeet歌舞之夜', 'ko': '축하 & 상기트의 밤'
    },
    'Zero-Heel Handcrafted Heritage': {
        'fr': 'Héritage Artisanal Zéro Talon', 'es': 'Herencia Artesanal sin Tacón', 'de': 'Handgefertigtes Erbe ohne Absatz',
        'it': 'Tradizione Artigianale a Tacco Zero', 'pt': 'Herança Artesanal sem Salto', 'ar': 'أصالة حرفية بنعل مسطح بدون كعب',
        'hi': 'जीरो-हील हस्तनिर्मित विरासत', 'ja': 'ゼロヒール・ハンドクラフトヘリテージ', 'nl': 'Geen-Hak Ambachtelijk Erfgoed',
        'zh': '零落差纯平底手工传世经典', 'ko': '제로 힐 수작업 헤리티지'
    },
    'Maximum Height with Dual-Density Foam': {
        'fr': 'Hauteur Maximale & Mousse Bi-Densité', 'es': 'Altura Máxima con Espuma de Doble Densidad', 'de': 'Maximale Höhe mit Dual-Density-Schaumstoff',
        'it': 'Massima Altezza con Memory Foam a Doppia Densità', 'pt': 'Altura Máxima com Espuma de Dupla Densidade', 'ar': 'أقصى درجات الارتفاع مع حشوة رغوية مزدوجة الكثافة',
        'hi': 'डुअल-डेंसिटी फोम के साथ अधिकतम ऊंचाई', 'ja': '2層高密度フォームによる圧倒的な高さと歩きやすさ', 'nl': 'Maximale hoogte met dubbele dichtheid schuim',
        'zh': '拔萃增高气场兼备双重密度缓冲记忆海绵', 'ko': '이중 밀도 폼으로 완성한 극상의 높이와 편안함'
    },
    'Artisanal Handbags & Potlis': {
        'fr': 'Sacs à Main & Potlis Artisanaux', 'es': 'Bolsos y Potlis Artesanales', 'de': 'Handgefertigte Handtaschen & Potlis',
        'it': 'Borse a Mano e Potli Artigianali', 'pt': 'Malas de Mão e Potlis Artesanais', 'ar': 'حقائب يد وأكياس بوتلي حرفية',
        'hi': 'हस्तनिर्मित हैंडबैग और पोटली', 'ja': '職人仕立てのハンドバッグ＆ポトリ', 'nl': 'Ambachtelijke Handtassen & Potlis',
        'zh': '手工刺绣提包与华美束口袋', 'ko': '장인 제작 핸드백 & 포틀리'
    },
    'Hand-Embellished Evening Bags': {
        'fr': 'Sacs de Soirée Brodés Main', 'es': 'Bolsos de Fiesta Bordados a Mano', 'de': 'Handverzierte Abendtaschen',
        'it': 'Borse da Sera Decorate a Mano', 'pt': 'Malas de Noite Bordadas à Mão', 'ar': 'حقائب سهرة مزينة يدوياً بأرقى التطاريز',
        'hi': 'हाथ से सजाए गए शाम के बैग', 'ja': '手刺繍イブニングバッグ', 'nl': 'Handgeborduurde avondtassen',
        'zh': '纯手工钉珠奢华晚宴包', 'ko': '수작업 자수 이브닝 백'
    },
    'Intricate Zardozi & Hand-Embroidered Evening Pouches': {
        'fr': 'Pochettes de Soirée Broderie Zardozi Faite Main', 'es': 'Pochette de Noche con Intrincado Zardozi Bordado a Mano', 'de': 'Kunstvolle Zardozi & handbestickte Abendtaschen',
        'it': 'Pochette da Sera con Zardozi Intrecciato a Mano', 'pt': 'Pochettes de Noite com Intricado Zardozi Bordado à Mão', 'ar': 'حقائب يد مسائية مطرزة يدوياً بأسلوب الزاردوزي الدقيق',
        'hi': 'जटिल जरदोजी और हाथ से कशीदाकारी शाम के पाउच', 'ja': '緻密なザルドジ手刺繍イブニングポーチ', 'nl': 'Verfijnde Zardozi & handgeborduurde avondtasjes',
        'zh': '繁复考究Zardozi金银丝手工刺绣晚宴包', 'ko': '정교한 자르도지 & 핸드메이드 이브닝 파우치'
    },
    'Handcrafted Footwear Archive': {
        'fr': 'Archives de Chaussures Artisanales', 'es': 'Archivo de Calzado Artesanal', 'de': 'Archiv handgefertigter Schuhe',
        'it': 'Archivio Scarpe Artigianali', 'pt': 'Arquivo de Calçado Artesanal', 'ar': 'أرشيف الأحذية الحرفية الراقية',
        'hi': 'हस्तनिर्मित फुटवियर आर्काइव', 'ja': 'ハンドクラフトシューズ・アーカイブ', 'nl': 'Archief Handgemaakt Schoeisel',
        'zh': '手工定制鞋履珍贵档案', 'ko': '수작업 풋웨어 아카이브'
    },
    'Festive Brunch & Day Occasions': {
        'fr': 'Brunch de Fête & Événements en Journée', 'es': 'Brunch Festivo y Ocasiones de Día', 'de': 'Festlicher Brunch & Tagesanlässe',
        'it': 'Brunch Festoso ed Eventi di Giorno', 'pt': 'Brunch Festivo e Ocasiões de Dia', 'ar': 'برانش احتفالي ومناسبات نهارية',
        'hi': 'उत्सव ब्रंच और दिन के अवसर', 'ja': '祝祭ブランチ＆デイタイムオケージョン', 'nl': 'Feestelijke Brunch & Dag Gelegenheden',
        'zh': '欢悦早午餐与优雅日间聚会', 'ko': '축제 브런치 & 주간 행사'
    },
    'Cocktail Soirée & Evening Glamour': {
        'fr': 'Soirée Cocktail & Éclat Nocturne', 'es': 'Cóctel de Gala y Glamour de Noche', 'de': 'Cocktail-Abend & Abend-Glamour',
        'it': 'Soirée Cocktail e Fascino Serale', 'pt': 'Festa de Cocktail e Glamour Noturno', 'ar': 'حفل كوكتيل وأناقة مسائية ساحرة',
        'hi': 'कॉकटेल सोरी और शाम का ग्लैमर', 'ja': 'カクテルソワレ＆イブニンググラム', 'nl': 'Cocktail Soiree & Avondglamour',
        'zh': '鸡尾酒晚会与魅惑夜宴', 'ko': '칵테일 소아레 & 이브닝 글래머'
    },
    'Bridal Couture — Golden Elegance': {
        'fr': 'Couture Mariée — Élégance Dorée', 'es': 'Couture Nupcial — Elegancia Dorada', 'de': 'Braut-Couture — Goldene Eleganz',
        'it': 'Alta Moda Sposa — Eleganza Dorata', 'pt': 'Alta-Costura Noiva — Elegância Dourada', 'ar': 'كوتور الزفاف — أناقة ذهبية متألقة',
        'hi': 'ब्राइडल कॉउचर — स्वर्णिम लालित्य', 'ja': 'ブライダルクチュール — ゴールデンエレガンス', 'nl': 'Bruidscouture — Gouden Elegantie',
        'zh': '新娘高定 — 璀璨金箔流韵', 'ko': '브라이덜 쿠튀르 — 골든 엘레강스'
    },
    'Effortless Summer Sophistication': {
        'fr': 'Sophistication Estivale Sans Effort', 'es': 'Sofisticación de Verano sin Esfuerzo', 'de': 'Mühelose Sommer-Eleganz',
        'it': 'Sofisticata Eleganza Estiva', 'pt': 'Sofisticação de Verão sem Esforço', 'ar': 'أناقة صيفية راقية دون عناء',
        'hi': 'सहज ग्रीष्मकालीन परिष्कार', 'ja': '軽やかなサマーソフィスティケーション', 'nl': 'Moeiteloze Zomerse Verfijning',
        'zh': '惬意从容盛夏名媛气度', 'ko': '경쾌하고 자연스러운 썸머 정취'
    },
    'Handcrafted Wedges & Flats with Dual-Density Memory Foam': {
        'fr': 'Compensées & Ballerines Artisanales avec Mousse Bi-Densité', 'es': 'Cuñas y Planos Hechos a Mano con Espuma de Doble Densidad', 'de': 'Handgefertigte Keilabsätze & Flats mit Dual-Density-Memory-Schaum',
        'it': 'Zeppe e Scarpe Basse Artigianali con Memory Foam a Doppia Densità', 'pt': 'Cunhas e Rasos Artesanais com Espuma de Memória de Dupla Densidade', 'ar': 'كعوب ويدج وأحذية مسطحة حرفية مزودة برغوة الذاكرة ثنائية الكثافة',
        'hi': 'डुअल-डेंसिटी मेमोरी फोम के साथ हस्तनिर्मित वेजेस और फ्लैट्स', 'ja': '2層高密度低反発フォームを搭載した職人仕立てのウェッジ＆フラット', 'nl': 'Handgemaakte wedges & flats met dubbele dichtheid traagschuim',
        'zh': '搭载双重密度记忆海绵的手工坡跟鞋与平底凉鞋', 'ko': '이중 밀도 메모리폼이 내장된 핸드메이드 웨지 & 플랫'
    },
    'Paired with Shoe:': {
        'fr': 'Assorti à la Chaussure :', 'es': 'Combinado con Zapato:', 'de': 'Kombiniert mit Schuh:',
        'it': 'Abbinato alla Scarpa:', 'pt': 'Combinado com Calçado:', 'ar': 'منسق مع الحذاء:',
        'hi': 'जूते के साथ पेयर किया गया:', 'ja': 'コーディネートシューズ:', 'nl': 'Gecombineerd met schoen:',
        'zh': '搭配鞋履：', 'ko': '페어링 슈즈:'
    },

    # Additional Taglines & Subtitles
    'Aisle to the After-Party': {
        'fr': 'De l’Allée Centrale à l’After-Party', 'es': 'Del Altar a la Fiesta', 'de': 'Vom Gang zur After-Party',
        'it': 'Dall’Altare all’After-Party', 'pt': 'Do Altar à Festa de Casamento', 'ar': 'من ممر الزفاف إلى الحفل الختامي الساهر',
        'hi': 'आइसल से आफ्टर-पार्टी तक', 'ja': 'バージンロードからアフターパーティーまで', 'nl': 'Van het altaar naar de after-party',
        'zh': '从庄严宣誓红毯到彻夜狂欢派对', 'ko': '버진로드에서 애프터 파티까지'
    },
    'Architectural Stature & Drama with Zero Foot Fatigue': {
        'fr': 'Stature Architecturale & Allure Majestueuse Sans Fatigue', 'es': 'Presencia Arquitectónica y Porte sin Fatiga', 'de': 'Architektonische Erhabenheit ohne Ermüdung der Füße',
        'it': 'Portamento Scultoreo Senza Affaticare i Piedi', 'pt': 'Estatura Arquitetónica e Postura Sem Fadiga nos Pés', 'ar': 'قامة معمارية مهيبة وجاذبية درامية دون أي إجهاد للقدمين',
        'hi': 'बिना पैरों की थकान के वास्तुशिल्पीय कद और ड्रामा', 'ja': '疲れ知らずで圧倒的な存在感を放つ構築的シルエット', 'nl': 'Architectonische allure & drama zonder voetvermoeidheid',
        'zh': '建筑雕塑感高挑身姿与零脚部疲劳体验', 'ko': '피로감 없이 완성되는 건축적 비율과 압도적 드라마'
    },
    'Express Dispatch Directly from Mumbai Workshop': {
        'fr': 'Expédition Express Directe depuis l’Atelier de Mumbai', 'es': 'Despacho Exprés Directo desde el Taller de Bombay', 'de': 'Expressversand direkt aus der Werkstatt in Mumbai',
        'it': 'Spedizione Rapida Diretta dal Laboratorio di Mumbai', 'pt': 'Expedição Expresso Direta da Oficina de Mumbai', 'ar': 'شحن سريع ومباشر من ورشة العمل الحرفية في مومباي',
        'hi': 'मुंबई कार्यशाला से सीधे एक्सप्रेस डिस्पैच', 'ja': 'ムンバイの工房から直接速達発送', 'nl': 'Express verzending direct vanuit Mumbai atelier',
        'zh': '孟买大师手工工坊直邮极速专线', 'ko': '뭄바이 공방에서 직접 보내는 특급 배송'
    },
    'Make the entrance. Own the moment. Stay out late.': {
        'fr': 'Faites sensation. Vivez l’instant. Dansez jusqu’à l’aube.', 'es': 'Haz la entrada. Conquista el momento. Quédate hasta tarde.', 'de': 'Mache den Auftritt. Beherrsche den Moment. Bleibe lange auf.',
        'it': 'Fai il tuo ingresso. Conquista l’attimo. Vivi la notte.', 'pt': 'Faça a entrada. Domine o momento. Aproveite até tarde.', 'ar': 'اصنعي الحضور الباهر. تألقي في اللحظة. واحتفلي حتى الصباح.',
        'hi': 'प्रवेश करें। पल को जिएं। देर रात तक रुकें।', 'ja': '圧倒的な登場。今を我が物に。夜更けまで輝いて。', 'nl': 'Maak je entree. Grijp het moment. Blijf tot laat.',
        'zh': '高调登场，主宰全场焦点，欢畅尽兴至深夜。', 'ko': '화려하게 등장하고, 순간을 지배하며, 밤늦도록 빛나세요.'
    },
    'Sparkle in comfort indoors, as hostess or guest.': {
        'fr': 'Brillez en tout confort, en maîtresse de maison ou invitée.', 'es': 'Brilla con comodidad, como anfitriona o invitada.', 'de': 'Strahlen Sie mit Komfort, ob als Gastgeberin oder Gast.',
        'it': 'Splendi in pieno comfort, da padrona di casa o invitata.', 'pt': 'Brilhe com todo o conforto, como anfitriã ou convidada.', 'ar': 'تألقي بأقصى درجات الراحة كصاحبة دار أو ضيفة عزيزة.',
        'hi': 'मेजबान या मेहमान के रूप में, आराम से चमकें।', 'ja': 'ホステスとしてもゲストとしても、室内で心地よく輝いて。', 'nl': 'Straal in comfort, als gastvrouw of gast.',
        'zh': '无论作为派对女主人还是贵宾，皆享室内从容光彩。', 'ko': '호스트로서도 게스트로서도 편안하게 빛나세요.'
    },
    'Color and dance a match made in heaven.': {
        'fr': 'Couleurs vives et danse : une harmonie parfaite.', 'es': 'Color y baile: una combinación celestial.', 'de': 'Farbenpracht und Tanz: eine himmlische Verbindung.',
        'it': 'Colori vivaci e danza: un incontro perfetto.', 'pt': 'Cor e dança: uma combinação perfeita.', 'ar': 'تناغم الألوان وإيقاع الرقص في انسجام استثنائي.',
        'hi': 'रंग और नृत्य का एक अनूठा संगम।', 'ja': '鮮やかな色彩と舞踊の歓びが出会う至福。', 'nl': 'Kleur en dans: een perfecte match.',
        'zh': '华彩霓裳与欢欣雀跃的曼妙起舞相得益彰。', 'ko': '컬러와 댄스가 빚어내는 환상적인 조화.'
    },
    'Glamour that travels — from the ceremony to cocktails by the sea.': {
        'fr': 'Un glamour sans frontières — de la cérémonie aux cocktails en bord de mer.', 'es': 'Glamour que viaja — de la ceremonia a los cócteles junto al mar.', 'de': 'Reisebereiter Glamour — von der Trauung bis zum Cocktail am Meer.',
        'it': 'Un glamour che viaggia — dalla cerimonia ai cocktail sul mare.', 'pt': 'Glamour que viaja — da cerimónia aos cocktails à beira-mar.', 'ar': 'أناقة ترافقك في السفر — من مراسم الحفل إلى كوكتيلات الشاطئ.',
        'hi': 'ग्लैमर जो यात्रा करता है — समारोह से समुद्र किनारे कॉकटेल तक।', 'ja': '旅する華やぎ — 式典から海辺のカクテルタイムまで。', 'nl': 'Reizende glamour — van de ceremonie tot cocktails aan zee.',
        'zh': '随行优雅魅力 — 从婚礼圣殿延伸至海滨落日微醺。', 'ko': '세레모니에서 바닷가 칵테일까지 이어지는 트래블 글래머.'
    },
    'Glam on the lawns, height without the stumble.': {
        'fr': 'Élégance sur les pelouses, de la hauteur sans jamais vaciller.', 'es': 'Elegancia en el césped, altura sin tropiezos.', 'de': 'Glamour auf dem Rasen, Höhe ohne Einsinken.',
        'it': 'Fascino sui prati, altezza senza incertezze.', 'pt': 'Glamour nos relvados, altura sem afundar.', 'ar': 'أناقة على المروج الخضراء وارتفاع ثابت دون تعثر.',
        'hi': 'लॉन में ग्लैमर, बिना लड़खड़ाहट के ऊंचाई।', 'ja': '芝生の上でも安定した高さを誇るグラマラス。', 'nl': 'Glamour op het gazon, hoogte zonder wankelen.',
        'zh': '草坪聚会优雅制胜，稳健增高无需担忧足跟深陷。', 'ko': '잔디밭에서도 흔들림 없는 완벽한 높이와 안정감.'
    },
    'Made for the long day, the dance floor and everything after — from aisle to after party.': {
        'fr': 'Créé pour les longues journées, la piste de danse et la nuit entière — de l’allée à l’after.', 'es': 'Diseñado para los días largos, la pista de baile y todo lo que sigue.', 'de': 'Geschaffen für lange Tage, die Tanzfläche und alles danach — vom Gang bis zur After-Party.',
        'it': 'Creato per le giornate intense, la pista da ballo e ogni momento a seguire.', 'pt': 'Feito para o dia inteiro, para a pista de dança e para tudo o que vier a seguir.', 'ar': 'مصمم لساعات الاحتفال الطويلة وساحة الرقص وكل ما يليها.',
        'hi': 'लंबे दिन, डांस फ्लोर और उसके बाद की हर चीज़ के लिए बनाया गया।', 'ja': '長時間のセレモニー、ダンスフロア、そしてその後のすべてを快適に。', 'nl': 'Gemaakt voor de lange dag, de dansvloer en alles daarna.',
        'zh': '专为漫长仪式、欢畅舞池及后续狂欢而生 — 全程陪伴无懈可击。', 'ko': '긴 하루와 댄스 플로어, 그 이후의 모든 순간을 위한 디자인.'
    },
    'Made to complement the bride, without holding you back from the dance floor.': {
        'fr': 'Conçu pour sublimer la mariée, tout en vous permettant de danser sans compter.', 'es': 'Diseñado para complementar a la novia sin frenarte en la pista de baile.', 'de': 'Entwickelt, um die Braut zu ergänzen, ohne Sie beim Tanzen einzuschränken.',
        'it': 'Fatto per valorizzare la sposa, permettendoti di ballare tutta la notte.', 'pt': 'Feito para complementar a noiva, sem impedir que dance a noite inteira.', 'ar': 'صُمم ليكمل سحر العروس دون أن يعيق حركتك على حلبة الرقص.',
        'hi': 'दुल्हन का पूरक बनने के लिए बनाया गया, बिना आपको डांस फ्लोर से रोके।', 'ja': '花嫁を引き立て、思う存分ダンスを楽しめる快適な履き心地。', 'nl': 'Gemaakt om de bruid te complementeren, zonder je op de dansvloer te beperken.',
        'zh': '专为衬托新娘绰约风姿而设计，同时让伴娘肆意舞动整夜。', 'ko': '신부를 완벽하게 돋보이게 하면서 댄스 플로어를 마음껏 즐길 수 있는 핏.'
    },
    'For her big moment, with the glamour to match every dance.': {
        'fr': 'Pour son grand moment, avec l’éclat assorti à chaque pas de danse.', 'es': 'Para su gran momento, con el glamour para acompañar cada baile.', 'de': 'Für ihren großen Moment, mit Glanz für jeden Tanz.',
        'it': 'Per il suo momento speciale, con lo splendore per ogni ballo.', 'pt': 'Para o grande momento, com glamour à altura de cada dança.', 'ar': 'للحظتها الأهم في الحياة، ببريق يليق بكل خطوة ووصلة رقص.',
        'hi': 'उसके बड़े पल के लिए, हर नृत्य से मेल खाने वाले ग्लैमर के साथ।', 'ja': '特別な日のために、すべてのダンスに寄り添う輝き。', 'nl': 'Voor haar grote moment, met glamour voor elke dans.',
        'zh': '见证挚爱的高光时刻，以夺目光彩匹配每支欢歌曼舞。', 'ko': '그녀의 가장 특별한 순간, 모든 춤과 어우러지는 화려함.'
    },
    'A little blue, a lot of personality — your something blue, with a twist.': {
        'fr': 'Une touche de bleu, une infinie personnalité — votre tradition réinventée.', 'es': 'Un toque de azul, mucha personalidad — tu algo azul, con un giro único.', 'de': 'Ein Hauch von Blau, viel Persönlichkeit — Ihr blaues Element mit Pfiff.',
        'it': 'Un tocco di blu, tanta personalità — il tuo elemento blu rivisitato.', 'pt': 'Um toque de azul, muita personalidade — o seu algo azul com um toque moderno.', 'ar': 'لمسة زرقاء مباركة تفيض بالشخصية المتفردة لتقاليد الزفاف.',
        'hi': 'थोड़ा सा नीला, बहुत सारा व्यक्तित्व — आपका समथिंग ब्लू, एक अनोखे अंदाज में।', 'ja': '気品あるブルーに個性を添えて — 新しいサムシング・ブルーの提案。', 'nl': 'Een beetje blauw, veel persoonlijkheid — jouw traditionele touch met een twist.',
        'zh': '一抹沁蓝点睛，满载灵动个性 — 传统幸运蓝鞋履的当代摩登演绎。', 'ko': '우아한 블루와 넘치는 개성 — 모던하게 재해석된 썸띵 블루.'
    },
    'A little extra glamour, wherever the night takes you — handcrafted for couples in effortless luxury.': {
        'fr': 'Un éclat supplémentaire partout où la nuit vous mène — luxe décontracté pour deux.', 'es': 'Un toque extra de glamour donde sea que la noche los lleve — lujo relajado para parejas.', 'de': 'Ein Hauch von Extra-Glamour für die Nacht — handgefertigter Luxus für Paare.',
        'it': 'Un tocco in più di splendore ovunque vi porti la notte — lusso rilassato per coppie.', 'pt': 'Um brilho extra onde quer que a noite vos leve — luxo artesanal para casais.',
        'ar': 'جرعة من البريق الإضافي أينما مضت بكم السهرة — راحة فاخرة ومصنوعة يدوياً للثنائي.',
        'hi': 'थोड़ा अतिरिक्त ग्लैमर, जहां भी रात आपको ले जाए — जोड़ों के लिए सहज विलासिता।', 'ja': '夜のどこへ出かけても放つ特別な輝き — 2人のための軽やかなラグジュアリー。', 'nl': 'Een vleugje extra glamour waar de nacht je ook brengt — handgemaakte luxe voor stellen.',
        'zh': '无论夜幕将你们引向何方，皆显尊贵闪耀 — 为神仙眷侣打造的松弛轻奢。', 'ko': '어디로 향하든 더해지는 은은한 글래머 — 커플을 위한 자연스러운 럭셔리.'
    },
    'The shoes that make the entrance and keep you dancing all night — paired with matching handcrafted bags.': {
        'fr': 'Les souliers pour marquer l’entrée et danser jusqu’au bout de la nuit — avec leurs sacs assortis.', 'es': 'Los zapatos que cautivan al entrar y te hacen bailar toda la noche — con bolsos a juego.', 'de': 'Schuhe, die den Auftritt sichern und Sie die ganze Nacht tanzen lassen — mit passenden Taschen.',
        'it': 'Le scarpe che incantano all’ingresso e ti fanno ballare tutta la notte — con borse abbinate.', 'pt': 'Os sapatos que marcam a entrada e mantêm o ritmo a noite toda — com carteiras a condizer.',
        'ar': 'الأحذية التي تخطف الأنظار عند الدخول وتبقيك راقصة طوال الليل — مع حقائب يد متطابقة.',
        'hi': 'वे जूते जो प्रवेश को खास बनाते हैं और आपको रात भर नचाते हैं — मैचिंग बैग्स के साथ।', 'ja': '印象的な入場を飾り、夜通し踊れるシューズ — お揃いのハンドメイドバッグと共に。', 'nl': 'De schoenen die de entree maken en je laten dansen — met bijpassende tassen.',
        'zh': '震撼全场登场、伴随整夜曼妙起舞的奢美鞋履 — 附配同系列纯手工刺绣包袋。', 'ko': '화려한 등장을 빛내고 밤새 춤출 수 있는 슈즈 — 어울리는 핸드메이드 백 세트.'
    },

    # Beach to table & Footer core
    'The Atelier Philosophy • stoffastyle.com': {
        'fr': 'La Philosophie de l’Atelier • stoffastyle.com', 'es': 'La Filosofía del Atelier • stoffastyle.com', 'de': 'Die Atelier-Philosophie • stoffastyle.com',
        'it': 'La Filosofia dell’Atelier • stoffastyle.com', 'pt': 'A Filosofia do Atelier • stoffastyle.com', 'ar': 'فلسفة المشغل الحرفي • stoffastyle.com',
        'hi': 'एटेलियर दर्शन • stoffastyle.com', 'ja': 'アトリエの哲学 • stoffastyle.com', 'nl': 'De Atelier Filosofie • stoffastyle.com',
        'zh': '工坊工匠哲学 • stoffastyle.com', 'ko': '아틀리에 철학 • stoffastyle.com'
    },
    'Indian Craftsmanship Meets Modern Luxury': {
        'fr': 'L’Artisanat Indien Rencontre le Luxe Contemporain', 'es': 'La Artesanía India se Encuentra con el Lujo Moderno', 'de': 'Indische Handwerkskunst trifft auf modernen Luxus',
        'it': 'L’Artigianato Indiano Incontra il Lusso Moderno', 'pt': 'O Artesanato Indiano Encontra o Luxo Moderno', 'ar': 'الحرفية الهندية الأصيلة تلتقي بالفخامة العصرية',
        'hi': 'भारतीय शिल्प कौशल आधुनिक विलासिता से मिलता है', 'ja': 'インドの伝統職人技と現代ラグジュアリーの融合', 'nl': 'Indiaas Vakmanschap Ontmoet Moderne Luxe',
        'zh': '印度古法工匠造诣交汇当代摩登奢华', 'ko': '인도 장인 정신과 모던 럭셔리의 만남'
    },
    'Handcrafted in Mumbai': {
        'fr': 'Fait Main à Mumbai', 'es': 'Hecho a Mano en Bombay', 'de': 'Handgefertigt in Mumbai',
        'it': 'Fatto a Mano a Mumbai', 'pt': 'Feito à Mão em Mumbai', 'ar': 'صنع يدوياً في مومباي',
        'hi': 'मुंबई में हस्तनिर्मित', 'ja': 'ムンバイでの手仕事', 'nl': 'Handgemaakt in Mumbai',
        'zh': '孟买工坊手工精造', 'ko': '뭄바이 핸드크래프트'
    },
    'OUR STORY': {
        'fr': 'NOTRE HISTOIRE', 'es': 'NUESTRA HISTORIA', 'de': 'UNSERE GESCHICHTE',
        'it': 'LA NOSTRA STORIA', 'pt': 'A NOSSA HISTÓRIA', 'ar': 'قصتنا الحرفية',
        'hi': 'हमारी कहानी', 'ja': '私たちの物語', 'nl': 'ONS VERHAAL',
        'zh': '品牌传奇故事', 'ko': '우리의 이야기'
    },
    'DISCOVER THE COLLECTION →': {
        'fr': 'DÉCOUVRIR LA COLLECTION →', 'es': 'DESCUBRE LA COLECCIÓN →', 'de': 'KOLLEKTION ENTDECKEN →',
        'it': 'SCOPRI LA COLLEZIONE →', 'pt': 'DESCOBRIR A COLEÇÃO →', 'ar': 'اكتشف المجموعة →',
        'hi': 'कलेक्शन देखें →', 'ja': 'コレクションを見る →', 'nl': 'ONTDEK DE COLLECTIE →',
        'zh': '探索完整系列 →', 'ko': '컬렉션 보기 →'
    },
    'Stoffa Style was founded with a passion to redefine classic Indian footwear through artisanal craftsmanship and contemporary ergonomics. Every pair of our Kolhapuri wedges, metallic braided flats, and embellished potlis is designed and manufactured in-house, pairing heritage techniques with our signature dual-density memory foam footbed for unmatched day-to-night comfort.': {
        'fr': 'Stoffa Style a été fondée avec la passion de redéfinir la chaussure indienne classique par l’artisanat d’art et l’ergonomie contemporaine. Chaque paire de nos compensées Kolhapuri, sandales tressées métallisées et potlis brodés est conçue en interne, unissant techniques séculaires et notre semelle à mémoire de forme bi-densité pour un confort inégalé.',
        'es': 'Stoffa Style nació con la pasión de reinventar el calzado tradicional indio mediante la alta artesanía y la ergonomía moderna. Cada par de cuñas Kolhapuri, sandalias trenzadas y bolsos potli se diseña y elabora en nuestros propios talleres, combinando técnicas ancestrales con nuestra plantilla viscoelástica de doble densidad para una comodidad insuperable.',
        'de': 'Stoffa Style wurde mit der Vision gegründet, klassisches indisches Schuhwerk durch meisterhafte Handwerkskunst und moderne Ergonomie neu zu definieren. Jedes Paar unserer Kolhapuri-Wedges, geflochtenen Flats und verzierten Potlis wird im eigenen Haus gefertigt – eine Synthese aus traditionsreichen Techniken und unserer charakteristischen Dual-Density-Schaumstoffsohle.',
        'it': 'Stoffa Style nasce dalla passione di ridefinire la calzatura classica indiana attraverso l’alto artigianato e l’ergonomia contemporanea. Ogni paio di zeppe Kolhapuri, sandali intrecciati metallizzati e borse potli è creato nei nostri laboratori, unendo tradizione e il nostro plantare in memory foam a doppia densità per un comfort senza paragoni.',
        'pt': 'A Stoffa Style nasceu da paixão de reinventar o calçado tradicional através do artesanato de mestre e da ergonomia contemporânea. Cada par das nossas cunhas Kolhapuri, rasos trançados metálicos e potlis bordados é desenhado e produzido internamente, aliando técnicas de herança à nossa palmilha com memória de dupla densidade.',
        'ar': 'تأسست ستوفا ستايل بشغف لإعادة صياغة الأحذية التراثية الكلاسيكية من خلال الحرفية الفائقة وبيئة العمل العصرية المريحة. يتم تصميم وتصنيع كل زوج من صنادل كولهابوري الإسفينية وأحذيتنا المضفورة وحقائب البوتلي في مشاغلنا الخاصة، حيث تمزج بين المهارات المتوارثة ونعل رغوة الذاكرة المزدوجة.',
        'hi': 'स्टॉफ़ा स्टाइल की स्थापना कारीगरी शिल्प कौशल और समकालीन एर्गोनॉमिक्स के माध्यम से क्लासिक भारतीय फुटवियर को फिर से परिभाषित करने के जुनून के साथ की गई थी। कोल्हापुरी वेजेस, मैटेलिक ब्रेडेड फ्लैट्स और एम्बेलिश्ड पोटली को हमारे द्वारा इन-हाउस डिज़ाइन किया जाता है, जो हमारे सिग्नेचर डुअल-डेंसिटी मेमोरी फोम के साथ अद्वितीय आराम प्रदान करता है।',
        'ja': 'Stoffa Styleは、職人の卓越した技術と現代的な人間工学を融合させ、インドの伝統的なシューズを再定義する情熱から誕生しました。シグネチャーのコルハプリウェッジ、メタリック編みフラット、豪華なポトリバッグのすべてが自社でデザイン・製造され、独自の2層高密度低反発クッションが朝から夜まで続く快適さを叶えます。',
        'nl': 'Stoffa Style werd opgericht met de passie om klassiek Indiaas schoeisel te herdefiniëren door meesterlijk vakmanschap en moderne ergonomie. Elk paar van onze Kolhapuri wedges, metallic gevlochten flats en verfraaide potli-tassen wordt in eigen huis ontworpen en geproduceerd, met onze kenmerkende dubbele dichtheid traagschuimzool voor ongeëvenaard comfort.',
        'zh': 'Stoffa Style怀揣以工匠造诣与现代人体工程学重构经典印度鞋履的热忱而创立。我们的每一双Kolhapuri坡跟鞋、金属编织平底凉鞋及华美刺绣束口袋均在工坊内自主设计与纯手工制作，将世代相传的古老技艺与品牌标志性双重密度记忆海绵鞋垫完美融合，带来全天候无与伦比的云端轻履体验。',
        'ko': 'Stoffa Style은 장인의 섬세한 손길과 현대적 인체공학을 결합하여 전통 슈즈를 현대적으로 재정의하고자 탄생했습니다. 모든 콜하푸리 웨지, 메탈릭 브레이디드 플랫, 정교한 포틀리 백은 자체 공방에서 디자인 및 제작되며, 시그니처 이중 밀도 메모리폼 인솔이 아침부터 밤까지 비교할 수 없는 편안함을 선사합니다.'
    }
}

# Auto-generate for remaining titles & subtitles by intelligent keyword translation
KEYWORD_TRANSLATIONS = {
    'fr': {
        'Couple': 'Couple', 'Gala': 'Gala', 'Sunset': 'Coucher de Soleil', 'Golden Hour': 'Heure Dorée',
        'Celebration': 'Célébration', 'Garden': 'Jardin', 'Terrace': 'Terrasse', 'Palace': 'Palais',
        'Sanctuary': 'Sanctuaire', 'High Seas': 'Haute Mer', 'Monochrome': 'Monochrome', 'Resort': 'Resort',
        'Minimalist': 'Minimaliste', 'Mediterranean': 'Méditerranéen', 'Al Fresco': 'En Plein Air',
        'Daytime': 'De Jour', 'Destination': 'Destination', 'Chic': 'Chic', 'Sophistication': 'Sophistication',
        'Contemporary': 'Contemporain', 'Generations': 'Générations', 'Glasshouse': 'Serre de Verre',
        'Cobblestone': 'Pavés Anciens', 'City Skyline': 'Silhouette Urbaine', 'Subtropical': 'Subtropical',
        'VIP': 'VIP', 'High School': 'Lycée', 'Statement': 'Affirmation', 'Warm Hearth': 'Foyer Chaleureux',
        'Tulle': 'Tulle', 'Architectural': 'Architectural', 'Everyday': 'Quotidien', 'Conversations': 'Conversations',
        'Jewel': 'Joyau', 'Pearls': 'Perles', 'Raw Silk': 'Soie Sauvage', 'Handcrafted': 'Fait Main',
        'Wedges': 'Compensées', 'Flats': 'Plats', 'Heels': 'Talons', 'Bags': 'Sacs'
    },
    'es': {
        'Couple': 'Pareja', 'Gala': 'Gala', 'Sunset': 'Atardecer', 'Golden Hour': 'Hora Dorada',
        'Celebration': 'Celebración', 'Garden': 'Jardín', 'Terrace': 'Terraza', 'Palace': 'Palacio',
        'Sanctuary': 'Santuario', 'High Seas': 'Alta Mar', 'Monochrome': 'Monocromo', 'Resort': 'Resort',
        'Minimalist': 'Minimalista', 'Mediterranean': 'Mediterráneo', 'Al Fresco': 'Al Aire Libre',
        'Daytime': 'De Día', 'Destination': 'Destino', 'Chic': 'Elegante', 'Sophistication': 'Sofisticación',
        'Contemporary': 'Contemporáneo', 'Generations': 'Generaciones', 'Glasshouse': 'Invernadero de Cristal',
        'Cobblestone': 'Adoquines Románticos', 'City Skyline': 'Horizonte Urbano', 'Subtropical': 'Subtropical',
        'VIP': 'VIP', 'High School': 'Graduación', 'Statement': 'Declaración de Estilo', 'Warm Hearth': 'Hogar Cálido',
        'Tulle': 'Tul Romántico', 'Architectural': 'Arquitectónico', 'Everyday': 'Diario', 'Conversations': 'Conversaciones',
        'Jewel': 'Joya', 'Pearls': 'Perlas', 'Raw Silk': 'Seda Natural', 'Handcrafted': 'Hecho a Mano',
        'Wedges': 'Cuñas', 'Flats': 'Zapatos Planos', 'Heels': 'Tacones', 'Bags': 'Bolsos'
    },
    'de': {
        'Couple': 'Paar', 'Gala': 'Gala', 'Sunset': 'Sonnenuntergang', 'Golden Hour': 'Goldene Stunde',
        'Celebration': 'Feier', 'Garden': 'Garten', 'Terrace': 'Terrasse', 'Palace': 'Palast',
        'Sanctuary': 'Refugium', 'High Seas': 'Hohe See', 'Monochrome': 'Monochrom', 'Resort': 'Resort',
        'Minimalist': 'Minimalistisch', 'Mediterranean': 'Mediterran', 'Al Fresco': 'Im Freien',
        'Daytime': 'Am Tag', 'Destination': 'Reiseziel', 'Chic': 'Schick', 'Sophistication': 'Raffinesse',
        'Contemporary': 'Zeitgenössisch', 'Generations': 'Generationen', 'Glasshouse': 'Glashaus',
        'Cobblestone': 'Kopfsteinpflaster', 'City Skyline': 'Skyline der Stadt', 'Subtropical': 'Subtropisch',
        'VIP': 'VIP', 'High School': 'Abschluss', 'Statement': 'Statement', 'Warm Hearth': 'Warmer Kamin',
        'Tulle': 'Tüll', 'Architectural': 'Architektonisch', 'Everyday': 'Alltäglich', 'Conversations': 'Gespräche',
        'Jewel': 'Juwel', 'Pearls': 'Perlen', 'Raw Silk': 'Rohseide', 'Handcrafted': 'Handgefertigt',
        'Wedges': 'Keilabsätze', 'Flats': 'Flats', 'Heels': 'Absätze', 'Bags': 'Taschen'
    },
    'it': {
        'Couple': 'Coppia', 'Gala': 'Gala', 'Sunset': 'Tramonto', 'Golden Hour': 'Ora d’Oro',
        'Celebration': 'Celebrazione', 'Garden': 'Giardino', 'Terrace': 'Terrazza', 'Palace': 'Palazzo',
        'Sanctuary': 'Santuario', 'High Seas': 'Alto Mare', 'Monochrome': 'Monocromatico', 'Resort': 'Resort',
        'Minimalist': 'Minimalista', 'Mediterranean': 'Mediterraneo', 'Al Fresco': 'All’Aperto',
        'Daytime': 'Di Giorno', 'Destination': 'Destinazione', 'Chic': 'Chic', 'Sophistication': 'Raffinatezza',
        'Contemporary': 'Contemporaneo', 'Generations': 'Generazioni', 'Glasshouse': 'Serra di Vetro',
        'Cobblestone': 'Ciottoli', 'City Skyline': 'Skyline Cittadino', 'Subtropical': 'Subtropicale',
        'VIP': 'VIP', 'High School': 'Ballo', 'Statement': 'D’Autore', 'Warm Hearth': 'Caminetto Accogliente',
        'Tulle': 'Tulle', 'Architectural': 'Architettonico', 'Everyday': 'Quotidiano', 'Conversations': 'Conversazioni',
        'Jewel': 'Gioiello', 'Pearls': 'Perle', 'Raw Silk': 'Seta Cruda', 'Handcrafted': 'Fatto a Mano',
        'Wedges': 'Zeppe', 'Flats': 'Basse', 'Heels': 'Tacchi', 'Bags': 'Borse'
    },
    'pt': {
        'Couple': 'Casal', 'Gala': 'Gala', 'Sunset': 'Pôr do Sol', 'Golden Hour': 'Hora Dourada',
        'Celebration': 'Celebração', 'Garden': 'Jardim', 'Terrace': 'Terraço', 'Palace': 'Palácio',
        'Sanctuary': 'Santuário', 'High Seas': 'Alto Mar', 'Monochrome': 'Monocromático', 'Resort': 'Resort',
        'Minimalist': 'Minimalista', 'Mediterranean': 'Mediterrânico', 'Al Fresco': 'Ao Ar Livre',
        'Daytime': 'De Dia', 'Destination': 'Destino', 'Chic': 'Chique', 'Sophistication': 'Sofisticação',
        'Contemporary': 'Contemporâneo', 'Generations': 'Gerações', 'Glasshouse': 'Estufa de Vidro',
        'Cobblestone': 'Calçada Antiga', 'City Skyline': 'Linha do Horizonte da Cidade', 'Subtropical': 'Subtropical',
        'VIP': 'VIP', 'High School': 'Finalistas', 'Statement': 'Marcante', 'Warm Hearth': 'Lareira Quente',
        'Tulle': 'Tule', 'Architectural': 'Arquitetónico', 'Everyday': 'Dia a Dia', 'Conversations': 'Conversas',
        'Jewel': 'Jóia', 'Pearls': 'Pérolas', 'Raw Silk': 'Seda Crua', 'Handcrafted': 'Feito à Mão',
        'Wedges': 'Cunhas', 'Flats': 'Rasos', 'Heels': 'Saltos', 'Bags': 'Malas'
    },
    'ar': {
        'Couple': 'ثنائي', 'Gala': 'حفل راقي', 'Sunset': 'غروب الشمس', 'Golden Hour': 'الساعة الذهبية',
        'Celebration': 'احتفال', 'Garden': 'حديقة', 'Terrace': 'تراس', 'Palace': 'قصر',
        'Sanctuary': 'ملاذ', 'High Seas': 'أعالي البحار', 'Monochrome': 'أحادية اللون', 'Resort': 'منتجع',
        'Minimalist': 'بساطة راقية', 'Mediterranean': 'البحر الأبيض المتوسط', 'Al Fresco': 'في الهواء الطلق',
        'Daytime': 'نهاري', 'Destination': 'وجهة سياحية', 'Chic': 'أنيق', 'Sophistication': 'رقي',
        'Contemporary': 'معاصر', 'Generations': 'أجيال', 'Glasshouse': 'بيت زجاجي',
        'Cobblestone': 'أزقة مرصوفة', 'City Skyline': 'أفق المدينة', 'Subtropical': 'شبه استوائي',
        'VIP': 'كبار الشخصيات', 'High School': 'حفل تخرج', 'Statement': 'إطلالة بارزة', 'Warm Hearth': 'موقد دافئ',
        'Tulle': 'تول رومانسي', 'Architectural': 'هندسي معماري', 'Everyday': 'يومي', 'Conversations': 'حوارات',
        'Jewel': 'جوهرة', 'Pearls': 'لآلئ', 'Raw Silk': 'حرير خام', 'Handcrafted': 'مصنوع يدوياً',
        'Wedges': 'كعوب ويدج', 'Flats': 'أحذية مسطحة', 'Heels': 'كعوب', 'Bags': 'حقائب'
    },
    'hi': {
        'Couple': 'युगल', 'Gala': 'गाला', 'Sunset': 'सूर्यास्त', 'Golden Hour': 'गोल्डन ऑवर',
        'Celebration': 'उत्सव', 'Garden': 'बगीचा', 'Terrace': 'छत', 'Palace': 'महल',
        'Sanctuary': 'अभयारण्य', 'High Seas': 'खुले समुद्र', 'Monochrome': 'मोनोक्रोम', 'Resort': 'रिसॉर्ट',
        'Minimalist': 'मिनिमलिस्ट', 'Mediterranean': 'भूमध्यसागरीय', 'Al Fresco': 'अल फ्रेस्को',
        'Daytime': 'दिन का समय', 'Destination': 'गंतव्य', 'Chic': 'ठाठ', 'Sophistication': 'परिष्कार',
        'Contemporary': 'समकालीन', 'Generations': 'पीढ़ियां', 'Glasshouse': 'ग्लासहाउस',
        'Cobblestone': 'पत्थर की राह', 'City Skyline': 'शहर का स्काईलाइन', 'Subtropical': 'उपोष्णकटिबंधीय',
        'VIP': 'वीआईपी', 'High School': 'प्रॉम', 'Statement': 'स्टेटमेंट', 'Warm Hearth': 'गर्म चूल्हा',
        'Tulle': 'ट्यूल', 'Architectural': 'वास्तुशिल्प', 'Everyday': 'दैनिक', 'Conversations': 'बातचीत',
        'Jewel': 'रत्न', 'Pearls': 'मोती', 'Raw Silk': 'रॉ सिल्क', 'Handcrafted': 'हस्तनिर्मित',
        'Wedges': 'वेजेस', 'Flats': 'फ्लैट्स', 'Heels': 'हील्स', 'Bags': 'बैग'
    },
    'ja': {
        'Couple': 'カップル', 'Gala': 'ガラ', 'Sunset': '夕暮れ', 'Golden Hour': 'ゴールデンアワー',
        'Celebration': '祝祭', 'Garden': 'ガーデン', 'Terrace': 'テラス', 'Palace': '宮殿',
        'Sanctuary': 'サンクチュアリ', 'High Seas': '大海原', 'Monochrome': 'モノクローム', 'Resort': 'リゾート',
        'Minimalist': 'ミニマリスト', 'Mediterranean': '地中海', 'Al Fresco': 'オープンエア',
        'Daytime': 'デイタイム', 'Destination': 'デスティネーション', 'Chic': 'シック', 'Sophistication': '洗練',
        'Contemporary': 'コンテンポラリー', 'Generations': '世代', 'Glasshouse': '温室',
        'Cobblestone': '石畳', 'City Skyline': '摩天楼スカイライン', 'Subtropical': '亜熱帯',
        'VIP': 'VIP', 'High School': 'プロム', 'Statement': 'ステートメント', 'Warm Hearth': '暖炉',
        'Tulle': 'チュール', 'Architectural': '建築的', 'Everyday': '日常', 'Conversations': '語らい',
        'Jewel': 'ジュエリー', 'Pearls': 'パール', 'Raw Silk': 'ローシルク', 'Handcrafted': 'ハンドクラフト',
        'Wedges': 'ウェッジ', 'Flats': 'フラット', 'Heels': 'ヒール', 'Bags': 'バッグ'
    },
    'nl': {
        'Couple': 'Koppel', 'Gala': 'Gala', 'Sunset': 'Zonsondergang', 'Golden Hour': 'Gouden Uur',
        'Celebration': 'Viering', 'Garden': 'Tuin', 'Terrace': 'Terras', 'Palace': 'Paleis',
        'Sanctuary': 'Toevluchtsoord', 'High Seas': 'Volle Zee', 'Monochrome': 'Monochroom', 'Resort': 'Resort',
        'Minimalist': 'Minimalistisch', 'Mediterranean': 'Mediterraans', 'Al Fresco': 'In de Open Lucht',
        'Daytime': 'Overdag', 'Destination': 'Bestemming', 'Chic': 'Chic', 'Sophistication': 'Verfijning',
        'Contemporary': 'Hedendaags', 'Generations': 'Generaties', 'Glasshouse': 'Glazen Kas',
        'Cobblestone': 'Kasseien', 'City Skyline': 'Stadsskyline', 'Subtropical': 'Subtropisch',
        'VIP': 'VIP', 'High School': 'Schoolgala', 'Statement': 'Statement', 'Warm Hearth': 'Warme Haard',
        'Tulle': 'Tule', 'Architectural': 'Architectonisch', 'Everyday': 'Dagelijks', 'Conversations': 'Gesprekken',
        'Jewel': 'Juweel', 'Pearls': 'Parels', 'Raw Silk': 'Ruwe Zijde', 'Handcrafted': 'Handgemaakt',
        'Wedges': 'Wedges', 'Flats': 'Platte Schoenen', 'Heels': 'Hakken', 'Bags': 'Tassen'
    },
    'zh': {
        'Couple': '眷侣', 'Gala': '盛典', 'Sunset': '落日晚霞', 'Golden Hour': '金色余晖',
        'Celebration': '庆典欢聚', 'Garden': '花园绿洲', 'Terrace': '观景露台', 'Palace': '宫廷行宫',
        'Sanctuary': '隐逸秘境', 'High Seas': '浩瀚碧海', 'Monochrome': '纯色极简', 'Resort': '度假甄选',
        'Minimalist': '极简奢雅', 'Mediterranean': '地中海风情', 'Al Fresco': '户外露天',
        'Daytime': '日间雅聚', 'Destination': '度假胜地', 'Chic': '摩登别致', 'Sophistication': '名媛气韵',
        'Contemporary': '当代风范', 'Generations': '世代风华', 'Glasshouse': '梦幻花房',
        'Cobblestone': '复古石径', 'City Skyline': '都市天际线', 'Subtropical': '亚热带绿洲',
        'VIP': '尊崇VIP', 'High School': '毕业盛会', 'Statement': '瞩目型格', 'Warm Hearth': '温暖壁火',
        'Tulle': '轻盈薄纱', 'Architectural': '建筑立体美学', 'Everyday': '日常悠然', 'Conversations': '闲适对谈',
        'Jewel': '瑰丽珠宝', 'Pearls': '润泽珍珠', 'Raw Silk': '天然生丝', 'Handcrafted': '大师纯手工',
        'Wedges': '坡跟鞋', 'Flats': '平底鞋', 'Heels': '高跟鞋', 'Bags': '包袋'
    },
    'ko': {
        'Couple': '커플', 'Gala': '갈라', 'Sunset': '노을', 'Golden Hour': '골든 아워',
        'Celebration': '축하', 'Garden': '정원', 'Terrace': '테라스', 'Palace': '궁전',
        'Sanctuary': '생추어리', 'High Seas': '대양', 'Monochrome': '모노크롬', 'Resort': '리조트',
        'Minimalist': '미니멀리스트', 'Mediterranean': '지중해', 'Al Fresco': '야외',
        'Daytime': '데이타임', 'Destination': '데스티네이션', 'Chic': '시크', 'Sophistication': '세련미',
        'Contemporary': '컨템포러리', 'Generations': '세대를 잇는', 'Glasshouse': '유리 온실',
        'Cobblestone': '자갈길', 'City Skyline': '도시 스카이라인', 'Subtropical': '아열대',
        'VIP': 'VIP', 'High School': '프롬', 'Statement': '스테이트먼트', 'Warm Hearth': '따뜻한 벽난로',
        'Tulle': '튤', 'Architectural': '건축적', 'Everyday': '일상', 'Conversations': '대화',
        'Jewel': '보석', 'Pearls': '진주', 'Raw Silk': '생사 실크', 'Handcrafted': '수작업 핸드메이드',
        'Wedges': '웨지', 'Flats': '플랫', 'Heels': '힐', 'Bags': '가방'
    }
}

# Function to translate any string
def get_translation_for(text, lang):
    if lang == 'en':
        return text
    if text in TRANSLATION_MAP and lang in TRANSLATION_MAP[text]:
        return TRANSLATION_MAP[text][lang]
    
    # Try pattern replacement using keyword dictionary
    translated = text
    kw_dict = KEYWORD_TRANSLATIONS.get(lang, {})
    
    # Sort keywords by length desc
    for k, v in sorted(kw_dict.items(), key=lambda x: len(x[0]), reverse=True):
        if k in translated:
            translated = translated.replace(k, v)
            
    if translated != text:
        return translated
    return text

print("Building translations dictionary for all extracted strings across all 12 languages...")
all_langs = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ar', 'hi', 'ja', 'nl', 'zh', 'ko']
full_dict = {lang: {} for lang in all_langs}

for s in all_strings:
    for lang in all_langs:
        full_dict[lang][s] = get_translation_for(s, lang)

print("Generated full dictionary.")

# Also include the explicit user footer strings!
footer_story = "Women's luxury footwear & artisanal bags handcrafted in master workshops. Signature Kolhapuri wedges, architectural block heels, authentic flats, and bridal couture exclusively priced in USD."
footer_tagline = "Designed for All-Day Comfort • Dual-Density Memory Foam"

# Check counts
for lang in all_langs:
    print(f"Lang {lang}: {len(full_dict[lang])} translations")
    # Verify footer strings present
    assert footer_story in full_dict[lang], f"Missing footer_story in {lang}"
    assert footer_tagline in full_dict[lang], f"Missing footer_tagline in {lang}"

# Export to src/data/generatedTranslations.ts for guaranteed in-memory availability
ts_content = "/**\n * Auto-generated comprehensive translations dictionary for all Hero, Navbar, Collection, and Footer strings\n */\n"
ts_content += "export const GENERATED_TRANSLATIONS: Record<string, Record<string, string>> = " + json.dumps(full_dict, indent=2, ensure_ascii=False) + ";\n"

with open("src/data/generatedTranslations.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)
print("Wrote src/data/generatedTranslations.ts successfully!")

# Now update translations.md and public/translations.md
# We will parse the existing markdown, preserve everything already in it, and append/update the new keys!
def update_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    # Parse existing sections
    sections = {}
    lines = md_text.split('\n')
    current_lang = None
    lang_lines = {}
    
    for line in lines:
        if line.startswith('## Language:'):
            m = re.search(r'\[([a-z]{2})\]', line)
            if m:
                current_lang = m.group(1)
                sections[current_lang] = {}
                lang_lines[current_lang] = line
            continue
        if current_lang and line.startswith('|') and line.endswith('|'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 3 and parts[1] != 'Key' and '---' not in parts[1]:
                k = parts[1].replace('\\|', '|')
                v = parts[2].replace('\\|', '|')
                if k:
                    sections[current_lang][k] = v

    # Now add our full_dict keys into sections
    for lang, trans_dict in full_dict.items():
        if lang not in sections:
            sections[lang] = {}
        for k, v in trans_dict.items():
            # If not already present or needs update
            sections[lang][k] = v

    # Reconstruct Markdown
    lang_titles = {
        'en': '## Language: [en] English',
        'fr': '## Language: [fr] Français',
        'es': '## Language: [es] Español',
        'de': '## Language: [de] Deutsch',
        'it': '## Language: [it] Italiano',
        'pt': '## Language: [pt] Português',
        'ar': '## Language: [ar] العربية',
        'hi': '## Language: [hi] हिन्दी',
        'ja': '## Language: [ja] 日本語',
        'nl': '## Language: [nl] Nederlands',
        'zh': '## Language: [zh] 中文',
        'ko': '## Language: [ko] 한국어'
    }

    new_md = "# Accesoire Luxury Footwear & Bags - Global Master Translation File\n\n"
    new_md += "> Single Source of Truth for Storefront & Admin offline translations.\n\n"

    for lang in all_langs:
        header = lang_titles.get(lang, f"## Language: [{lang}]")
        new_md += f"{header}\n\n"
        new_md += "| Key | Translation |\n"
        new_md += "| :--- | :--- |\n"
        
        # Sort keys alphabetically
        for k in sorted(sections.get(lang, {}).keys()):
            val = sections[lang][k]
            # Escape pipe character
            safe_k = k.replace('|', '\\|')
            safe_val = val.replace('|', '\\|')
            new_md += f"| {safe_k} | {safe_val} |\n"
        new_md += "\n"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_md)
    print(f"Updated {filepath} with {len(sections.get('en', {}))} keys per language!")

update_markdown_file("translations.md")
update_markdown_file("public/translations.md")
