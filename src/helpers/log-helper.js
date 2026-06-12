import fs from "fs";


// LogHelper se encarga de registrar errores en dos lugares posibles:
//   1. Un archivo de texto en disco (para revisar después)
//   2. La consola (para ver en tiempo real mientras desarrollás)
//

class LogHelper {

    constructor() {
       
        this.filePath            = process.env.LOG_FILE_PATH;            // carpeta donde se guarda el archivo
        this.fileName            = process.env.LOG_FILE_NAME;            // nombre del archivo
        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED    === "true"; // convierte "true"/"false" a booleano
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED === "true";
    }
    
    // Se llama desde los catch del repository:
    logError = (errorObject) => {

        // Armamos el texto que vamos a guardar/mostrar.
        // new Date().toISOString() da algo como "2024-05-02T12:34:54.007Z"
        // errorObject.message es el mensaje del error  ej: "relation does not exist"
        // errorObject.stack    es el stack trace completo con las líneas de código
        const timestamp = new Date().toISOString();
        const logText   = `${timestamp}: error - ${errorObject.message}\nStack Trace:\n${errorObject.stack}\n\n`;

        // ── Guardar en archivo ────────────────────
        if (this.logToFileEnabled) {
            try {
                // Verificamos que las variables del .env estén definidas
                if (!this.filePath || !this.fileName) {
                    console.error("LogHelper: LOG_FILE_PATH o LOG_FILE_NAME no están definidos en el .env");
                    return;
                }

                // fs.mkdirSync crea la carpeta si no existe.
                // { recursive: true } evita error si la carpeta ya existe.
                fs.mkdirSync(this.filePath, { recursive: true });

                // Armamos la ruta completa: "D:/temp/logs/" + "archivo.log"
                const fullPath = this.filePath + this.fileName;

                // appendFileSync agrega texto AL FINAL del archivo sin borrar lo anterior.
                // Si el archivo no existe, lo crea automáticamente.
                // "utf8" es la codificación del texto.
                fs.appendFileSync(fullPath, logText, "utf8");

            } catch (fileError) {
                // Si falla el log a archivo, al menos avisamos por consola
                console.error("LogHelper: no se pudo escribir en el archivo:", fileError.message);
            }
        }

        // ── Mostrar en consola ────────────────────
        if (this.logToConsoleEnabled) {
            // console.error muestra en rojo en la terminal, diferenciándolo de console.log
            console.error(logText);
        }
    }
}

// Exportamos UNA SOLA instancia de la clase, no la clase en sí.
// Así todos los archivos que hagan import comparten el mismo objeto,
// sin necesidad de hacer "new LogHelper()" cada vez que lo usen.
export default new LogHelper();