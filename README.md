# 🧠 Scuffers OPS Brain

> Panel de operaciones en tiempo real para el equipo de Scuffers. Todo lo que necesitas para gestionar el negocio, en una sola pantalla.

<div align="center">

[![Live](https://img.shields.io/badge/🌐_Acceso_Live-spd--houg.vercel.app-059669?style=for-the-badge)](https://spd-houg.vercel.app)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://spd-houg.vercel.app)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## ✨ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🔔 **Alertas en tiempo real** | Stock crítico, pedidos en revisión, incidencias de pago — actualizadas al instante |
| 🎫 **Gestión de tickets** | Cola de atención al cliente con resolución asistida por IA y supervisión humana |
| 📦 **Panel de stock** | Inventario en vivo con umbrales de alerta configurables por SKU |
| 🛍️ **Pedidos Shopify** | Estado de pedidos, pagos pendientes, devoluciones y clientes VIP |
| ⚔️ **War Room IA** | Asistente interno para decisiones operativas rápidas basado en el contexto real del negocio |
| 📋 **Historial de decisiones** | Log completo de todas las acciones tomadas por el equipo |
| ⚙️ **Configuración** | Gestión de integraciones — Shopify, Gmail, Instagram y Slack desde un solo lugar |
| 📱 **Mobile ready** | Interfaz adaptada para móvil con navegación por pestañas (Alertas, Tickets, Stock) |

---

## 🔐 Acceso

Accede en **[spd-houg.vercel.app](https://spd-houg.vercel.app)**

| 👤 Usuario | 🎭 Rol | 🔓 Permisos |
|-----------|--------|------------|
| `admin` | Administrador | Acceso completo a todos los módulos |
| `empleado` | Empleado | Operaciones (sin Configuración, Explorador de datos ni Slack) |

---

## 🛠️ Stack tecnológico

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Shopify](https://img.shields.io/badge/Shopify-96BF48?style=flat-square&logo=shopify&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white)

</div>

| Capa | Tecnología |
|------|-----------|
| 🎨 **Frontend** | HTML / CSS / JavaScript vanilla |
| ☁️ **Hosting** | Vercel (auto-deploy desde `main`) |
| 🗄️ **Base de datos** | Supabase — PostgreSQL + Realtime subscriptions |
| 🛍️ **E-commerce** | Shopify API — pedidos, productos, inventario |
| 📧 **Email** | Gmail API — bandeja de entrada integrada |
| 📸 **Social** | Instagram Graph API |
| 💬 **Mensajería** | Slack Webhooks |
| 🤖 **IA** | Groq API (LLaMA) — War Room y resolución de tickets |

---

## 📁 Estructura del proyecto

```
SDE/
├── index.html              # App principal (toda la UI)
├── api/
│   ├── shopify.js          # Proxy Shopify API
│   ├── groq.js             # Proxy Groq AI
│   ├── email.js            # Proxy Gmail
│   └── instagram.js        # Proxy Instagram
└── .github/
    └── workflows/
        └── electron-build.yml
```

---

<div align="center">

Made with ❤️ for **Scuffers** · [spd-houg.vercel.app](https://spd-houg.vercel.app)

</div>
