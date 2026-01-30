const products = [
    // Apparel
    {
        id: 1,
        name: "Thayer Essential Hoodie",
        price: 55.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
        description: "Premium heavyweight cotton hoodie with embroidered Thayer School of Engineering crest. Perfect for those crisp Hanover mornings.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: 2,
        name: "Classic Engineering Tee",
        price: 25.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
        description: "Soft tri-blend t-shirt featuring the iconic Dartmouth green color and minimal Thayer branding.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: 3,
        name: "Thayer Quarter-Zip Pullover",
        price: 65.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
        description: "Professional and comfortable moisture-wicking pullover for students and faculty.",
        sizes: ["S", "M", "L", "XL"],
        featured: false
    },
    {
        id: 4,
        name: "Varsity Baseball Cap",
        price: 22.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
        description: "Adjustable cotton cap with 3D embroidery.",
        sizes: ["One Size"],
        featured: false
    },

    // Accessories
    {
        id: 101,
        name: "HydroFlask 32oz - Thayer Edition",
        price: 45.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1602143303410-7199d123ad2c?q=80&w=600&auto=format&fit=crop",
        description: "Insulated water bottle in Thayer Green finish. Keeps drinks cold for 24 hours.",
        featured: true
    },
    {
        id: 102,
        name: "Technical Backpack",
        price: 85.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
        description: "Durable laptop backpack with multiple compartments for engineering tools and gear.",
        featured: true
    },
    {
        id: 103,
        name: "Engineering Lanyard",
        price: 8.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1614138299744-8e55ad3e70fc?q=80&w=600&auto=format&fit=crop",
        description: "Heavy-duty lanyard with safety breakaway clip.",
        featured: false
    },
    {
        id: 104,
        name: "Stainless Steel Coffee Mug",
        price: 28.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
        description: "Double-walled travel mug for those long lab sessions.",
        featured: false
    },

    // Stationery
    {
        id: 201,
        name: "Thayer Hardcover Notebook",
        price: 18.00,
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
        description: "Premium dot-grid notebook perfect for design sketches and meeting notes.",
        featured: true
    },
    {
        id: 202,
        name: "Precision Pen Set",
        price: 12.00,
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585336261022-69c66d117f6c?q=80&w=600&auto=format&fit=crop",
        description: "Set of three smooth-writing fine tip pens for precise calculations.",
        featured: false
    },
    {
        id: 203,
        name: "Engineering Sticker Pack",
        price: 10.00,
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1606902960316-39f264e839ed?q=80&w=600&auto=format&fit=crop",
        description: "Set of 10 vinyl stickers featuring Thayer and Dartmouth engineering motifs.",
        featured: false
    },
    {
        id: 204,
        name: "Thayer Portfolio Folder",
        price: 15.00,
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1531346651368-22bbecc8b105?q=80&w=600&auto=format&fit=crop",
        description: "Professional leatherette folder for carrying important documents.",
        featured: false
    }
];

// Utility functions
const getFeaturedProducts = () => products.filter(p => p.featured);
const getProductsByCategory = (cat) => products.filter(p => p.category === cat);
const getProductById = (id) => products.find(p => p.id === parseInt(id));

// Export for use in other scripts (window global since this is a static site)
window.thayerProducts = {
    all: products,
    getFeatured: getFeaturedProducts,
    getByCategory: getProductsByCategory,
    getById: getProductById
};
