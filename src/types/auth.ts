export interface Usuario {
    id: number,
    email: string,
    nombre: string | null,
}

export interface RespuestaLogin {
    token:string,
    usuario:Usuario
}

