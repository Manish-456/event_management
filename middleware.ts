import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        "/", 
        "/events/:id", 
        "/api/webhook/clerk", 
        "/api/webhook/stripe", 
        "/api/webhook/uploadthing"
    ],
    ignoredRoutes: [
        "/api/webhook/clerk", 
        "/api/webhook/stripe", 
        "/api/webhook/uploadthing"  
    ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};