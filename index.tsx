import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

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



const calculateDiscount = (original, current) => {
    if (!original || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
};

const ProductCard = ({ product, onSelect, onAddToCart, onToggleFavorite, isFavorite }) => (
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
                    <span>NOK {product.price.toLocaleString('en-US')}</span>
                    {product.originalPrice && (
                        <>
                            <span className="original-price"><s>NOK {product.originalPrice.toLocaleString('en-US')}</s></span>
                            <span className="discount">-{calculateDiscount(product.originalPrice, product.price)}%</span>
                        </>
                    )}
                </div>
            </div>
            <button className="add-to-cart-btn" aria-label={`Add ${product.name} to cart`} onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </button>
        </div>
    </div>
);

// --- SECTIONS / PAGES --- //

const HomePage = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => (
    <>
        <main className="hero container">
            <p className="tagline">The Future of Fun and Transport</p>
            <h1>Explore Frithjof's Inventions & Gadgets</h1>
            <p>Discover a unique collection of electric vehicles, robots, RC toys, and futuristic gadgets. From the practical to the unbelievable, find your next adventure here.</p>
            <button className="cta-button" onClick={() => onNavigate('allProducts')}>All Products</button>
            <div className="carousel-dots"><div className="dot active"></div><div className="dot"></div><div className="dot"></div></div>
        </main>
        <NewArrivals onNavigate={onNavigate} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} favorites={favorites} />
        <ClientReviews />
        <FAQ />
    </>
);

