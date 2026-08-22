# Contexto del proyecto

Resumen para retomar el trabajo en una conversación nueva. Pégalo en un chat de
claude.ai y tendrás el contexto sin arrastrar el historial completo.

---

## Qué es este repositorio

`catdom/claude_repo_projects` — **privado**. Una sola rama: `main`.

Contiene dos cosas:

1. **Un portfolio personal en Astro 5**, estático y sin peticiones a terceros.
   Todo el contenido es de relleno; se personaliza editando un único fichero,
   `src/lib/profile.ts` (busca `⚑` para ver qué falta). Fuentes autoalojadas en
   `.woff2` — no usa Google Fonts, y es deliberado.
2. **La configuración de Claude Code**: tres skills propias y dos plugins de
   diseño. Documentado en `.claude/README.md`.

## Sistema visual del portfolio

Neutros cálidos con acento ámbar `#e8552a`, tipografías Bricolage Grotesque
(display) + Inter (texto) + JetBrains Mono, escala tipográfica fluida con
`clamp()`. Los tokens viven en `src/styles/tokens.css`.

**Decisión tomada:** se mantiene este sistema. La recomendación automática de
`ui-ux-pro-max` (monocromo frío + acento azul, fuentes de Google) se descartó
por dos motivos: es el aspecto genérico contra el que avisa `frontend-design`,
y las fuentes de Google romperían el objetivo de cero peticiones externas.

Ya verificado en el código: `prefers-reduced-motion` respetado, estados de foco
visibles, sin emojis como iconos. Pendiente de medir con contenido real:
contraste, áreas táctiles de 44 px y comportamiento responsive.

## Skills y plugins instalados

Locales, en `.claude/skills/`: `hello-skill` (explica el mecanismo),
`explain-changes`, `commit`.

Plugins declarados en `.claude/settings.json`, se instalan al arrancar la sesión:

| Plugin | Origen |
|---|---|
| `frontend-design` | `anthropics/claude-code` |
| `ui-ux-pro-max` | `nextlevelbuilder/ui-ux-pro-max-skill` (aporta 7 skills) |

Se cargan **solo al arrancar** la sesión. Una sesión abierta antes de que
existieran no los verá nunca, por mucho que se reinicie dentro de ella.

## Cómo se trabaja aquí

- **Todo va por GitHub.** Las conversaciones están aisladas entre sí: cada una
  tiene su propio contenedor y no comparten ficheros. Lo único común es el
  repositorio, así que el trabajo viaja con `commit` + `push`.
- **Subir imágenes y ficheros**: desde github.com, botón *Add file → Upload
  files*. No hace falta terminal.
- **Coste**: las sesiones de código consumen mucho más que el chat, porque cada
  turno reenvía ficheros y llamadas a herramientas. Para dudas sueltas, el chat
  normal de claude.ai sale mucho más barato.

## Pendiente

1. Contenido real: bio, proyectos, enlaces e imágenes.
2. Alojamiento. GitHub Pages con repo privado exige plan de pago; para Astro se
   recomienda Vercel o Netlify, gratuitos y compatibles con repo privado.
3. Auditar contraste y accesibilidad cuando el contenido real esté puesto.
