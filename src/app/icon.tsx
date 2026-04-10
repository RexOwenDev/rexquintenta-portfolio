import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          background: '#070d1a',
          border: '1px solid rgba(0,212,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#00d4ff',
            lineHeight: 1,
            fontFamily: 'serif',
          }}
        >
          R
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
