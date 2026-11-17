

// se manda al back
export interface ChatRequest {
    conversacionId: number | null;
    mensaje: string;
};

/// lo que se recibe del back
export interface ChatResponse{
    conversacionId: number,
    mensaje:string,
};

// lo que renderiza el front en la pantalla
export interface MensajeUI{
    id:string,
    rol: "user"| "assitant";
    texto:string;
    timestamp:number,
};