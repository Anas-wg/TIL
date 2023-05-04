import { CoreComponent } from "../core/heropy";

export default class TheHeader extends CoreComponent {
  constructor(){
    super({
      // header 태그로 제작
      tagName: 'header'
    })
  }
  // 헤더 컴포넌트에 렌더링될 것들
  render(){
    this.el.innerHTML =/* html */`
    <!-- hash 기호를 사용하여 페이지 이동 -->
      <a href="#/">Main</a>
      <!-- 주소가 http://localhost:1234/#/about 요렇게 해쉬가 붙어서 주소 변경 -->
      <!-- 페이지는 동일하지만 눈속임으로 다른 페이지 보여주듯 -->
      <!-- hash 가 바뀔때마다 window 객체에 popstate 이벤트 발생 -> main, about 보여줄지 결정 가능  -->
      <a href="#/about">About</a>
    `
  }
}