const NewArrivals = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => {
    const carouselRef = useRef(null);

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
            <h2>New Arrivals</h2>
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
    const categories = ['All', ...new Set(allProducts.map(p => p.category))];

    return (
        <div className="page-container container">
            <h1 className="page-title">All Products</h1>
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
                        <p>No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const FavoritesPage = ({ onNavigate, onAddToCart, onToggleFavorite, favorites }) => {
    const favoritedProducts = useMemo(() => 
        allProducts.filter(p => favorites.includes(p.name)),
        [favorites]
    );

    return (
        <div className="page-container container">
            <h1 className="page-title">My Favorites</h1>
            {favoritedProducts.length === 0 ? (
                 <div className="empty-state">
                    <p>You haven't favorited any items yet.</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>Explore Products</button>
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

const ProductDetail = ({ product, onNavigate, onAddToCart }) => (
    <div className="page-container container">
        <button className="back-button" onClick={() => onNavigate('allProducts')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>Back to Products</span>
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
                <p className="price">NOK {product.price.toLocaleString('en-US')}</p>
                <p className="description">{product.description}. This item is categorized under {product.category}. Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu.</p>
                <div className="add-to-cart-form">
                    <button className="cta-button" onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
);

const Cart = ({ cart, onNavigate, onUpdateCart, onRemoveFromCart }) => {
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    return (
        <div className="page-container container">
            <h1 className="page-title">My Cart</h1>
            {cart.length === 0 ? (
                <div className="empty-state">
                    <p>Your cart is empty.</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>Continue Shopping</button>
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
                                    <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.name)}>Remove</button>
                                </div>
                                <select className="quantity-selector" value={item.quantity} onChange={(e) => onUpdateCart(item.name, parseInt(e.target.value))}>
                                    {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                                </select>
                                <div className="cart-item-price">NOK {(item.price * item.quantity).toLocaleString('en-US')}</div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>NOK {subtotal.toLocaleString('en-US')}</span>
                        </div>
                         <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                        <div className="summary-row total-price">
                            <span>Total</span>
                            <span>NOK {subtotal.toLocaleString('en-US')}</span>
                        </div>
                        <button className="cta-button" onClick={() => onNavigate('checkout')}>Check Out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Checkout = ({ cart, onNavigate }) => {
    const [customerDetails, setCustomerDetails] = useState({ name: '', address: '' });
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        
        const subject = "New Order from ARNGREN.net";
        const body = [
            'New Order Details:',
            '--------------------',
            `Name: ${customerDetails.name}`,
            `Delivery Address: ${customerDetails.address}`,
            '--------------------',
            'Order Summary:',
            ...cart.map(item => `- ${item.name} (x${item.quantity}) - NOK ${item.price.toLocaleString('en-US')}`),
            '--------------------',
            `Total: NOK ${subtotal.toLocaleString('en-US')}`
        ].join('\r\n');
        
        const recipientEmail = "frithjof@arngren.net";
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        const link = document.createElement('a');
        link.href = mailtoLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (cart.length === 0) {
        return (
            <div className="page-container container">
                 <div className="empty-state">
                    <p>Your cart is empty. You cannot proceed to checkout.</p>
                    <button className="cta-button" onClick={() => onNavigate('allProducts')}>Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container container">
            <h1 className="page-title">Checkout</h1>
            <div className="checkout-container">
                <form className="shipping-form" onSubmit={handleSubmitOrder}>
                    <h2>Shipping Information</h2>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={customerDetails.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Delivery Address</label>
                        <textarea id="address" name="address" value={customerDetails.address} onChange={handleInputChange} required></textarea>
                    </div>
                    <button type="submit" className="cta-button">Confirm & Send Order via Email</button>
                </form>
                <div className="order-summary-checkout">
                    <h2>Order Summary</h2>
                    {cart.map(item => (
                        <div key={item.name} className="summary-item">
                            <span className="summary-item-name">{item.name} (x{item.quantity})</span>
                            <span>NOK {(item.price * item.quantity).toLocaleString('en-US')}</span>
                        </div>
                    ))}
                    <div className="total-price">
                        <span>Total</span>
                        <span>NOK {subtotal.toLocaleString('en-US')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- STATIC SECTIONS & PAGES --- //
const ClientReviews = () => ( <section id="client-reviews" className="client-reviews-section container section"> <h2 className="section-title">Client Reviews</h2> <p className="section-subtitle">See what our adventurous customers have to say about our unique products.</p> <div className="reviews-grid"> { [{ quote: "The electric unicycle is a game-changer... It's like living in the future.", name: "A. Johansen", company: "Tech Innovators AS" }, { quote: "I bought a build-your-own robot kit for my daughter. Fantastic time putting it together.", name: "Maria Berg", company: "Future Coders Academy" }, { quote: "Their customer service is surprisingly good for such a quirky site... got a detailed, helpful response within hours.", name: "Lars Eriksen", company: "Hobbyist's Corner" }] .map((review, index) => ( <div key={index} className="review-card"> <p>"{review.quote}"</p> <div className="review-author"> <div className="author-avatar"></div> <div className="author-info"> <h4>{review.name}</h4> <span>{review.company}</span> </div> </div> </div> ))} </div> </section> );
const FAQ = () => { const [openIndex, setOpenIndex] = useState(null); const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index); const faqData = [ { question: "Do you ship internationally?", answer: "Yes, we ship to most countries worldwide. Shipping costs and times vary depending on the destination and the size of the product." }, { question: "What is the warranty on your electric vehicles?", answer: "Our electric vehicles come with a one-year manufacturer's warranty covering the motor and battery." }, { question: "Can I get a license plate for the electric cars?", answer: "Some of our electric vehicles are street-legal and can be registered. The product description will always specify." }, { question: "Are the 'Build Your Own' kits suitable for beginners?", answer: "It depends on the kit. Each product page has a difficulty rating and a list of required skills." } ]; return ( <section id="faq" className="faq-section container section"> <h2 className="section-title">Frequently Asked Questions</h2> <p className="section-subtitle">Have questions? We've got answers.</p> <div className="faq-list"> {faqData.map((faq, index) => ( <div key={index} className="faq-item"> <div className="faq-question" onClick={() => toggleFAQ(index)} role="button" aria-expanded={openIndex === index}> <span>{faq.question}</span> <svg className={`faq-icon ${openIndex === index ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> </div> {openIndex === index && ( <div className="faq-answer"> <p>{faq.answer}</p> </div> )} </div> ))} </div> </section> ); };
const ShippingReturns = () => ( <div className="page-container container"><h2 className="page-title">Shipping & Returns</h2><div className="content-block"><h4>Shipping Policy</h4><p>We ship our unique gadgets and vehicles across Norway and to select international destinations. Shipping for standard items typically takes 3-5 business days within Norway. For larger items like electric cars or flying machines, a special delivery will be arranged, and we will contact you within 48 hours of your purchase to coordinate.</p><h4>Returns Policy</h4><p>You can return most items within 14 days of receipt for a full refund, provided they are in unused, original condition with all packaging intact. "Build Your Own" kits cannot be returned once the packaging has been opened. To initiate a return, please use the contact form to get in touch with our support team, and we will guide you through the process.</p></div></div> );
const Warranty = () => ( <div className="page-container container"><h2 className="page-title">Warranty Information</h2><div className="content-block"><h4>Our Commitment</h4><p>All products sold on Arngren.net come with a standard 12-month warranty against manufacturing defects. This warranty is valid from the date of purchase and covers faults in materials and workmanship.</p><h4>Electric Vehicles</h4><p>Electric vehicles, including bikes, scooters, and cars, come with a specific 12-month warranty on the motor and battery system. This does not cover normal wear and tear, such as tire or brake pad replacement, or any damage caused by improper use or accidents.</p><h4>Claim Process</h4><p>If you believe your product has a fault covered by warranty, please contact us immediately with your order number and a description of the issue. We may request photos or videos to assess the problem. If a defect is confirmed, we will arrange for a repair, replacement, or refund at our discretion.</p></div></div> );
const PrivacyPolicy = () => ( <div className="page-container container"><h2 className="page-title">Privacy Policy</h2><div className="content-block"><p>Your privacy is important to us. It is ARNGREN.net's policy to respect your privacy regarding any information we may collect from you across our website.</p><p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p><p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p><p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p></div></div> );
const TermsOfService = () => ( <div className="page-container container"><h2 className="page-title">Terms of Service</h2><div className="content-block"><p>By accessing the website at ARNGREN.net, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p><h4>Use License</h4><p>Permission is granted to temporarily download one copy of the materials (information or software) on ARNGREN.net's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p><h4>Disclaimer</h4><p>The materials on ARNGREN.net's website are provided on an 'as is' basis. ARNGREN.net makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p></div></div> );

const Footer = ({ onNavigate, navigateToHomeSection }) => {
    return (
        <footer className="site-footer">
            <div className="footer-content container">
                <div className="footer-top">
                    <div className="footer-logo">ARNGREN.net</div>
                    <nav className="footer-nav">
                        <a onClick={() => onNavigate('allProducts')}>All Products</a>
                        <a onClick={() => onNavigate('shipping')}>Shipping & Returns</a>
                        <a onClick={() => onNavigate('warranty')}>Warranty</a>
                        <a onClick={() => navigateToHomeSection('#faq')}>FAQ</a>
                    </nav>
                    <div className="footer-social">
                        <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} ARNGREN.net. All rights reserved.</p>
                    <div className="footer-legal">
                        <a onClick={() => onNavigate('privacy')}>Privacy Policy</a>
                        <a onClick={() => onNavigate('terms')}>Terms of Service</a>
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
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [notifications, setNotifications] = useState([]);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (prefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
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
        { name: "New Arrivals", href: "#new-arrivals", view: 'home' },
        { name: "Client Reviews", href: "#client-reviews", view: 'home' },
        { name: "FAQ", href: "#faq", view: 'home' },
        { name: "Shipping & Returns", view: 'shipping' },
        { name: "Warranty", view: 'warranty' },
    ];

    const mobileNavItems = [
        { name: "All Products", view: 'allProducts', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> },
        { name: "My Favorites", view: 'favorites', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> },
        { name: "New Arrivals", href: "#new-arrivals", view: 'home', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> },
        { name: "Shipping & Returns", view: 'shipping', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10"></path></svg> },
        { name: "Warranty", view: 'warranty', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> },
        { name: "Privacy Policy", view: 'privacy', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.789-2.75 9.565M12 11c0-3.517 1.009-6.789 2.75-9.565M12 11h.01M4.875 20.75c1.741-2.776 2.75-6.048 2.75-9.565S6.616 4.395 4.875 1.625m14.25 19.125c-1.741-2.776-2.75-6.048-2.75-9.565s1.009-6.789 2.75-9.565"></path></svg> },
        { name: "Terms of Service", view: 'terms', icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg> }
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
            <header className="header container">
                 <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Open navigation menu">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path></svg>
                </button>
                <a className="logo" onClick={() => navigateTo('home')}>ARNGREN.net</a>
                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search for gadgets, robots..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-icon-btn" aria-label="Search">
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </form>
                <div className="user-actions">
                    <button className="theme-toggle-btn action-item" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.5c.205.232.41.455.622.672a.75.75 0 001.13-1.004l-.13-.153z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                        )}
                    </button>
                    <div id="google_translate_element" className="action-item"></div>
                    <a className="action-item" onClick={() => navigateTo('favorites')}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        {favorites.length > 0 && <span className="item-count">{favorites.length}</span>}
                    </a>
                    <a className="action-item"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span>Login</span></a>
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
                    <h3>Hello, Guest</h3>
                </div>
                <button className="close-btn" onClick={toggleMobileMenu}>&times;</button>
                <ul>
                    {mobileNavItems.map(item => (
                        <li key={item.name}><a onClick={() => handleNavLinkClick(item)}>
                            {item.icon}
                            <span>{item.name}</span>
                        </a></li>
                    ))}
                </ul>
            </div>
            
            <nav className="navigation">
                <ul className="nav-links container">
                    <li className="nav-link"><a onClick={() => handleNavLinkClick({ view: 'allProducts' })}>All Products</a></li>
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

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);