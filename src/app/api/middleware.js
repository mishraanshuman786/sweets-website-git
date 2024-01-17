import { NextResponse } from 'next/server';

export function middleware(request) {
  // Extract loginStatus from localStorage
  const loginStatusString = localStorage.getItem('loginStatus');
  const loginStatus = JSON.parse(loginStatusString) || {};

  // Check if the user is not logged in and trying to access a protected route
  if (!loginStatus.status && request.nextUrl.pathname.startsWith('/login')) {
    // Redirect to the login page or another appropriate route
    return NextResponse.rewrite(new URL('/login', request.url));
  }else{
    return NextResponse.rewrite(new URL('/', request.url));
  }

//   // Check other conditions and rewrite URLs if needed
//   if (request.nextUrl.pathname.startsWith('/about')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url));
//   }

  // If no conditions are met, allow the request to proceed
  return NextResponse.next();
}
