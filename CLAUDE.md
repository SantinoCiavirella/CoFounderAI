# CLAUDE.md — CoFounder · Landing + demo (v1.0)

## 1\. Qué es este proyecto y cómo trabajar

CoFounder es un **directorio virtual de tres socios con IA (CFO, CMO y COO)** para dueños de pymes argentinas. Anticipa problemas de caja y le dice al dueño qué hacer cada día.

Esta tarea es **solo la Fase 1**: una landing estática en `cofounder.com.ar` más una **página secundaria de demo simulada (fake door)**. La aplicación real con IA es otro proyecto, posterior.

**Cómo trabajar con Santi (el usuario):**

* Santi **no programa**. Explicá en lenguaje simple, sin jerga, con pasos concretos (por ejemplo: "abrí este archivo en el navegador para verlo").
* Hablale en español rioplatense (voseo). Los comentarios del código también van en español.
* **Antes de escribir código**, leé este archivo, la carpeta `referencias/` y `assets/`, y proponé un plan corto (estructura de archivos y secciones). Esperá su OK.
* Si algo no está definido acá, **preguntá** en vez de inventar. Una pregunta por vez.
* Trabajá en una rama propia (`landing-v1`). No hagas push a `main` sin avisar: el repo (`github.com/felipemateu/cofounder`) lo comparte con Felipe, su cofundador.
* Commits chicos y con mensajes claros, en español.

## 2\. Contexto del negocio (resumen)

* **Tagline:** "Tu socio virtual."
* **Para quién:** dueños de pymes de 1 a 30 empleados en Argentina, que deciden solos y sin datos ordenados. Las más chicas (micro, 1 a 9 empleados) son las que más necesidad muestran.
* **Qué resolvemos:** decisiones de finanzas, ventas y operaciones tomadas a solas, en un contexto que cambia todos los meses.
* **Qué gana la pyme:** menos sorpresas de caja, mejores decisiones y menos tiempo perdido.
* **Los tres socios:**

  * **Tu CFO** — finanzas: caja, costos y precios. Anticipa faltantes y propone qué hacer.
  * **Tu CMO** — marketing: clientes, ventas y canales. Ayuda a decidir dónde y cómo vender.
  * **Tu COO** — operaciones: stock, proveedores y procesos. Ordena el día a día.
* **Lo que aprendimos de las entrevistas (para orientar el mensaje, NO para publicarlo):** lo que más valoran es **saber qué hacer cada día para mejorar el negocio**; lo que más les duele es **conseguir clientes** y **saber qué productos u ofertas funcionan**. El copy de la landing y de la demo tiene que apuntar a esos dos puntos.
* **Datos con fuente que SÍ se pueden usar en la landing** (siempre mostrando la fuente):

  * "Unas 25.000 empresas cerraron en Argentina desde diciembre de 2023." Fuente: IPA, vía Perfil (junio 2026).
  * "El 97% de los fracasos de pymes se atribuye a mala gestión." Fuente: AADPyME.

## 3\. Alcance

**Entra:**

1. `index.html` — landing principal.
2. `demo.html` — demo simulada del panel con los tres socios, accesible desde la landing.
3. Formulario de contacto / lista de espera / beta testers, conectado a Google Sheets.
4. Guía de deploy en AWS (`DEPLOY.md`).

**No entra (no lo hagas):**

* Nada de IA real, Amazon Bedrock, backend propio, base de datos ni login.
* Nada de pagos ni de simular un cobro.
* No publicar precios en la landing (la prueba de precios es un experimento aparte).
* No publicar resultados de entrevistas ni hipótesis internas del negocio.

## 4\. Reglas innegociables

1. **Honestidad del fake door.** El producto está en desarrollo. La demo debe decir de forma visible y permanente que es una **vista previa con datos de ejemplo**, y las respuestas llevan la etiqueta "Respuesta de ejemplo". Nunca simular que funciona con datos reales ni prometer algo que el producto todavía no hace. Cuando alguien hace clic en "Quiero mi diagnóstico", la página tiene que aclarar que estamos desarrollando CoFounder y ofrecer sumarse a la lista de espera.
2. **Sin nombres propios para los socios.** El manual de marca los nombra Marco, Sofía y Diego, pero en la landing y en la demo se llaman **"tu CFO", "tu CMO" y "tu COO"**: cada pyme les va a poner su propio nombre más adelante. Si el manual y este archivo se contradicen en esto, gana este archivo.
3. **El diseño sale de las referencias de Santi** (carpeta `referencias/`: imágenes hechas en Canva y el manual de identidad visual en PDF). Este archivo define contenido, estructura y reglas; para estética, las referencias mandan.
4. **Cero credenciales en el repo.** No pidas ni guardes claves de AWS, ni tokens. Cualquier acción en AWS (crear recursos, tocar DNS) se la explicás a Santi y esperás su confirmación antes de ejecutarla.

