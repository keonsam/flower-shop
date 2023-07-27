import logger from "../middleware/logger";
import bcrypt from "bcrypt";
import JWTService from "./jwt.service";
import CredentialRepository from "../repositories/credential.repository";
import { ConflictError, UnAuthorizedError } from "../types/ApplicationError";
import { Login, Register } from "../types/credential";

export default class CredentialService {
  private credentialRepository: CredentialRepository;
  private jwtService: JWTService;

  constructor() {
    this.credentialRepository = new CredentialRepository();
    this.jwtService = new JWTService();
  }

  async register(registerData: Register) {
    const { username, password, role } = registerData;

    // CONFIRM USERNAME
    const savedCredential =
      await this.credentialRepository.getCredentialByUsername(username);

    if (savedCredential?.id) {
      throw new ConflictError("User already exist with that username.");
    }

    // CREATE CREDENTIAL
    const hashedPassword = await bcrypt.hash(password, 10);
    logger.info(`Register user hashedPassword: ${hashedPassword}`);

    return await this.credentialRepository.createCredential({
      username,
      password: hashedPassword,
      role,
    });
  }

  async login(auth: Login) {
    const { username, password } = auth;

    // verify username
    const credential = await this.credentialRepository.getCredentialByUsername(
      username
    );

    if (!credential?.id) {
      throw new UnAuthorizedError(
        `User does not exist with username: ${username}`
      );
    }

    // verify password
    const valid = await bcrypt.compare(password, credential.password);

    if (!valid) {
      throw new UnAuthorizedError(`Invalid password: ${password}`);
    }

    // generate jwt
    const token = this.jwtService.signJWT({
      credentialId: credential.id,
      role: credential.role,
    });

    return { token };
  }
}
