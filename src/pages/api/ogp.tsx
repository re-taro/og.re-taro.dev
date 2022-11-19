import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title")?.slice(0, 64) ?? "";
    const date = searchParams.get("date")?.slice(0, 16) ?? "";
    const [notoSans, robotoMono] = await Promise.all([
      fetch(
        new URL("../../../assets/fonts/NotoSansJp-Bold.otf", import.meta.url),
      ).then(res => res.arrayBuffer()),
      fetch(
        new URL("../../../assets/fonts/RobotoMono-Medium.ttf", import.meta.url),
      ).then(res => res.arrayBuffer()),
    ]);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: "125%",
            color: "#d8dee9",
            background: "linear-gradient(to right bottom, #b48ead, #81a1c1)",
          }}
        >
          <div
            style={{
              width: "50%",
              borderRadius: "30px",
              background: "#2e3440",
              boxShadow:
                "10px 10px 20px rgba(28, 25, 33, 0.4), -10px -10px 20px rgba(28, 25, 33, 0.4)",
              padding: "50px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  maxHeight: "100%",
                  overflowWrap: "anywhere",
                }}
              >
                {title.toString()}
              </p>
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  "https://res.cloudinary.com/re-taro/image/upload/v1668613913/me/rintaro_uyeutx.jpg"
                }
                alt="icon"
                width={100}
                height={100}
                style={{
                  marginRight: "20px",
                  borderRadius: "50%",
                }}
              />
              <h2>
                <p>re-taro.dev</p>
              </h2>
            </div>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: "'Roboto Mono', monospace",
              }}
            >
              <p>{date.toString()}</p>
            </h2>
          </div>
        </div>
      ),
      {
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
      },
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
