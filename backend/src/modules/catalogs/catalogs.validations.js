import { HttpError } from "../../utils/httpError.js"

const MAX_NAME_LEN = 200

export function parseIdParam(raw) {
	const id = Number(raw)
	if (!Number.isInteger(id) || id < 1) {
		throw new HttpError(400, "Identificador inválido")
	}
	return id
}

export function validateCatalogName(body) {
	const name = typeof body?.name === "string" ? body.name.trim() : ""
	if (!name) {
		throw new HttpError(400, "El nombre es obligatorio")
	}
	if (name.length > MAX_NAME_LEN) {
		throw new HttpError(400, `El nombre no puede superar ${MAX_NAME_LEN} caracteres`)
	}
	return name
}
