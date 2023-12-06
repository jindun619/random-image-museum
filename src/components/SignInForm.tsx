export function SignInForm() {
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
            placeholder="이메일 주소"
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">비밀번호</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full input input-bordered"
          />
        </div>
        <a
          href="#"
          className="text-xs text-gray-600 hover:underline hover:text-blue-600">
          비밀번호 찾기
        </a>
        <div>
          <button className="btn btn-block">로그인</button>
        </div>
      </form>
      <div className="divider divider-neutral">or</div>
      <div>
        <button className="btn btn-block btn-neutral">회원가입</button>
      </div>
    </div>
  );
}
