import { COMMON_UI_TRANSLATIONS } from './commonTranslations';
import { translationMdService } from '../services/translationMdService';

export interface TranslationDictionary {
  [key: string]: string;
}

export const COMPLETE_TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    // Nav
    nav_just_in: 'Just In',
    nav_shoes: 'Shoes',
    nav_bags: 'Bags',
    nav_collections: 'Collections',
    nav_sale: 'Sale',
    nav_ready_to_ship: 'Ready to Ship',
    cart: 'Cart',
    cart_empty: 'Your cart is empty',
    add_to_cart: 'Add to Cart',
    added_to_cart: 'Added to Cart',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Low wedges - 2.5 inch',
    'High wedges - 3.5 inch': 'High wedges - 3.5 inch',
    'Higher wedge - 4.25 inch': 'Higher wedge - 4.25 inch',
    'Flats': 'Flats',
    'Platform Wedges': 'Platform Wedges',

    // Hero
    hero_eyebrow: 'Autumn / Winter Footwear & Bag Edition 2026',
    hero_title: 'Sculpted Footwear & Architectural Leather Bags',
    hero_subtitle: 'Handcrafted in Florence and Porto. Ergonomic arches, buttery Italian calfskins, and pure geometric silhouettes.',
    view_catalog: 'View Catalog',
    shop_collection: 'Explore Shoes & Bags',
    view_lookbook: 'View Autumn Lookbook',
    paired: 'Paired:',

    // Announcement
    announcement_default: 'Complimentary Worldwide Express Courier & 30-Day Fit Exchanges',
    announcement_secondary: 'Handcrafted in Florence & Porto',
    announcement_link: 'Explore Collection',

    // 4 Category Cards
    cat_shoes_title: 'Shoes',
    cat_shoes_sub: 'Architectural Wedges & Hand-Braided Straps',
    cat_bags_title: 'Bags',
    cat_bags_sub: 'Hand-Embroidered Antique Zardozi Potlis',
    cat_sale_title: 'Sale',
    cat_sale_sub: 'Curated Heritage & Rare Archive Editions',
    cat_ready_title: 'Ready to Ship',
    cat_ready_sub: 'Dispatched Within 24 Hours Worldwide',

    // Just In Section
    just_in_title: 'Just In',
    just_in_subtitle: 'Handcrafted Italian & Indian Silk Wedges, Mules & Minaudières',
    view_all: 'View all',
    add: 'Add',
    added: 'Added',

    // Category Collection Section
    exclusive_styles: 'Exclusive Styles',
    sort_featured: 'Featured',
    sort_best_selling: 'Best Selling',
    sort_price_low_to_high: 'Price: Low to High',
    sort_price_high_to_low: 'Price: High to Low',
    sort_newest: 'Date: New to Old',
    colors_available: 'Colors Available:',
    shades: 'shades',
    no_pieces_match: 'No pieces match this specific combination',
    try_resetting: 'Try resetting filters to explore all handcrafted Stöffa styles.',
    reset_filters: 'Reset Filters',

    // Product Detail Page
    back_to_collection: 'Back to Collection',
    colorway_swatches: 'Colorway Swatches (Click to preview shade & change view):',
    active_color: 'Active Color',
    select: 'Select',
    select_size_label: "Select Size (US Women's)",
    size_guide: 'Size Guide',
    add_to_cart_btn: 'ADD TO CART',
    added_to_bag_btn: 'ADDED TO SHOPPING BAG',
    b2b_wholesale_inquiry: 'Request Wholesale / Boutique Order (B2B)',
    prop_free_shipping: 'Free Express US & Global Shipping',
    prop_memory_foam: 'Dual-Density Memory Foam Sole',
    prop_exchanges: 'Complimentary 30-Day Exchanges',
    prop_artisans: 'Handcrafted by Master Artisans',
    tab_atelier: 'Atelier Details',
    tab_fabric: 'Fabric & Care',
    tab_shipping: 'Delivery & Returns',

    // Occasions
    all_occasions: 'All Occasions',
    curated_events_heading: 'Curated by Occasion & Moment',
    curated_events_sub: 'Architectural footwear and leather goods tailored for proms, weddings, beach parties, and 10 iconic milestones.',
    occ_all: 'All Occasions',
    occ_prom: 'Prom & Gala',
    occ_wedding: 'Wedding & Bridal',
    occ_beach: 'Beach Party & Coastal',
    occ_cocktail: 'Cocktail & Soirée',
    occ_date_night: 'Date Night & Intimate',
    occ_graduation: 'Graduation & Ceremony',
    occ_brunch: 'Weekend Brunch & Chic',
    occ_boardroom: 'Boardroom & Executive',
    occ_garden_party: 'Garden Party & Polo',
    occ_bachelorette: 'Bachelorette & Celebration',
    occ_runway: 'Runway & Afterparty',
    occ_vacation: 'Vacation & Jetset',
    antler_junn_badge: 'Antler & Juun.J Minimalist Archive',
    clear_filters: 'Reset Occasion & Silhouette Filters',

    // Cart Drawer
    shopping_bag: 'Shopping Bag',
    checkout: 'Proceed to Checkout',
    subtotal: 'Subtotal',
    discount: 'Discount',
    shipping_complimentary: 'Complimentary Express Courier',
    free_returns: 'Complimentary 30-day shoe fit exchanges & returns',
    materials_craft: 'Tuscan Leather & Hand-Turned Soles',
    sustainable_luxury: '100% Certified LWG Gold Italian Tanneries',
    remove: 'Remove',
    size_label: 'Size:',
    color_label: 'Color:',
    quantity_label: 'Quantity:',

    // Checkout Modal
    express_checkout: 'Express Checkout',
    order_summary: 'Order Summary',
    thank_you: 'Order Confirmed',
    order_tracking: 'Your handcrafted shoes and bags are being prepared for dispatch.',
    name: 'Full Name',
    email: 'Email Address',
    shipping_address: 'Shipping Destination',
    card_details: 'Payment Method',
    confirm_purchase: 'Complete Order',
    pay_with_stripe: 'Pay securely with Stripe',

    // Story Section
    handcrafted_mumbai: 'Handcrafted in Mumbai',
    atelier_philosophy: 'The Atelier Philosophy',
    indian_craftsmanship: 'Indian Craftsmanship Meets Modern Luxury',
    our_story: 'OUR STORY',
    discover_collection: 'DISCOVER THE COLLECTION',

    // Vacation Accessories
    handcrafted_edits: 'Handcrafted Edits',
    embellished_potlis_flats: 'Embellished Potlis & Artisanal Flats',
    vacation_sub: 'Heirloom zardozi potlis, pearl-drop drawstrings, and metallic braided Kolhapuri flats.',

    // Footer
    customer_care: 'Customer Care & Concierge',
    bespoke_inquiry: 'Bespoke Bridal Inquiry',
    shipping_delivery: 'Shipping & Delivery',
    client_faq: 'Client Inquiries & FAQ',
    vip_circle: 'Join Our VIP Circle',
    vip_circle_sub: 'Subscribe for private trunk show announcements, early drops, and 15% off your first order.',
    enter_email: 'Enter your email',
    join: 'JOIN',
    joined: 'JOINED',
    welcome_voucher: 'Welcome to Accesoire! Check your inbox for your welcome voucher.',
    all_rights_reserved: 'All rights reserved. Florence & New York.',

    // Footer Value Props
    vp_courier_title: 'Complimentary Courier',
    vp_courier_sub: 'Express delivery across the US & worldwide',
    vp_craft_title: 'Master Craftsmanship',
    vp_craft_sub: 'Hand-stitched in Florence & Porto ateliers',
    vp_returns_title: '30-Day Fit Exchanges',
    vp_returns_sub: 'Complimentary returns & shoe exchanges',
    vp_concierge_title: 'Bespoke Concierge',
    vp_concierge_sub: 'Tailored sizing and bridal consultations',

    // Collections Directory
    filter_by_theme: 'Filter by Occasion Theme',
    all_collections: 'All Collections',
    theme_wedding: 'Wedding & Bridal',
    theme_galas: 'Galas & Celebrations',
    theme_resort: 'Resort & Evenings',
  },

  fr: {
    // Nav
    nav_just_in: 'Nouveautés',
    nav_shoes: 'Chaussures',
    nav_bags: 'Sacs',
    nav_collections: 'Collections',
    nav_sale: 'Soldes',
    nav_ready_to_ship: 'Prêt à expédier',
    cart: 'Panier',
    cart_empty: 'Votre panier est vide',
    add_to_cart: 'Ajouter au Panier',
    added_to_cart: 'Ajouté au Panier',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Compensées basses - 2,5 pouces',
    'High wedges - 3.5 inch': 'Compensées hautes - 3,5 pouces',
    'Higher wedge - 4.25 inch': 'Compensées très hautes - 4,25 pouces',
    'Flats': 'Chaussures plates',
    'Platform Wedges': 'Compensées plateforme',

    // Hero
    hero_eyebrow: 'Édition Chaussures & Maroquinerie Automne / Hiver 2026',
    hero_title: 'Chaussures Sculptées & Sacs Architecturaux en Cuir',
    hero_subtitle: 'Fabriqués à la main à Florence et Porto. Cambrure ergonomique, cuirs italiens veloutés et lignes pures.',
    view_catalog: 'Voir le Catalogue',
    shop_collection: 'Découvrir la Collection',
    view_lookbook: 'Consulter le Lookbook',
    paired: 'Assorti :',

    // Announcement
    announcement_default: 'Livraison express offerte dans le monde entier et échanges gratuits sous 30 jours',
    announcement_secondary: 'Fabriqué à la main à Florence et Porto',
    announcement_link: 'Découvrir la Collection',

    // 4 Category Cards
    cat_shoes_title: 'Chaussures',
    cat_shoes_sub: 'Compensées architecturales et lanières tressées main',
    cat_bags_title: 'Sacs',
    cat_bags_sub: 'Pochettes brodées main en zardozi antique',
    cat_sale_title: 'Soldes',
    cat_sale_sub: 'Éditions d’archives rares et héritage artisanal',
    cat_ready_title: 'Prêt à expédier',
    cat_ready_sub: 'Expédié sous 24h dans le monde entier',

    // Just In Section
    just_in_title: 'Nouveautés',
    just_in_subtitle: 'Compensées, mules et minaudières en soie faites main',
    view_all: 'Tout voir',
    add: 'Ajouter',
    added: 'Ajouté',

    // Category Collection Section
    exclusive_styles: 'Modèles Exclusifs',
    sort_featured: 'En vedette',
    sort_best_selling: 'Meilleures ventes',
    sort_price_low_to_high: 'Prix : croissant',
    sort_price_high_to_low: 'Prix : décroissant',
    sort_newest: 'Date : récent à ancien',
    colors_available: 'Couleurs disponibles :',
    shades: 'nuances',
    no_pieces_match: 'Aucune création ne correspond à cette combinaison',
    try_resetting: 'Essayez de réinitialiser les filtres pour explorer tous les modèles.',
    reset_filters: 'Réinitialiser les filtres',

    // Product Detail Page
    back_to_collection: 'Retour à la collection',
    colorway_swatches: 'Nuancier (Cliquez pour prévisualiser) :',
    active_color: 'Couleur active',
    select: 'Choisir',
    select_size_label: 'Choisir la pointure (US Femmes)',
    size_guide: 'Guide des tailles',
    add_to_cart_btn: 'AJOUTER AU PANIER',
    added_to_bag_btn: 'AJOUTÉ AU PANIER',
    b2b_wholesale_inquiry: 'Demande de commande en gros / boutique (B2B)',
    prop_free_shipping: 'Livraison express gratuite aux USA et dans le monde',
    prop_memory_foam: 'Semelle mémoire de forme double densité',
    prop_exchanges: 'Échanges gratuits sous 30 jours',
    prop_artisans: 'Fait main par des maîtres artisans',
    tab_atelier: 'Détails de l’Atelier',
    tab_fabric: 'Matières & Entretien',
    tab_shipping: 'Livraison & Retours',

    // Occasions
    all_occasions: 'Toutes les Occasions',
    curated_events_heading: 'Sélection par Événement & Célébration',
    curated_events_sub: 'Souliers et maroquinerie d’exception pour bals de promo, mariages, soirées plage et grands moments.',
    occ_all: 'Toutes les Occasions',
    occ_prom: 'Bal de Promo & Gala',
    occ_wedding: 'Mariage & Cérémonie',
    occ_beach: 'Soirée Plage & Balnéaire',
    occ_cocktail: 'Cocktail & Soirée',
    occ_date_night: 'Rendez-vous & Dîner',
    occ_graduation: 'Remise des Diplômes',
    occ_brunch: 'Brunch du Week-end',
    occ_boardroom: 'Affaires & Conseil d’Administration',
    occ_garden_party: 'Garden-Party & Polo',
    occ_bachelorette: 'Enterrement de Vie de Célibataire',
    occ_runway: 'Défilé & Afterparty',
    occ_vacation: 'Vacances & Voyages',
    antler_junn_badge: 'Archive Minimale Antler & Juun.J',
    clear_filters: 'Réinitialiser les filtres',

    // Cart Drawer
    shopping_bag: 'Panier d’Achat',
    checkout: 'Passer la Commande',
    subtotal: 'Sous-total',
    discount: 'Remise',
    shipping_complimentary: 'Livraison Express Gratuite',
    free_returns: 'Échanges de pointure et retours offerts sous 30 jours',
    materials_craft: 'Cuirs de Toscane & Semelles Cousues Main',
    sustainable_luxury: 'Tanneries italiennes certifiées LWG Gold',
    remove: 'Supprimer',
    size_label: 'Taille :',
    color_label: 'Couleur :',
    quantity_label: 'Quantité :',

    // Checkout Modal
    express_checkout: 'Paiement Express',
    order_summary: 'Récapitulatif de Commande',
    thank_you: 'Commande Confirmée',
    order_tracking: 'Vos souliers et sacs sont en cours de préparation dans notre atelier.',
    name: 'Nom complet',
    email: 'Adresse courriel',
    shipping_address: 'Adresse de livraison',
    card_details: 'Moyen de paiement',
    confirm_purchase: 'Finaliser la commande',
    pay_with_stripe: 'Paiement sécurisé via Stripe',

    // Story Section
    handcrafted_mumbai: 'Fait main à Mumbai',
    atelier_philosophy: 'La Philosophie de l’Atelier',
    indian_craftsmanship: 'L’Artisanat d’Exception Rencontre le Luxe Moderne',
    our_story: 'NOTRE HISTOIRE',
    discover_collection: 'DÉCOUVRIR LA COLLECTION',

    // Vacation Accessories
    handcrafted_edits: 'Éditions Artisanales',
    embellished_potlis_flats: 'Pochettes Ornées & Souliers Plats Artisanaux',
    vacation_sub: 'Pochettes zardozi héritage, cordons perles et sandales Kolhapuri tressées.',

    // Footer
    customer_care: 'Service Client & Conciergerie',
    bespoke_inquiry: 'Demande Sur Mesure Mariage',
    shipping_delivery: 'Livraison & Expédition',
    client_faq: 'Questions Fréquentes & FAQ',
    vip_circle: 'Rejoignez notre Cercle VIP',
    vip_circle_sub: 'Inscrivez-vous pour les ventes privées, lancements anticipés et -15% sur votre premier achat.',
    enter_email: 'Entrez votre email',
    join: 'REJOINDRE',
    joined: 'INSCRIT',
    welcome_voucher: 'Bienvenue chez Accesoire ! Vérifiez votre boîte mail pour votre bon de bienvenue.',
    all_rights_reserved: 'Tous droits réservés. Florence & New York.',

    // Footer Value Props
    vp_courier_title: 'Courrier Express Offert',
    vp_courier_sub: 'Livraison express aux USA et dans le monde entier',
    vp_craft_title: 'Maîtrise Artisanale',
    vp_craft_sub: 'Cousu main dans nos ateliers de Florence et Porto',
    vp_returns_title: 'Échanges de Taille 30 Jours',
    vp_returns_sub: 'Retours et échanges de souliers gratuits',
    vp_concierge_title: 'Conciergerie Sur Mesure',
    vp_concierge_sub: 'Conseils de pointure et consultations mariée',

    // Collections Directory
    filter_by_theme: 'Filtrer par Thème d’Événement',
    all_collections: 'Toutes les Collections',
    theme_wedding: 'Mariage & Cérémonies',
    theme_galas: 'Galas & Célébrations',
    theme_resort: 'Resort & Soirées',
  },

  es: {
    // Nav
    nav_just_in: 'Novedades',
    nav_shoes: 'Zapatos',
    nav_bags: 'Bolsos',
    nav_collections: 'Colecciones',
    nav_sale: 'Rebajas',
    nav_ready_to_ship: 'Listo para Enviar',
    cart: 'Carrito',
    cart_empty: 'Su carrito está vacío',
    add_to_cart: 'Añadir al Carrito',
    added_to_cart: 'Añadido al Carrito',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Cuñas bajas - 2.5 pulgadas',
    'High wedges - 3.5 inch': 'Cuñas altas - 3.5 pulgadas',
    'Higher wedge - 4.25 inch': 'Cuña extra alta - 4.25 pulgadas',
    'Flats': 'Zapatos planos',
    'Platform Wedges': 'Cuñas con plataforma',

    // Hero
    hero_eyebrow: 'Cápsula de Calzado y Bolsos Otoño / Invierno 2026',
    hero_title: 'Calzado Esculpido & Bolsos de Cuero Arquitectónicos',
    hero_subtitle: 'Confeccionados artesanalmente en Florencia y Oporto. Arcos ergonómicos, pieles italianas y líneas atemporales.',
    view_catalog: 'Ver Catálogo',
    shop_collection: 'Explorar Calzado y Bolsos',
    view_lookbook: 'Ver Lookbook',
    paired: 'Combinado:',

    // Announcement
    announcement_default: 'Envío exprés gratuito a todo el mundo y cambios de talla durante 30 días',
    announcement_secondary: 'Hecho a mano en Florencia y Oporto',
    announcement_link: 'Explorar Colección',

    // 4 Category Cards
    cat_shoes_title: 'Calzado',
    cat_shoes_sub: 'Cuñas arquitectónicas y tiras trenzadas a mano',
    cat_bags_title: 'Bolsos',
    cat_bags_sub: 'Bolsos potli bordados a mano con zardozi antiguo',
    cat_sale_title: 'Rebajas',
    cat_sale_sub: 'Piezas históricas curadas y ediciones de archivo exclusivas',
    cat_ready_title: 'Listo para Enviar',
    cat_ready_sub: 'Envío mundial en 24 horas',

    // Just In Section
    just_in_title: 'Novedades',
    just_in_subtitle: 'Cuñas, mules y bolsos joya de seda hechos a mano',
    view_all: 'Ver todo',
    add: 'Añadir',
    added: 'Añadido',

    // Category Collection Section
    exclusive_styles: 'Estilos Exclusivos',
    sort_featured: 'Destacados',
    sort_best_selling: 'Más vendidos',
    sort_price_low_to_high: 'Precio: menor a mayor',
    sort_price_high_to_low: 'Precio: mayor a menor',
    sort_newest: 'Fecha: más reciente',
    colors_available: 'Colores disponibles:',
    shades: 'tonos',
    no_pieces_match: 'Ninguna pieza coincide con esta combinación',
    try_resetting: 'Prueba a restablecer los filtros para ver todos los estilos.',
    reset_filters: 'Restablecer filtros',

    // Product Detail Page
    back_to_collection: 'Volver a la colección',
    colorway_swatches: 'Muestras de color (Haz clic para previsualizar):',
    active_color: 'Color activo',
    select: 'Seleccionar',
    select_size_label: 'Seleccionar talla (Mujer US)',
    size_guide: 'Guía de tallas',
    add_to_cart_btn: 'AÑADIR AL CARRITO',
    added_to_bag_btn: 'AÑADIDO A LA BOLSA',
    b2b_wholesale_inquiry: 'Solicitar pedido al por mayor / boutique (B2B)',
    prop_free_shipping: 'Envío exprés gratuito en EE.UU. y mundial',
    prop_memory_foam: 'Suela con espuma viscoelástica de doble densidad',
    prop_exchanges: 'Cambios gratuitos durante 30 días',
    prop_artisans: 'Hecho a mano por maestros artesanos',
    tab_atelier: 'Detalles del Taller',
    tab_fabric: 'Tejido y Cuidados',
    tab_shipping: 'Envío y Devoluciones',

    // Occasions
    all_occasions: 'Todas las Ocasiones',
    curated_events_heading: 'Comprar por Ocasión y Evento',
    curated_events_sub: 'Calzado y bolsos arquitectónicos diseñados para bailes de graduación, bodas, fiestas playeras y eventos únicos.',
    occ_all: 'Todas las Ocasiones',
    occ_prom: 'Baile de Graduación y Gala',
    occ_wedding: 'Bodas y Celebraciones',
    occ_beach: 'Fiesta en la Playa y Costera',
    occ_cocktail: 'Cóctel y Atardecer',
    occ_date_night: 'Cena Romántica y Noche',
    occ_graduation: 'Graduación y Acto Solemne',
    occ_brunch: 'Brunch de Fin de Semana',
    occ_boardroom: 'Ejecutivo y Negocios',
    occ_garden_party: 'Fiesta de Jardín y Polo',
    occ_bachelorette: 'Despedida de Soltera',
    occ_runway: 'Pasarela y Afterparty',
    occ_vacation: 'Vacaciones y Viajes',
    antler_junn_badge: 'Archivo Arquitectónico Antler & Juun.J',
    clear_filters: 'Restablecer filtros',

    // Cart Drawer
    shopping_bag: 'Bolsa de Compras',
    checkout: 'Tramitar Pedido',
    subtotal: 'Subtotal',
    discount: 'Descuento',
    shipping_complimentary: 'Envío Exprés Gratuito',
    free_returns: 'Cambios de talla y devoluciones gratis 30 días',
    materials_craft: 'Pieles Toscanas y Suelas Artesanales',
    sustainable_luxury: 'Curtidurías italianas 100% trazables LWG',
    remove: 'Eliminar',
    size_label: 'Talla:',
    color_label: 'Color:',
    quantity_label: 'Cantidad:',

    // Checkout Modal
    express_checkout: 'Pago Exprés',
    order_summary: 'Resumen del Pedido',
    thank_you: 'Pedido Confirmado',
    order_tracking: 'Su pedido se está preparando en nuestro taller.',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    shipping_address: 'Dirección de entrega',
    card_details: 'Método de pago',
    confirm_purchase: 'Completar Pedido',
    pay_with_stripe: 'Pago seguro con Stripe',

    // Story Section
    handcrafted_mumbai: 'Hecho a mano en Bombay',
    atelier_philosophy: 'La Filosofía del Taller',
    indian_craftsmanship: 'La Artesanía India se Une al Lujo Moderno',
    our_story: 'NUESTRA HISTORIA',
    discover_collection: 'DESCUBRIR LA COLECCIÓN',

    // Vacation Accessories
    handcrafted_edits: 'Ediciones Artesanales',
    embellished_potlis_flats: 'Bolsos Potli Bordados & Sandalias Planas',
    vacation_sub: 'Bolsos zardozi tradicionales, cordones de perlas y sandalias trenzadas.',

    // Footer
    customer_care: 'Atención al Cliente y Conserjería',
    bespoke_inquiry: 'Consultas Nupciales a Medida',
    shipping_delivery: 'Envíos y Entregas',
    client_faq: 'Preguntas Frecuentes y FAQ',
    vip_circle: 'Únete a Nuestro Círculo VIP',
    vip_circle_sub: 'Suscríbete para recibir noticias de ventas privadas, lanzamientos y un 15% de descuento en tu primer pedido.',
    enter_email: 'Introduce tu correo',
    join: 'UNIRSE',
    joined: 'UNIDO',
    welcome_voucher: '¡Bienvenido a Accesoire! Revisa tu bandeja de entrada para ver tu código de bienvenida.',
    all_rights_reserved: 'Todos los derechos reservados. Florencia y Nueva York.',

    // Footer Value Props
    vp_courier_title: 'Envío Exprés Gratuito',
    vp_courier_sub: 'Envío rápido a EE.UU. y todo el mundo',
    vp_craft_title: 'Maestría Artesanal',
    vp_craft_sub: 'Cosido a mano en talleres de Florencia y Oporto',
    vp_returns_title: 'Cambios de Talla en 30 Días',
    vp_returns_sub: 'Devoluciones y cambios de calzado gratuitos',
    vp_concierge_title: 'Conserjería a Medida',
    vp_concierge_sub: 'Asesoramiento de tallas y consultas nupciales',

    // Collections Directory
    filter_by_theme: 'Filtrar por Temática de Evento',
    all_collections: 'Todas las Colecciones',
    theme_wedding: 'Bodas y Ceremonias',
    theme_galas: 'Galas y Fiestas',
    theme_resort: 'Resort y Veladas',
  },

  de: {
    // Nav
    nav_just_in: 'Neuheiten',
    nav_shoes: 'Schuhe',
    nav_bags: 'Taschen',
    nav_collections: 'Kollektionen',
    nav_sale: 'Sale',
    nav_ready_to_ship: 'Versandbereit',
    cart: 'Warenkorb',
    cart_empty: 'Ihr Warenkorb ist leer',
    add_to_cart: 'In den Warenkorb',
    added_to_cart: 'Hinzugefügt',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Niedrige Keilabsätze - 2,5 Zoll',
    'High wedges - 3.5 inch': 'Hohe Keilabsätze - 3,5 Zoll',
    'Higher wedge - 4.25 inch': 'Sehr hohe Keilabsätze - 4,25 Zoll',
    'Flats': 'Flache Schuhe',
    'Platform Wedges': 'Plateau-Keilschuhe',

    // Hero
    hero_eyebrow: 'Herbst / Winter Schuhe & Taschen Edition 2026',
    hero_title: 'Skulpturale Schuhe & Architektonische Ledertaschen',
    hero_subtitle: 'Handgefertigt in Florenz und Porto. Ergonomische Leisten, butterweiches italienisches Kalbsleder.',
    view_catalog: 'Katalog Ansehen',
    shop_collection: 'Kollektion Entdecken',
    view_lookbook: 'Lookbook Ansehen',
    paired: 'Passend:',

    // Announcement
    announcement_default: 'Kostenloser weltweiter Expressversand & 30 Tage Umtauschgarantie',
    announcement_secondary: 'Handgefertigt in Florenz und Porto',
    announcement_link: 'Kollektion Entdecken',

    // 4 Category Cards
    cat_shoes_title: 'Schuhe',
    cat_shoes_sub: 'Architektonische Keilabsätze & handgeflochtene Riemen',
    cat_bags_title: 'Taschen',
    cat_bags_sub: 'Handbestickte antike Zardozi-Potlis',
    cat_sale_title: 'Sale',
    cat_sale_sub: 'Kuratierte Vintage- & seltene Archiv-Editionen',
    cat_ready_title: 'Versandbereit',
    cat_ready_sub: 'Weltweiter Versand innerhalb von 24 Stunden',

    // Just In Section
    just_in_title: 'Neuheiten',
    just_in_subtitle: 'Handgefertigte Seiden-Keilschuhe, Mules & Minaudières',
    view_all: 'Alle ansehen',
    add: 'Hinzufügen',
    added: 'Hinzugefügt',

    // Category Collection Section
    exclusive_styles: 'Exklusive Modelle',
    sort_featured: 'Ausgewählt',
    sort_best_selling: 'Bestseller',
    sort_price_low_to_high: 'Preis: aufsteigend',
    sort_price_high_to_low: 'Preis: absteigend',
    sort_newest: 'Datum: neuste zuerst',
    colors_available: 'Verfügbare Farben:',
    shades: 'Nuancen',
    no_pieces_match: 'Keine Modelle entsprechen dieser Auswahl',
    try_resetting: 'Versuchen Sie, die Filter zurückzusetzen, um alle Stöffa-Modelle zu sehen.',
    reset_filters: 'Filter zurücksetzen',

    // Product Detail Page
    back_to_collection: 'Zurück zur Kollektion',
    colorway_swatches: 'Farbauswahl (Klicken zur Vorschau):',
    active_color: 'Aktive Farbe',
    select: 'Auswählen',
    select_size_label: 'Größe wählen (US Damen)',
    size_guide: 'Größentabelle',
    add_to_cart_btn: 'IN DEN WARENKORB',
    added_to_bag_btn: 'ZUM WARENKORB HINZUGEFÜGT',
    b2b_wholesale_inquiry: 'Großhandels- / Boutique-Anfrage (B2B)',
    prop_free_shipping: 'Kostenloser Expressversand in den USA & weltweit',
    prop_memory_foam: 'Dual-Density Memory-Foam Sohle',
    prop_exchanges: '30 Tage kostenloser Umtausch',
    prop_artisans: 'Handgefertigt von Meisterhand',
    tab_atelier: 'Atelier-Details',
    tab_fabric: 'Material & Pflege',
    tab_shipping: 'Lieferung & Rückgabe',

    // Occasions
    all_occasions: 'Alle Anlässe',
    curated_events_heading: 'Kuratierte Anlässe & Events',
    curated_events_sub: 'Architektonische Schuhe und Taschen für Abschlussbälle, Hochzeiten, Strandpartys und besondere Momente.',
    occ_all: 'Alle Anlässe',
    occ_prom: 'Abschlussball & Gala',
    occ_wedding: 'Hochzeit & Zeremonie',
    occ_beach: 'Strandparty & Resort',
    occ_cocktail: 'Cocktail & Soirée',
    occ_date_night: 'Date Night & Dinner',
    occ_graduation: 'Graduierung & Feier',
    occ_brunch: 'Wochenend-Brunch',
    occ_boardroom: 'Business & Vorstand',
    occ_garden_party: 'Gartenparty & Polo',
    occ_bachelorette: 'Junggesellinnenabschied',
    occ_runway: 'Runway & Afterparty',
    occ_vacation: 'Urlaub & Jetset',
    antler_junn_badge: 'Minimalistisches Antler & Juun.J Archiv',
    clear_filters: 'Filter zurücksetzen',

    // Cart Drawer
    shopping_bag: 'Einkaufstasche',
    checkout: 'Zur Kasse',
    subtotal: 'Zwischensumme',
    discount: 'Rabatt',
    shipping_complimentary: 'Kostenloser Expressversand',
    free_returns: '30 Tage kostenloser Größenumtausch & Rückgabe',
    materials_craft: 'Toskanisches Leder & Handgefertigte Sohlen',
    sustainable_luxury: '100% LWG Gold zertifizierte Gerbereien',
    remove: 'Entfernen',
    size_label: 'Größe:',
    color_label: 'Farbe:',
    quantity_label: 'Menge:',

    // Checkout Modal
    express_checkout: 'Express-Kaufabwicklung',
    order_summary: 'Bestellübersicht',
    thank_you: 'Bestellung Bestätigt',
    order_tracking: 'Ihre Bestellung wird in unserem Atelier sorgfältig gefertigt.',
    name: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    shipping_address: 'Lieferadresse',
    card_details: 'Zahlungsart',
    confirm_purchase: 'Kauf abschließen',
    pay_with_stripe: 'Sicher bezahlen mit Stripe',

    // Story Section
    handcrafted_mumbai: 'Handgefertigt in Mumbai',
    atelier_philosophy: 'Die Atelier-Philosophie',
    indian_craftsmanship: 'Indische Handwerkskunst trifft modernen Luxus',
    our_story: 'UNSERE GESCHICHTE',
    discover_collection: 'KOLLEKTION ENTDECKEN',

    // Vacation Accessories
    handcrafted_edits: 'Handgefertigte Editionen',
    embellished_potlis_flats: 'Verzierte Potlis & Handgefertigte Flats',
    vacation_sub: 'Zardozi-Taschen, Perlen-Kordeln und geflochtene Kolhapuri-Flats.',

    // Footer
    customer_care: 'Kundenservice & Concierge',
    bespoke_inquiry: 'Maßanfertigung für Bräute',
    shipping_delivery: 'Versand & Lieferung',
    client_faq: 'Kundenanfragen & FAQ',
    vip_circle: 'Werden Sie VIP-Mitglied',
    vip_circle_sub: 'Abonnieren Sie für private Trunk Shows, Vorab-Zugang und 15% Rabatt auf Ihre erste Bestellung.',
    enter_email: 'E-Mail eingeben',
    join: 'BEITRETEN',
    joined: 'ANGEMELDET',
    welcome_voucher: 'Willkommen bei Accesoire! Prüfen Sie Ihren Posteingang für Ihren Willkommensgutschein.',
    all_rights_reserved: 'Alle Rechte vorbehalten. Florenz & New York.',

    // Footer Value Props
    vp_courier_title: 'Kostenloser Kurier',
    vp_courier_sub: 'Schnelle Lieferung in den USA & weltweit',
    vp_craft_title: 'Meisterliche Handwerkskunst',
    vp_craft_sub: 'Handgenäht in Ateliers in Florenz & Porto',
    vp_returns_title: '30 Tage Größenumtausch',
    vp_returns_sub: 'Kostenlose Rückgabe und Schuh-Umtausch',
    vp_concierge_title: 'Persönlicher Concierge',
    vp_concierge_sub: 'Persönliche Größenberatung & Brautberatung',

    // Collections Directory
    filter_by_theme: 'Nach Anlass-Thema Filtern',
    all_collections: 'Alle Kollektionen',
    theme_wedding: 'Hochzeiten & Feiern',
    theme_galas: 'Galas & Feierlichkeiten',
    theme_resort: 'Resort & Abende',
  },

  it: {
    // Nav
    nav_just_in: 'Novità',
    nav_shoes: 'Scarpe',
    nav_bags: 'Borse',
    nav_collections: 'Collezioni',
    nav_sale: 'Saldi',
    nav_ready_to_ship: 'Pronto per la Spedizione',
    cart: 'Carrello',
    cart_empty: 'Il tuo carrello è vuoto',
    add_to_cart: 'Aggiungi al Carrello',
    added_to_cart: 'Aggiunto al carrello',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Zeppe basse - 2,5 pollici',
    'High wedges - 3.5 inch': 'Zeppe alte - 3,5 pollici',
    'Higher wedge - 4.25 inch': 'Zeppe altissime - 4,25 pollici',
    'Flats': 'Scarpe basse',
    'Platform Wedges': 'Zeppe con plateau',

    // Hero
    hero_eyebrow: 'Edizione Calzature & Borse Autunno / Inverno 2026',
    hero_title: 'Calzature Scolpite & Borse in Pelle Architettoniche',
    hero_subtitle: 'Fatte a mano a Firenze e Porto. Cambrature ergonomiche, soffici pelli toscane e forme geometriche pure.',
    view_catalog: 'Vedi Catalogo',
    shop_collection: 'Esplora Scarpe & Borse',
    view_lookbook: 'Guarda il Lookbook Autunno',
    paired: 'Abbinato:',

    // Announcement
    announcement_default: 'Spedizione Express gratuita in tutto il mondo e cambi taglia entro 30 giorni',
    announcement_secondary: 'Fatto a mano a Firenze e Porto',
    announcement_link: 'Esplora la Collezione',

    // 4 Category Cards
    cat_shoes_title: 'Scarpe',
    cat_shoes_sub: 'Zeppe architettoniche e cinturini intrecciati a mano',
    cat_bags_title: 'Borse',
    cat_bags_sub: 'Borse potli ricamate a mano in zardozi antico',
    cat_sale_title: 'Saldi',
    cat_sale_sub: 'Edizioni storiche curate e pezzi d’archivio rari',
    cat_ready_title: 'Pronto per la Spedizione',
    cat_ready_sub: 'Spedito entro 24 ore in tutto il mondo',

    // Just In Section
    just_in_title: 'Novità',
    just_in_subtitle: 'Zeppe, sabot e minaudière in seta fatte a mano',
    view_all: 'Vedi tutto',
    add: 'Aggiungi',
    added: 'Aggiunto',

    // Category Collection Section
    exclusive_styles: 'Modelli Esclusivi',
    sort_featured: 'In primo piano',
    sort_best_selling: 'Più venduti',
    sort_price_low_to_high: 'Prezzo: crescente',
    sort_price_high_to_low: 'Prezzo: decrescente',
    sort_newest: 'Data: dal più recente',
    colors_available: 'Colori disponibili:',
    shades: 'sfumature',
    no_pieces_match: 'Nessun modello corrisponde a questa selezione',
    try_resetting: 'Prova a reimpostare i filtri per esplorare tutti i modelli.',
    reset_filters: 'Reimposta filtri',

    // Product Detail Page
    back_to_collection: 'Torna alla collezione',
    colorway_swatches: 'Campionario colori (Clicca per l’anteprima):',
    active_color: 'Colore attivo',
    select: 'Seleziona',
    select_size_label: 'Seleziona taglia (US Donna)',
    size_guide: 'Guida alle taglie',
    add_to_cart_btn: 'AGGIUNGI AL CARRELLO',
    added_to_bag_btn: 'AGGIUNTO ALLA BORSA',
    b2b_wholesale_inquiry: 'Richiedi ordine all’ingrosso / boutique (B2B)',
    prop_free_shipping: 'Spedizione Express gratuita in USA e nel mondo',
    prop_memory_foam: 'Suola in Memory Foam a doppia densità',
    prop_exchanges: 'Cambi gratuiti entro 30 giorni',
    prop_artisans: 'Fatto a mano da maestri artigiani',
    tab_atelier: 'Dettagli dell’Atelier',
    tab_fabric: 'Tessuto e Cura',
    tab_shipping: 'Spedizione e Resi',

    // Occasions
    all_occasions: 'Tutte le Occasioni',
    curated_events_heading: 'Occasioni & Celebrazioni',
    curated_events_sub: 'Calzature architettoniche e pelletteria su misura per prom, nozze, feste in spiaggia ed eventi iconici.',
    occ_all: 'Tutte le Occasioni',
    occ_prom: 'Ballo di Fine Anno & Gala',
    occ_wedding: 'Matrimonio & Cerimonia',
    occ_beach: 'Party in Spiaggia & Resort',
    occ_cocktail: 'Cocktail & Serata',
    occ_date_night: 'Cena a Due & Romantica',
    occ_graduation: 'Laurea & Cerimonia',
    occ_brunch: 'Brunch del Weekend & Chic',
    occ_boardroom: 'Business & CdA',
    occ_garden_party: 'Garden Party & Polo',
    occ_bachelorette: 'Addio al Nubilato',
    occ_runway: 'Sfilata & Afterparty',
    occ_vacation: 'Vacanze & Jet Set',
    antler_junn_badge: 'Archivio Minimalista Antler & Juun.J',
    clear_filters: 'Reimposta tutti i filtri',

    // Cart Drawer
    shopping_bag: 'Borsa della Spesa',
    checkout: 'Procedi al Pagamento',
    subtotal: 'Subtotale',
    discount: 'Sconto',
    shipping_complimentary: 'Spedizione Express Gratuita',
    free_returns: 'Resi e cambi misura gratuiti entro 30 giorni',
    materials_craft: 'Pelli Toscane & Suole Lavorate a Mano',
    sustainable_luxury: 'Concerie Italiane Certificate LWG Gold 100%',
    remove: 'Rimuovi',
    size_label: 'Taglia:',
    color_label: 'Colore:',
    quantity_label: 'Quantità:',

    // Checkout Modal
    express_checkout: 'Cassa Rapida',
    order_summary: 'Riepilogo Ordine',
    thank_you: 'Ordine Confermato con Successo',
    order_tracking: 'Le tue scarpe e borse sono in preparazione nel nostro atelier.',
    name: 'Nome e Cognome',
    email: 'Indirizzo Email',
    shipping_address: 'Indirizzo di Spedizione',
    card_details: 'Metodo di Pagamento',
    confirm_purchase: 'Conferma Ordine',
    pay_with_stripe: 'Pagamento sicuro con Stripe',

    // Story Section
    handcrafted_mumbai: 'Fatto a mano a Mumbai',
    atelier_philosophy: 'La Filosofia dell’Atelier',
    indian_craftsmanship: 'L’Artigianato Incontra il Lusso Moderno',
    our_story: 'LA NOSTRA STORIA',
    discover_collection: 'SCOPRI LA COLLEZIONE',

    // Vacation Accessories
    handcrafted_edits: 'Edizioni Artigianali',
    embellished_potlis_flats: 'Borse Potli Ricamate & Scarpe Basse',
    vacation_sub: 'Borse zardozi storiche, lacci con perle e sandali Kolhapuri intrecciati.',

    // Footer
    customer_care: 'Servizio Clienti e Concierge',
    bespoke_inquiry: 'Richiesta Sposa su Misura',
    shipping_delivery: 'Spedizione e Consegna',
    client_faq: 'Domande Frequenti e FAQ',
    vip_circle: 'Unisciti al Nostro Circolo VIP',
    vip_circle_sub: 'Iscriviti per annunci di vendite private, anteprime e il 15% di sconto sul primo ordine.',
    enter_email: 'Inserisci la tua email',
    join: 'ISCRIVITI',
    joined: 'ISCRITTO',
    welcome_voucher: 'Benvenuto in Accesoire! Controlla la tua casella di posta per il tuo buono di benvenuto.',
    all_rights_reserved: 'Tutti i diritti riservati. Firenze & New York.',

    // Footer Value Props
    vp_courier_title: 'Corriere Espresso Gratuito',
    vp_courier_sub: 'Consegna rapida negli USA e nel mondo',
    vp_craft_title: 'Maestria Artigianale',
    vp_craft_sub: 'Cucito a mano negli atelier di Firenze e Porto',
    vp_returns_title: 'Cambi Taglia entro 30 Giorni',
    vp_returns_sub: 'Resi e cambi scarpe gratuiti',
    vp_concierge_title: 'Concierge su Misura',
    vp_concierge_sub: 'Consulenze personalizzate su taglie e sposa',

    // Collections Directory
    filter_by_theme: 'Filtra per Tema dell’Occasione',
    all_collections: 'Tutte le Collezioni',
    theme_wedding: 'Matrimoni e Cerimonie',
    theme_galas: 'Gala e Feste',
    theme_resort: 'Resort e Serate',
  },

  pt: {
    // Nav
    nav_just_in: 'Novidades',
    nav_shoes: 'Sapatos',
    nav_bags: 'Bolsas',
    nav_collections: 'Coleções',
    nav_sale: 'Saldos',
    nav_ready_to_ship: 'Pronto para Envio',
    cart: 'Carrinho',
    cart_empty: 'O seu carrinho está vazio',
    add_to_cart: 'Adicionar ao Carrinho',
    added_to_cart: 'Adicionado ao carrinho',

    // Shoe Subcategories
    'Low wedges - 2.5 inch': 'Saltos baixos compensados - 2,5 polegadas',
    'High wedges - 3.5 inch': 'Saltos altos compensados - 3,5 polegadas',
    'Higher wedge - 4.25 inch': 'Saltos extra altos compensados - 4,25 polegadas',
    'Flats': 'Sapatos rasos',
    'Platform Wedges': 'Saltos com plataforma',

    // Hero
    hero_eyebrow: 'Edição Calçado e Malas Outono / Inverno 2026',
    hero_title: 'Calçado Esculpido & Malas de Pele Arquitetónicas',
    hero_subtitle: 'Produzido artesanalmente em Florença e Porto. Curvaturas ergonómicas e peles toscanas aveludadas.',
    view_catalog: 'Ver Catálogo',
    shop_collection: 'Explorar Calçado & Malas',
    view_lookbook: 'Ver Lookbook de Outono',
    paired: 'Combinado:',

    // Announcement
    announcement_default: 'Envio expresso gratuito para todo o mundo e trocas gratuitas em 30 dias',
    announcement_secondary: 'Feito à mão em Florença e Porto',
    announcement_link: 'Explorar Coleção',

    // 4 Category Cards
    cat_shoes_title: 'Calçado',
    cat_shoes_sub: 'Saltos arquitetónicos e tiras entrançadas à mão',
    cat_bags_title: 'Malas',
    cat_bags_sub: 'Bolsas potli bordadas à mão com zardozi antigo',
    cat_sale_title: 'Saldos',
    cat_sale_sub: 'Peças de arquivo exclusivas e herança artesanal',
    cat_ready_title: 'Pronto para Envio',
    cat_ready_sub: 'Enviado em 24 horas para todo o mundo',

    // Just In Section
    just_in_title: 'Novidades',
    just_in_subtitle: 'Saltos, mules e minaudières de seda feitos à mão',
    view_all: 'Ver tudo',
    add: 'Adicionar',
    added: 'Adicionado',

    // Category Collection Section
    exclusive_styles: 'Modelos Exclusivos',
    sort_featured: 'Em destaque',
    sort_best_selling: 'Mais vendidos',
    sort_price_low_to_high: 'Preço: menor para maior',
    sort_price_high_to_low: 'Preço: maior para menor',
    sort_newest: 'Data: mais recente',
    colors_available: 'Cores disponíveis:',
    shades: 'tons',
    no_pieces_match: 'Nenhum modelo corresponde a esta seleção',
    try_resetting: 'Tente repor os filtros para explorar todos os estilos.',
    reset_filters: 'Repor filtros',

    // Product Detail Page
    back_to_collection: 'Voltar à coleção',
    colorway_swatches: 'Amostras de cor (Clique para pré-visualizar):',
    active_color: 'Cor ativa',
    select: 'Selecionar',
    select_size_label: 'Selecionar tamanho (US Mulher)',
    size_guide: 'Guia de tamanhos',
    add_to_cart_btn: 'ADICIONAR AO CARRINHO',
    added_to_bag_btn: 'ADICIONADO AO CESTO',
    b2b_wholesale_inquiry: 'Pedir encomenda de revenda / boutique (B2B)',
    prop_free_shipping: 'Envio expresso gratuito nos EUA e mundial',
    prop_memory_foam: 'Sola em espuma de memória de dupla densidade',
    prop_exchanges: 'Trocas gratuitas em 30 dias',
    prop_artisans: 'Feito à mão por mestres artesãos',
    tab_atelier: 'Detalhes do Atelier',
    tab_fabric: 'Tecido e Cuidados',
    tab_shipping: 'Entrega e Devoluções',

    // Occasions
    all_occasions: 'Todas as Ocasiões',
    curated_events_heading: 'Comprar por Ocasião & Momento',
    curated_events_sub: 'Calçado arquitetónico e marroquinaria desenhados para bailes, casamentos, festas de praia e momentos icónicos.',
    occ_all: 'Todas as Ocasiões',
    occ_prom: 'Baile de Finalistas & Gala',
    occ_wedding: 'Casamento & Cerimónia',
    occ_beach: 'Festa na Praia & Litoral',
    occ_cocktail: 'Cocktail & Sunset',
    occ_date_night: 'Jantar Romântico & Noite',
    occ_graduation: 'Graduação & Cerimónia',
    occ_brunch: 'Brunch de Fim de Semana',
    occ_boardroom: 'Executivo & Negócios',
    occ_garden_party: 'Festa no Jardim & Polo',
    occ_bachelorette: 'Despedida de Solteira',
    occ_runway: 'Desfile & Afterparty',
    occ_vacation: 'Férias & Viagens',
    antler_junn_badge: 'Arquivo Minimalista Antler & Juun.J',
    clear_filters: 'Repor filtros',

    // Cart Drawer
    shopping_bag: 'Saco de Compras',
    checkout: 'Finalizar Encomenda',
    subtotal: 'Subtotal',
    discount: 'Desconto',
    shipping_complimentary: 'Envio Expresso Gratuito',
    free_returns: '30 dias de trocas e devoluções gratuitas',
    materials_craft: 'Peles de Toscana & Solas Cosidas à Mão',
    sustainable_luxury: 'Curtumes italianos com certificação LWG Gold',
    remove: 'Remover',
    size_label: 'Tamanho:',
    color_label: 'Cor:',
    quantity_label: 'Quantidade:',

    // Checkout Modal
    express_checkout: 'Pagamento Expresso',
    order_summary: 'Resumo da Encomenda',
    thank_you: 'Encomenda Confirmada',
    order_tracking: 'As suas peças estão a ser preparadas no nosso atelier.',
    name: 'Nome Completo',
    email: 'Endereço de Email',
    shipping_address: 'Morada de Envio',
    card_details: 'Método de Pagamento',
    confirm_purchase: 'Concluir Encomenda',
    pay_with_stripe: 'Pagamento Seguro com Stripe',

    // Story Section
    handcrafted_mumbai: 'Feito à mão em Mumbai',
    atelier_philosophy: 'A Filosofia do Atelier',
    indian_craftsmanship: 'O Artesanato Encontra o Luxo Moderno',
    our_story: 'A NOSSA HISTÓRIA',
    discover_collection: 'DESCOBRIR A COLEÇÃO',

    // Vacation Accessories
    handcrafted_edits: 'Edições Artesanais',
    embellished_potlis_flats: 'Bolsas Potli Bordadas & Sapatos Rasos',
    vacation_sub: 'Bolsas zardozi de herança, cordões com pérolas e sandálias Kolhapuri entrançadas.',

    // Footer
    customer_care: 'Apoio ao Cliente e Concierge',
    bespoke_inquiry: 'Consulta de Noiva por Medida',
    shipping_delivery: 'Envios e Entregas',
    client_faq: 'Perguntas Frequentes e FAQ',
    vip_circle: 'Junte-se ao Nosso Círculo VIP',
    vip_circle_sub: 'Subscreva para convites de vendas privadas, lançamentos antecipados e 15% de desconto na primeira encomenda.',
    enter_email: 'Insira o seu email',
    join: 'ADERIR',
    joined: 'ADERIDO',
    welcome_voucher: 'Bem-vindo à Accesoire! Verifique a sua caixa de correio para o seu cupão de boas-vindas.',
    all_rights_reserved: 'Todos os direitos reservados. Florença & Nova Iorque.',

    // Footer Value Props
    vp_courier_title: 'Envio Expresso Gratuito',
    vp_courier_sub: 'Entrega rápida nos EUA e em todo o mundo',
    vp_craft_title: 'Mestria Artesanal',
    vp_craft_sub: 'Cosido à mão em ateliês de Florença e Porto',
    vp_returns_title: 'Trocas de Tamanho em 30 Dias',
    vp_returns_sub: 'Devoluções e trocas de sapatos gratuitas',
    vp_concierge_title: 'Concierge por Medida',
    vp_concierge_sub: 'Aconselhamento de tamanho e noivas',

    // Collections Directory
    filter_by_theme: 'Filtrar por Tema de Ocasião',
    all_collections: 'Todas as Coleções',
    theme_wedding: 'Casamentos e Cerimónias',
    theme_galas: 'Galas e Festas',
    theme_resort: 'Resort e Noites',
  },
};

