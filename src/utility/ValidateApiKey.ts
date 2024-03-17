import { Request, Response, NextFunction } from 'express';

interface User {
    role: string;
    userId: string;
}

const apiKeys: { [key: string]: User } = {
    'userApiKey1': { role: 'user', userId: 'user1' },
    'adminApiKey1': { role: 'admin', userId: 'admin1' }
};

const validateApiKey = (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const apiKey: string | undefined = req.headers['api-key'] as string; // Assuming API key is passed in headers
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }

    const user = apiKeys[apiKey as keyof typeof apiKeys];
    if (!user) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    // Assuming 'user' object contains role information
    if (role && user.role !== role) {
        return res.status(403).json({ error: 'You do not have sufficient permissions to access this resource.' });

    }

    next();
};




export default validateApiKey;
