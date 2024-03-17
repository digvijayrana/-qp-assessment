import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
    const URI = process.env.MONGO_URL;
    if (!URI) {
        throw new Error('MongoDB URI is not provided');
    }
    let isConnected: any;
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose.connect(URI)
        .then(db => {
            isConnected = db.connections[0].readyState;
        });
};

export { connectToDatabase };
