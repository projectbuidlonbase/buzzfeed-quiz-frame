import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

const questions = [
  {
    text: "What's your approach to financial stability?",
    options: [
      "Traditional and Regulated",
      "Algorithmic and Dynamic",
      "Asset-Backed and Secure",
      "Community-Driven"
    ]
  },
  {
    text: "Pick your ideal backing asset:",
    options: [
      "US Dollar",
      "Crypto Assets",
      "Multiple Currencies",
      "Gold and Commodities"
    ]
  },
  {
    text: "What's most important to you?",
    options: [
      "Regulatory Compliance",
      "Innovation",
      "Transparency",
      "Decentralization"
    ]
  },
  {
    text: "Choose your preferred blockchain:",
    options: [
      "Ethereum",
      "Multiple Chains",
      "Layer 2 Solutions",
      "Alternative L1s"
    ]
  },
  {
    text: "What's your risk tolerance?",
    options: [
      "Very Low",
      "Moderate",
      "Low",
      "Balanced"
    ]
  }
];

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    const body: FrameRequest = await req.json();
    
    let state = { questionIndex: 0, answers: [] };
    
    if (body?.untrustedData?.state) {
      try {
        state = JSON.parse(body.untrustedData.state);
      } catch (e) {
        console.error('Failed to parse state:', e);
      }
    }

    const { questionIndex, answers } = state;

    // Handle first visit (no button pressed yet)
    const newAnswers = body?.untrustedData?.buttonIndex !== undefined 
      ? [...answers, body.untrustedData.buttonIndex] 
      : answers;

    // If quiz is complete, redirect to results
    if (questionIndex >= questions.length) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: "Share Result",
              action: "post"
            } as const
          ],
          image: `${NEXT_PUBLIC_URL}/api/og/result?answers=${answers.join(',')}`,
          postUrl: `${NEXT_PUBLIC_URL}/api/share`,
          state: {
            questionIndex,
            answers: newAnswers,
          },
        })
      );
    }

    // Get current question
    const currentQuestion = questions[questionIndex];

    // Create button options
    const buttons = currentQuestion.options.map(option => ({
      label: option,
      action: "post"
    } as const));

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: buttons as [{ label: string, action: "post" }, ...{ label: string, action: "post" }[]],
        image: `${NEXT_PUBLIC_URL}/api/og/question?index=${questionIndex}`,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
        state: {
          questionIndex: questionIndex + 1,
          answers: newAnswers,
        },
      })
    );
  } catch (error) {
    console.error('Frame error:', error);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [{ label: "Try Again", action: "post" }] as const,
        image: `${NEXT_PUBLIC_URL}/api/og/error`,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      })
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic'; 
