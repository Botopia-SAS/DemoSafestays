# Configuración de Google Sheets para SafeStays

Este documento explica cómo configurar la integración con Google Sheets para mostrar las propiedades disponibles en la página web.

## 1. Configuración del Google Sheet

### Estructura de Columnas Esperada

Tu Google Sheet debe tener las siguientes columnas (basado en el PDF de diseño):

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Código | Disponible | Location | Date | Month | Price | Beds | Baths | Utilities | Street | Brochure | Video | WhatsApp Message |

**Importante:** La columna B (segunda columna) debe contener "Yes" o "No" para indicar si la propiedad está disponible. Solo las propiedades con "Yes" se mostrarán en la web.

### Ejemplo de Datos

```
ST_MAL_321 | Yes | Malasaña | Ago | 6 | €1,400 | 1 | 1 | Var | calle del Acuerdo | https://... | https://... | ...
MTH_CEN_328 | No | Centro | Dec | 1 | €1,500 | 1 | 1 | Fijo | C. del Marques 23 | https://... | https://... | ...
GMR_MON_334 | Yes | Gaztambide | Ago | 6 | €1,700 | 1 | 1 | Var | Calle de Martin de los Heros | https://... | https://... | ...
```

## 2. Configurar el Service Account

### Paso 1: Obtener el ID de tu Google Sheet

1. Abre tu Google Sheet en el navegador
2. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```

### Paso 2: Compartir el Sheet con el Service Account

1. En tu Google Sheet, haz clic en "Compartir"
2. Añade el siguiente email con permisos de **Viewer**:
   ```
   safestays-dashboard-sync@atomic-474616.iam.gserviceaccount.com
   ```

### Paso 3: Configurar el ID del Sheet en el proyecto

Abre el archivo `.env` y agrega el ID de tu Google Sheet:

```env
GOOGLE_SHEET_ID="tu-spreadsheet-id-aqui"
```

## 3. Estructura del Código

### API Route: `/app/api/properties/route.ts`

Este endpoint:
1. Lee los datos del Google Sheet configurado
2. Filtra solo las filas donde la columna B (Disponible) es "Yes"
3. Devuelve los datos en formato JSON

**Endpoint:** `GET /api/properties`

**Respuesta:**
```json
{
  "properties": [
    {
      "code": "ST_MAL_321",
      "Location": "Malasaña",
      "Date": "Ago",
      "Month": "6",
      "Price": "€1,400",
      "Beds": "1",
      "Baths": "1",
      "Utilities": "Var",
      "Street": "calle del Acuerdo",
      "Brochure": "https://...",
      "Video": "https://...",
      "WhatsApp Message": "..."
    }
  ],
  "count": 1
}
```

### Componente: `PropertiesFromSheets`

Este componente:
1. Llama al API endpoint `/api/properties`
2. Muestra las propiedades disponibles con:
   - Código de la propiedad (esquina superior derecha)
   - Fecha de disponibilidad
   - Ubicación
   - Precio
   - Número de habitaciones y baños
   - Enlaces a brochure y video (se muestran al hacer hover)

### Servicio de Google Sheets: `lib/googleSheets.ts`

Contiene funciones reutilizables para:
- `getGoogleSheetsClient()` - Autenticar con Google Sheets API
- `readSheetData()` - Leer datos de cualquier hoja
- `sheetDataToObjects()` - Convertir filas a objetos JavaScript

## 4. Probar la Integración

### Paso 1: Reiniciar el Servidor de Desarrollo

```bash
npm run dev
```

### Paso 2: Verificar en el Navegador

1. Abre `http://localhost:3000`
2. Deberías ver la sección "Propiedades Disponibles"
3. Solo se mostrarán las propiedades con "Yes" en la columna B

### Paso 3: Verificar en la Consola del Navegador

Abre las DevTools (F12) y verifica:
- No debe haber errores de red en la pestaña "Network"
- En la pestaña "Console", deberías ver:
  ```
  Properties loaded from Google Sheets: { properties: [...], count: X }
  ```

## 5. Solución de Problemas

### Error: "Google Sheet ID not configured"

**Solución:** Asegúrate de que `GOOGLE_SHEET_ID` está configurado en el archivo `.env`

### Error: "Failed to fetch properties"

**Posibles causas:**
1. El Sheet no está compartido con el service account
2. El ID del Sheet es incorrecto
3. Las credenciales de Google no están configuradas correctamente

**Solución:**
- Verifica que compartiste el sheet con: `safestays-dashboard-sync@atomic-474616.iam.gserviceaccount.com`
- Verifica el ID del sheet en el `.env`

### No se muestran propiedades

**Posibles causas:**
1. No hay filas con "Yes" en la columna B
2. El nombre de la hoja es diferente a "Sheet1"

**Solución:**
- Verifica que hay filas con "Yes" (case-insensitive)
- Si tu hoja tiene otro nombre, actualiza `app/api/properties/route.ts` línea 28:
  ```typescript
  sheetName: 'TU_NOMBRE_DE_HOJA', // Cambia esto
  ```

## 6. Actualizar los Datos

Los datos se cargan cada vez que se visita la página. Para forzar una actualización:
1. Actualiza el Google Sheet
2. Recarga la página en el navegador (F5)

**Nota:** Los datos se obtienen en tiempo real desde Google Sheets, por lo que cualquier cambio en el sheet se reflejará inmediatamente al recargar la página.

## 7. Nombres de Columnas Personalizados

Si tus columnas tienen nombres diferentes, actualiza el componente `PropertiesFromSheets.tsx` con los nombres exactos de tus columnas.

Por ejemplo, si tu columna de precio se llama "Precio" en lugar de "Price", actualiza todas las referencias:

```typescript
{property.Precio} // en lugar de {property.Price}
```

## 8. Seguridad

- Las credenciales del Service Account están en el archivo `.env`
- Este archivo ya está en `.gitignore` y NO se subirá a Git
- Nunca compartas tu archivo `.env` públicamente
- El Service Account solo tiene permisos de **lectura** (readonly)

## 9. Próximos Pasos (Según el PDF)

Esta implementación cubre:
- ✅ Lectura de datos desde Google Sheets
- ✅ Filtrado de propiedades disponibles (columna B = "Yes")
- ✅ Visualización en la web similar a safe-stays.com
- ✅ Mostrar fecha de disponibilidad

Pendientes (según el PDF):
- ⏳ Sistema de autenticación con roles (Admin y Contact Center)
- ⏳ Mapa interactivo con ubicaciones aproximadas
- ⏳ Filtros por zonas
- ⏳ Métricas de clicks y visitas
- ⏳ Sistema de favoritos
- ⏳ Dashboard de administración
- ⏳ Generación de brochure sin logo
