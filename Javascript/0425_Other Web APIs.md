## Console
```jsx
// log: 일반 메시지 출력
console.log(document.body)
// warn : 경고 메시지 출력
console.warn(document.body)
// error : 에러 메시지 출력
console.error(document.body)
// dir: 속성을 확인 할 수 있는 객체를 출력
console.dir(document.body)
```

- .count() .countReset() : 콘솔에 메소드 호출의 누적된 횟수를 출력 / 초기화
```jsx
console.count('a') //a: 1
console.count('a') // a: 2
console.count('b') // b: 1
console.count('a') // a: 3

console.log('Reset a!')
console.countReset('a')

console.count('a') // a: 1
console.count('b') // b: 2
// 만약 count 메소드에 아무런 이름 없으면 default로 카운트!

```
- .time() .timeEnd() : 콘솔에 타이머가 시작해서 종료되기까지의 시간(ms)를 출력
```jsx
console.time('반복문')

for(let i = 0; i < 10000; i += 1){
  console.log(i) // ms 쭈욱 출력
}

console.timeEnd('반복문') // 반복문: 177.677978515625 ms
```
- .trace() : 메소드 호출스택(CAll stack)을 추적해 출력
```jsx
function a() {
  function b() {
    function c(){
      console.log('Log!')
      console.trace('Trace!') // a b c 함수가 어떤 범위에서 실행되었는지 출력 -> b @ main.js:7
    }
    c()
  }
  b()
}
a()
```

- .clear() : 콘솔에 기록된 메시지를 모두 삭제
```jsx
console.log(1)
console.log(2)
console.log(3)
console.clear() // Console was Cleared
```

- 서식문자 치환(파이썬의 포멧팅이랑 비슷)  
💡 데이터를 서식문자로 치환하여 삽입
```jsx
//  %s - 문자로 적용
//  %o - 객체로 적용
//  %c - CSS를 적용

const a = 'The Brown Fox!'
const b = 3
const c = {
  f : 'fox',
  d: 'dog'
}

console.log('%s jumps!', a) // The Brown Fox! jumps!

console.log('%o is Object', c) // {f: 'fox', d: 'dog'} is Object
console.log('%c the brown fox', // 텍스트 갈색으로 콘솔에 출력
  'color: brown;'
)
```

## Cookie, Stroage
- Cookie 
  - 💡도메인 단위로 저장
  - 💡표준안 기준, 사이트당 최대 20개, 4KB 로 제한
  - 💡영구저장 불가능

```jsx
// domain : 유효 도메인 설정
//  path: 유효 경로 설정
//  expires : 만료 날짜(UTC DATE) 설정
//  max- age : 만료 타이머(s) 설정 

document.cookie = `a=1; max-age=${(60 * 60 *60 * 3)}` // 백틱 이용하여 3일 뒤 쿠키 만료
document.cookie = 'b=2; domain=localhost; path=/abc' // path=/: 모든 하위경로
document.cookie = `c=3; expires=${(new Date(2024,0,15))}`// 2024.01.15에 만료날짜 설정
// 만료시간 지정안하면 "세션" -> 브라우저 종료시 쿠키도 만료

// 새값으로 덮어쓰기도 가능
document.cookie = 'a=3'

// 값 누적 가능
console.log(document.cookie)

// 함수 이용하여 쿠키 얻어내기
function getCookie(name){
  const cookie = document.cookie
    .split('; ')
    .find(cookie => cookie.split('=')[0] === name)
  return cookie ? cookie.split('=')[1] : null
}

console.log(getCookie('a')) // 1
console.log(getCookie('d')) // null
```
- Storage
  - 💡도메인 단위 저장
  - 💡5MB 제한
  - 💡세션단위 혹은 영구 저장 가능

