import { ImageResponse } from '@vercel/og';

export async function GET(request) {
  const { searchParams } = await new URL(request.url);
  const title = searchParams.get('title');
  const subtitle = searchParams.get('subtitle');
  const image = searchParams.get('image');
  const imageUrl = image?.startsWith('/')
    ? new URL(image, request.url).toString()
    : null;

  return new ImageResponse(
    imageUrl ? (
      <div tw="flex w-full h-full bg-white p-12">
        <div tw="flex w-full h-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
          <div tw="flex flex-col w-5/12 h-full justify-between p-12">
            <div tw="flex text-2xl font-bold text-indigo-600">iroh</div>
            <div tw="flex flex-col">
              <div tw="text-xl uppercase tracking-widest text-gray-500">{title}</div>
              <div tw="mt-4 text-5xl leading-tight font-bold text-gray-900">{subtitle}</div>
            </div>
            <div tw="flex text-xl text-gray-500">less net work for networks</div>
          </div>
          <div tw="flex w-7/12 h-full items-center justify-center pr-8">
            <img
              src={imageUrl}
              alt={subtitle}
              width={650}
              height={500}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    ) : (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 m-8 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>{title}</span>
              <span tw="text-indigo-600">{subtitle}</span>
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
