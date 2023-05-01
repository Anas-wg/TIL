## 개요
site 가 하나의 단위로 만들어져 있다는 것을 이해하는 것이 필요
### Compoent: 재사용 가능한 각각의 독립된 기능의 모듈(각각의 UI 단위)

- ex. Header, Title, Searchbar, MovieList... etc
- 영화 검색 결과 같은 경우 정보만 다를뿐 형태는 똑같음  
-> 그렇다면 똑같은 틀을 만들어놓고, 그 안의 정보만 갈아끼운다면 효율성 있게 재사용 가능

## 컴포넌트 생성 클래스 작성

- 왜 클래스로 컴포넌트를 활용하는가?

- Example
```html
<!-- 문서구조 -->
index.html
src
  L main.js
  L App.js
```

- App.js
```js
// 기본내보내기 & App class 생성

export default class App {
  constructor(){
    // el 은 main.js로 기본 내보내기 됨
    this.el = document.createElement('div')
    this.el.textContent = "Hello World!"
  }

}
/*
  App = {
    el : <div>Hello World!</div>
  }
  가 main.js로 export!
*/ 
```

- main.js
```js
  // 클래스 개념의 App.js 가져오기 -> 하나의 컴포넌트 
import App from './App'

// html 의 root id 가진 div 찾기
const root = document.querySelector('#root')

// Root에 요소를 추가, 그 요소를 컴포넌트 방식으로 제작
// 내보내기 된 App 생성자 함수의 인스턴스의 el을 root 요소에 추가
root.append(new App().el)
```

➡ 결국, 클래스로 만들어진 App 의 요소(el)의 value인 ` <div>Hello World!</div> `가

main.js 로 넘어와서,  main.js 의 root에 삽입되어 html 상에 Hello World 가 출력이 된것!

---
### 공용 사용이 가능한 컴포넌트 개발
```html
<!-- 문서구조 -->
index.html
src
  L main.js
  L App.js
  L core
    L heropy.js
```

- heropy.js
```jsx
// 1. 컴포넌트 기능 

export class CoreComponent {
// 필요한 tag를 그때그때 받을 수 있는 옵션(payload) 생성
  constructor(payload ={}){
    // 구조분해할당 - tagName 에 만들고자하는 태그이름 받을 예정
    // payload = { tagName: (payload로 받은 tagName, 기본값: div ) }
    const { tagName = 'div' } = payload
    // 그 받은 tagName 의 태그로 요소 생성
    this.el = document.createElement(tagName)
    // 확장시 이 CoreComponent 에서 1회 실행
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
    render()
  }
  를 export!
*/
```

- App.js
```js
// heropy.js 로부터 CoreCoponent 가져오기
import { CoreComponent } from "./core/heropy";

// CoreComponent 확장(상속)
export default class App extends CoreComponent {
  constructor(){
    // CoreComponent의 constructor 부분을 실행 -> 굳이 뭘 건들 필요없이 그대로 가져오기만 함
    super()
  }
  // App 에서 새롭게 정의해서 사용 -> 화면에 hello world 출력하라는 것만 추가
  render() {
    this.el.textContent = "Hello World!"
  }
}
```

➡ 결국 App.js는 상속받은 CoreComponent를 이용하여 main.js 로 하단의 데이터를 넘겨줌, 
```jsx
  App = {
    payload: {tagName : "div"}
    el: <tagName><tagName>
    render(){
      el.textContent = "Hello World!"
    }
  }
  ➡ <div>Hello World!</div>
```

- 그렇다면 h1태그로 만들고 싶다면?  
App 의 super 키워드로 `{tagName: "h1"}` 으로 넘겨주면 됨
```jsx
export default class App extends CoreComponent {
  constructor(){
    // 만약 h1 태그로 제작을 원함 -> payload 로 h1 을 넘겨주면 됨
    super({
      tagName: 'h1'
    })
  }
  render() {
    this.el.textContent = "Hello World!"
  }
}
```

=> CoreComponent의 내용을 각각의 컴포넌트에서 쉽게 사용이 가능하다는 장점


## 선언적 렌더링과 이벤트 핸들링
- input, button 요소 추가 -> 버튼 클릭시 인풋요소를 콘솔에 출력

