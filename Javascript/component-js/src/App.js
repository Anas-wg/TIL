// heropy.js 로부터 CoreCoponent 가져오기
import { CoreComponent } from "./core/heropy";
// 헤더 태그 가져오기
import TheHeader from "./components/TheHeader";

// CoreComponent 확장(상속)
export default class App extends CoreComponent {
  render() {
    // 헤더를 제외한 나머지 구조를 routre-view 안으로 넣을 예정,
    // popstate가 발생함에 따라 이 router-view 태그 안 내용이 바뀔 예정
    const routerView = document.createElement('router-view')

    this.el.append(
      // 헤더 생성자의 el 을 app.js의 el로 밀어넣기, 
      new TheHeader().el,
      routerView
    )
  }
}


