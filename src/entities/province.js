// La entidad representa la estructura de una Provincia.
// Es como decir "una Provincia tiene estos campos, con estos tipos de datos".
// Cuando traemos datos de la base, los guardamos en un objeto de esta clase.

class Province {
    constructor(id, name, full_name, latitude, longitude, display_order) {
        this.id            = id;             // número entero, clave primaria
        this.name          = name;           // texto corto, ej: "Chaco"
        this.full_name     = full_name;      // texto largo, ej: "Provincia del Chaco"
        this.latitude      = latitude;       // número decimal
        this.longitude     = longitude;      // número decimal
        this.display_order = display_order;  // número entero, para ordenar la lista
    }
}

export default Province;