## 5\. Stack técnico

* **HTML5, CSS y JavaScript puro.** Sin frameworks, sin build, sin librerías JS externas. Se permiten Google Fonts.
* Mobile-first: probar desde 375 px de ancho. Buena parte del público entra desde el celular.
* Estructura de archivos sugerida (ajustala en el plan si hace falta):

```
/
├── CLAUDE.md
├── index.html
├── demo.html
├── css/styles.css
├── js/main.js        # comportamiento de la landing y del formulario
├── js/demo.js        # lógica de la demo (preguntas y respuestas precargadas)
├── js/config.js      # constantes editables: URL del formulario, link a Vercel
├── assets/           # logos, isotipo, íconos, imágenes
├── referencias/      # imágenes de Canva y manual de marca (solo para consulta)
└── DEPLOY.md
```

## 6\. Marca (resumen; el PDF de identidad visual es la fuente completa)

**Voz:** cercanos (hablamos de vos, palabras de todos los días), claros (sin jerga), concretos (cada mensaje termina en algo que el dueño puede hacer hoy), honestos (decimos qué es estimación y qué es dato).

* Así sí: "Con tus ventas de septiembre, en tres semanas la caja podría quedar corta. Te propongo dos opciones."
* Así no: "¡Optimizá tu flujo de fondos con IA de última generación!", "Predicciones 100% precisas", "Sincronizá tus KPIs en tiempo real".

**Colores (definirlos como variables CSS):**

|Nombre|Hex|Uso|
|-|-|-|
|Tinta|`#0F2524`|Texto y fondos oscuros|
|Hueso|`#F5F2EA`|Fondo principal|
|Verde Caja|`#187A60`|Color de marca y botones|
|Verde Brote|`#5FD3A8`|Acento sobre Tinta|
|Grafito / Niebla / Línea / Blanco|`#3D4F4E` / `#8A9896` / `#DCD8CE` / `#FFFFFF`|Neutros|

Proporción de uso: Hueso 60 %, Tinta 25 %, Verde Caja 10 %, Verde Brote 5 %. Los estados (Saludable `#187A60`, Atención `#D98E1F` con texto `#9A5F0A`, Riesgo `#E0582B` con texto `#B23A17`) **siempre llevan ícono y texto**, nunca solo color. Niebla y los colores de estado claros nunca van en texto chico.

**Tipografías (gratuitas, Google Fonts):** Bricolage Grotesque 600/700 para títulos y logo; Instrument Sans 400/500/600 para textos e interfaz; IBM Plex Mono 400/500 para números y datos. Siempre con `font-display: swap` y una fuente de respaldo.

**Logo:**

* Tamaño mínimo: logo 120 px en pantalla; isotipo 16 px. Área de resguardo: como mínimo un diámetro del disco (d) alrededor.
* Nunca rotar, deformar, cambiar colores, invertir anillo y disco, agregar sombras o degradés, ni usarlo sobre fondos sin contraste.
* Cada socio se reconoce por el color de su disco; el anillo no cambia. El **nombre/rol siempre va visible** junto al avatar: el color nunca identifica solo.
* **Ojo con los archivos:** los logos de `assets/` están guardados como `.png` pero son **JPEG con fondo blanco**. Sobre el fondo Hueso se va a ver una caja blanca. Opciones: usarlos solo sobre secciones blancas, o reconstruir el logo en SVG con la geometría del manual (dos círculos de diámetro d, centros a 0,6 d, anillo de 0,2 d de grosor, siempre a la izquierda y por encima del disco). Consultale a Santi antes de elegir; lo ideal es pedirle los SVG o PNG transparentes.

**Íconos:** línea de 2 px, puntas redondeadas, grilla de 24 px, un solo color por ícono (Tinta o el color del socio). Hacerlos como SVG inline.

**Fotografía:** pymes argentinas reales, dueños trabajando, luz natural, tonos cálidos. **No** usar fotos de stock posadas, robots, cerebros digitales ni oficinas corporativas. Usá solo las imágenes que Santi ponga en `assets/` o `referencias/`; no descargues ni enlaces fotos externas.

**Elemento gráfico:** el símbolo en gran escala, recortado por el borde y con poca opacidad, sirve de fondo en el hero; siempre del lado opuesto al texto.

## 7\. `index.html` — Landing

Secciones, en este orden:

