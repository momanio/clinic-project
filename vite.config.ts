import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { clinic } from './src/data/clinic.ts'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="${clinic.brand.primary}"/><g fill="#faf8f2"><path d="M32 9c-13 0-13 15 0 23 13-8 13-23 0-23Z"/><path d="M55 32c0-13-15-13-23 0 8 13 23 13 23 0Z" opacity=".7"/><path d="M32 55c13 0 13-15 0-23-13 8-13 23 0 23Z"/><path d="M9 32c0 13 15 13 23 0-8-13-23-13-23 0Z" opacity=".7"/></g></svg>`

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'clinic-metadata',
      transformIndexHtml(html) {
        return html
          .replaceAll(
            '__CLINIC_TITLE__',
            escapeHtml(`${clinic.name.ar} | ${clinic.tagline.ar}`),
          )
          .replaceAll('__CLINIC_DESCRIPTION__', escapeHtml(clinic.about.ar))
          .replaceAll('__CLINIC_PRIMARY__', escapeHtml(clinic.brand.primary))
          .replaceAll(
            '__CLINIC_FAVICON__',
            escapeHtml(`data:image/svg+xml,${encodeURIComponent(favicon)}`),
          )
      },
    },
  ],
})
