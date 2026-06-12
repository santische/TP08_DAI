import ProvinceRepository from "../repositories/province-repository.js";
import ValidacionesHelper from "../helpers/validaciones-helper.js";

// El service es el intermediario entre el controller y el repository.
// Su responsabilidad es aplicar la lógica de negocio ANTES de tocar la base de datos.
// El controller no sabe nada de validaciones, y el repository no sabe nada de reglas.
// Todo eso vive acá.

export default class ProvinceService {

    repository = new ProvinceRepository();
    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }


    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }


    createAsync = async (province) => {
        ValidacionesHelper.validateProvince(province);

        return await this.repository.createAsync(province);
    }

   
    // Devuelve null si el id no existe (el controller maneja el 404).
    updateAsync = async (province) => {
        // Igual que en create, validamos primero
        ValidacionesHelper.validateProvince(province);

        return await this.repository.updateAsync(province);
    }

  
    // Devuelve null si el id no existe (el controller maneja el 404).
 
    deleteAsync = async (id) => {
        return await this.repository.deleteAsync(id);
    }
}