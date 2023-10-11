import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
    callbacks: {
        authorized: ({ req, token }) => {
            if (req.nextUrl.pathname.startsWith("/opstella.svg")) {
                return true;
            }

            if (req.nextUrl.pathname.startsWith("/auth")) {
                if (token == null) {
                    return false;
                }
                let access_token = token.accessToken;
                let base64Url = access_token.split(".")[1];
                let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                let jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map(function (c) {
                            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                        })
                        .join("")
                );
                
                let access_token_json = JSON.parse(jsonPayload);
                if (access_token_json.exp < Date.now() / 1000) {
                    return false;
                }
                
            }
            
            

            return true;
        },
    },
});