- heropy.js
```js
export class CoreComponent {
  constructor(payload ={}){
    /*
      payload = {
        {tagName: (payload로 받은 tagName, 기본값: div )},
        {state : (payload 로 넘어오는 state 값, 기본값: {})} 
      }
    */ 
    const { 
      tagName = 'div', 
      state= {} 
    } = payload
    this.el = document.createElement(tagName)
    // CoreComponent 내 state 속성에 payload로 넘어온 state 값을 할당
    this.state = state
    this.render()
  }
  render(){
  }
}
/* 
  CoreComponent = {
    paylaod : {tagName: {(paylaod)}},
    el : <tagName></tagName>
    state: {}
    render()
  }
  를 export!
*/
```

- App.js
```js
import { CoreComponent } from "./core/heropy";

export default class App extends CoreComponent {
  constructor(){
    super({
      // App 컴포넌트 내부에서 쓰이는 값으로 state 추가, render 에서도 사용가능 및 CoreComponent 의 payload 로 전달
      // state 의 inputText를 선언해서 render() 부분에서 사용 -> "선언적 렌더링"
      state:{
        inputText: ''
      }
    })
  }  
  render() {
    this.el.classList.add('search')
    // input, button 요소 추가 -> 버튼 클릭시 인풋요소를 콘솔에 출력
    this.el.innerHTML = /* html */`
      <input />
      <button>Click!</button>
    `
    // input 요소에 값이 입력될때 마다 이벤트를 추가 -> addEventListener
    // this.el 내에서 찾은 input 요소
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      // 입력데이터 발생시, state 데이터에 inputText로 현재 인풋요소에 입력되는 값을 할당
      this.state.inputText = inputEl.value
    })
    // button 요소 할당
    const btnEl = this.el.querySelector('button')
    // btn 에 클릭이벤트 발생 -> state 값의 input요소의 입력된 값을 출력
    btnEl.addEventListener('click', () => {
      console.log(this.state.inputText)
    })
  }
}
```

## 조건과 상속
- 조건에 따른 컴포넌트 렌더링
```js
import { CoreComponent } from "./core/heropy";

export default class App extends CoreComponent {
  constructor(){
    super({
      // App 컴포넌트 내부에서 쓰이는 값으로 state 추가, render 에서도 사용가능 및 CoreComponent 의 payload 로 전달
      // fruits 라는 배열 데이터 생성
      state: {
        fruits : [
          {name: 'Apple', price: 1000},
          {name: 'Banana', price: 2000},
          {name: 'Cherry', price: 3000},
        ]
      }
    })
  }  
  render() {
    // fruits 배열 데이터 확인
    console.log(this.state.fruits)

    // 배열 데이터 html상으로 출력 - 데이터 기반으로 작성
    this.el.innerHTML= /* html */`
      <h1>Fruits</h1>
      <ul>
        <!-- fruit 배열의 데이터를 map 을 사용하여 name 값만 모은 새로운 배열을 생성 -->
        <!-- join 으로 배열 데이터를 문자데이터로 묶어주기 -->
        ${this.state.fruits.map(fruits =>`<li>${fruits.name}</li>`).join('')}
      </ul>
    `
  }
}

```

- 가격이 3000원 이상이라면 출력되지 않도록 해보자
```js
  render() {
    // fruits 배열 데이터 확인
    console.log(this.state.fruits)

    // 배열 데이터 html상으로 출력 - 데이터 기반으로 작성
    this.el.innerHTML= /* html */`
      <h1>Fruits</h1>
      <ul>
        <!-- filter 사용, 콜백함수를 통과하는 것만 map 함수로 들어가서 html 로 삽입 -->
        ${this.state.fruits
          .filter(fruits => fruits.price < 3000)
          .map(fruits =>`<li>${fruits.name}</li>`)
          .join('')}
      </ul>
    `
  }
```

## 자식 컴포넌트에게 데이터 전달
#### fruits 배열 데이터 기반 컴포넌트 들을 출력해보자
#### li 태그 안 내용이 복잡하다면 그 부분을 하나의 컴포넌트로 분리!

- App.js

