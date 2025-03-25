// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('La variable de entorno MONGODB_URI no está definida');
}

// Conexión a MongoDB
const connection = mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    return mongoose.connection;
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
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