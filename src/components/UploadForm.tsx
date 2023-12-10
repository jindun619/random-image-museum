import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { supabase } from "@/lib/supabase";

import { Artwork } from "@/components/Artwork";

import { uploadInputsState } from "@/recoil/atoms/uploadInputsState";

export function UploadForm({ author }: { author: string }) {
  const router = useRouter();

  const [uploadInputs, setUploadInputs] = useRecoilState(uploadInputsState);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadInputs({
      ...uploadInputs,
      file: file as File,
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setUploadInputs({
          ...uploadInputs,
          src: url,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUploadInputs({
      ...uploadInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/signin");
    }

    console.log("do some backend stuff");
  };

  useEffect(() => {
    console.log(uploadInputs);
  }, [uploadInputs]);

  return (
    <div>
      <div className="w-full p-6 mx-3 md:mx-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          작품 전시하기
        </h1>
        <form>
          <div>
            <div className="label">
              <span className="label-text">파일 선택</span>
            </div>
            <input
              type="file"
              className="file-input file-input-sm file-input-bordered w-full max-w-xs"
              onChange={handleFileSelected}
            />
          </div>
          <div>
            <div className="label">
              <span className="label-text">작품명</span>
            </div>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full max-w-xs"
              value={uploadInputs.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="label">
              <span className="label-text">작품 설명</span>
            </div>
            <textarea
              name="desc"
              className="textarea textarea-bordered w-full max-w-xs"
              value={uploadInputs.desc}
              onChange={handleChange}></textarea>
          </div>
          <button
            className="mt-2 btn btn-md btn-neutral"
            onClick={handleSubmit}>
            제출
          </button>
        </form>
      </div>
      <div className="mt-5">
        <h1 className="mb-2 text-3xl font-bold text-center">미리보기</h1>
        <Artwork
          src={uploadInputs.src}
          title={uploadInputs.title}
          author={author}
          desc={uploadInputs.desc}
          withBtn={false}
        />
      </div>
    </div>
  );
}
