import { ImageResponse } from '@vercel/og';

export async function GET(request) {
  const { searchParams } = await new URL(request.url);

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 m-8 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>{ await searchParams.get('title') }</span>
              <span tw="text-indigo-600">{ await searchParams.get('subtitle') }</span>
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