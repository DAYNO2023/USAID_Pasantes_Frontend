import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  menuModel: any[] = [];

  ngOnInit() {
    this.generarMenuDinamico();
  }

  generarMenuDinamico() {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      console.error('No se encontraron datos de usuario en sessionStorage.');
      return;
    }

    const parsedData = JSON.parse(userData);
    const modulos = parsedData.modulos;

    // Mapeo de iconos para los módulos y categorías
    // si el modulo tiene mas de dos palabras utilizar comillas simples
    const iconMap: { [key: string]: string } = {
      Principal: 'pi pi-home',
      Documentos: 'pi pi-file',
      Espera: 'pi pi-clock',
      'No Aceptado': 'pi pi-ban',
      'Hoja de Tiempo': 'pi pi-calendar',
      Usuarios: 'pi pi-user',
      Roles: 'pi pi-key',
      Encuestas: 'pi pi-chart-bar',
      Foros: 'pi pi-comments',
      Notificaciones: 'pi pi-bell',
      'Preguntas Frecuentes': 'pi pi-question-circle',
      Acceso: 'pi pi-unlock',
      Comunicación: 'pi pi-envelope',
      Mantenimiento: 'pi pi-cog',
      Gestión: 'pi pi-briefcase',
      Estadísticas: 'pi pi-chart-line',
    };

    // Función para obtener el icono basado en el nombre
    const getIcon = (nombre: string | null) =>
      nombre && iconMap[nombre] ? iconMap[nombre] : 'pi pi-folder';

    // Módulos sin título (independientes)
    const modulosIndependientes = modulos.filter(
      (modulo: any) => !modulo.modu_Titulo
    );

    // Crear elementos independientes con el mismo estilo que las categorías
    const elementosIndependientes = modulosIndependientes.map((modulo: any) => ({
      label: modulo.modu_DescripcionModulo,
      icon: getIcon(modulo.modu_DescripcionModulo),
      routerLink: [modulo.modu_UrlModulo],
    }));

    // Agrupar por títulos principales
    const titulos = Array.from(
      new Set(modulos.map((modulo: any) => modulo.modu_Titulo))
    ).filter((titulo): titulo is string => titulo !== null);

    const menuConTitulos = titulos.map((titulo) => {
      // Categorías por título
      const categorias = Array.from(
        new Set(
          modulos
            .filter((modulo: any) => modulo.modu_Titulo === titulo)
            .map((modulo: any) => modulo.modu_Categoria || modulo.modu_Subcategoria)
        )
      ).filter((categoria): categoria is string => categoria !== null);

      const categoriaItems: any[] = [];

      categorias.forEach((categoria) => {
        // Filtrar módulos por categoría
        const modulosCategoria = modulos.filter(
          (modulo: any) =>
            modulo.modu_Titulo === titulo &&
            (modulo.modu_Categoria === categoria ||
              (!modulo.modu_Categoria && modulo.modu_Subcategoria === categoria))
        );

        if (modulosCategoria.length === 1) {
          // Si solo hay un módulo, mostrarlo como un único ítem
          categoriaItems.push({
            label: modulosCategoria[0].modu_DescripcionModulo,
            icon: getIcon(modulosCategoria[0].modu_DescripcionModulo),
            routerLink: [modulosCategoria[0].modu_UrlModulo],
          });
        } else {
          // Mostrar como categoría desplegable
          categoriaItems.push({
            label: categoria,
            icon: getIcon(categoria), // Icono de la categoría
            items: modulosCategoria.map((modulo: any) => ({
              label: modulo.modu_DescripcionModulo,
              icon: getIcon(modulo.modu_DescripcionModulo),
              routerLink: [modulo.modu_UrlModulo],
            })),
          });
        }
      });

      return {
        label: titulo,
        icon: getIcon(titulo), // Icono del título principal
        items: categoriaItems,
      };
    });

    // Combinar módulos independientes y menú con títulos
    this.menuModel = [
      {
        label: '',
        items: elementosIndependientes,
      },
      ...menuConTitulos,
    ];
  }
}
