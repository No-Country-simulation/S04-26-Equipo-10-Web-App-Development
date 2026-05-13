import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export class AuthService {
	constructor(AuthRepository) {
		this.AuthRepository = AuthRepository
	}

	async validateUser(name, lastname, password) {
		const user = await this.AuthRepository.findUser(name, lastname)
		if (!user) {
			throw new Error("Usuario no encontrado")
		}

		const isValid = await bcrypt.compare(password, user.password)

		if (!isValid) {
			throw new Error("Credenciales inválidas")
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
