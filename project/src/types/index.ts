// Type definitions for the restaurant order website

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: {
    optionId: string;
    choiceId: string;
  }[];
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}