# Grupo SolarSur Web

Web corporativa en Next.js para Grupo SolarSur.

## Desarrollo

```bash
npm run dev
```

La web se abre en `http://localhost:3000`.

## Variables de entorno

Parte de la web necesita variables en `.env.local`. Tienes la plantilla en `.env.example`.

Variables principales:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_API_KEY=your_google_api_key

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=usuario@example.com
SMTP_PASS=replace_with_real_password
SMTP_FROM=Grupo Solarsur <no-reply@gruposolarsur.com>
CONTACT_TO_EMAIL=calidad@gruposolarsur.com
WORK_WITH_US_TO_EMAIL=rrhh@gruposolarsur.com
```

## reCAPTCHA

El checkbox de Google reCAPTCHA v2 ya está integrado en:

- Formulario de contacto / estudio
- Formulario de trabaja con nosotros
- Formulario de comentarios del blog

Archivos clave:

- `src/components/security/RecaptchaCheckbox.tsx`
- `src/lib/recaptcha.js`
- `src/app/api/contact-request/route.js`
- `src/app/api/work-with-us/route.js`
- `src/app/api/blog-comments/route.ts`

### Para activarlo en local

1. Copia `.env.example` a `.env.local`.
2. Añade `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
3. Añade `RECAPTCHA_SECRET_KEY`.
4. Reinicia `npm run dev`.

### Para activarlo en Vercel

Añade esas mismas variables en `Project Settings > Environment Variables` y vuelve a desplegar.

### Nota importante

Sin esas claves, el widget no se activa de verdad. En desarrollo local el backend permite continuar sin secreto para no bloquear pruebas, pero en producción necesitas las claves reales del dominio.
