import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "@supabase/supabase-js";

export function VerifyEmailForm({ userId }: { userId: string }) {
  const [user, setUser] = useState<User>();
  const [count, setCount] = useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCount(60);
    axios
      .post("api/resendEmail", { email: user?.email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("api/getUserById", { params: { userId: userId } })
      .then((res) => {
        const newData = res.data.data.user;
        setUser(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count <= 0) {
      clearInterval(counter);
    }

    return () => {
      clearInterval(counter);
    };
  }, [count]);

  return (
    <div className="w-full p-10 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
      <div className="flex justify-center">
        <div className="p-2 bg-[#aaf1d6] opacity-25s rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#84e281"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
      </div>
      <h1 className="mt-5 text-3xl font-semibold text-center text-gray-700">
        이메일을 확인해주세요.
      </h1>
      <p className="mt-10 text-xl text-center text-gray-700">
        <span className="font-semibold">{user?.email}</span>로 이메일을
        보냈습니다.
        <br />
        <br />
        이메일의 링크를 클릭하여 회원가입을 완료하세요. 보이지 않는다면{" "}
        <span className="font-semibold">스팸 폴더</span>를 확인해보세요.
        <br />
        <br />
        이메일을 찾을 수 없나요?
      </p>
      <div className="mt-5 text-center">
        <button
          className="btn btn-neutral"
          onClick={handleClick}
          disabled={count > 0}>
          인증 이메일 재발송
        </button>
      </div>
      {count > 0 ? (
        <p className="text-center text-error">{count}초 후 재발송 가능</p>
      ) : (
        ""
      )}
      {/* <h1>your id is: {userId}</h1>
      <p>email: {user?.email}</p>
      <p>nickname: {user?.user_metadata.nickname}</p> */}
    </div>
  );
}
