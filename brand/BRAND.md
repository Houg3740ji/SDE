# BRAND KIT — Scuffers®

## Assets Disponibles en /brand/

```
/brand/
  logo.png          ← logo principal fondo transparente (alta res)
  logo-alt.webp     ← variación de logo (media res)
  prendas/          ← fotografías de producto en alta resolución
```

---

## Identidad Visual

### Colores Oficiales

| Nombre | HEX | RGB | HSL | CMYK | Uso |
|--------|-----|-----|-----|------|-----|
| Sea Green | `#2B7551` | 43, 117, 81 | 151°, 46%, 31% | 63, 0, 31, 54 | Color de marca principal, acentos |
| White | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | 0, 0, 0, 0 | Fondos, texto sobre oscuro |
| Cod Gray | `#111111` | 17, 17, 17 | 0°, 0%, 7% | 0, 0, 0, 93 | Texto principal, fondos oscuros |

**Regla de uso:**
- Fondo negro `#111111` + texto blanco `#FFFFFF` = combinación principal
- Sea Green `#2B7551` para acentos, CTAs, highlights
- Nunca usar colores brillantes o saturados fuera de esta paleta

### CSS Variables (para desarrollo web)
```css
:root {
  --color-primary: #2B7551;      /* Sea Green */
  --color-background: #111111;   /* Cod Gray */
  --color-surface: #1A1A1A;      /* Ligeramente más claro para cards */
  --color-text: #FFFFFF;         /* White */
  --color-text-muted: #888888;   /* Gris para texto secundario */
  --color-border: #2A2A2A;       /* Bordes sutiles */
}
```

### Logos

