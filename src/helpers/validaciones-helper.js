// Este archivo contiene las reglas de negocio para validar una Provincia.
// El service lo llama ANTES de insertar o actualizar en la base de datos.
// Si algo no cumple las reglas, lanzamos un Error con un mensaje claro.
// Ese error lo atrapa el controller y lo devuelve como 400 Bad Request.

class ValidacionesHelper {

    // Valida los campos de una provincia.
    // Recibe el objeto provincia que llegó en el body del request.
    // Si algo está mal, lanza un Error. Si todo está bien, no hace nada.
    validateProvince(province) {

        // ── name ──────────────────────────────────────────────
        // Verificamos que el campo exista y no sea solo espacios en blanco
        if (!province.name || province.name.trim() === "") {
            throw new Error("El nombre de la provincia no puede estar vacío.");
        }

        // trim() saca los espacios del principio y el final antes de medir
        if (province.name.trim().length < 3) {
            throw new Error("El nombre de la provincia debe tener al menos 3 letras.");
        }

        // ── full_name ─────────────────────────────────────────
        if (!province.full_name || province.full_name.trim() === "") {
            throw new Error("El nombre completo de la provincia no puede estar vacío.");
        }

        if (province.full_name.trim().length < 3) {
            throw new Error("El nombre completo debe tener al menos 3 letras.");
        }

        // ── latitude ──────────────────────────────────────────
        // Verificamos que exista y que sea un número
        if (province.latitude === undefined || province.latitude === null) {
            throw new Error("La latitud es obligatoria.");
        }

        if (isNaN(province.latitude)) {
            throw new Error("La latitud debe ser un número.");
        }

        // ── longitude ─────────────────────────────────────────
        if (province.longitude === undefined || province.longitude === null) {
            throw new Error("La longitud es obligatoria.");
        }

        if (isNaN(province.longitude)) {
            throw new Error("La longitud debe ser un número.");
        }
    }
}

// Exportamos una instancia única (no la clase).
// Así en todos lados hacemos import validator from "..." y usamos el mismo objeto,
// sin necesidad de hacer "new ValidacionesHelper()" cada vez.
export default new ValidacionesHelper();