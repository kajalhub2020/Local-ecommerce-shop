export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export const initialCategories: Category[] = [
  {
    id: 'cat-men',
    name: 'Men',
    slug: 'men',
    description: 'Contemporary menswear, tailored jackets, premium denim, and everyday essentials.',
    image: '/src/assets/images/category_men_collection_1790509047543.jpg',
    productCount: 8,
    status: 'active',
  },
  {
    id: 'cat-women',
    name: 'Women',
    slug: 'women',
    description: 'Chic modern silhouettes, relaxed tailoring, organic cottons, and elevated basics.',
    image: '/src/assets/images/category_women_collection_1790509062470.jpg',
    productCount: 8,
    status: 'active',
  },
  {
    id: 'cat-kids',
    name: 'Kids',
    slug: 'kids',
    description: 'Comfortable, durable playwear and casual apparel crafted from gentle organic fibers.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
    productCount: 5,
    status: 'active',
  },
  {
    id: 'cat-footwear',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Handcrafted leather sneakers, minimalist Chelsea boots, and cushioned city runners.',
    image: '/src/assets/images/category_footwear_collection_1790509078615.jpg',
    productCount: 6,
    status: 'active',
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Full-grain leather wallets, structured canvas totes, sunglasses, and minimal watches.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    productCount: 5,
    status: 'active',
  },
];
