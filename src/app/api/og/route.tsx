import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-iroh-kv-og-1 bg-white">
        <div tw="flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 m-8 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-left">
                <span className="text-purple-500">Title</span>
                <span tw="mt-5 text-lg sm:text-2xl text-gray-500 text-left">Subtitle</span>
              </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
