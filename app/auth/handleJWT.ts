import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "30m",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION,
) {
  const secret_key = process.env.AUTH_SECRET as string;
  const token = jwt.sign(payload, secret_key!, options);

  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.AUTH_SECRET;
    const decoded = jwt.verify(token, secret_key!);

    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
