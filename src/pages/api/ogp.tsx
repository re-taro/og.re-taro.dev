import { ImageResponse } from '@vercel/og';
import { Card } from '@/components/card';
import { jbMonoMedium } from '@/utils/font/jb-mono';
import type { NextRequest } from 'next/server';
import type { CardProps } from '@/components/card';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')?.slice(0, 64) ?? '';
    const date = searchParams.has('date')
      ? `📅 ― ${searchParams.get('date')?.slice(0, 16)}`
      : '';
    const domain = searchParams.has('domain')
      ? `${searchParams.get('domain')?.slice(0, 64)}`
      : 're-taro.dev';
    const jbMono = await jbMonoMedium;
    const icon = new URL(
      '/assets/rintaro.jpg',
      // eslint-disable-next-line dot-notation
      process.env['NEXT_PUBLIC_BASE_URL'],
    ).toString();
    const info: CardProps = {
      title,
      date,
      domain,
      icon,
    };

    return new ImageResponse(<Card {...info} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrainsMono',
          data: jbMono,
          weight: 500,
          style: 'normal',
        },
      ],
      emoji: 'twemoji',
    });
  } catch (e) {
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }

    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
