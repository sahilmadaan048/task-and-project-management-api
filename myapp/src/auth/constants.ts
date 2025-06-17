// src/auth/constants.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
};
