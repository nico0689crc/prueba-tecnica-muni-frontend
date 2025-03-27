# Sistema de Gestión de Tareas con Usuarios Múltiples

## Descripción del Proyecto

El objetivo de este proyecto es desarrollar un sistema de gestión de tareas que permita a los usuarios crear, editar, listar y eliminar tareas. Cada tarea contará con un estado (pendiente, en progreso, completada) y una prioridad (baja, media, alta). Además, las tareas podrán ser asignadas a múltiples usuarios, fomentando la colaboración. El sistema incluirá roles de usuario para gestionar permisos:

- **Administrador**: Puede gestionar todas las tareas y asignar múltiples usuarios a una tarea.
- **Usuario estándar**: Solo puede ver y editar las tareas en las que está asignado.

## Requisitos Funcionales

1. **Asignación múltiple de usuarios**: Cada tarea puede estar vinculada a uno o más usuarios. Por ejemplo, una tarea de "Preparar reporte" puede ser asignada tanto a Juan como a María.
2. **Visualización de tareas compartidas**: Los usuarios deben poder ver las tareas en las que están involucrados, junto con los nombres de los demás usuarios asignados.
3. **Gestión por administrador**: Los administradores pueden agregar o eliminar usuarios de una tarea en cualquier momento.
4. **Seguimiento de tareas**: Una tarea solo puede marcarse como completada cuando todos los usuarios asignados hayan confirmado que han finalizado su parte.

## Tecnologías Utilizadas
- **Frontend**: ReactJs(Vite), Material UI.

## Instalación
1. Clona este repositorio en tu máquina local:
  ```bash
  git clone https://github.com/nico0689crc/prueba-tecnica-muni-frontend
  ```
4. Instala las dependencias de React:
  - Abre una terminal en el directorio del proyecto.
  - Ejecuta el siguiente comando para instalar las dependencias:
    ```bash
    npm install
    ```
  - Copia el archivo `.env.example` y renómbralo como `.env`

  - Inicia el servidor de desarrollo de Laravel:
    - Ejecuta el siguiente comando para iniciar el servidor:
      ```bash
      npm run dev
      ```
    - Accede al sistema desde tu navegador en `http://localhost:3000`.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
