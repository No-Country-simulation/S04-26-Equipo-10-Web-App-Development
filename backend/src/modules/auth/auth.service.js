import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NotFoundError, UnauthorizedError } from "../../errors/errors.js"

export class AuthService {
	constructor(AuthRepository) {
		this.AuthRepository = AuthRepository
	}

	async validateUser(name, lastname, password) {
		const user = await this.AuthRepository.findUser(name, lastname)
		if (!user) {
			throw new NotFoundError("User not found")
		}

		const isValid = await bcrypt.compare(password, user.password)

		if (!isValid) {
			throw new UnauthorizedError("Invalid credentials")
		}

		return user
	}
	createToken(user) {
		const token = jwt.sign(
			{ user_id: user.id, role_id: user.role_id, area_id: user.area_id },
			process.env.JWT_SECRET,
			{ expiresIn: "8h" },
		)
		return token
	}
}
