# SafeStays Landing Page

Landing page pública de SafeStays. Muestra contenido dinámico desde Supabase.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📋 Características

- ✅ Hero section
- ✅ Sección de características
- ✅ **Contenido dinámico desde Supabase**
- ✅ Responsive design
- ✅ Sin autenticación requerida (público)

## 🔧 Configuración

Las credenciales de Supabase ya están configuradas en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
```

## 📦 Estructura

```
landing/
├── app/
│   └── page.tsx              # Página principal
├── components/
│   └── landing/
│       ├── Hero.tsx          # Sección hero
│       ├── Features.tsx      # Características
│       └── ContentSection.tsx # Contenido dinámico
└── lib/
    └── supabase/
        └── client.ts         # Cliente Supabase
```

## 🌐 Despliegue

```bash
vercel
```

Recuerda agregar las variables de entorno en Vercel.

## 📝 Notas

- El contenido se gestiona desde el **Dashboard** (proyecto separado)
- Lee datos de la tabla `content` en Supabase
- No requiere autenticación