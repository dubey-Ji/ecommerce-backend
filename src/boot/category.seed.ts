import Category from '../models/categories.models';

const categorySeeds = async () => {
    console.log('Seeding categories...');
    const categories = [
        { name: 'Electronics', description: 'Electronics category', image: 'https://res.cloudinary.com/ddtekswva/image/upload/v1730369642/ptdnqv5kxx8y1itmg4uz.jpg' },
        { name: 'Clothing', description: 'Clothing category', image: 'https://res.cloudinary.com/ddtekswva/image/upload/v1730369642/uznrseusm2onb4wyc0bs.jpg' },
        { name: 'Books', description: 'Books category', image: 'https://res.cloudinary.com/ddtekswva/image/upload/v1730369641/sdysbdpcsp8ikfrwzk0c.webp' },
        { name: 'Furniture', description: 'Furniture category', image: '' },
        { name: 'Toys', description: 'Toys category', image: 'https://res.cloudinary.com/ddtekswva/image/upload/v1728880245/xq5lex6vseeumctdcv1i.webp' },
        { name: 'Sports', description: 'Sports category', image: '' },
        { name: 'Books', description: 'Books category', image: '' },
    ];

    try {
        await Category.deleteMany({
            name: {
                $ne: ''
            }
        });
        await Category.insertMany(categories);
        console.log('Categories seeded successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

export default categorySeeds;