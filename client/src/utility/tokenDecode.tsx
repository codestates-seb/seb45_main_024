// import jwt_decode from "jwt-decode";

// const token: string =
//   "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJGxTa25SV1kwVTc1bmUxeUlTZ0libnVlazhVREJIMFhERjFOSllkYXVqS0VvOWF0RVRMbkNlIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MywidXNlcm5hbWUiOiJ3ZWNhbjI5QG5hdmVyLmNvbSIsInN1YiI6IndlY2FuMjlAbmF2ZXIuY29tIiwiaWF0IjoxNjk0NDE5MTQ3LCJleHAiOjE2OTQ0MjA5NDd9.AsiA71gzRhsTofGuRH_bUlxd3CVl-l61R1n-B2Pvlk8";

// const decodedToken = jwt_decode(token);

// export const tokenInfo = () => {
//   console.log(decodedToken.password);
//   console.log(decodedToken.id);
//   console.log(decodedToken.username);
//   console.log(decodedToken.sub);
//   console.log(decodedToken.iat);
//   console.log(decodedToken.exp);
// };

// // 'Bearer '가 붙어도 payload 디코딩이 되네...?(콘솔에 잘 찍히는 놀라운 마법)

// // import jwt_decode from "jwt-decode";

// // const Main = () => {
// //   const token: string =
// //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJGxTa25SV1kwVTc1bmUxeUlTZ0libnVlazhVREJIMFhERjFOSllkYXVqS0VvOWF0RVRMbkNlIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MywidXNlcm5hbWUiOiJ3ZWNhbjI5QG5hdmVyLmNvbSIsInN1YiI6IndlY2FuMjlAbmF2ZXIuY29tIiwiaWF0IjoxNjk0NDE5MTQ3LCJleHAiOjE2OTQ0MjA5NDd9.AsiA71gzRhsTofGuRH_bUlxd3CVl-l61R1n-B2Pvlk8";

// //   const decodedToken = jwt_decode(token);
// //   const handleClick = () => {
// //     console.log(decodedToken);
// //     console.log(decodedToken.username);
// //     console.log(decodedToken.id);
// //   };
// //   return <div onClick={handleClick}>확인</div>;
// // };

// // export default Main;
