import { Request, Response } from 'express';
import GroceryItem, { IGroceryItem } from '../models/GroceryModel';
import { v4 as uuidv4 } from 'uuid';
import { validateNewGroceryItem } from '../utility/validation';

export const addGroceryItem = async (req: Request, res: Response) => {
    try {    
        const { name, price, quantity } = req.body;
        const newItem = { name, price, quantity };
        const errors = validateNewGroceryItem(newItem);

        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        const _id = uuidv4().split('-')[0];
        const groceryItem: IGroceryItem = new GroceryItem({ _id, ...newItem });
        await groceryItem.save();
        res.status(201).json({ message: 'Item added successfull' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const viewGroceryItems = async (req: Request, res: Response) => {
    try {
        const groceryItems = await GroceryItem.find();
        return res.status(200).json({ message: 'Items List', data: groceryItems });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const removeGroceryItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await GroceryItem.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: 'Item delete successfull' });
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const updateGroceryItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        const { name, price, quantity } = req.body;
        const updatedItem = await GroceryItem.findByIdAndUpdate({ _id: id }, { name, price, quantity }, { new: true });
        return res.status(200).json({ message: 'Item Updated successfull', updatedItem });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const viewAvailableGroceryItems = async (req: Request, res: Response) => {
    try {
        const availableItems = await GroceryItem.find({ quantity: { $gt: 0 } });
        return res.status(200).json({ message: 'Items List', data: availableItems });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const bookGroceryItems = async (req: Request, res: Response) => {
    try {
        const { items } = req.body;
        const bookedItems: IGroceryItem[] = [];

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is empty or not provided' });
        }

        for (const item of items) {
            const { id, quantity } = item;
            const existingItem = await GroceryItem.findById(id);

            if (!existingItem || existingItem.quantity < quantity) {
                return res.status(400).json({ message: `Insufficient quantity for item with id ${id}` });
            }

            existingItem.quantity -= quantity;
            await existingItem.save();
            bookedItems.push(existingItem);
        }

        return res.status(200).json({ message: 'Items booked successfully', bookedItems });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
