
class ValidacionesHelper {

    
    validateProvince(province) {

    
        if (!province.name || province.name.trim() === "") {
            throw new Error("El nombre de la provincia no puede estar vacío.");
        }

        // trim() saca los espacios del principio y el final antes de medir
        if (province.name.trim().length < 3) {
            throw new Error("El nombre de la provincia debe tener al menos 3 letras.");
        }

        if (!province.full_name || province.full_name.trim() === "") {
            throw new Error("El nombre completo de la provincia no puede estar vacío.");
        }

        if (province.full_name.trim().length < 3) {
            throw new Error("El nombre completo debe tener al menos 3 letras.");
        }

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


export default new ValidacionesHelper();