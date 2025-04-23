import { MenuItem, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    image: 'https://images.pexels.com/photos/1246960/pexels-photo-1246960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'bruschetta',
    name: 'Tomato Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and herbs.',
    price: 9.95,
    image: 'https://images.pexels.com/photos/7287723/pexels-photo-7287723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'appetizers',
    popular: true,
  },
  {
    id: 'calamari',
    name: 'Crispy Calamari',
    description: 'Lightly battered calamari served with lemon aioli and marinara sauce.',
    price: 12.95,
    image: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'appetizers',
    popular: false,
  },
  {
    id: 'caesar-salad',
    name: 'Classic Caesar Salad',
    description: 'Crisp romaine lettuce with traditional Caesar dressing, croutons and parmesan.',
    price: 10.95,
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'appetizers',
    popular: true,
    options: [
      {
        id: 'protein',
        name: 'Add Protein',
        choices: [
          { id: 'chicken', name: 'Grilled Chicken', price: 4.95 },
          { id: 'shrimp', name: 'Sautéed Shrimp', price: 6.95 },
          { id: 'salmon', name: 'Grilled Salmon', price: 7.95 },
        ],
      },
    ],
  },
  {
    id: 'ribeye',
    name: 'Ribeye Steak',
    description: '12oz prime ribeye steak served with roasted potatoes and seasonal vegetables.',
    price: 34.95,
    image: 'https://images.pexels.com/photos/8696567/pexels-photo-8696567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'main-courses',
    popular: true,
    options: [
      {
        id: 'cook',
        name: 'Doneness',
        choices: [
          { id: 'rare', name: 'Rare', price: 0 },
          { id: 'medium-rare', name: 'Medium Rare', price: 0 },
          { id: 'medium', name: 'Medium', price: 0 },
          { id: 'medium-well', name: 'Medium Well', price: 0 },
          { id: 'well', name: 'Well Done', price: 0 },
        ],
      },
      {
        id: 'sauce',
        name: 'Sauce',
        choices: [
          { id: 'peppercorn', name: 'Peppercorn', price: 2.95 },
          { id: 'bearnaise', name: 'Béarnaise', price: 2.95 },
          { id: 'mushroom', name: 'Wild Mushroom', price: 2.95 },
        ],
      },
    ],
  },
  {
    id: 'salmon',
    name: 'Grilled Salmon',
    description: 'Wild-caught salmon fillet with lemon-dill sauce, served with quinoa and asparagus.',
    price: 28.95,
    image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'main-courses',
    popular: true,
  },
  {
    id: 'pasta',
    name: 'Truffle Mushroom Pasta',
    description: 'Fettuccine with wild mushrooms, truffle oil, and shaved parmesan.',
    price: 22.95,
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'main-courses',
    popular: false,
    options: [
      {
        id: 'protein',
        name: 'Add Protein',
        choices: [
          { id: 'chicken', name: 'Grilled Chicken', price: 4.95 },
          { id: 'shrimp', name: 'Sautéed Shrimp', price: 6.95 },
        ],
      },
    ],
  },
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.',
    price: 9.95,
    image: 'https://images.pexels.com/photos/6958915/pexels-photo-6958915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'desserts',
    popular: true,
  },
  {
    id: 'cheesecake',
    name: 'New York Cheesecake',
    description: 'Creamy cheesecake with graham cracker crust, topped with seasonal berries.',
    price: 10.95,
    image: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'desserts',
    popular: false,
  },
  {
    id: 'mojito',
    name: 'Classic Mojito',
    description: 'White rum, sugar, lime juice, soda water, and mint.',
    price: 11.95,
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks',
    popular: true,
  },
  {
    id: 'wine',
    name: 'House Red Wine',
    description: 'Glass of our premium house red wine.',
    price: 12.95,
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks',
    popular: false,
  },
];

// Helper function to get items by category
export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

// Helper function to get popular items
export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};

// Helper function to search items
export const searchItems = (query: string): MenuItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return menuItems.filter(
    item => 
      item.name.toLowerCase().includes(lowercaseQuery) || 
      item.description.toLowerCase().includes(lowercaseQuery)
  );
};