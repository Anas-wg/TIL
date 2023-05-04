// routes = pages, 
// route를 제어하는 용도
// 홈, 어바웃 가져오기
import Home from "./Home";
import About from "./About";
// heropy.js 에서 createRotuer 함수 가져오기
import { createRouter } from "../core/heropy";

export default createRouter([
  // 함수의 파라미터로 객체를 가진 배열을 넘겨줌, 배열 안 객체 하나마다 한 페이지의 정보를 담음
  // 해쉬와 일치하는 path 값 할당, 일치시 보여줄 컴포넌트를 같이 할당
  {path:'#/', component: Home},
  {path:'#/about', component: About}
])