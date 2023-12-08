interface Error {
  message: string;
  name: string;
  status: number;
}

//status: 6XX은 김호준 커스텀 status code
const getErrorMsg = (error: Error) => {
  switch (error.status) {
    case 422:
      return "이 이메일 주소로 이미 등록된 사용자가 있습니다.";
    default:
      return error.message;
  }
};

export { getErrorMsg };
