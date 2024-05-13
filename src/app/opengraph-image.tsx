import { ImageResponse } from "next/og";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function DynamicImage({
  params,
}: {
  params: { slug: string };
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${process.env.NEXTAUTH_URL}/background.png)`,
          justifyContent: "center",
        }}
        tw='text-white'
      >
        <div tw="rounded-md bg-black/50 flex flex-col gap-5 justify-center items-center p-5 px-10">
          <img  tw="rounded-md  p-2 w-26 h-26" src={`${process.env.NEXTAUTH_URL}/favicon.svg`} />
          <span tw="font-extrabold text-7xl">EzEz Link</span>
          <span tw="text-4xl">An Ez Link Shortener</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
