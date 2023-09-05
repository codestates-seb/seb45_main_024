// jwt 로컬스토리지 관련 함수
// TODO 객체 키 리스폰 보고 알잘딱깔센 수정하기

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export const saveTokensToLocalStorage = (tokens: TokenData) => {
  localStorage.setItem("jwtTokens", JSON.stringify(tokens));
};

export const getTokensFromLocalStorage = (): TokenData | null => {
  const tokensString = localStorage.getItem("jwtTokens");
  if (tokensString) {
    return JSON.parse(tokensString);
  }
  return null;
};

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem("jwtTokens");
};