1. **Hero.** Tagline "Tu socio virtual." y una bajada corta: un directorio de finanzas, marketing y operaciones que anticipa problemas de caja y te dice qué hacer. Botón principal **"Probar la demo"** (lleva a `demo.html`) y botón secundario **"Quiero mi diagnóstico"** (lleva al formulario). El titular debe ser fácil de cambiar: más adelante se va a testear con otro slogan ("Resolvé como corpo" vs. "Tu socio digital IA"). No armes el A/B ahora.
2. **El problema.** Dos o tres líneas sobre decidir solo y sin datos, más los datos con fuente de la sección 2.
3. **Cómo funciona / Tu directorio.** Tres tarjetas: tu CFO, tu CMO, tu COO, cada una con su ícono, su color y una frase concreta de lo que hace. Una línea que resalte lo más valorado: **"Cada día, qué hacer para mejorar tu negocio."**
4. **Demo.** Tarjeta con botón "Probar la demo" (`demo.html`) y, al lado, un link secundario a la **demo en Vercel** (la URL va en `js/config.js`; si no está, dejá un placeholder visible solo para Santi y avisale). Aclarar que ambas son vistas previas.
5. **Formulario** (id `contacto`). Texto de apertura: "Estamos desarrollando CoFounder. Dejá tus datos y te avisamos cuando puedas probarlo." Campos:

   * Nombre (obligatorio)
   * Email (obligatorio)
   * WhatsApp (opcional)
   * Nombre del negocio
   * Rubro (lista desplegable con rubros comunes y "Otro")
   * Cantidad de empleados: "Solo yo", "2 a 9", "10 a 30", "Más de 30"
   * Checkbox "Quiero ser beta tester"
   * Checkbox de consentimiento (obligatorio): "Acepto que usen mis datos para contactarme sobre CoFounder", con link a una política de privacidad (dejar la página como placeholder para que Santi y Felipe la completen; ver Ley 25.326 de protección de datos personales).
   * Campo oculto `origen` (`landing` o `demo`) y un campo trampa anti-spam (honeypot).
   * Estados claros: enviando, enviado con éxito (mensaje cálido, sin prometer fechas) y error (con opción de reintentar). Validar en el navegador antes de enviar.
6. **Footer.** Logo, tagline, dominio `cofounder.com.ar` y contacto de los cofundadores (Felipe Mateu Alvarez: fmateualvarez@gmail.com; Santino Ciavirella: ciavirellasantino@gmail.com). Confirmá con Santi si ese contacto se publica.

## 8\. `demo.html` — Demo simulada (fake door)

**Qué es:** una pantalla que imita el panel con los tres socios. El usuario toca preguntas predefinidas y aparece una respuesta ya escrita, con un pequeño efecto de "escribiendo" (corto y respetando `prefers-reduced-motion`). Sin backend, sin IA, sin llamadas a ninguna API. Todo el contenido vive en un único objeto en `js/demo.js`, así Santi puede editar textos sin tocar la lógica.

**Estructura:**

* Barra o pestañas para elegir socio (tu CFO / tu CMO / tu COO), cada uno con su color, ícono y nombre/rol siempre visibles.
* Dos preguntas por socio, como botones grandes y fáciles de tocar en el celular (mínimo 44 px de alto).
* Zona de respuesta con la etiqueta **"Respuesta de ejemplo"** y, arriba de todo, un aviso permanente: **"Vista previa con datos de ejemplo. CoFounder está en desarrollo."**
* Al final de cada respuesta, un botón **"Sumate a la lista de espera"** que lleva al formulario (`index.html#contacto`, con `origen=demo`).
* Botón para volver a la landing.
* Un campo de texto de "Escribí tu consulta…" solo si está **deshabilitado y explicado** ("Próximamente"); no debe parecer que funciona.

**Negocio de ejemplo (mostrarlo como etiqueta fija):** "Tienda de ropa con local y venta por Instagram. Datos ilustrativos."

**Contenido borrador (Santi lo va a ajustar; respetá la voz de marca: concreto, simple, termina en algo para hacer hoy, y deja claro qué es estimación):**

**Tu CFO**

* *Pregunta:* "¿Voy a llegar bien a fin de mes?"
*Respuesta (estado Atención, con ícono y texto):* "Con las ventas de septiembre de este negocio de ejemplo, en tres semanas la caja podría quedar corta. Es una estimación: si cargás octubre, se ajusta. Te propongo dos opciones: 1) Adelantar el cobro a clientes que te deben. 2) Pasar un pago a proveedores a 30 días."
* *Pregunta:* "¿Cuánto me conviene cobrar mi producto más vendido?"
*Respuesta:* "En este ejemplo, el costo de la remera pasó de $8.000 a $9.200 y el precio sigue en $15.000: tu margen bajó de 47 % a 39 %. Para volver a un margen cercano al de antes (44 %), el precio rondaría los $16.500. Es una estimación con datos de ejemplo. Hoy podés probar el nuevo precio con una tanda chica."

