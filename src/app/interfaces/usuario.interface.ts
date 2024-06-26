export interface Usuario {
    id?:               string;
    nombres:          string;
    apellidos:       string;
    email:            string;
    num_telefono:     string;
    num_documento:     string;
    contrasena:       string;
    genero:           string;
    foto?:            string;
    activo?:           string;
    fecha_nacimiento: string;
    id_rol:           string;
    id_tipo_doc:      string;
}
