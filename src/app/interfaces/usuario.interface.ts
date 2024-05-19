export interface Usuario {
    id?:               string;
    nombres:          string;
    apelllidos:       string;
    email:            string;
    num_telefono:     string;
    contrasena:       string;
    genero:           string;
    foto?:            string;
    activo?:           string;
    fecha_nacimiento: string;
    id_rol:           string;
    id_tipo_doc:      string;
}
