import React, { useState, useMemo, useRef, useEffect, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';

// --- TRANSLATIONS --- //
const translations = {
    en: {
        nav_new_arrivals: "New Arrivals",
        nav_client_reviews: "Client Reviews",
        nav_faq: "FAQ",
        nav_shipping: "Shipping & Returns",
        nav_warranty: "Warranty",
        nav_all_products: "All Products",
        nav_favorites: "My Favorites",
        nav_privacy: "Privacy Policy",
        nav_terms: "Terms of Service",
        hero_tagline: "The Future of Fun and Transport",
        hero_title: "Explore Frithjof's Inventions & Gadgets",
        hero_desc: "Discover a unique collection of electric vehicles, robots, RC toys, and futuristic gadgets. From the practical to the unbelievable, find your next adventure here.",
        hero_cta: "All Products",
        search_placeholder: "Search for gadgets, robots...",
        login: "Login",
        guest: "Guest",
        cart_empty: "Your cart is empty.",
        cart_title: "My Cart",
        continue_shopping: "Continue Shopping",
        remove: "Remove",
        subtotal: "Subtotal",
        total: "Total",
        shipping_calc: "Calculated at next step",
        checkout_btn: "Check Out",
        checkout_title: "Checkout",
        shipping_info: "Shipping Information",
        full_name: "Full Name",
        delivery_address: "Delivery Address",
        confirm_email: "Confirm & Send Order via Email App",
        confirm_gmail: "Confirm & Send via Gmail",
        order_summary: "Order Summary",
        add_to_cart: "Add to Cart",
        back_to_products: "Back to Products",
        product_desc_suffix: "This item is categorized under",
        no_products: "No products found matching your criteria.",
        fav_empty: "You haven't favorited any items yet.",
        explore_products: "Explore Products",
        fav_title: "My Favorites",
        new_arrivals_title: "New Arrivals",
        client_reviews_title: "Client Reviews",
        client_reviews_subtitle: "See what our adventurous customers have to say about our unique products.",
        faq_title: "Frequently Asked Questions",
        faq_subtitle: "Have questions? We've got answers.",
        footer_rights: "All rights reserved.",
        shipping_returns_title: "Shipping & Returns",
        warranty_title: "Warranty Information",
        privacy_title: "Privacy Policy",
        terms_title: "Terms of Service",
        theme_light: "Light Mode",
        theme_dark: "Dark Mode",
        switch_lang: "Switch Language",
        secure_checkout_alt: "Secure Checkout"
    },
    no: {
        nav_new_arrivals: "Nyheter",
        nav_client_reviews: "Kundeomtaler",
        nav_faq: "FAQ",
        nav_shipping: "Frakt og Retur",
        nav_warranty: "Garanti",
        nav_all_products: "Alle Produkter",
        nav_favorites: "Mine Favoritter",
        nav_privacy: "Personvern",
        nav_terms: "Vilkår",
        hero_tagline: "Fremtiden for Moro og Transport",
        hero_title: "Utforsk Frithjofs Oppfinnelser og Dingser",
        hero_desc: "Oppdag en unik samling av elektriske kjøretøy, roboter, RC-leker og futuristiske dingser. Fra det praktiske til det utrolige, finn ditt neste eventyr her.",
        hero_cta: "Alle Produkter",
        search_placeholder: "Søk etter dingser, roboter...",
        login: "Logg inn",
        guest: "Gjest",
        cart_empty: "Handlekurven din er tom.",
        cart_title: "Min Handlekurv",
        continue_shopping: "Fortsett å handle",
        remove: "Fjern",
        subtotal: "Delsum",
        total: "Totalt",
        shipping_calc: "Beregnes ved neste steg",
        checkout_btn: "Gå til Kassen",
        checkout_title: "Kasse",
        shipping_info: "Fraktinformasjon",
        full_name: "Fullt Navn",
        delivery_address: "Leveringsadresse",
        confirm_email: "Bekreft og Send Ordre via E-post App",
        confirm_gmail: "Bekreft og Send via Gmail",
        order_summary: "Ordresammendrag",
        add_to_cart: "Legg i Handlekurv",
        back_to_products: "Tilbake til Produkter",
        product_desc_suffix: "Denne varen er kategorisert under",
        no_products: "Ingen produkter funnet som passer dine kriterier.",
        fav_empty: "Du har ikke favorisert noen varer ennå.",
        explore_products: "Utforsk Produkter",
        fav_title: "Mine Favoritter",
        new_arrivals_title: "Nyheter",
        client_reviews_title: "Kundeomtaler",
        client_reviews_subtitle: "Se hva våre eventyrlystne kunder har å si om våre unike produkter.",
        faq_title: "Ofte Stilte Spørsmål",
        faq_subtitle: "Har du spørsmål? Vi har svar.",
        footer_rights: "Alle rettigheter forbeholdt.",
        shipping_returns_title: "Frakt og Retur",
        warranty_title: "Garantiinformasjon",
        privacy_title: "Personvern",
        terms_title: "Vilkår for Bruk",
        theme_light: "Lys Modus",
        theme_dark: "Mørk Modus",
        switch_lang: "Bytt Språk",
        secure_checkout_alt: "Sikker Betaling"
    }
};

// --- NEW: LANGUAGE CONTEXT --- //
const LanguageContext = createContext({
    language: 'en',
    setLanguage: (lang: string) => {},
    t: (key: string) => key
});

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// --- CURRENCY CONTEXT --- //
const NOK_TO_USD_RATE = 0.099; // 1 NOK = $0.099 USD

const CurrencyContext = createContext({
    currency: 'NOK',
    formatPrice: (priceInNok) => `NOK ${priceInNok.toLocaleString('en-US')}`,
});

export const useCurrency = () => useContext(CurrencyContext);

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const { language } = useLanguage();
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        // Update currency when language changes
        if (language === 'en') {
            setCurrency('USD');
        } else {
            setCurrency('NOK');
        }
    }, [language]);

    // Function to format the price based on the current currency
    const formatPrice = (priceInNok) => {
        if (currency === 'USD') {
            const priceInUsd = priceInNok * NOK_TO_USD_RATE;
            return priceInUsd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }
        return `NOK ${priceInNok.toLocaleString('en-US')}`;
    };

    const value = { currency, formatPrice };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};


