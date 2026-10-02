# Juliana — Portafolio 3D

Landing page en React + Vite, con el avatar 3D interactivo (mirada que sigue
al cursor) hecho con react-three-fiber, y acentos decorativos 3D en cada
sección.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Estructura

```
src/
  components/
    Navbar.jsx        nav fijo con blur
    Hero.jsx           sección 1: avatar 3D + copy
    Avatar3D.jsx        carga tu avatar.glb, aplica materiales y el "look at"
    FloatingShapes.jsx  formas decorativas reutilizables (placeholder)
    About.jsx           sección about con acentos flotantes
    Projects.jsx         grid de proyectos con tilt 3D al hover
    Contact.jsx           formulario + acentos flotantes
  data/
    projects.js          tus proyectos: edítalo con tus datos reales
public/
  models/
    avatar.glb           tu avatar exportado desde Spline
```

## Reemplazar los placeholders por tus propios objetos 3D

`FloatingShapes.jsx` usa formas geométricas simples (esfera, cubo, toro)
como stand-in del corazón / flor / moño / estrella. Cuando modeles esos
objetos en Spline y los exportes como .glb (formato "Default Color (Grey)",
gratis, sin marca de agua):

1. Copia el .glb a `public/models/` (ej: `heart.glb`)
2. En el componente de la sección, carga el modelo con `useGLTF('/models/heart.glb')`
3. Reemplaza el `<Shape />` correspondiente por `<primitive object={scene} />`
   dentro del mismo `<group>` que ya tiene la animación de flotación

## Ajustar el "look at" del avatar

En `Avatar3D.jsx`, las constantes `maxYaw` y `maxPitch` controlan cuánto
gira la cabeza. Si quieres que el cuerpo (`Body`) también gire más o menos,
ajusta el multiplicador `* 0.3` en el bloque de `bodyRef`.

## Colores

Todos los tokens de color están en `src/index.css` (`:root`). Cambia
`--burgundy`, `--cream`, `--clay`, etc. ahí y se propaga a todo el sitio.

## Proyectos

Edita `src/data/projects.js` con tus clientes reales y las rutas a tus
imágenes (colócalas en `public/projects/`).

## Formulario de contacto

El formulario en `Contact.jsx` está listo mín. Conéctalo a un servicio
como Formspree, Resend o tu propio backend en el `handleSubmit`.
