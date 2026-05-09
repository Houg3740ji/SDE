# Automatizaciones con IA — Knowledge Base

## Qué es una Automatización con IA

Una automatización tradicional ejecuta reglas fijas: si X ocurre → ejecutar Y.
Una automatización con IA añade una capa de razonamiento entre el trigger y la acción: clasifica, genera texto, predice, decide o extrae información antes de actuar.

**Fórmula base:** `Trigger → Datos de contexto → Modelo IA → Acción → (Supervisión humana)`

---

## Componentes de Cualquier Automatización

### 1. Trigger
Lo que inicia el flujo. Tipos:
- **Webhook:** evento en tiempo real enviado por una app externa (nuevo pedido, mensaje recibido, pago procesado)
- **Schedule:** ejecución periódica (cada hora, cada día, cada lunes a las 9h)
- **Formulario / entrada de usuario:** respuesta a un formulario, mensaje en chat
- **Email entrante:** nuevo email en una bandeja específica
- **Condición en base de datos:** cuando un registro cumple ciertos criterios
- **Evento en red social:** mención, comentario, nuevo seguidor

### 2. Contexto e Inputs
Datos que el modelo necesita para razonar bien:
- Historial del cliente (pedidos anteriores, tickets pasados, segmento)
- Base de conocimiento de la empresa (FAQs, políticas, catálogo)
- Datos del evento que disparó el trigger
- Conversación previa (para agentes con memoria)
- Datos externos (clima, tendencias, stock en tiempo real)

### 3. Modelo IA
Lo que hace el razonamiento:
- **LLM (Large Language Model):** clasificar intención, generar texto, resumir, decidir, extraer entidades
- **Modelo de embeddings:** búsqueda semántica, encontrar documentos similares, clustering
- **Clasificador:** categorizar en clases predefinidas (urgente/no urgente, positivo/negativo)
- **Modelo de visión:** analizar imágenes de producto, detectar defectos, leer documentos
- **Modelo predictivo:** predecir demanda, probabilidad de churn, lifetime value

### 4. Acción
Lo que ejecuta tras el razonamiento:
- Enviar email, SMS o notificación push
- Responder en chat o DM
- Crear o actualizar registro en CRM
- Abrir ticket de soporte
- Generar documento o etiqueta
- Actualizar stock o inventario
- Publicar en redes sociales (con aprobación)
- Alertar al equipo interno

### 5. Supervisión Humana
Toda automatización bien diseñada tiene un punto de escalado.
- Definir un **umbral de confianza**: si el modelo no está seguro (ej. <85%), escala a humano
- El humano revisa, aprueba o corrige — no ejecuta desde cero
- Logging de todas las decisiones automatizadas para auditoría

---

## Patrones de Automatización Aplicados a Ecommerce de Moda

### Atención al Cliente Inteligente
- **Problema:** volumen de tickets inmanejable, respuestas lentas
- **Flujo:** mensaje del cliente → clasificación de intención → extracción de entidades (nº pedido, producto, talla) → búsqueda en base de conocimiento → generación de respuesta → respuesta automática si confianza alta / escalado si no
- **KPIs:** % tickets resueltos sin humano, tiempo medio de primera respuesta, CSAT

### Gestión de Devoluciones y Cambios de Talla
- **Problema:** proceso manual, lento, genera frustración
- **Flujo:** solicitud de devolución → IA detecta motivo (talla/defecto/arrepentimiento) → si talla: genera etiqueta automáticamente + registra talla deseada → si defecto: abre incidencia interna + prioridad alta → si patrón de talla repetido: alerta a equipo de producto
- **KPIs:** tiempo medio de resolución, % devoluciones por motivo, alertas de patrón generadas