**Tu CMO**

* *Pregunta:* "¿Qué oferta me conviene hacer esta semana?"
*Respuesta:* "Los jueves y viernes se vende menos y tenés stock parado de la colección anterior. Una opción: un 2x1 en esa colección solo esos dos días, avisado por WhatsApp a quienes ya te compraron. Movés stock sin bajarle el precio a todo. Después medí cuántos de los que recibieron el mensaje compraron."
* *Pregunta:* "¿Qué publicación me conviene hacer para conseguir clientes?"
*Respuesta:* "Una opción para probar: hoy, un video corto de 15 segundos mostrando la prenda por la que más te preguntan, con el precio y 'escribime por WhatsApp' al final. Mañana, una historia con las tres preguntas más frecuentes. Contá cuántos mensajes te llegan por cada publicación y repetí la que mejor funcione."

**Tu COO**

* *Pregunta:* "¿Qué hago hoy para mejorar mi negocio?"
*Respuesta:* "Tu plan de hoy, en unos 90 minutos: 1) Llamá a los tres clientes que más te deben: ahí está tu caja de esta semana. 2) Reponé los talles M y L de lo más vendido: te alcanzan para 4 días. 3) Publicá el video que armó tu CMO. Marcalas cuando termines."
* *Pregunta:* "¿Qué se me puede escapar esta semana?"
*Respuesta:* "Tu proveedor principal tarda 10 días en entregar y el talle M te alcanza para 6. Conviene pedir hoy y no el viernes. Te dejamos el pedido armado para que lo revises y lo mandes vos."

El plan del día del COO es lo más valorado en las entrevistas: dale visibilidad (por ejemplo, que esa pregunta aparezca primero o resaltada).

## 9\. Formulario → Google Sheets

Santi ya tiene una hoja de Google Sheets que recibe las respuestas. **No sabemos todavía cómo está conectada** (Google Forms o Apps Script). Preguntale: (a) la URL de envío, y (b) si es Google Forms, los identificadores de cada campo. Guardá todo en `js/config.js` como constantes con comentarios claros, y dejá el formulario funcionando con un modo de prueba que no envíe nada hasta que esté configurado. No inventes endpoints.

## 10\. Hosting en AWS (guía para `DEPLOY.md`)

Escribí `DEPLOY.md` en lenguaje simple, paso a paso y con capturas de lo que Santi tiene que ver en cada pantalla. La arquitectura prevista:

* **Amazon S3** (bucket privado) con los archivos estáticos.
* **Amazon CloudFront** delante, con acceso privado al bucket (OAC), HTTPS y redirección de `www` al dominio raíz.
* **Certificado en AWS Certificate Manager**, que para CloudFront tiene que crearse en la región **us-east-1**.
* **Amazon Route 53** para el DNS. El dominio `cofounder.com.ar` está registrado en NIC Argentina: hay que **delegar los servidores de nombres** a los que indique Route 53.
* Usar enlaces relativos a `demo.html` (con CloudFront delante de S3, `/demo` sin extensión no resuelve solo).
* Incluir cómo actualizar el sitio (subir archivos e invalidar la caché de CloudFront).
* Recordale a Santi los costos posibles y que confirme cada paso antes de ejecutarlo.

## 11\. Calidad mínima

* Accesible: `lang="es-AR"`, contraste suficiente, foco visible, textos alternativos, formularios con etiquetas, no depender solo del color.
* Liviana: imágenes optimizadas, sin librerías innecesarias.
* Metadatos: título, descripción y etiquetas Open Graph con una imagen de marca; favicon con el isotipo.
* Probada en 375 px, 768 px y escritorio.

## 12\. Pendientes que completa Santi

* \[ ] URL de la demo en Vercel.
* \[ ] Endpoint del formulario / Google Sheets.
* \[ ] Revisión del contenido de la demo (sección 8).
* \[ ] Imágenes ilustrativas y referencias de Canva en `referencias/`.
* \[ ] Logos en SVG o PNG transparente.
* \[ ] Texto de la política de privacidad.

## 13\. Definición de "terminado"

* `index.html` y `demo.html` funcionan abriéndolos en el navegador, también en el celular.
* La demo deja claro, en todo momento, que es una simulación con datos de ejemplo.
* Ningún texto usa nombres propios para los socios ni muestra precios.
* El formulario valida, tiene estados de éxito y error, y está listo para conectarse a Google Sheets.
* `DEPLOY.md` está listo y Santi lo puede seguir sin conocimientos técnicos.

