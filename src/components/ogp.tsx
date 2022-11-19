import type { FC } from "react";

export type OgpInfo = {
  title: string;
  date: string;
};

const Ogp: FC<OgpInfo> = ({ title, date }) => (
  <body
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
          {title}
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
        <p>{date}</p>
      </h2>
    </div>
  </body>
);

export { Ogp };
