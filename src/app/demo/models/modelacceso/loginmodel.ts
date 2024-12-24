export class UsuarioInicioSesion {
    usua_Id?: number;
    emop_Id?: number;
    usua_EsOptante?: boolean;
    opta_OptanteAceptado?: boolean;
    modu_Id?: number;
    modu_DescripcionModulo?: string;
    role_Id?: number;
    usua_Usuario?: string;
    usua_Administrador?: boolean;
    usua_UsuarioCreacion?: number;
    usuaCreacion?: string;
    usua_FechaCreacion?: string;
    usua_UsuarioModificacion?: number;
    usuaModificacion?: string;
    usua_FechaModificacion?: string;
    usua_Estado?: boolean;
  
    // Información del Optante
    opta_Id?: number;
    opta_Nombres?: string;
    opta_Apellidos?: string;
    opta_DNI?: string;
    opta_CorreoElectronico?: string;
    opta_Telefono1?: string;
    opta_Estado?: boolean;
  
    // Información del Empleado (en caso de no ser optante)
    empl_Id?: number;
    empl_Nombres?: string;
    empl_Apellidos?: string;
    empl_DNI?: string;
    empl_Correo?: string;
    empl_Telefono?: string;
    empl_Estado?: boolean;
  
    // Información de Módulos
    // modu_DescripcionModulo?: string;
    modu_Titulo?: string;
    modu_Categoria?: string;
    modu_Subcategoria?: string | null;
    modu_UrlModulo?: string;
    modu_Estado?: boolean;
  }

  export interface UsuarioRestablecer {
    usuaId: number;
    usuaUsuario: string;
    usuaEsOptante: boolean;
    relacionadoId: number;
    nombre: string;
    correo: string;
  }
  

  
  