### Respuesta a Reseñas y Comentarios Negativos
- **Problema:** reputación online desatendida, respuestas tardías o genéricas
- **Flujo:** nueva reseña negativa detectada → análisis de sentiment y gravedad → generación de respuesta empática alineada con tono de marca → cola de aprobación humana → publicación tras aprobación
- **Regla fija:** nunca publicación automática en canal público sin aprobación humana
- **KPIs:** tiempo de respuesta a reseñas, evolución de puntuación media, % reseñas respondidas

### Email Marketing Personalizado Post-Compra
- **Problema:** comunicaciones genéricas, baja retención
- **Flujo:** pedido completado → segmentación IA (primera compra / recurrente / VIP / internacional) → generación de secuencia de emails personalizada por segmento → envío optimizado por timing (hora de apertura histórica del cliente)
- **KPIs:** open rate, CTR, conversión segunda compra, tiempo entre primera y segunda compra

### Scoring y Priorización de Influencers
- **Problema:** miles de perfiles, selección manual e intuitiva
- **Flujo:** scraping de menciones + datos de seguidores → embeddings de cada perfil → clustering por nicho y audiencia real → correlación con datos de ventas por región → ranking con puntuación y justificación
- **Output:** top 20-50 perfiles rankeados con ficha: score, región de impacto, coste por alcance estimado, por qué encaja con la marca
- **KPIs:** ROI por influencer activado vs baseline, conversión atribuida

### Predicción de Demanda y Alertas de Stock
- **Problema:** stockouts en drops, exceso de inventario en productos lentos
- **Flujo:** datos históricos de ventas + calendario de lanzamientos + señales sociales (menciones, búsquedas) → modelo predictivo por SKU → alerta si stock proyectado < umbral → sugerencia de reposición con cantidad y timing
- **KPIs:** stockouts evitados, reducción de exceso de inventario, precisión de predicción

### Monitorización de Marca y UGC en Tiempo Real
- **Problema:** menciones valiosas perdidas, crisis detectadas tarde
- **Flujo:** escucha activa en Instagram, TikTok, X → clasificación de menciones (UGC positivo / queja / crisis potencial / neutral) → si crisis: alerta inmediata al equipo → si UGC positivo: cola para repostear / contactar al creador
- **KPIs:** tiempo de detección de crisis, volumen de UGC identificado y activado, alcance generado por UGC

### Agente de Onboarding para Nuevos Clientes
- **Problema:** primera compra sin seguimiento, baja retención
- **Flujo:** primera compra completada → secuencia de 7 días: bienvenida + guía de cuidado de prendas + productos complementarios + invitación a comunidad + contenido de marca
- **Personalización:** idioma del cliente, producto comprado, región
- **KPIs:** retención a 30 días, segunda compra dentro de 60 días, tasa de apertura de secuencia

### Gestión de Picos de Demanda (Drop de Colección)
- **Problema:** x5-x10 de volumen de soporte en lanzamientos, equipo colapsado
- **Flujo pre-drop:** email/SMS proactivo con guía de tallas a todos los compradores de la colección antes de que escriban (reduce 20-30% de tickets potenciales)
- **Flujo durante drop:** clasificación en tiempo real → tickets de talla a flujo automatizado → tickets de pago/fraude/daño a cola humana prioritaria
- **KPIs:** % reducción de tickets en primeras 6h vs drop anterior, tiempo de resolución en pico

---

## Conceptos Técnicos Clave

### RAG (Retrieval Augmented Generation)
El modelo consulta una base de conocimiento vectorial antes de generar la respuesta. Permite que la IA use información actualizada y específica de la empresa sin necesidad de reentrenar el modelo. Ideal para chatbots de soporte que necesitan conocer políticas, catálogo y FAQs actualizadas.

### Embeddings y Vector Store
Representación numérica de texto en un espacio vectorial. Permite búsqueda semántica: encontrar documentos relevantes aunque no usen las mismas palabras exactas. "¿Cómo cambio mi talla?" encuentra la respuesta sobre devoluciones aunque no coincida literalmente. Herramientas: Pinecone, Weaviate, Supabase pgvector, Chroma.

