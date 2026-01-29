const users = [
    {
        id: 'da327a1c-c15a-4b4a-b66c-174930c2b5b3',
        email: 'test@gmail.com',
        password_hash: 'test123',
    }
];

const userProfiles = [
    {
        user_id: 'da327a1c-c15a-4b4a-b66c-174930c2b5b3',
        name: 'Jane Doe',
        age: 30,
        gender: 'female',
        bio: 'Hello! I am Jane Doe, a passionate crafter who loves creating handmade items. In my free time, I enjoy hiking and exploring nature.',
        image_url: '/users/amy-burns.png',
    }
];

const products = [
    {
        title: 'Handcrafted Wooden Bowl',   
        description: 'A beautifully handcrafted wooden bowl made from sustainable oak wood. Perfect for serving salads or as a decorative piece.',
        image: '/products/wooden-bowl.jpg',
        quantity: 10,
        price: 45.00,
        user_id: 'da327a1c-c15a-4b4a-b66c-174930c2b5b3',
    },
    {
        title: 'Knitted Wool Scarf',
        description: 'Stay warm and stylish with this cozy knitted wool scarf. Made from high-quality wool, it is soft and comfortable to wear.',
        image: '/products/scarf.jpg',
        quantity: 15,   
        price: 30.00,
        user_id: 'da327a1c-c15a-4b4a-b66c-174930c2b5b3',
    },
];