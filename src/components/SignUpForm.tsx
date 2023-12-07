import React, { useState, useEffect } from "react";

import axios from "axios";

interface InputValues {
  email: string;
  password: string;
  passwordagain: string;
}

export function SignUpForm() {
  const [inputValues, setInputValues] = useState<InputValues>({
    email: "",
    password: "",
    passwordagain: "",
  });

  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isEmailValid) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post("/api/signup", inputValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //inputValues가 모두 길이가>0 이여야 true 반환
    setIsAllFilled(Object.values(inputValues).every(Boolean));

    //이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputValues.email));
  }, [inputValues]);

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        회원가입
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
            onBlur={handleEmailBlur}
          />
          <div className="label">
            <span className="label-text-alt text-error">{emailError}</span>
          </div>
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
        <div>
          <label className="label">
            <span className="text-base label-text">비밀번호 확인</span>
          </label>
          <input
            type="password"
            name="passwordagain"
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            className="btn btn-block btn-neutral"
            onClick={handleSubmit}
            disabled={!isAllFilled || !isEmailValid}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
