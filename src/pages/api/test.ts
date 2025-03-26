import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/api/config/db'; // Asegúrate de que la ruta es correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB(); // Intentar conectar a MongoDB
    res.status(200).json({ message: 'Conectado a MongoDB correctamente 🚀' });
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    res.status(500).json({ message: 'Error conectando a MongoDB', error });
  }
}
