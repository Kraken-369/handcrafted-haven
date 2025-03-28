import db, { Connection } from 'mongoose';

const mongoDBURL = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

if (!mongoDBURL) {
  throw new Error('MONGODB_URI it si not defined.');
}

interface cached {
  conn: Connection | null,
  promise: Promise<Connection> | null,
}

const connect = global as typeof globalThis & { db: cached };

if (!connect.db) {
  connect.db = { conn: null, promise: null }
}

const connectDB = async () => {
  if (connect.db.conn) {
    return connect.db.conn;
  }

  if (!connect.db.promise) {
    connect.db.promise = db.connect(mongoDBURL, {
      dbName
    }).then(mongoose => mongoose.connection);
  }

  try {
    connect.db.conn = await connect.db.promise;
    console.log(`your MongoDB ${dbName} was connected.`);

    return connect.db.conn;
  } catch (error) {
    console.error('Error: Can not connected to MongoDB:', error);
    
    throw error;
  }
}

export default connectDB;