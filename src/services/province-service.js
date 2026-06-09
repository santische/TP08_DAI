import ProvinceRepository from "../repositories/province-repository.js";
import ValidacionesHelper from "../helpers/validaciones-helper.js";

// El service es el intermediario entre el controller y el repository.
// Su responsabilidad es aplicar la lógica de negocio ANTES de tocar la base de datos.
// El controller no sabe nada de validaciones, y el repository no sabe nada de reglas.
// Todo eso vive acá.

export default class ProvinceService {

    repository = new ProvinceRepository();

    // ─────────────────────────────────────────────
    // Trae todas las provincias.
    // No necesita validar nada, solo delega al repository.
    // ─────────────────────────────────────────────
    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    // ─────────────────────────────────────────────
    // Trae una provincia por id.
    // Devuelve null si no existe (el controller maneja el 404).
    // ─────────────────────────────────────────────
    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    // ─────────────────────────────────────────────
    // Crea una nueva provincia.
    // Primero valida, después inserta.
    // Si la validación falla, lanza un Error que llega al controller como 400.
    // ─────────────────────────────────────────────
    createAsync = async (province) => {
        // Validamos ANTES de ir a la base de datos.
        // Si algo está mal, validateProvince lanza un Error y cortamos acá.
        // Ese error sube al controller sin pasar por el repository.
        ValidacionesHelper.validateProvince(province);

        return await this.repository.createAsync(province);
    }

    // ─────────────────────────────────────────────
    // Actualiza una provincia existente.
    // También valida antes de actualizar.
    // Devuelve null si el id no existe (el controller maneja el 404).
    // ─────────────────────────────────────────────
    updateAsync = async (province) => {
        // Igual que en create, validamos primero
        ValidacionesHelper.validateProvince(province);

        return await this.repository.updateAsync(province);
    }

    // ─────────────────────────────────────────────
    // Elimina una provincia por id.
    // No necesita validar nada, solo le pasa el id al repository.
    // Devuelve null si el id no existe (el controller maneja el 404).
    // ─────────────────────────────────────────────
    deleteAsync = async (id) => {
        return await this.repository.deleteAsync(id);
    }
}