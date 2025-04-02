"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */
// db.ts
import mongoose, { Connection, ConnectOptions } from 'mongoose';

 // Configuración clave para evitar advertencias
// mongoose.set('strictQuery', false);

let cachedConnection: typeof mongoose | null = null;

export async function connectDB(): Promise<void> {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Usando conexión existente a MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {            
      serverSelectionTimeoutMS: 5000,
    } as ConnectOptions);

    console.log('🟢 Conexión exitosa a MongoDB');
    cachedConnection = mongoose;
  } catch (error) {
    console.error('🔴 Error crítico de conexión:', error);
    process.exit(1);
  }
} 
/*
export function getCachedConnection(): typeof mongoose {
  if (!cachedConnection) {
    throw new Error('No hay una conexión activa a MongoDB');
  }
  return cachedConnection;
}*/