const allProducts = [
    // Gadgets
    { 
        name: "Keychain Breathalyzer", 
        description: "Portable alcohol tester for your keychain", 
        price: 139, 
        originalPrice: 199, 
        category: "Gadgets",
        image: "https://m.media-amazon.com/images/I/71PwjVuN3BL._AC_SL1500_.jpg"
    },
    { 
        name: "H3 Tritium Watch", 
        description: "Navy Seal tactical watch with tritium illumination", 
        price: 1998, 
        originalPrice: 2499, 
        category: "Gadgets",
        image: "https://cdn.watchesyoucanafford.com/wp-content/uploads/2023/08/Affordable-Bronze-Watches-600x400.jpg"
    },

    // Robots
    { 
        name: "Self-balancing Robot", 
        description: "Autonomous robot that balances on two wheels", 
        price: 999, 
        originalPrice: null, 
        category: "Robots",
        image: "https://hackster.imgix.net/uploads/attachments/1460483/_ihMxXCqSaS.blob?auto=compress%2Cformat&w=900&h=675&fit=min"
    },
    { 
        name: "Roboraptor", 
        description: "80cm long dinosaur robot with realistic motions", 
        price: 499, 
        originalPrice: 699, 
        category: "Robots",
        image: "https://wowmeta.s3.amazonaws.com/img/products-feature/14453147974acde98036a64678a59c8effbf6dafeb.jpg"
    },

    // Electric Vehicles
    { 
        name: "Electric Fat-bike 1000w", 
        description: "Powerful 1000w motor, perfect for snow riding", 
        price: 14998, 
        originalPrice: 16998, 
        category: "Electric Vehicles",
        image: "https://aventon-images.imgix.net/products/Aventure2-traditional-slate-01.jpg?v=1755057581&auto=compress,format&w=10&blur=10"
    },
    { 
        name: "Electric Porsche-type Car", 
        description: "24V/180w motor, for 2 children or small adults", 
        price: 8998, 
        originalPrice: null, 
        category: "Electric Vehicles",
        image: "https://www.magiccars.com/cdn/shop/products/MagicCars2SeaterRideOnBatteryPoweredToyCarAdultsDrive-11_c433e4fb-be28-4f02-af6d-b81aa0b5d341_1000x.jpg?v=1753219330"
    },

    // RC & DIY
    { 
        name: "RC Tank w/ Air Cannon", 
        description: "Metal 55cm long tank with realistic sounds", 
        price: 2998, 
        originalPrice: 3498, 
        category: "RC Products",
        image: "https://m.media-amazon.com/images/I/7106U9G1H1L._AC_UF894,1000_QL80_.jpg"
    },
    { 
        name: "Robot Arm Kit", 
        description: "Controllable from RC or PC, build it yourself", 
        price: 498, 
        originalPrice: null, 
        category: "DIY Kits",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/19a61c5b-a63a-418c-acc7-e96b0856a680.__CR0,0,970,600_PT0_SX970_V1___.jpg"
    }
];

