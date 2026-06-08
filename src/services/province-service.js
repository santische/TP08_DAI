import ProvinceRepository from "../repositories/province-repository.js";

export default class ProvinceService {

    repository = new ProvinceRepository();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    createAsync = async (province) => {
    return await this.repository.createAsync(province);
}
}