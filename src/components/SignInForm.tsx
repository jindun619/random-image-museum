import React, { useState, useEffect } from "react";
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

      if (!error) {
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
