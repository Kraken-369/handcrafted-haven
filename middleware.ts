// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define qué rutas proteger
const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo protegemos las rutas indicadas
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirige si no hay token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Clave secreta usada al firmar el JWT (puede estar en env var)
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // Token válido, continuar
      return NextResponse.next();
    } catch (error) {
      // Token inválido o expirado
      console.error(`An error occurred. ${error}`);

      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Si no es una ruta protegida, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // protege /dashboard y subrutas
};
