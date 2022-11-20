import type { FC } from "react";

export type Props = {
  title: string;
  date: string;
};

const Card: FC<Props> = ({ title, date }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px",
      fontFamily: "NotoSansJP",
      backgroundColor: "#171726",
      color: "#f2f0e6",
    }}
  >
    <div tw="flex flex-col p-12 w-full h-full border-solid border-4 border-white rounded-xl">
      <div tw="flex flex-1 max-w-full items-center max-h-full">
        <h1 tw="text-6xl leading-tight max-w-full">
          <p tw="w-full justify-center">{title}</p>
        </h1>
      </div>
      <div tw="flex flex-row justify-between items-center w-full">
        <div tw="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              "https://res.cloudinary.com/re-taro/image/upload/v1668613913/me/rintaro_uyeutx.jpg"
            }
            alt="icon"
            width={100}
            height={100}
            tw="rounded-full mr-5"
          />
          <h2 tw="text-4xl mr-5">
            <p
              style={{
                fontFamily: "RobotoMono",
              }}
            >
              re-taro.dev
            </p>
          </h2>
        </div>
        <div tw="flex">
          <h2 tw="text-4xl">
            <p>{date}</p>
          </h2>
        </div>
      </div>
    </div>
  </div>
);

export { Card };