```js
render() {
    // fruits 배열 데이터 확인
    console.log(this.state.fruits)

    // 배열 데이터 html상으로 출력 - 데이터 기반으로 작성
    this.el.innerHTML= /* html */`
      <h1>Fruits</h1>
      <ul></ul>
    `
    const ulEl = this.el.querySelector('ul')
    // ul tag 에 가져온 FruitItem 의 el 을 밀어넣기
    // 인스턴스의 el 은 배열데이터, 전개연산자를 사용하여 이를 벗겨내기
    ulEl.append(...this.state.fruits
      .filter(fruit => fruit.price < 3000)
      // 호출시 과일의 정보가 들어가야함 -> 객체 데이터 넣기 -> props 라는 이름으로 전달된 객체 데이터는
      // FruitItem에서 받아서 쓰기 가능
      .map(fruit => new FruitItem({
        props: {
          name :fruit.name,
          price: fruit.price
        }
      }).el)
      )
  }
```

- FruitItem.js
```js
import { CoreComponent } from "../core/heropy";

export default class FruitItem extends CoreComponent {
  constructor({
    // super - coreComponent 실행부분
    super({
      // this.el 은 li tag 로 생성
      tagName: 'li',
      // payload 로 넘어온 props를 props 변수에 할당
      props: payload.props
    })
  }
  render() {
    this.el.textContent = this.props.name
  }
}

```

결국 heropy.js 로 넘어오는 payload는
```js
/*
      payload = {
        {tagName: (payload로 받은 tagName, 기본값: div )},
        {state : (payload 로 넘어오는 state 값, 기본값: {})},
        {props : (payload 로 넘어오는 props 값, 기본값: {})} 
      }
    */ 
```

- li 태그를 클릭시 그 내용을 콘솔에 출력해보자
```js
  // this.el 에 클릭이벤트 발생시 props 의 이름과 가격을출력
    this.el.addEventListener('click',()=> {
      console.log(this.props.name, this.props.price)
    })
  }
```
➡ 각각의 데이터기반으로 출력되는 부분을 클래스 컴포넌트로 만들어서
더 복잡한 기능을 구현가능하게 만듦

```js
      // 호출시 과일의 정보가 들어가야함 -> 객체 데이터 넣기 -> props 라는 이름으로 전달된 객체 데이터는
      // FruitItem에서 받아서 쓰기 가능
      // FruitItem -> app.js 의 자식 컴포넌트
      .map(fruit => new FruitItem({
        // App.js 에서 props 데이터를 자식 컴포넌트인 FruitsItem 으로 전달 -> 이를 활용
        props: {
          name :fruit.name,
          price: fruit.price
        }
      }).el)
      )
  }
```

## 해쉬 라우터 관리
- App.js
```js
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
      // 헤더 밑으로 router-view 태그 삽입
      routerView
    )
  }
}
```

- TheHeader.js

```js

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
```

- heropy.js
```js
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
  // 넘어오는 라우터 정보에서 hash 값 추출
  // 정규표현식 이용 -> 리터럴 방식(/#\/about\/?$/.)은 중간에 변수사용 불가하기에 생성자 방식 사용
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  // 각 객체의 실제 출력할 것은 속에 있는 component 속성 안에 있음
  // 그 component 속성은 Home, About 에서 가져온 것 
  routerView.innerHTML = ``
  // 라우터 뷰의 내용을 컴포넌트의 인스턴스의 el을 밀어넣기
  routerView.append(new currentRoute.component().el)
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
```
- hash를 처리했으니 쿼리스트링 차례
`http://localhost:1234/#/about?a=123&b=456&c=789`

```js
onst query = queryString
    .split('&')
    .reduce((acc, cur)=> {
    // 'a=123' 을 = 기준으로 할당 -> cur = { key: a, value: 123 }
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {})
  // query 값이 history 객체의 state 값으로 할당 -> state: {a: '123', b: '456', c: '789'}
  history.replaceState(query,'')

```

## 상태관리(Store)
- 관계가 없는 컴포넌트 끼리 데이터(상태)를 주고 받아보자- 상태 관리
#### Store = 상태관리 장소


- 왜 관계 없는 컴포넌트 끼리 통신을?

인풋값 변경에 따라 message 컴포넌트를 리렌더링 하게끔 함,
이 인풋값 변경을 Store 가 감시함


`Location`
## 관련하여 읽어볼 글
Link: https://woong-jae.com/javascript/220222-web-component

