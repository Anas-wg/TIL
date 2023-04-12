# 콜백(Call Back)
## 함수 실행시 인수로 들어가는 함수 = 콜백 함수
- Case
```jsx
const a = () => {
  console.log('A')
}

const b = () => {
  console.log('B')
}
// a 함수의 인수로 b 함수를 사용, b를 콜백 함수라고 함
a(b) // A

```

- Case 2
```jsx
// a 함수 먼저 실행, 이후 콜백함수인 b 실행되어 콘솔에 A,B 출력
const a = callback => {
  // if, 순서를 바꾼다면 B, A 순으로 출력
  console.log('A')
  callback()
}

const b = () => {
  console.log('B')
}

a(b) 
```

- Case 3
  - 문제
  ```jsx
  const sum = (a, b) =>  {
    // setTImeOut 설정한 밀리초 만큼 지연
    setTimeout(() => { // 콜백
      return a + b // sum 함수의 리턴이 아니기에 undefined 출력
    }, 1000)
  }

  console.log(sum(1, 2))
  ```
  - 해결
  ```jsx
  // 3번째 인수로 함수데이터가 들어가고, c라는 파라미터가 받아서 이를 사용, 
  const sum = (a, b, c) =>  {
  setTimeout(() => { 
    c(a + b) // c로 받은 함수를 호출 => a ,b 는 c로 받은 함수의 인수로 작용
  }, 1000)
  }

  
  sum(1, 2, value => {
    // a, b의 덧셈값을 value 라는 파라미터로 받아서 출력
    console.log(value) // 1초 뒤 3 출력
  })
  ```

- Case 4 : 이미지 로드 기다리기
```jsx
const loadImage = (url, cb) => {
  const imgEl = document.createElement('img') //js 메모리 상에 img 태그 생성
  imgEl.src = url // src 속성에 url 주소 할당
  // load 이벤트 추가, load 이후 콜백 실행
  imgEl.addEventListener('load', () => {
    setTimeout(() => {
      cb(imgEl)
    },1000)
  })
}

const containerEl = document.querySelector('.container')
// 2번째 파라미터인 imgEl은 주소 load가 끝난 뒤의 imgEl
loadImage('https://item.kakaocdn.net/do/3f9ecc318483850efc55cc21028d68667154249a3890514a43687a85e6b6cc82', imgEl => {
  containerEl.innerHTML = ''
  containerEl.append(imgEl)
})
```
# 재귀(Recursive)
## 함수 자기 자신을 내부에서 호출
```jsx
const a = () => {
  console.log('A')
  a() // 이것이 재귀 -> 이러면 계속 a 함수가 무한호출 -> 브라우저가 GG 친다
}

a()
```

- 따라서 특정 조건을 걸어서 무한대로 호출되지 않도록 하는 것이 필요
```jsx
let i = 0

const a = () => {
  console.log('A')
  i += 1
  // i가 4 미만일때만 재귀호출
  if( i < 4) {
    a()
  }
}

a() // A A A A
```

- Case
```jsx
const userA = {
  name: 'A',
  parent: null
}

const userB = {
  name:'B',
  parent: userA
}

const userC = {
  name:'C',
  parent: userB
}

const userD = {
  name:'D',
  parent: userC
}

// 가장 최상위의 유저를 얻는 함수 
const getRootUser = (user) => {
  // parent 값이 있다면 재귀함수 실행, parent 속성이 없는 A는 재귀 함수 실행 X
  if(user.parent) {
    return getRootUser(user.parent) // 재귀 함수
  }
  return user
}

console.log(getRootUser(userD)) // A 객체 출력
```

# 호출 스케줄링
## 함수 호출을 지연, 반복... etc

- setTimeout & clearTimeout
```jsx
const hello = () => {
  console.log('Hello~')
}
// 2초 뒤 콜백함수 실행(지연)
setTimeout(hello, 2000) 

// 클릭 이벤트 발생시 스케쥴링 취소 (timeout 해제)
h1El.addEventListener('click', () => {
  clearTimeout(timeout)
})
```

- setInterval
```jsx
// 2초 마다 콜백함수 실행(반복)
const timeout = setInterval(hello, 2000) 

// 클릭 이벤트 발생시 스케쥴링 취소 (interval 해제)
h1El.addEventListener('click', () => {
  clearInterval(timeout)
  console.log('Clear')
})
```
# this
- 일반 함수의 this 는 호출 위치에서 정의
```jsx
const user = {
  fisrtName: "Wangi",
  lastName: "Cho",
  age: 85,
  getFullName : function() {
    return `${this.fisrtName} ${this.lastName}`
    // return `${user.fisrtName} ${user.lastName}` 도 동일한 결과
  }
}

// 호출된 user 부분에서 정의됨, 따라서 결과가 동일함
console.log(user.getFullName())
```

- 화살표 함수의 this는 자신이 선언된 함수(렉시컬) 범위에서 정의

```jsx
const user = {
  fisrtName: "Wangi",
  lastName: "Cho",
  age: 85,
  // 자신이 선언된 곳 외부의 다른 함수 기준 -> 없기때문에 undefined
  getFullName : () => {
    return `${this.fisrtName} ${this.lastName}` //undefined
  }
}

console.log(user.getFullName())


function user() {
  // this 는 여기서 정의됨 -> Neo Anderson 출력
  this.fisrtName = 'Neo'
  this.lastName = 'Anderson'

  // 멤버 => 속성 + 메소드
  return{
    // "속성"
    fisrtName: "Wangi",
    lastName: "Cho",
    age: 85,
    // "메소드", 축약 가능
    getFullName() {
      return `${this.fisrtName} ${this.lastName}`
    }
  }
}

const lewis = {
  fisrtName: 'Lewis',
  lastName: 'Yang'
}

const u = user()
console.log(u.getFullName())
// 일반함수는 호출 위치에서 정의 => 메소드를 호출하여 빌려 쓰기 가능, u 는 lewsi 객체 데이터로...
console.log(u.getFullName.call(lewis))
```

- 일반 VS 화살표
```jsx

// 일반
const timer = {
  title: 'TIMER!',
  timeout() {
    console.log(this.title)
    setTimeout(function (){
      console.log(this.title) 
      //undefined , 여기 this 는 timer 아님, 
      // 왜? 일반함수기에 this 는 settimeout 내부에서 정의,
      // 정의될 this 가 내부에 없기에 undefined -> 화살표 함수 사용하면 해결 가능
    }, 1000)
  }
}

// timer 객체 데이터 = this
timer.timeout()


//일반함수
const timer = {
  title: 'TIMER!',
  timeout() {
    console.log(this.title)
    // 화살표함수, this 는 setTimeout 외부인 timeout 함수 범위서 정의 -> tilte 출력가능
    setTimeout(() => {
      console.log(this.title) 
    }, 1000)
  }
}

// timer 객체 데이터 = this
timer.timeout()
```





