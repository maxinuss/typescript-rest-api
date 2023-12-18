import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `${process.env.JWT_AUDIENCE}`,
      issuer: `${process.env.JWT_ISSUER_URL}`,
      algorithms: [`${process.env.JWT_ALGORITHMS}`],
      secretOrKey: `${process.env.JWT_SECRET}`
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