// Icons for Theme Toggle
const SunIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const MoonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>
);

const TranslateIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
  </svg>
);

const FlagUS = () => (
  <svg width="20" height="15" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px' }}>
    <rect width="22" height="16" fill="#B22234"/>
    <path d="M0,2 h22 M0,5 h22 M0,8 h22 M0,11 h22 M0,14 h22" stroke="#FFFFFF" strokeWidth="1.2"/>
    <rect width="9" height="9" fill="#3C3B6E"/>
    <g fill="#FFFFFF">
      <circle cx="2" cy="2" r="0.8"/>
      <circle cx="4.5" cy="2" r="0.8"/>
      <circle cx="7" cy="2" r="0.8"/>
      <circle cx="3.25" cy="4" r="0.8"/>
      <circle cx="5.75" cy="4" r="0.8"/>
      <circle cx="2" cy="6" r="0.8"/>
      <circle cx="4.5" cy="6" r="0.8"/>
      <circle cx="7" cy="6" r="0.8"/>
    </g>
  </svg>
);

const FlagNO = () => (
  <svg width="20" height="15" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px' }}>
    <rect width="22" height="16" fill="#BA0C2F"/>
    <path d="M0,8 h22 M8,0 v16" stroke="#FFFFFF" strokeWidth="4"/>
    <path d="M0,8 h22 M8,0 v16" stroke="#00205B" strokeWidth="2"/>
  </svg>
);


const calculateDiscount = (original, current) => {
    if (!original || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
};

const ProductCard = ({ product, onSelect, onAddToCart, onToggleFavorite, isFavorite }: { product: any, onSelect: any, onAddToCart: any, onToggleFavorite: any, isFavorite: any }) => {
    const { formatPrice } = useCurrency();
    const { t } = useLanguage();

    return (
        <div className="product-card">
            <div onClick={() => onSelect(product)}>
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
            <button
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                aria-label={`Favorite ${product.name}`}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.name); }}
            >
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            </button>
            <div className="product-info" onClick={() => onSelect(product)}>
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p className="description truncate-text">{product.description}</p>
                    <div className="product-price">
                        <span>{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <>
                                <span className="original-price"><s>{formatPrice(product.originalPrice)}</s></span>
                                <span className="discount">-{calculateDiscount(product.originalPrice, product.price)}%</span>
                            </>
                        )}
                    </div>
                </div>
                <button className="add-to-cart-btn" aria-label={t('add_to_cart')} onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
            </div>
        </div>
    );
};

// --- SECTIONS / PAGES --- //

const HomePage = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => {
    const { t } = useLanguage();
    return (
        <>
            <main className="hero container">
                <p className="tagline">{t('hero_tagline')}</p>
                <h1>{t('hero_title')}</h1>
                <p>{t('hero_desc')}</p>
                <button className="cta-button" onClick={() => onNavigate('allProducts')}>{t('hero_cta')}</button>
            </main>
            <NewArrivals onNavigate={onNavigate} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} favorites={favorites} />
            <ClientReviews />
            <FAQ />
        </>
    );
};

