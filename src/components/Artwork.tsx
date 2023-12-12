interface ArtworkProps {
  src?: string;
  title: string;
  author: string;
  desc: string;
  regenBtn: () => void;
}

export function Artwork({ src, title, author, desc, regenBtn }: ArtworkProps) {
  return (
    <div className="border-2 border-neutral rounded-lg w-full md:w-[768px] mx-3 md:mx-0 p-5">
      <div className="borders border-secondary h-[300px] md:h-[450px]">
        {src ? (
          <img src={src} className="mx-auto h-full" />
        ) : (
          <div className="skeleton w-full h-full"></div>
        )}
      </div>
      <div className="borders border-accent p-5">
        <div className="flex justify-between">
          {title ? (
            <h1 className="text-xl md:text-3xl font-semibold">{title}</h1>
          ) : (
            <div className="mr-5 skeleton w-full h-10"></div>
          )}
          {true ? (
            <button
              className="btn btn-neutral btn-sm md:btn-md"
              onClick={regenBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>
        {author ? (
          <p className="text-slate-500 font-bold">by {author}</p>
        ) : (
          <div className="mt-2 skeleton w-[10rem] h-5"></div>
        )}
        {desc ? (
          <p className="mt-3">{desc}</p>
        ) : (
          <div>
            <div className="mt-3 skeleton w-full h-5"></div>
            <div className="mt-3 skeleton w-full h-5"></div>
            <div className="mt-3 skeleton w-full h-5"></div>
            <div className="mt-3 skeleton w-full h-5"></div>
            <div className="mt-3 skeleton w-full h-5"></div>
          </div>
        )}
      </div>
    </div>
  );
}
