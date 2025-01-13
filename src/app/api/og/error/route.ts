import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const imagePath = path.join(process.cwd(), 'public', 'error-bg.png');
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');

  try {
    const image = await sharp(imagePath)
      .resize(1200, 630)
      .composite([
        {
          input: {
            text: {
              text: "Something went wrong!",
              font: fontPath,
              width: 1000,
              height: 100,
              rgba: true,
            },
          },
          top: 100,
          left: 100,
        },
        {
          input: {
            text: {
              text: "Please try again",
              font: fontPath,
              width: 1000,
              height: 200,
              rgba: true,
            },
          },
          top: 250,
          left: 100,
        },
      ])
      .png()
      .toBuffer();

    return new NextResponse(image, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'max-age=10',
      },
    });
  } catch (error) {
    console.error('Error generating error image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; 
