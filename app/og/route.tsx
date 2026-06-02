import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0c0b 0%, #0d1510 50%, #0a0c0b 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Círculos de radar decorativos */}
        <div
          style={{
            position: 'absolute',
            right: '120px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px solid rgba(198,242,78,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '210px',
              height: '210px',
              borderRadius: '50%',
              border: '1px solid rgba(198,242,78,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '1px solid rgba(198,242,78,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#c6f24e',
                  boxShadow: '0 0 20px rgba(198,242,78,0.8)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c6f24e',
            marginBottom: '24px',
            fontWeight: 600,
          }}
        >
          INTELIGÊNCIA COMPETITIVA NO PILOTO AUTOMÁTICO
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#edf0ea',
            marginBottom: '24px',
            maxWidth: '700px',
          }}
        >
          Pare de stalkear concorrente{' '}
          <span style={{ color: '#c6f24e' }}>na mão.</span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: '22px',
            color: '#9aa39a',
            maxWidth: '560px',
            lineHeight: 1.5,
            marginBottom: '40px',
          }}
        >
          O radar varre changelog, Product Hunt e preços toda semana —
          e te entrega só o que mudou.
        </div>

        {/* CTA badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(198,242,78,0.1)',
            border: '1px solid rgba(198,242,78,0.3)',
            borderRadius: '8px',
            padding: '10px 20px',
            color: '#c6f24e',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          rivalradar.vercel.app · Acesso antecipado gratuito
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
