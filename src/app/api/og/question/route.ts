import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const questions = [
  "What's your approach to financial stability?",
  "Pick your ideal backing asset:",
  "What's most important to you?",
  "Choose your preferred blockchain:",
  "What's your risk tolerance?"
];

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const index = parseInt(searchParams.get('index') || '0');

  const imagePath = path.join(process.cwd(), 'public', 'quiz-bg.png');
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');

  try {
    const image = await sharp(imagePath)
      .resize(1200, 630)
      .composite([
        {
          input: {
            text: {
              text: `Question ${index + 1} of ${questions.length}`,
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
              text: questions[index],
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
    console.error('Error generating question image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; 