### Webhook
Notificación HTTP en tiempo real que una app envía a otra cuando ocurre un evento. Shopify lanza un webhook cuando hay un nuevo pedido; el sistema receptor lo procesa inmediatamente. Base de la mayoría de automatizaciones en tiempo real.

### Agente IA
Un LLM que no solo responde texto sino que decide qué herramientas usar, las ejecuta en secuencia y razona sobre los resultados hasta completar un objetivo. Puede buscar en una base de datos, enviar un email y actualizar un CRM en una sola ejecución autónoma.

### Confidence Score / Umbral de Confianza
Métrica interna del modelo que indica su grado de certeza. Fundamental para decidir cuándo actuar automáticamente y cuándo escalar a humano. Ejemplo: si confianza en clasificación de intención >85% → respuesta automática; si no → cola de revisión humana.

### Prompt Engineering
Diseño de instrucciones para que el LLM produzca exactamente el output deseado. Componentes:
- **System prompt:** define el rol, restricciones y tono del modelo
- **Few-shot examples:** ejemplos de input/output para guiar el comportamiento
- **Chain of thought:** instrucción para que el modelo razone paso a paso antes de responder
- **Output format:** definir estructura del output (JSON, markdown, texto plano)

### Fine-tuning
Ajuste de un modelo base con datos propios para que adopte el tono, vocabulario y conocimiento específico de la empresa. Más costoso que RAG pero produce respuestas más coherentes con la identidad de marca. Útil cuando el tono es muy específico y RAG no es suficiente.

### Clasificación de Intención (Intent Classification)
Identificar qué quiere conseguir el usuario con su mensaje. Clases típicas en ecommerce: consulta de pedido, cambio de talla, devolución, queja, pregunta de producto, problema de pago, otro. Base de cualquier sistema de routing de soporte.

### Extracción de Entidades (NER - Named Entity Recognition)
Identificar y extraer información estructurada de texto no estructurado. Ejemplos: número de pedido, nombre de producto, talla mencionada, fecha, dirección. Convierte mensajes en lenguaje natural en datos accionables.

---

## Framework para Diseñar una Automatización

Ante cualquier problema de negocio, seguir este orden:

1. **¿Qué problema de negocio resuelve?** Coste operativo, velocidad, escala, experiencia de cliente
2. **¿Cuál es el trigger?** Qué evento lo activa y en qué sistema ocurre
3. **¿Qué datos necesita el modelo?** De dónde vienen, en qué formato
4. **¿Qué hace exactamente la IA?** Clasificar / generar / predecir / extraer / decidir
5. **¿Qué acción ejecuta?** En qué sistema, con qué datos
6. **¿Cuándo escala a humano?** Umbral de confianza, tipos de casos excepcionales
7. **¿Qué KPI mide su éxito a 14 días?** Una métrica concreta y medible

---

## Lo que NO Automatizar con IA

- Quejas con carga emocional alta o daño a la persona → requieren empatía humana real
- Decisiones con consecuencias legales o financieras significativas → supervisión humana obligatoria
- Publicación automática en canales públicos sin revisión → riesgo reputacional
- Comunicaciones en momentos de crisis de marca → el humano debe liderar
- Interacciones donde el cliente ha escalado ya con un humano → no devolver a bot

---

## Métricas Clave para Evaluar Automatizaciones en Ecommerce

| Área | KPI Principal | KPI Secundario |
|------|--------------|----------------|
| Soporte | % tickets resueltos sin humano | Tiempo medio de primera respuesta |
| Devoluciones | Tiempo medio de resolución | % devoluciones por talla vs defecto |
| Email marketing | Conversión segunda compra | Open rate de secuencias automáticas |
| Influencers | ROI atribuido por influencer | Coste por alcance real |
| Stock | Stockouts evitados | Precisión de predicción de demanda |
| Reseñas | Tiempo de respuesta | Evolución de puntuación media |
| Retención | Retención a 30 días | Tiempo entre primera y segunda compra |
