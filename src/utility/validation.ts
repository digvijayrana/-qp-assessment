

// src/utils/validation.ts

interface NewGroceryItem {
    name: string;
    price: number;
    quantity: number;
  }
  
  export const validateNewGroceryItem = (newItem: NewGroceryItem): string[] => {
    const errors: string[] = [];
  
    if (!newItem.name) {
      errors.push('Name is required');
    }
  
    if (!newItem.price) {
      errors.push('Price is required');
    }
  
    if (!newItem.quantity) {
      errors.push('Quantity is required');
    }
  
    return errors;
  };
  