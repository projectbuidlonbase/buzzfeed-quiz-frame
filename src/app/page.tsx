import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Start Quiz',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/image.jpg`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Project Buidl On Base Buzzfeed Quiz Frame',
  description: 'LFG',
  openGraph: {
    title: 'Project Buidl On Base Buzzfeed Quiz Frame',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/image.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Project Buidl On Base Buzzfeed Quiz Frame</h1>
    </>
  );
}