**Logo principal:** `brand/logo.png`
- Fondo transparente
- Usar sobre fondos oscuros (#111111) o claros (#FFFFFF)
- Nunca distorsionar ni rotar

**Logo alternativo:** `brand/logo-alt.webp`
- Variación de la marca
- Usar cuando el contexto lo requiera

**Logos online (CDN oficial):**
- Logo negro SVG: `https://scuffers.com/cdn/shop/files/logo_negro.svg`
- Logo blanco PNG: `https://scuffers.com/cdn/shop/files/Logo_Scuffers_Blanco_500x.png`
- Logo principal PNG: `https://scuffers.com/cdn/shop/files/Recurso_7_f65fa80e-d5c4-460d-b1cd-0b77f8919cd5_500x.png`
- Logo cuadrado: `https://scuffers.com/cdn/shop/files/RRSS_LOGO_Mesa_de_trabajo_1_500x500.png`

### Tipografía

La web de Scuffers usa tipografía sans-serif limpia, capitalizada en muchos elementos. Estilo visual minimalista y contundente.

**Para interfaces y documentos generados:**
```css
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
font-weight: 400 (body), 600 (subtítulos), 700 (títulos);
letter-spacing: 0.05em a 0.15em (mayúsculas);
text-transform: uppercase; /* para títulos y navegación */
```

**Convenciones tipográficas de la marca:**
- Títulos y navegación en MAYÚSCULAS
- Mensajes de marca en mayúsculas sostenidas (estilo manifiesto)
- Texto de producto en case normal
- Sin serif en ningún contexto de marca

---

## Identidad Verbal

### Taglines Oficiales
- **Principal:** *"Everyday Urban Aesthetics"*
- **Firma:** *"As Always, With Love"*
- **Registro:** `® EVERYDAY URBAN AESTHETICS`
- **Comunidad:** "FF Fam" (Scuffers Family)

### Manifiesto (texto oficial de la página About)
> "SE CREA UNA MARCA DE MODA PARA QUE UNA 'TRIBU' DE PERSONAS LA USE, PERO NUESTRA CONCEPCIÓN DE MARCA ES NO BORRAR LA PERSONALIDAD.
>
> NO PRETENDEMOS DECIR 'USA ESTO PARA ESTAR EN EL CLUB'. SI MIRAMOS A LAS PERSONAS QUE NOS RODEAN, SCUFFERS NO VIENE CON REQUISITOS PREVIOS PARA USAR LA ROPA.
>
> SE TRATA MÁS DE UN PROCESO CONSTANTE DE REFINAMIENTO MUTUO, MADURACIÓN E IR EVOLUCIONANDO JUNTO AL PRODUCTO Y LENGUAJE VISUAL DE LA MARCA."

### Tono de Voz

**Lo que ES Scuffers:**
- Directo, sin rodeos, sin artificio
- Cálido pero no empalagoso ("With Love" es genuino, no corporativo)
- Aspiracional sin ser elitista
- Maduro, reflexivo, consciente de sí mismo
- Urbano, internacional, con alma española
- Comunidad antes que producto

**Lo que NO ES Scuffers:**
- No habla de "exclusividad" ni de "ser del club"
- No usa jerga de moda de lujo
- No es hype vacío
- No explica demasiado — la estética habla sola
- No es agresivo ni imperativo en sus CTAs

### Fórmulas de Comunicación
- Emails: cercanos, firma "As Always, With Love — Scuffers"
- Soporte: empático, resolutivo, sin protocolo corporativo
- Redes: contenido visual antes que copy extenso
- Respuestas a reseñas: reconocer, agradecer, resolver — nunca defensivo

---

## Catálogo de Producto (Referencia)

### Categorías Principales
- **Sudaderas** (hoodies, crewnecks, zip hoodies) — producto estrella, precio ~79€
- **Jerseys / Knitwear**
- **Camisetas** (manga corta, manga larga, tirantes)
- **Pantalones** (joggers, tech pants, denim)
- **Abrigos y Chaquetas** (outerwear)
- **Calzado propio:** línea "Iconic" (Suede Boots, Radiant Sneakers, Suede Sneakers, Camo, Braided, Mule)
- **Accesorios:** gorras, gorros, bolsos, bandanas, cinturones, joyería, calcetines
- **Línea Mujer:** colección separada (@scuffers.her)
- **FF Merch:** merchandise de la comunidad

### Precio Medio
- Sudaderas: ~79€
- Rango general: 40€ - 80€
- Calzado: precio superior

### Naming de Producto
Los productos tienen nombres propios (Raw Hoodie, Club Zipper, Shell Sweatpants, Sign T-Shirt, Ving Longsleeve, Cake Jacket, Lizzie Hoodie, Safari Hoodie). El naming es informal, evocador, no descriptivo.

---

## Plataformas Digitales

| Canal | Handle/URL | Referencia |
|-------|-----------|------------|
| Web | scuffers.com | Shopify |
| Instagram hombre | @scuffers.co | 1M seguidores |
| Instagram mujer | @scuffers.her | — |
| TikTok | @scuffers.co | — |
| YouTube | @scuffers | — |
| Soporte | help@scuffers.com | — |
| Devoluciones | returns.scuffers.com | — |
| Empleo | scuffers.teamtailor.com | — |

---

## Entidad Legal

- **Razón social:** Scuffers S.L.
- **Sede:** Madrid, España
- **Copyright:** © Scuffers S.L. 2024

---

## Reglas de Implementación para IA y Automatizaciones

Cuando Claude o Claude Code genere cualquier output en nombre de Scuffers:

1. **Tono:** directo, cálido, sin corporativismo. Firma siempre con "As Always, With Love" en comunicaciones al cliente.
2. **Colores:** usar paleta oficial. Fondo oscuro (#111111) como default en interfaces.
3. **Tipografía:** sans-serif, mayúsculas para títulos y navegación.
4. **Copy:** nunca hablar de exclusividad ni requisitos para pertenecer. La marca es de todos los que quieran.
5. **Respuestas de soporte:** empáticas, resolutivas, alineadas con el tono de marca — nunca robóticas.
6. **Escalado:** cualquier comunicación sobre devoluciones, quejas graves o crisis reputacional requiere revisión humana antes de enviar.
