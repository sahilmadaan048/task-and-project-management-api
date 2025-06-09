// src/auth/constants.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret', // fallback if env not set
};
