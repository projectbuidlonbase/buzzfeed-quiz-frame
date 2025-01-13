import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

function calculateResult(answers: number[]): string {
  // Simple scoring system - can be made more sophisticated
  const sum = answers.reduce((a, b) => a + b, 0);
  
  if (sum <= 8) return "USDC - The Traditional Stabilizer";
  if (sum <= 12) return "DAI - The Decentralized Pioneer";
  if (sum <= 16) return "FRAX - The Hybrid Innovator";
  return "RAI - The Algorithmic Adventurer";
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const answers = searchParams.get('answers')?.split(',').map(Number) || [];
  
  const result = calculateResult(answers);

  const imagePath = path.join(process.cwd(), 'public', 'result-bg.png');
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');

  try {
    const image = await sharp(imagePath)
      .resize(1200, 630)
      .composite([
        {
          input: {
            text: {
              text: "Your Stablecoin Personality Is:",
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
              text: result,
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
    console.error('Error generating result image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; 