```jsx
// sessionStorage : 브라우저 세션이 유지되는 동안에만 저장
// localStorage : 따로 제거하지 않으면 영구적으로 저장

// .getItem() : 데이터 조회
// .setItme(): 데이터 추가
// .removeItem() : 데이터제거
// .clear(): 스토리지 초기화

localStorage.setItem('a','Hello world!')
localStorage.setItem('b',{ x:1, y: 2})
localStorage.setItem('b',JSON.stringify({ x:1, y: 2}))

localStorage.setItem('c',123)


// 문자 데이터 상태로 저장된 다는 것 주의! -> JSON.stringify 활용
// 문자열이라 하더라도 stirngify 활용해야함
console.log(localStorage.getItem('a')) // Hello world!
console.log(JSON.parse(localStorage.getItem('b'))) 
console.log(localStorage.getItem('c')) // 123(string)

// 🚨 Storage 는 만료개념이 없음, 세션스토리지로 만들거나, clear시켜주어야 함
// 하루동안 창 열지않기 등등의 기능에 사용
```
## Location
💡 현재 페이지 정보를 반환하거나 제어  
```jsx
// .href: 전체 URL 주소
// .protocol : 프로토콜
// .hostname : 도메인 이름
// .pathname : 도메인 이후 경로
// .host : 포트 번호를 포함한 도메인 이름
// .port : 포트 번호
// .hash : 해시 정보(페이지의 ID)

// .assign(주소) : 해당"주소"로 페이지 이동
// .replace(주소) : 해당'주소'로 페이지 이동, 🚨현재 페이지의 히스토리를 제거
// .reload(강력) : 페이지 새로고침, 'true'인수 전달시 '강력' 새로고침

console.log(location)
```
## History
💡 브라우저 히스토리(세션 기록) 정보를 반환하거나 제어

```jsx
// .length: 등록된 히스토리 개수
// .scrollRestoration 히스토리 탐색시 스크롤 위치 복원 여부 확인 및 지정
// .state: 현재 히스토리에 등록된 데이터 (상태)

// .back(): 뒤로 가기
// .forward(): 앞으로 가기
// .go(위치): 현재 페이지 기준 특정 히스토리 '위치'로 이동
history.go(-2) // 뒤로가기 2번


// .pushState(상태, 제목, 주소): 히스토리에 상태 및 주소를  추가
history.pushState({a:1},'','/#hello4') // 주소 추가(length 증가), state 속성에 {a:1} 추가
// .replaceState(상태 ,제목, 주소): 현재 히스토리의 상태 및 주소를 교체
history.replaceState({b:1},'','/#hello4') // 주소 변경(length값 동일함), state 속성에 {b:1}로 교체
// 🚨 모든 브라우저(Safari 제외)는 '제목'옵션을 무시


console.log(history)
```

- Case
```jsx
const page1 = /* html */`
  <section class="page1">
    <h1>Page 1</h1>
  </section>
`
const page2 = /* html */`
  <section class="page2">
    <h1>Page 2</h1>
  </section>
`
const page3 = /* html */`
  <section class="page3">
    <h1>Page 3</h1>
  </section>
`
const pageNotFound = /* html */`
  <section>
    <h1>404 Page Not Found!</h1>
  </section>
`

const pages = [
  {path: '#/page1',template: page1},
  {path: '#/page2',template: page2},
  {path: '#/page3',template: page3}
]
const appEl = document.querySelector('#app')

const render = () => {
  // console.log(history)
  const page = pages.find(page => page.path === location.hash)
  appEl.innerHTML = page
    ? page.template // page값 존재시
    : pageNotFound // page 값 없다면
}

// popstate -> 사용자가 히스토리 객체를 남길때마다 
window.addEventListener('popstate',render)
render()

const pagePush = num => {
  history.pushState(`전달할 데이터 - ${num}`,null , `#/page${num}`)
  render() // 화면 갱신
}

const inputEl = document.querySelector('nav input')
inputEl.addEventListener('keydown',event => {
  // Enter키 누르면 그때 input값을 인수로 전달하여 pagepush 함수 호출
  if(event.key === 'Enter') {
    pagePush(event.target.value)
  }
})
```