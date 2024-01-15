import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        "/", 
        "/events/:id", 
        "/api/webhooks/clerk", 
        "/api/webhooks/stripe", 
        "/api/webhooks/uploadthing"
    ],
    ignoredRoutes: [
        "/api/webhooks/clerk", 
        "/api/webhooks/stripe", 
        "/api/webhooks/uploadthing"  
    ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};