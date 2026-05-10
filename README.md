# Scuffers OPS Brain

Panel de operaciones en tiempo real para el equipo de Scuffers. Centraliza alertas, tickets, stock, pedidos y comunicaciones en una sola interfaz.

**Acceso:** [spd-houg.vercel.app](https://spd-houg.vercel.app)

---

## Qué incluye

- **Alertas en tiempo real** — stock crítico, pedidos en revisión, incidencias de pago
- **Gestión de tickets** — cola de atención al cliente con resolución asistida por IA y supervisión humana
- **Panel de stock** — inventario en vivo con umbrales de alerta configurables
- **Pedidos Shopify** — estado de pedidos, pagos pendientes y clientes VIP
- **War Room IA** — asistente interno para decisiones operativas rápidas
- **Historial de decisiones** — log de todas las acciones tomadas por el equipo
- **Configuración de integraciones** — Shopify, Gmail, Instagram y Slack desde un solo panel

## Acceso

| Usuario | Rol | Acceso |
|---------|-----|--------|
| `admin` | Administrador | Completo |
| `empleado` | Empleado | Operaciones (sin configuración ni herramientas avanzadas) |

## Stack

- Frontend: HTML/CSS/JS vanilla desplegado en Vercel
- Base de datos: Supabase (PostgreSQL + Realtime)
- Integraciones: Shopify API, Gmail API, Instagram Graph API, Slack Webhooks, Groq AI
