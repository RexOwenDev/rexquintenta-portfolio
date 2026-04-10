import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Rex Quintenta — AI Automation Specialist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [geistBold, geistMonoRegular] = await Promise.all([
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Black.ttf')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#070d1a',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            display: 'flex',
          }}
        />

        {/* Corner bracket — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            width: '20px',
            height: '20px',
            borderTop: '2px solid rgba(0,212,255,0.35)',
            borderLeft: '2px solid rgba(0,212,255,0.35)',
            display: 'flex',
          }}
        />

        {/* Corner bracket — top-right */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '20px',
            height: '20px',
            borderTop: '2px solid rgba(0,212,255,0.35)',
            borderRight: '2px solid rgba(0,212,255,0.35)',
            display: 'flex',
          }}
        />

        {/* Corner bracket — bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            width: '20px',
            height: '20px',
            borderBottom: '2px solid rgba(0,212,255,0.35)',
            borderLeft: '2px solid rgba(0,212,255,0.35)',
            display: 'flex',
          }}
        />

        {/* Corner bracket — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '20px',
            height: '20px',
            borderBottom: '2px solid rgba(0,212,255,0.35)',
            borderRight: '2px solid rgba(0,212,255,0.35)',
            display: 'flex',
          }}
        />

        {/* Main content — centered column */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px 80px',
          }}
        >
          {/* Top label */}
          <span
            style={{
              fontFamily: 'GeistMono',
              fontSize: '18px',
              fontWeight: 400,
              color: '#00d4ff',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            // AI AUTOMATION SPECIALIST
          </span>

          {/* Name */}
          <span
            style={{
              fontFamily: 'Geist',
              fontSize: '72px',
              fontWeight: 800,
              color: '#e2e8f0',
              lineHeight: 1.1,
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Rex Quintenta
          </span>

          {/* Subtitle */}
          <span
            style={{
              fontFamily: 'Geist',
              fontSize: '22px',
              fontWeight: 400,
              color: '#94a3b8',
              textAlign: 'center',
              marginBottom: '28px',
              maxWidth: '760px',
            }}
          >
            I build AI systems and automations that actually ship.
          </span>

          {/* Stats row */}
          <span
            style={{
              fontFamily: 'GeistMono',
              fontSize: '16px',
              fontWeight: 400,
              color: '#00d4ff',
              letterSpacing: '1px',
            }}
          >
            3,500+ HRS  ·  100% JSS  ·  13+ WORKFLOWS
          </span>
        </div>

        {/* Domain — bottom-right */}
        <span
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '52px',
            fontFamily: 'GeistMono',
            fontSize: '16px',
            color: '#64748b',
          }}
        >
          rexquintenta.dev
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: geistBold,
          style: 'normal',
          weight: 800,
        },
        {
          name: 'GeistMono',
          data: geistMonoRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
