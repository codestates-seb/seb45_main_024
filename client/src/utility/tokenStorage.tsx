// jwt 로컬스토리지 관련 함수
// TODO 객체 키 리스폰 보고 알잘딱깔센 수정하기
import jwt_decode from "jwt-decode";

export const saveTokensToLocalStorage = (token: string) => {
  localStorage.setItem("smoothieAccess", JSON.stringify(token));
};

export const saveRefreshTokenToLocalStorage = (token: string) => {
  localStorage.setItem("smoothieRefresh", JSON.stringify(token));
};

export const getTokensFromLocalStorage = () => {
  const token = localStorage.getItem("smoothieAccess");
  if (token) {
    const tokenString = JSON.parse(token);
    // console.log(JSON.parse(token));
    // console.log(tokenString);
    const decodedToken = jwt_decode(tokenString);
    return decodedToken;
  }
  return null;
};

// export const getTokensFromLocalStorage = (): TokenData | null => {
//   const tokensString = localStorage.getItem("jwtTokens");
//   if (tokensString) {
//     console.log(JSON.parse(tokensString));
//     return JSON.parse(tokensString);
//   }
//   return null;
// };

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem("smoothieAccess");
  localStorage.removeItem("smoothieRefresh");
};
// => 백엔드에서 유효성 검사를 진행한다면 로그아웃 api 콜을 별도로 프론트엔드에서 작성해줘야 할 것
