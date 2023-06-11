import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withSSRContext } from 'aws-amplify';
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const req = {
        headers: {
          cookie: headers().get('cookie'),
        },
      };
    const {Auth} = withSSRContext({req})

    try {
        const user = await Auth.currentAuthenticatedUser()
        return NextResponse.next()
    } catch(err) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home',
}