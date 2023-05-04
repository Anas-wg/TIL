import App from './App'
// 라우터(페이지 제어) 기능 가져오기
import router from './routes/index'

const root = document.querySelector('#root')
root.append(new App().el)

// 함수처럼 호출, 즉 createRouter() 가 하나의 함수데이터를 반환
// 페이지 관리 기능의 위치는 app 요소를 통해 만들어진 다음으로 들어와야함.
// index.js 에서 기능을 정의하지만 위치는 설정 X, 따라서 원하는 곳에서 설정하기 위해 main.js 로 가져와서 실행
router()