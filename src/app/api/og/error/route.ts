import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '60px', color: 'black', marginBottom: '20px' }}>
          Something went wrong!
        </h1>
        <p style={{ fontSize: '30px', color: 'black' }}>
          Please try again
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
