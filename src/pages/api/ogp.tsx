import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import type { Props } from "@/components/card";
import { Card } from "@/components/card";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title")?.slice(0, 64) ?? "";
    const date = searchParams.has("date")
      ? `📅 ― ${searchParams.get("date")?.slice(0, 16)}`
      : "";
    const [notoSans, robotoMono] = await Promise.all([
      fetch(
        new URL("../../../assets/fonts/NotoSansJp-Bold.otf", import.meta.url),
      ).then(res => res.arrayBuffer()),
      fetch(
        new URL("../../../assets/fonts/RobotoMono-Medium.ttf", import.meta.url),
      ).then(res => res.arrayBuffer()),
    ]);
    const info: Props = {
      title,
      date,
    };
    return new ImageResponse(<Card {...info} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          data: notoSans,
          weight: 700,
          style: "normal",
        },
        {
          name: "RobotoMono",
          data: robotoMono,
          weight: 500,
          style: "normal",
        },
      ],
      emoji: "twemoji",
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
