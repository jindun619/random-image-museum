Atomic Design Pattern
Supabase
react hook form
typescript 사용하니 확실히 에러가 줄음

supabase dashboard -> SQL Editor -> Quickstarts에 UMS(User Management Starter) 템플릿 쿼리를 사용했다가 원하지 않는 table들이 생성되어서
테이블을 지웠던 기억이 있다. 그때 미처 알지 못했던 건, supabase function과 trigger도 같이 생성되었다는 점. 나중에 UMS 쿼리를 직접 확인해서 알았지만,
signup할 때 의문의 오류가 발생해서 오류를 찾느라 애먹었다. [Stackoverflow 게시물](https://stackoverflow.com/questions/77650065/having-trouble-creating-user-with-supabase-auth-admin-createuser-method-with-e)덕분에 에러 메시지를 확인할 수 있다는 사실을 알게 되어서 해결 가능했다.
supabase에 대해 무지했기 때문에 생긴 이유라고 생각한다..