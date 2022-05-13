module.exports = {

    // The JWT secret to use when signing tokens.
    jwtSecret: process.env.JWT_SECRET || 'secret',

    // The JWT hash algorithm to use when signing tokens.
    jwtHashAlgorithm: 'HS256',

    // Hashing rounds to use when hashing passwords.
    saltRounds: 10,
}