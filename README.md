# Rijo

Aplicación de lista de tareas creada con Ionic y Angular. Permite registrar tareas con descripción y prioridad, marcarlas como completadas y eliminarlas. Las tareas se guardan en el almacenamiento local del navegador (`localStorage`).

## Requisitos

- Node.js y npm.
- Ionic CLI.

Si todavía no tienes Ionic CLI instalado, instálalo una sola vez:

```bash
npm install -g @ionic/cli
```

## Instalar y ejecutar

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/Deuli809/Rijo-Ionic-Angular-.git
cd Rijo-Ionic-Angular-
```

Instala las dependencias indicadas en `package-lock.json`:

```bash
npm ci
```

Inicia el servidor de desarrollo:

```bash
ionic serve
```

Ionic mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

## Datos locales

Las tareas se almacenan en `localStorage` del navegador. Por eso permanecen al recargar la aplicación en el mismo navegador y dispositivo.
