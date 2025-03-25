// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log( `process.env.MONGODB_URI:${process.env.MONGODB_URI}` );
console.log( `MONGODB_URI:${MONGODB_URI}` );

if (!MONGODB_URI) {
  throw new Error('Enviroment variable MONGODB_URI is not defined');
}

// Conexión a MongoDB
const connection = mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conected to MongoDB');
    return mongoose.connection;
  })
  .catch((error) => {
    console.error('Error whele conecting to MongoDB:', error);
    process.exit(1);
  });

export default connection;

export async function isConnected() {
  try {
    await connection;
    return true;
  } catch (error) {
    console.log(`error: ${error}`);
    return false;
  }
}



