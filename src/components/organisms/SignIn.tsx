import { InputWithLabel } from "../molecules/InputWithLabel";
import { MiniLink } from "../atoms/MiniLink";
import { BlockBtn } from "../atoms/Btn";

export default function SignIn() {
  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        DaisyUI
      </h1>
      <form className="space-y-4">
        <InputWithLabel label="이메일" type="email" placeholder="이메일 주소" />
        <InputWithLabel
          label="Password"
          type="비밀번호"
          placeholder="비밀번호를 입력하세요."
        />
        <MiniLink href="#" text="비밀번호 찾기" />
        <BlockBtn text="로그인" color="default" />
      </form>
      <div className="divider divider-neutral">or</div>
      <BlockBtn text="회원가입" color="neutral" />
    </div>
  );
}
