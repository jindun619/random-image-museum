import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { supabase } from "@/lib/supabase";

interface InputValues {
  email: string;
  password: string;
}

export function SignInForm() {
  const router = useRouter();

  const [inputValues, setInputValues] = useState<InputValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    (async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: inputValues.email,
        password: inputValues.password,
      });
      setLoading(false);

      if (error) {
        setWarningMsg(error.message);
      } else {
        router.back();
      }
    })();
  };

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        로그인
      </h1>
      <form className="space-y-4">
        <div>
          <label className="label">
            <span className="text-base label-text">이메일</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">비밀번호</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>
        <a
          href="#"
          className="text-xs text-gray-600 hover:underline hover:text-blue-600">
          비밀번호 찾기
        </a>
        {warningMsg ? (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{warningMsg}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          <button
            className="btn btn-block btn-neutral"
            onClick={handleSubmit}
            disabled={!Object.values(inputValues).every(Boolean) || loading}>
            {!loading ? (
              "로그인"
            ) : (
              <span className="loading loading-dots loading-md"></span>
            )}
          </button>
        </div>
      </form>
      <div className="divider divider-neutral">or</div>
      <div>
        <Link href="/signup">
          <button className="btn btn-block btn-neutral">회원가입</button>
        </Link>
      </div>
    </div>
  );
}