const NewArrivals = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => {
    const carouselRef = useRef(null);
    const { t } = useLanguage();

    const scroll = (direction) => {
        if (carouselRef.current) {
            const card = carouselRef.current.querySelector('.product-card');
            if (card) {
                const scrollAmount = card.offsetWidth + parseInt(getComputedStyle(carouselRef.current).gap);
                carouselRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <section id="new-arrivals" className="new-arrivals-section container">
            <h2>{t('new_arrivals_title')}</h2>
            <div className="product-carousel">
                <div className="carousel-arrow left" role="button" onClick={() => scroll('left')}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></div>
                <div className="product-grid" ref={carouselRef}>
                    {allProducts.slice(0, 6).map(product => (
                        <ProductCard 
                            key={product.name} 
                            product={product} 
                            onSelect={(p) => onNavigate('productDetail', p)} 
                            onAddToCart={onAddToCart}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={favorites.includes(product.name)}
                        />
                    ))}
                </div>
                <div className="carousel-arrow right" role="button" onClick={() => scroll('right')}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></div>
            </div>
        </section>
    );
};

const AllProducts = ({ products, onNavigate, onAddToCart, onToggleFavorite, favorites, activeCategory, setActiveCategory }) => {
    const { t } = useLanguage();
    const categories = ['All', ...new Set(allProducts.map(p => p.category))];

    return (
        <div className="page-container container">
            <h1 className="page-title">{t('nav_all_products')}</h1>
            <div className="category-filters">
                {categories.map(cat => (
                    <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
                ))}
            </div>
            <div className="all-products-grid">
                {products.length > 0 ? products.map(product => (
                     <ProductCard 
                        key={product.name} 
                        product={product} 
                        onSelect={(p) => onNavigate('productDetail', p)} 
                        onAddToCart={onAddToCart}
                        onToggleFavorite={onToggleFavorite}
                        isFavorite={favorites.includes(product.name)}
                    />
                )) : (
                    <div className="empty-state">
                        <p>{t('no_products')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const FavoritesPage = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => {
    const { t } = useLanguage();
    const favoritedProducts = useMemo(() => 
        allProducts.filter(p => favorites.includes(p.name)),
        [favorites]
    );

    return (
        <div className="page-container container">
            <h1 className="page-title">{t('fav_title')}</h1>
            {favoritedProducts.length === 0 ? (
                 <div className="empty-state">
                    <p>{t('fav_empty')}</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>{t('explore_products')}</button>
                </div>
            ) : (
                <div className="all-products-grid">
                    {favoritedProducts.map(product => (
                        <ProductCard 
                            key={product.name} 
                            product={product} 
                            onSelect={(p) => onNavigate('productDetail', p)} 
                            onAddToCart={onAddToCart}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={favorites.includes(product.name)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductDetail = ({ product, onNavigate, onAddToCart }) => {
    const { formatPrice } = useCurrency();
    const { t } = useLanguage();

    return (
        <div className="page-container container">
            <button className="back-button" onClick={() => onNavigate('allProducts')}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span>{t('back_to_products')}</span>
            </button>
            <div className="product-detail-container">
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="thumbnail-images">
                        <div className="thumb active"><img src={product.image} alt={`${product.name} thumbnail`} /></div>
                    </div>
                </div>
                <div className="product-purchase-info">
                    <h2>{product.name}</h2>
                    <p className="price">{formatPrice(product.price)}</p>
                    <p className="description">{product.description}. {t('product_desc_suffix')} {product.category}. Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.</p>
                    <div className="add-to-cart-form">
                        <button className="cta-button" onClick={() => onAddToCart(product, 1)}>{t('add_to_cart')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Cart = ({ cart, onNavigate, onUpdateCart, onRemoveFromCart }) => {
    const { formatPrice } = useCurrency();
    const { t } = useLanguage();
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    return (
        <div className="page-container container">
            <h1 className="page-title">{t('cart_title')}</h1>
            {cart.length === 0 ? (
                <div className="empty-state">
                    <p>{t('cart_empty')}</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>{t('continue_shopping')}</button>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items-list">
                        {cart.map(item => (
                            <div key={item.name} className="cart-item">
                                <div className="cart-item-image"><img src={item.image} alt={item.name} /></div>
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.name)}>{t('remove')}</button>
                                </div>
                                <select className="quantity-selector" value={item.quantity} onChange={(e) => onUpdateCart(item.name, parseInt(e.target.value))}>
                                    {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                                </select>
                                <div className="cart-item-price">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>{t('order_summary')}</h2>
                        <div className="summary-row">
                            <span>{t('subtotal')}</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                         <div className="summary-row">
                            <span>Shipping</span>
                            <span>{t('shipping_calc')}</span>
                        </div>
                        <div className="summary-row total-price">
                            <span>{t('total')}</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <button className="cta-button" onClick={() => onNavigate('checkout')}>{t('checkout_btn')}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Checkout = ({ cart, onNavigate }) => {
    const { formatPrice } = useCurrency();
    const { t } = useLanguage();
    const [customerDetails, setCustomerDetails] = useState({ name: '', address: '' });
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const formRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const generateEmailData = () => {
        const subject = "New Order from ARNGREN.net";
        const body = [
            'New Order Details:',
            '--------------------',
            `Name: ${customerDetails.name}`,
            `Delivery Address: ${customerDetails.address}`,
            '--------------------',
            'Order Summary:',
            ...cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price)}`),
            '--------------------',
            `Total: ${formatPrice(subtotal)}`
        ].join('\r\n');
        return { subject, body };
    };

    const handleStandardSubmit = (e) => {
        e.preventDefault();
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        const { subject, body } = generateEmailData();
        const recipientEmail = "frithjof@arngren.net";
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const handleGmailSubmit = (e) => {
        e.preventDefault();
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        const { subject, body } = generateEmailData();
        const recipientEmail = "frithjof@arngren.net";
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailLink, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="page-container container">
                 <div className="empty-state">
                    <p>{t('cart_empty')}</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>{t('continue_shopping')}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container container">
            <h1 className="page-title">{t('checkout_title')}</h1>
            <div className="checkout-container">
                <form className="shipping-form" ref={formRef} onSubmit={handleStandardSubmit}>
                    <h2>{t('shipping_info')}</h2>
                    <div className="form-group">
                        <label htmlFor="name">{t('full_name')}</label>
                        <input type="text" id="name" name="name" value={customerDetails.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">{t('delivery_address')}</label>
                        <textarea id="address" name="address" value={customerDetails.address} onChange={handleInputChange} required></textarea>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button type="submit" className="cta-button">{t('confirm_email')}</button>
                        <button type="button" onClick={handleGmailSubmit} className="cta-button" style={{ backgroundColor: '#ea4335', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            {t('confirm_gmail')}
                        </button>
                    </div>
                </form>
                <div className="order-summary-checkout">
                    <h2>{t('order_summary')}</h2>
                    {cart.map(item => (
                        <div key={item.name} className="summary-item">
                            <span className="summary-item-name">{item.name} (x{item.quantity})</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="total-price">
                        <span>{t('total')}</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <img 
                            src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/00b5c288-ab6a-4db4-b639-e2f4c8d25ccc.png" 
                            alt={t('secure_checkout_alt')}
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AuthModal = ({ isOpen, onClose, onNavigate }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { t } = useLanguage();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        onClose();
    };
    
    const handleNavigate = (view) => {
        onClose();
        onNavigate(view);
    };

    if (!isOpen) return null;

    return (
        <div className={`auth-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>&times;</button>
                {isLoginView ? (
                    // Login Form
                    <div className="auth-form-container">
                        <h2 className="auth-title">{t('login')}</h2>
                        <form className="auth-form" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="login-email">Email</label>
                                <input type="email" id="login-email" name="email" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input type="password" id="login-password" name="password" required placeholder="Enter your password" />
                            </div>
                            <button type="submit" className="auth-submit-btn">{t('login')}</button>
                        </form>
                        <p className="auth-switch-text">
                            Don't have an account? <span onClick={() => setIsLoginView(false)}>Sign up</span>
                        </p>
                    </div>
                ) : (
                    // Sign Up Form
                    <div className="auth-form-container">
                        <h2 className="auth-title">Sign up form</h2>
                        <form className="auth-form" onSubmit={handleFormSubmit}>
                             <div className="form-group">
                                <label htmlFor="signup-username">Username</label>
                                <input type="text" id="signup-username" name="username" required placeholder="Choose a username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-email">Email</label>
                                <input type="email" id="signup-email" name="email" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-password">Password</label>
                                <input type="password" id="signup-password" name="password" required placeholder="Create a password" />
                            </div>
                            <button type="submit" className="auth-submit-btn">Sign up</button>
                        </form>
                        <p className="auth-switch-text">
                            Already have an account? <span onClick={() => setIsLoginView(true)}>{t('login')}</span>
                        </p>
                        <p className="auth-terms-text">
                            By signing up, you agree to our <span onClick={() => handleNavigate('terms')}>Terms of Service</span> and <span onClick={() => handleNavigate('privacy')}>Privacy Policy</span>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- STATIC SECTIONS & PAGES --- //
const ClientReviews = () => {
    const { t } = useLanguage();
    return (
        <section id="client-reviews" className="client-reviews-section container section">
            <h2 className="section-title">{t('client_reviews_title')}</h2>
            <p className="section-subtitle">{t('client_reviews_subtitle')}</p>
            <div className="reviews-grid"> { [{ quote: "The electric unicycle is a game-changer... It's like living in the future.", name: "A. Johansen", company: "Tech Innovators AS" }, { quote: "I bought a build-your-own robot kit for my daughter. Fantastic time putting it together.", name: "Maria Berg", company: "Future Coders Academy" }, { quote: "Their customer service is surprisingly good for such a quirky site... got a detailed, helpful response within hours.", name: "Lars Eriksen", company: "Hobbyist's Corner" }] .map((review, index) => ( <div key={index} className="review-card"> <p>"{review.quote}"</p> <div className="review-author"> <div className="author-avatar"></div> <div className="author-info"> <h4>{review.name}</h4> <span>{review.company}</span> </div> </div> </div> ))} </div>
        </section>
    );
};
const FAQ = () => { 
  const [openIndex, setOpenIndex] = useState(null); 
  const { t } = useLanguage();
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index); 

  const faqData = [ 
    { 
      question: "Do you ship internationally?", 
      answer: "Yes, we ship to most countries worldwide. Shipping costs and times vary depending on the destination and the size of the product." 
    }, 
    { 
      question: "What is the warranty on your electric vehicles?", 
      answer: "Our electric vehicles come with a one-year manufacturer's warranty covering the motor and battery." 
    }, 
    { 
      question: "How do I place an order?", 
      answer: "Orders can be placed by selecting the products you want and sending your order details via email, fax, or letter. Payment is made through Vipps or bank transfer. After submitting your order, you will receive a summary with payment instructions. There is no immediate online checkout or automated confirmation." 
    }, 
    { 
      question: "Are the 'Build Your Own' kits suitable for beginners?", 
      answer: "It depends on the kit. Each product page has a difficulty rating and a list of required skills." 
    } 
  ]; 

  return ( 
    <section id="faq" className="faq-section container section"> 
      <h2 className="section-title">{t('faq_title')}</h2> 
      <p className="section-subtitle">{t('faq_subtitle')}</p> 
      <div className="faq-list"> 
        {faqData.map((faq, index) => ( 
          <div key={index} className="faq-item"> 
            <div className="faq-question" onClick={() => toggleFAQ(index)} role="button" aria-expanded={openIndex === index}> 
              <span>{faq.question}</span> 
              <svg className={`faq-icon ${openIndex === index ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg> 
            </div> 
            {openIndex === index && ( 
              <div className="faq-answer"> 
                <p>{faq.answer}</p> 
              </div> 
            )} 
          </div> 
        ))} 
      </div> 
    </section> 
  ); 
};

const ShippingReturns = () => {
    const { t } = useLanguage();
    return ( <div className="page-container container"><h2 className="page-title">{t('shipping_returns_title')}</h2><div className="content-block"><h4>Shipping Policy</h4><p>We ship our unique gadgets and vehicles across Norway and to select international destinations. Shipping for standard items typically takes 3-5 business days within Norway. For larger items like electric cars or flying machines, a special delivery will be arranged, and we will contact you within 48 hours of your purchase to coordinate.</p><h4>Returns Policy</h4><p>You can return most items within 14 days of receipt for a full refund, provided they are in unused, original condition with all packaging intact. "Build Your Own" kits cannot be returned once the packaging has been opened. To initiate a return, please use the contact form to get in touch with our support team, and we will guide you through the process.</p></div></div> );
};
const Warranty = () => {
    const { t } = useLanguage();
    return ( <div className="page-container container"><h2 className="page-title">{t('warranty_title')}</h2><div className="content-block"><h4>Our Commitment</h4><p>All products sold on Arngren.net come with a standard 12-month warranty against manufacturing defects. This warranty is valid from the date of purchase and covers faults in materials and workmanship.</p><h4>Electric Vehicles</h4><p>Electric vehicles, including bikes, scooters, and cars, come with a specific 12-month warranty on the motor and battery system. This does not cover normal wear and tear, such as tire or brake pad replacement, or any damage caused by improper use or accidents.</p><h4>Claim Process</h4><p>If you believe your product has a fault covered by warranty, please contact us immediately with your order number and a description of the issue. We may request photos or videos to assess the problem. If a defect is confirmed, we will arrange for a repair, replacement, or refund at our discretion.</p></div></div> );
};
const PrivacyPolicy = () => {
    const { t } = useLanguage();
    return ( <div className="page-container container"><h2 className="page-title">{t('privacy_title')}</h2><div className="content-block"><p>Your privacy is important to us. It is ARNGREN.net's policy to respect your privacy regarding any information we may collect from you across our website.</p><p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p><p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p><p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p></div></div> );
};
const TermsOfService = () => {
    const { t } = useLanguage();
    return ( <div className="page-container container"><h2 className="page-title">{t('terms_title')}</h2><div className="content-block"><p>By accessing the website at ARNGREN.net, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p><h4>Use License</h4><p>Permission is granted to temporarily download one copy of the materials (information or software) on ARNGREN.net's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p><h4>Disclaimer</h4><p>The materials on ARNGREN.net's website are provided on an 'as is' basis. ARNGREN.net makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p></div></div> );
};

const Footer = ({ onNavigate, navigateToHomeSection }) => {
    const { t } = useLanguage();
    return (
        <footer className="site-footer">
            <div className="footer-content container">
                <div className="footer-top">
                    <div className="footer-logo">ARNGREN.net</div>
                    <nav className="footer-nav">
                        <a onClick={() => onNavigate('allProducts')}>{t('nav_all_products')}</a>
                        <a onClick={() => onNavigate('shipping')}>{t('nav_shipping')}</a>
                        <a onClick={() => onNavigate('warranty')}>{t('nav_warranty')}</a>
                        <a onClick={() => navigateToHomeSection('#faq')}>{t('nav_faq')}</a>
                    </nav>
                    <div className="footer-social">
                        <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} ARNGREN.net. {t('footer_rights')}</p>
                    <div className="footer-legal">
                        <a onClick={() => onNavigate('privacy')}>{t('nav_privacy')}</a>
                        <a onClick={() => onNavigate('terms')}>{t('nav_terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
const Notifications = ({ notifications, onRemove }) => {
    return (
        <div className="notifications-container">
            {notifications.map(note => (
                <div 
                    key={note.id} 
                    className={`notification ${note.type} ${note.isExiting ? 'exit' : ''}`}
                    onClick={() => onRemove(note.id)}
                >
                    {note.message}
                </div>
            ))}
        </div>
    );
};


// --- MAIN APP COMPONENT --- //
const App = () => {
    const [view, setView] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [notifications, setNotifications] = useState([]);
    
    const { language, setLanguage, t } = useLanguage();

    // Theme State
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('theme') || 'dark';
        } catch (e) {
            return 'dark';
        }
    });

    // Effect to update body class when theme changes
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch(e) {}
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'no' : 'en');
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isExiting: true } : n));
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
    };

    const addNotification = (message, type = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, isExiting: false }]);
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const navigateTo = (newView, product = null) => {
        if (product) setSelectedProduct(product);
        if (newView === 'allProducts' && view !== 'allProducts') {
            setActiveCategory('All');
        }
        setView(newView);
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    };

    const navigateToHomeSection = (sectionId) => {
        if (view !== 'home') {
            setView('home');
            setTimeout(() => { document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
        } else {
            document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };
    
    const handleAddToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.name === product.name);
            if (existingItem) {
                return prevCart.map(item => item.name === product.name ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prevCart, { ...product, quantity }];
        });
        addNotification(`${product.name} added to cart!`);
    };

    const handleUpdateCart = (productName, quantity) => {
        setCart(prevCart => prevCart.map(item => item.name === productName ? { ...item, quantity } : item));
    };

    const handleRemoveFromCart = (productName) => {
        setCart(prevCart => prevCart.filter(item => item.name !== productName));
    };

    const handleToggleFavorite = (productName) => {
        setFavorites(prev => 
            prev.includes(productName)
            ? prev.filter(name => name !== productName)
            : [...prev, productName]
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigateTo('allProducts');
    };

    const filteredAndSearchedProducts = useMemo(() => {
        let products = allProducts;
        if (activeCategory !== 'All') {
            products = products.filter(p => p.category === activeCategory);
        }
        if (searchQuery.trim() !== '') {
            products = products.filter(p => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        }
        return products;
    }, [activeCategory, searchQuery]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navItems = [
        { name: t('nav_new_arrivals'), href: "#new-arrivals", view: 'home' },
        { name: t('nav_client_reviews'), href: "#client-reviews", view: 'home' },
        { name: t('nav_faq'), href: "#faq", view: 'home' },
        { name: t('nav_shipping'), view: 'shipping' },
        { name: t('nav_warranty'), view: 'warranty' },
    ];

    const mobileNavItems = [
        { name: t('nav_all_products'), view: 'allProducts', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> },
        { name: t('nav_favorites'), view: 'favorites', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> },
        { name: t('nav_new_arrivals'), href: "#new-arrivals", view: 'home', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> },
        { name: t('nav_shipping'), view: 'shipping', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10"></path></svg> },
        { name: t('nav_warranty'), view: 'warranty', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> },
        { name: t('nav_privacy'), view: 'privacy', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.789-2.75 9.565M12 11c0-3.517 1.009-6.789 2.75-9.565M12 11h.01M4.875 20.75c1.741-2.776 2.75-6.048 2.75-9.565S6.616 4.395 4.875 1.625m14.25 19.125c-1.741-2.776-2.75-6.048-2.75-9.565s1.009-6.789 2.75-9.565"></path></svg> },
        { name: t('nav_terms'), view: 'terms', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg> }
    ];

    const handleNavLinkClick = (item) => {
        if (item.href) {
            navigateToHomeSection(item.href);
        } else if (item.view) {
            if (item.view === 'allProducts') {
                setSearchQuery('');
            }
            navigateTo(item.view);
        }
        setIsMobileMenuOpen(false);
    };

    const totalCartItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    return (
        <>
            <Notifications notifications={notifications} onRemove={removeNotification} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onNavigate={navigateTo} />
            <header className="header container">
                 <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Open navigation menu">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path></svg>
                </button>
                <a className="logo" onClick={() => navigateTo('home')}>ARNGREN.net</a>
                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder={t('search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-icon-btn" aria-label="Search">
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </form>
                <div className="user-actions">
                    <button 
                        className="action-item" 
                        onClick={toggleTheme} 
                        aria-label="Toggle theme"
                        title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <button className="action-item" onClick={toggleLanguage} title={t('switch_lang')}>
                         <TranslateIcon />
                         <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'bold', fontSize: '0.9rem'}}>
                             {language === 'en' ? <><FlagUS /> EN</> : <><FlagNO /> NO</>}
                         </span>
                    </button>
                    <a className="action-item" onClick={() => navigateTo('favorites')}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        {favorites.length > 0 && <span className="item-count">{favorites.length}</span>}
                    </a>
                    <a className="action-item" onClick={() => setIsAuthModalOpen(true)}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <span>{t('login')}</span>
                    </a>
                    <a className="action-item" onClick={() => navigateTo('cart')}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {totalCartItems > 0 && <span className="item-count">{totalCartItems}</span>}
                    </a>
                </div>
            </header>

            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
            <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-header">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <h3>Hello, {t('guest')}</h3>
                </div>
                <button className="close-btn" onClick={toggleMobileMenu}>&times;</button>
                <ul>
                    {mobileNavItems.map(item => (
                        <li key={item.name}><a onClick={() => handleNavLinkClick(item)}>
                            {item.icon}
                            <span>{item.name}</span>
                        </a></li>
                    ))}
                    <li>
                        <a onClick={toggleLanguage}>
                             <TranslateIcon />
                             <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                {language === 'en' ? <><FlagUS /> English</> : <><FlagNO /> Norsk</>}
                             </span>
                        </a>
                    </li>
                    <li>
                        <a onClick={toggleTheme}>
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                            <span>{theme === 'dark' ? t('theme_light') : t('theme_dark')}</span>
                        </a>
                    </li>
                </ul>
            </div>
            
            <nav className="navigation">
                <ul className="nav-links container">
                    <li className="nav-link"><a onClick={() => handleNavLinkClick({ view: 'allProducts' })}>{t('nav_all_products')}</a></li>
                    {navItems.map(item => (<li key={item.name} className="nav-link"><a onClick={() => handleNavLinkClick(item)}>{item.name}</a></li>))}
                </ul>
            </nav>
            <main className="main-content">
                {view === 'home' && <HomePage onNavigate={navigateTo} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />}
                {view === 'allProducts' && <AllProducts products={filteredAndSearchedProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onNavigate={navigateTo} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />}
                {view === 'favorites' && <FavoritesPage onNavigate={navigateTo} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />}
                {view === 'productDetail' && selectedProduct && <ProductDetail product={selectedProduct} onNavigate={navigateTo} onAddToCart={handleAddToCart} />}
                {view === 'cart' && <Cart cart={cart} onNavigate={navigateTo} onUpdateCart={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} />}
                {view === 'checkout' && <Checkout cart={cart} onNavigate={navigateTo} />}
                {view === 'shipping' && <ShippingReturns />}
                {view === 'warranty' && <Warranty />}
                {view === 'privacy' && <PrivacyPolicy />}
                {view === 'terms' && <TermsOfService />}
            </main>
            <Footer onNavigate={navigateTo} navigateToHomeSection={navigateToHomeSection} />
        </>
    );
};

const AppWrapper = () => {
    return (
        <LanguageProvider>
            <CurrencyProvider>
                <App />
            </CurrencyProvider>
        </LanguageProvider>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWrapper />);
