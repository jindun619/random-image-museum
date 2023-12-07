import React, { useState, useEffect } from "react";

import axios from "axios";

interface InputValues {
  email: string;
  password: string;
  passwordagain: string;
  nickname: string;
  introduce: string;
}

interface InputsValid {
  email?: boolean;
  password?: boolean;
  nickname?: boolean;
}

interface ErrorMsgs {
  email?: string;
  password?: string;
  nickname?: string;
}

export function SignUpForm() {
  const [inputValues, setInputValues] = useState<InputValues>({
    email: "",
    password: "",
    passwordagain: "",
    nickname: "",
    introduce: "",
  });

  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [areInputsValid, setAreInputsValid] = useState<InputsValid>({
    email: false,
    password: false,
    nickname: false,
  });
  const [errorMsgs, setErrorMsgs] = useState<ErrorMsgs>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      if (areInputsValid?.email === false) {
        setErrorMsgs({
          ...errorMsgs,
          email: "이메일 형식이 올바르지 않습니다.",
        });
      } else {
        setErrorMsgs({
          ...errorMsgs,
          email: "",
        });
      }
    } else if (e.target.name === "password") {
      if (areInputsValid?.password === false) {
        setErrorMsgs({
          ...errorMsgs,
          password: "비밀번호는 6자 이상, 20자 이하이여야 합니다",
        });
      } else {
        setErrorMsgs({
          ...errorMsgs,
          password: "",
        });
      }
    } else if (e.target.name === "nickname") {
      if (areInputsValid?.nickname === false) {
        setErrorMsgs({
          ...errorMsgs,
          nickname: "닉네임은 1자 이상, 10자 이하이여야 합니다",
        });
      } else {
        setErrorMsgs({
          ...errorMsgs,
          nickname: "",
        });
      }
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
    //이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailRegex.test(inputValues.email);
    //비밀번호 형식 검사 (6 <= 길이 <= 20)
    const checkPassword =
      inputValues.password.length >= 6 && inputValues.password.length <= 20;
    //닉네임 형식 검사 (1 <= 길이 <= 10)
    const checkNickname =
      inputValues.nickname.length >= 1 && inputValues.nickname.length <= 10;

    setAreInputsValid({
      ...areInputsValid,
      email: checkEmail,
      password: checkPassword,
      nickname: checkNickname,
    });
  }, [inputValues]);

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        회원가입
      </h1>
      <form className="space-y-4">
        <div>
          <label className="label">
            <span className="text-base label-text">
              이메일<span className="text-error">*</span>
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            className="w-full input input-bordered"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMsgs?.email ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errorMsgs.email}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">
              비밀번호<span className="text-error">*</span>
            </span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMsgs?.password ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errorMsgs.password}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">
              비밀번호 확인<span className="text-error">*</span>
            </span>
          </label>
          <input
            type="password"
            name="passwordagain"
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>
        <div className="divider"></div>
        <div>
          <label className="label">
            <span className="text-base label-text">
              닉네임<span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMsgs?.nickname ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errorMsgs.nickname}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">
              자기소개<span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="introduce"
            placeholder="자기소개를 입력하세요"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            className="btn btn-block btn-neutral"
            onClick={handleSubmit}
            disabled={
              !Object.values(inputValues).every(Boolean) ||
              !Object.values(areInputsValid).every(Boolean)
            }>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
