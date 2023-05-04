// 핵심 컴포넌트 , 페이지 구분하는 라우터 기능, 데이터 통신가능한 스토어 기능

// 1. 컴포넌트 기능 

export class CoreComponent {
// 필요한 tag를 그때그때 받을 수 있는 옵션(payload) 생성
  constructor(payload ={}){
    const { 
      tagName = 'div', 
      state= {},
      props = {}
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render(){
    // 이 컴포넌트를 각각의 다른 컴포넌트에서 확장해서 사용할 예정
  }
}
/* 
  CoreComponent = {
    paylaod : {tagName: {(paylaod)}},
    el : <tagName></tagName>
    state: {}
    props: {}
    render()
  }
  를 export!
*/


// 2. Router 기능
function routeRender(routes) {
  // 해쉬 값 없다면 에러발생 -> 처리 필요
  if(!location.hash) {
    // history 에 기록 남기지 않고 페이지 이동( 메인페이지 해쉬값 붙여주기)
    history.replaceState(null,'','/#/')
  }

  // 내용이 출력될 위치인 router-view 태그 찾기
  const routerView = document.querySelector('router-view')

  // 주소 부분의 hash 값을 얻어낼 수 있음, 다만 쿼리스트링 정보 구별이 필요(#about?name=heropy)
  // split 통해 hash 와 쿼리스트링 분리, 0번째 Index 가 hash, 1번째가 쿼리스트링
  // 구조분해할당 - split은 배열을 리턴하기 때문에 [] 로 해야함!, {}은 object(객체)
  const [ hash, queryString = ''] = location.hash.split('?')

  // http://localhost:1234/#/?a=123&b=456&c=789
  // split = ['a=123', 'b=456'...]
  // reduce 메소드,배열 개수 만큼 콜백 사용 가능,2번째 인수로 초기 데이터 설정 가능
  const query = queryString
    .split('&')
    .reduce((acc, cur)=> {
    // 'a=123' 을 = 기준으로 할당 -> cur = { key: a, value: 123 }
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {})

  // query 값이 history 객체의 state 값으로 할당 -> state: {a: '123', b: '456', c: '789'}
  history.replaceState(query,'')


  // 넘어오는 라우터 정보에서 hash 값 추출
  // 정규표현식 이용 -> 리터럴 방식(/#\/about\/?$/.)은 중간에 변수사용 불가하기에 생성자 방식 사용
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))

  // 각 객체의 실제 출력할 것은 속에 있는 component 속성 안에 있음
  // 그 component 속성은 Home, About 에서 가져온 것 
  routerView.innerHTML = ``
  
  // 라우터 뷰의 내용을 컴포넌트의 인스턴스의 el을 밀어넣기
  routerView.append(new currentRoute.component().el)


  // 페이지가 바뀔때, 첫 접근시 페이지 스크롤 최상단 고정
  window.scrollTo(0,0)
}


// 라우터 정보를 매개변수로 사용, index.js 에서 내보낸 그 라우터 정보 기반
// 라우터 정보를 받으면 routeRender() 함수를 실행
export function createRouter(routes){
  // 함수 반환
  return function(){
    window.addEventListener('popstate', ()=> {
      routeRender(routes)
    })
    // popstate는 최초실행 안되기에 선언하여 1회 실행
    routeRender(routes)
  }
}


// 3. Store 개념
export class Store {
  constructor(state){
    this.state = {}
    // subscribe 메소드 실행위해 observers 라는 객체 데이터 초기화
    this.observers = {}
    // object 반복시에는 for in, 밖에서 받아오는 state(객체데이터)의 속성을 for in 문으로 반복처리
    for (const key in state) {
      // 객체데이터의 속성을 정의 -> (정의 대상, 속성 이름, )
      Object.defineProperty(this.state, key,{
        // getter : key 값 사용시 동작
        get: () => state[key], // state['message'] ,
        // setter : key 값 지정(할당)시 동작
        set: val => {
          // 새로운 내용 지정시 state가 가진 객체데이터 갱신
          state[key] = val
          // set 함수 동작시 observers에 key 에 등록된 콜백함수를 동작
          // this.observers['message']()
          // 여러개의 콜백을 담은 배열이 들어올테니 foreach를 사용하여 그 콜백을 set 에서 사용할 수 있도록 설정
          this.observers[key].forEach(observer => observer(val));
        }
    })
    }
  }
  // state 부분의 데이터가 변경되는지 아닌지를 확인(구독)
  // 어떤 데이터가 변경되었을때 실행될 기능을 정의
  // key 와 callback 함수를 받음
  subscribe(key, cb){
    // key 속성에 콜백함수 등록, set 함수
    // this.observers['message'] = () => {}
    // { message(key): () => {} } => 함수를 여러개 등록할 수는 없을까?
    // 하나의 콜백함수가 아닌 여러개의 함수를 배열에 밀어넣기
    // 배열데이터인지 아닌지를 조사, 아니라면 undefined 기에 push 가 안됨
    Array.isArray(this.observers[key])
    // 배열데이터라면 기존 것 뒤에 푸시
    ? this.observers[key].push(cb)
    // 배열의 0번째 아이템으로 콜백 할당
    : this.observers[key] = [cb]
  }
}