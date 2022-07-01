const ContentSecurityPolicy = {
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "frame-ancestors": ["'self'"],
  "manifest-src": ["'self'"],
  "prefetch-src": ["'self'"],
  "default-src": ["'self'"],
  "object-src": ["'none'"],
  "script-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
  ],
  "child-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "font-src": ["'self'"],
  "img-src": ["'self'"],
  "media-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://identitytoolkit.googleapis.com/v1/",
    "https://securetoken.googleapis.com/v1/token",
    `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/`,
    `https://content-firebaseappcheck.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/apps/`,
  ],
  "worker-src": ["'self'"],
  "frame-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
  ],
};

if (process.env.NODE_ENV === "production") {
  ContentSecurityPolicy["upgrade-insecure-requests"] = [];
} else {
  ContentSecurityPolicy["script-src"].push("'unsafe-eval'");
  ContentSecurityPolicy["connect-src"].push(
    `http://localhost:5001/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/us-central1/`
  );
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: Object.entries(ContentSecurityPolicy)
      .map(([key, value]) => {
        return `${key} ${value.join(" ")};`;
      })
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "autoplay=*,fullscreen=*",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "unsafe-none",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "cross-origin",
  },
  {
    key: "Expect-CT",
    value: "max-age=86400",
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  generateEtags: false,
  poweredByHeader: false,
};
