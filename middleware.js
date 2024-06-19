import { auth } from "./app/api/auth/[...nextauth]/route";
/*import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  const session=await auth();
 
    if(!session?.user){
      return NextResponse.redirect(new URL("/", request.url));
    }
  

    return NextResponse.next();

}*/

export const middleware=auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/account",
};
