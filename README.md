# WBMOSINT 2.0

Herramienta OSINT profesional que utiliza la API de Wayback Machine para buscar usuarios y todas sus páginas indexadas.

## Características

- 🔍 Búsqueda automática de usuarios por @username
- 📚 Integración directa con la API de Wayback Machine
- 🌐 Visualización de todas las páginas indexadas
- 🔎 Búsqueda por palabras clave
- 📱 Interfaz responsive y moderna
- ⚡ Desplegable en Vercel sin configuración adicional

## Stack Tecnológico

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **API**: Wayback Machine API + Next.js API Routes
- **Hosting**: Vercel

## Instalación Local

```bash
git clone https://github.com/valenzuelaprivateservices-dotcom/WBMOSINT2.0.git
cd WBMOSINT2.0
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel automáticamente detectará que es un proyecto Next.js
3. Click en Deploy

[Deploy con Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Uso

1. Ingresa un @username en la barra de búsqueda
2. (Opcional) Agrega palabras clave para filtrar resultados
3. Presiona Enter o haz click en Buscar
4. Visualiza todas las páginas indexadas en Wayback Machine para ese usuario

## API Endpoints

### POST /api/search
```json
{
  "username": "ejemplo",
  "keywords": "palabra1,palabra2"
}
```

Retorna un array con todas las URLs indexadas en Wayback Machine.

## Licencia

MIT