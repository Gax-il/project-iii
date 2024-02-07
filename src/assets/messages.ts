/**
 * Error message for invalid email
 * 
 * Chybová hláška pro neplatný email
 * 
 * @type {string}
 */
export const INVALID_EMAIL = "Neplatný email"

/**
 * Error message for invalid password
 * 
 * Chybová hláška pro neplatné heslo
 * 
 * @type {string}
 */
export const INVALID_PASSWORD = "Neplatné heslo"

/**
 * Error message for non-matching passwords
 * 
 * Chybová hláška pro neshodující se hesla
 * 
 * @type {string}
 */
export const PASSWORDS_NOT_MATCHING = "Hesla se musí shodovat"

/**
 * Error message for using same email as some OAuth account
 * 
 * Chybová hláška pro použití stejného emailu jako nějaký OAuth účet
 * 
 * @type {string}
 */
export const EMAIL_IN_USE_OAUTH = "Email použit u jiného providera (Google/Github)"

/**
 * Error message for not filling a name
 * 
 * Chybová hláška pro nevyplnění jména
 * 
 * @type {string}
 */
export const INVALID_NAME = "Neplatné jméno"

/**
 * Error message for using email that is already taken
 * 
 * Chybová hláška pro využití emailu co je již použit
 * 
 * @type {string}
 */
export const EMAIL_TAKEN = "Email je již použit"

/**
 * Error for bad input params
 * 
 * Chybová hláška pro špatné údaje
 * 
 * @type {string}
 */
export const BAD_INPUT = "Špatné údaje"

/**
 * Message after successful registration
 * 
 * Zpráva po úspěšné registraci
 * 
 * @type {string}
 */
export const SUCCESSFUL_REGISTRATION = "Registrace proběhla úspěšně, na email Vám byl zaslán potvrzující email"

/**
 * Error message for bad credentials
 * 
 * Chybová hláška po vložení špatchý udajů při přihlašování
 * 
 * @type {string}
 */
export const BAD_CREDENTIALS = "Špatné údaje"

/**
 * Basic error message
 * 
 * Základní chybová hláška
 * 
 * @type {string}
 */
export const ERROR_MSG = "Něco se pokazilo..."

/**
 * Error message for email not in our db
 * 
 * Chybová hláška pro email co není v databázi
 * 
 * @type {string}
 */
export const EMAIL_NOT_FOUND = "Email nenalezen"

/**
 * Message for loggin in with email that isnt verified
 * 
 * Hláška pro přihlašování emailem co není verifikovaný
 * 
 * @type {string}
 */
export const EMAIL_NOT_VERIFIED = "Email není verifikovaný. Na Email Vám byl zaslán odkaz určený pro verifikaci."

/**
 * Error message for trying to verification without token
 * 
 * Chybová hláška při verifikaci bez tokenu
 * 
 * @type {string}
 */
export const NO_TOKEN = "Token nenalezen, použíte link v emailu"

/**
 * Error message for using token that expired
 * 
 * Chybová hláška při využití tokenu co již vypršel
 * 
 * @type {string}
 */
export const TOKEN_EXPIRED = "Token již není platný"

/**
 * Message after successfull verification
 * 
 * Zpráva po úspěšné verifikaci
 * 
 * @type {string}
 */
export const VERIFICATION_SUCCESSFULL = "Verifikace proběhla úspěšně!"

/**
 * Message that is after using more than x characters
 * 
 * 
 * @type {string} 
 */
export const EXCEED_MAX_CHARS = (n : number) => {
  return `Maximum znaků je ${n}`
}

/**
 * Error message for using role name that already exists
 * 
 * Chybová hláška pro použití jména role co již existuje
 * 
 * @type {string} 
 */
export const ROLE_NAME_TAKEN = "Toto jméno má již jiná role"

/**
 * Message for confirming the role was created
 * 
 * Zpráva pro potvrzení vyvoření role
 * 
 * @type {string}
 */
export const ROLE_CREATED = "Role vytvořena"

/**
 * Message for successfully changing password
 * 
 * Zpráva po úspěšné změně hesla
 * 
 * @type {string} 
 */
export const PASSWORD_CHANGED = "Heslo změněno"

/**
 * Message for successfully changing name
 * 
 * Zpráva po úspěšném změnění jmeńa
 * 
 * @type {string} 
 */
export const NAME_CHANGED = "Jméno změněno"

/**
 * Message for successfully changing email
 * 
 * Zpráva po úspěšném změnění emailu
 * 
 * @type {string} 
 */
export const EMAIL_CHANGED = "Email změněn, zkontrolujte email, pokud se odhlásíte bez přístupu k emailu co jste zadali už se znovu nepřihlásíte"

/**
 * Message for successfully changing name and email
 * 
 * Zpráva po úspěšném změnění jmeńa a emailu
 * 
 * @type {string} 
 */
export const NAME_EMAIL_CHANGED = "Jméno a email změněn, zkontrolujte email, pokud se odhlásíte bez přístupu k emailu co jste zadali už se znovu nepřihlásíte"

/**
 * Error message for sending request to change mail without valid mail
 * 
 * Chybová hláška pro odeslaný request na změnu jména která nemá validní mail
 * 
 * @type {string} 
 */
export const EMAIL_NOT_EMAIL = "Email musí být prázdný a nebo platný"

/**
 * Message after successfully filling reset password form
 * 
 * Zpráva po úspěšném vyplnění formuláře na reset hesla
 * 
 * @type {string} 
 */
export const RESET_EMAIL_SENT = "Na email vám byl zaslán odkaz na změnu hesla";