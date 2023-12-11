import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { supabase } from "@/lib/supabase";

import { Artwork } from "@/components/Artwork";

import { uploadInputsState } from "@/recoil/atoms/uploadInputsState";

import { User } from "@supabase/supabase-js";

export function UploadForm({ user }: { user: User }) {
  const router = useRouter();

  const [url, setUrl] = useState<string>("");
  const [uploadInputs, setUploadInputs] = useRecoilState(uploadInputsState);
  const [fileErrorMsg, setFileErrorMsg] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    //check for validation(isImage)
    if (file) {
      if (/^image\//.test(file.type)) {
        setFileErrorMsg(null);
      } else {
        setFileErrorMsg("이미지 파일이 아닙니다.");
      }
    }
    setUploadInputs({
      ...uploadInputs,
      file: file as File,
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target?.result as string);
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
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/signin");
    } else {
      const artworkId = Date.now();
      //storage에 이미지 저장
      {
        const { error } = await supabase.storage
          .from("images")
          .upload(`public/${user?.id}_${artworkId}`, uploadInputs.file as File);
        if (error) {
          console.log("망함 ㅋㅋ1", error);
        }
      }
      //database에 정보 저장
      {
        const { error } = await supabase.from("artworks").insert({
          id: artworkId,
          authorId: user.id,
          authorNickname: user.user_metadata.nickname,
          title: uploadInputs.title,
          desc: uploadInputs.desc,
        });
        if (error) {
          console.log("망함 ㅋㅋ2", error);
        }
      }

      setLoading(false);
      setUploadInputs({
        file: undefined,
        title: "",
        desc: "",
      });
      router.push("/");
    }
  };

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
              accept="image/*"
              className="file-input file-input-sm file-input-bordered w-full max-w-xs"
              onChange={handleFileSelected}
            />
            {fileErrorMsg ? (
              <div className="label">
                <span className="label-text-alt text-error">
                  {fileErrorMsg}
                </span>
              </div>
            ) : (
              ""
            )}
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
            onClick={handleSubmit}
            disabled={
              fileErrorMsg !== null ||
              !Object.values(uploadInputs).every(Boolean)
            }>
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "제출"
            )}
          </button>
        </form>
      </div>
      <div className="mt-5">
        <h1 className="mb-2 text-3xl font-bold text-center">미리보기</h1>
        <Artwork
          src={url}
          title={uploadInputs.title}
          author={user?.user_metadata.nickname}
          desc={uploadInputs.desc}
          withBtn={false}
        />
      </div>
    </div>
  );
}
