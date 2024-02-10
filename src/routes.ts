/**
 * Default page to be reddirected to after authentication
 * 
 * Základní stránka pro přesměrování po úspěšném přihlášení
 * 
 * @type {string}
 */
export const DEFAULT_AUTH_REDIRECT = "/dashboard"

export const publicRoutes = [
  "/",
  "/info"
]

/**
 * Routes for user authentication
 * 
 * Cesty pro autentifikacy uživatelů
 * 
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/reset",
  "/reset-password"
]

/**
 * Routes for user verification
 * 
 * Cesty pro verifikaci uživatelů
 * 
 * @type {string}
 */
export const emailVerPrefix = "/email-verification"

export const resetPasswordPrefix = "/reset-password"

/**
 * Auth api routes prefix.
 * 
 * Prefix pro auth apiny
 * 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Prefix for admin routes
 * 
 * Prefix pro admin routy
 * 
 * @type {string}
 */
export const adminRoute = "/admin"
