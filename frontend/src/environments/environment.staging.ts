export const environment = {
    "production": true,
    "hmr"       : false,
    "keycloak": {
        "url": "https://tpi-qa.nebulae.com.co/auth",
        "realm": "QA_TPI",
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
                "httpEndPoint": "https://tpi-qa.nebulae.com.co/api/emi-gateway/graphql/http",
                "wsEndPoint": "wss://tpi-qa.nebulae.com.co/api/emi-gateway/graphql/ws",
                "graphiqlEndPoint": "https://tpi-qa.nebulae.com.co/api/emi-gateway/graphiql"
            }
        }
    },
    "google": {
      "maps": {
        "key": "AIzaSyC1VkMKnBB_TATeaszTe_a8phyo-B8DSVg"
      }
    }
};
