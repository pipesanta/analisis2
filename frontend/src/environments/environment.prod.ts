export const environment = {
    "production": true,
    "hmr": false,
    "keycloak": {
        "url": "https://tpi.nebulae.com.co/auth",
        "realm": "TPI",
        "clientId": "EMI",
        "onLoad": "login-required",
        "checkLoginIframe": false,
        "bearerExcludedUrls": [
            "/assets"
        ]
    },
    "api": {
        "gateway": {
            "graphql": {
                "httpEndPoint": "https://tpi.nebulae.com.co/api/emi-gateway/graphql/http",
                "wsEndPoint": "wss://tpi.nebulae.com.co/api/emi-gateway/graphql/ws",
                "graphiqlEndPoint": "https://tpi.nebulae.com.co/api/emi-gateway/graphiql"
            }
        }
    },
    "google": {
      "maps": {
        "key": "AIzaSyC1VkMKnBB_TATeaszTe_a8phyo-B8DSVg"
      }
    }
};