// Merge common translations for each language
for (const lang of Object.keys(COMMON_UI_TRANSLATIONS)) {
  if (COMPLETE_TRANSLATIONS[lang]) {
    Object.assign(COMPLETE_TRANSLATIONS[lang], COMMON_UI_TRANSLATIONS[lang]);
  }
}

/**
 * Intelligent helper to translate any text key or plain English phrase
 */
export function translateWebsiteText(
  keyOrText: string,
  langCode: string,
  fallback?: string
): string {
  if (!keyOrText) return fallback || '';

  // 0. Query Offline Markdown Translation Engine first (loads directly from translations.md)
  const mdTranslated = translationMdService.t(keyOrText, langCode, '');
  if (mdTranslated && mdTranslated !== keyOrText) {
    return mdTranslated;
  }

  if (langCode === 'en') {
    // If it's a key in en, return the English text
    if (COMPLETE_TRANSLATIONS.en[keyOrText]) {
      return COMPLETE_TRANSLATIONS.en[keyOrText];
    }
    return fallback || keyOrText;
  }

  const dict = COMPLETE_TRANSLATIONS[langCode] || COMPLETE_TRANSLATIONS.en;

  // 1. Direct key match (e.g. 'nav_just_in' or 'Select Language')
  if (dict[keyOrText]) {
    return dict[keyOrText];
  }

  // 2. Search key where English translation matches keyOrText
  const enDict = COMPLETE_TRANSLATIONS.en;
  const trimmed = keyOrText.trim();
  for (const [k, val] of Object.entries(enDict)) {
    if (val.toLowerCase() === trimmed.toLowerCase()) {
      if (dict[k]) return dict[k];
    }
  }

  // Fallback to English dict or provided fallback or original
  return enDict[keyOrText] || fallback || keyOrText;
}
