import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: 60, color: '#000', marginBottom: '20px' }}>
            Something went wrong!
          </h1>
          <p style={{ fontSize: 30, color: '#000' }}>
            Please try again
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

export const dynamic = 'force-dynamic'
