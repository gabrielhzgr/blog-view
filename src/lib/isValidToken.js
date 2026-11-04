import ms from "ms";

function isValidToken(token) {
  return Date.now() < token.iat + ms(token.expiresIn);
}

export default isValidToken;
