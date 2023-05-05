## 개요
2012, MS 에서 발표한 JS 기반의 정적 타입 문법을 추가한 프로그래밍 언어

## 정적 vs 동적?
- JS (동적 타입): 런타임에서 동작시 타입오류 확인
- TS (정적 타입): 코드 작성 단계에서 타입오류 확인
-> JS로 변환 후 브라우저나 Node.js 환경에서 동작

```ts
let hello: string = "hello world"
hello = 'hello~'
console.log(hello)
```

## 타입 종류
- 문자
```ts
let str : string // null값주고 이후에 할당이 가능
let red : string = "Red"
let green : string = "Green"
let myColor : string = `My color is ${red}`
let yourColor : string = `Youre color is` + green
```

- 숫자
```ts
let num : number
let integer : number = 6
let float : number = 3.14
let infinity : number = Infinity
let nan : number = NaN
```

- 불린
```ts
let isBoolean : boolean
let isDone : boolean = false
```

- Null/Undefined
```ts
let nul : null
let und : undefined

console.log(nul) // error!, nul 값에 할당된 것이 없기 때문

nul = null
console.log(nul) // undefined
```


- 배열
```ts
const fruits : string[] = ['Apple', 'Banana', 'Cherry'] // 배열의 아이템 타입까지 지정
const numbers: number[] = [1, 2, 3, 4, 5, 6, ""] // ERROR!
const union: (string|number)[] = ['Apple', 1, 2, 'Banana', 3] // 문자, 숫자 혼합 --> | : Union 타입
const array: [] = [1,2,3,4,] // ERR! , 4개의 요소가 있지만 허용된것이 0개
// 반드시 타입 작성해줄것!
```

- 객체
```ts
// typeof DATA === 'objcect
const obj : object = {}
const arr : object = []
const func : object = function () {}

const userA : {
  // 타입 지정
  name : string
  age : number
  isValid : boolean
} = {
  // 타입에 맞는 key:value 할당
  name: 'Wangi',
  age: 85,
  isValid: true
}
```
-> 근데 이게 객체가 여러개라면...? : interface 사용!
```ts
// 일반적 변수와 구분하기 위해 대문자로 첫글자 사용
interface User {
    // 타입 지정
    name : string
    age : number
    isValid : boolean
}
const userA : User = {
  name: 'Wangi',
  age: 85,
  isValid: true
}

const userB : User = {
  name: 'Anas',
  age: 22,
  isValid: false
}
// key값, value 의 타입형식 동일하게 맞춰야함
```

- 함수
```ts
// 변수와 할당연산자 사이에 타입 지정
const add = function (x:number, y: number): number{
  return x + y
}

// parameter, return 값까지 타입 지정
const add = number 
= function (x:number, y: number): number{
  return x + y
}

const a: number = add (1, 2)

const hello: () => void = function () {
    // void type, return 키워드 없어도 void type 을 반환, 
  console.log('Hello World~')
}

const h: void = hello()
```


## 타입 종류

- Any
```ts
// 아무거나!
let hello: any = 'hello world!'
hello = 123
hello = false
hello = null
hello =  {}
hello = []
hello = function(){}
// ts는 타입관리가 철저해야함, any type을 남발하지 않는 것이 convention
```

- Unknown
```ts
// 아무거나!
const a: any = 123
// "일단" 알 수없음!
const u: unknown =123

// any 는 아무거나 상관이 없다 -> 이러면 TS 를 왜 써...?
const any : any = a
const boo: boolean = a
const num : number = a
const arr : string[] = a
const obj: {x: string, y: number} = a

// any 타입에 unkonwn 은 가능
const any : any = u

// 그러나 불린,문자,숫자,객체에 unKnown 할당시 에러발생
const boo: boolean = u // ERR!
const num : number = u // ERR!
const arr : string[] = u // ERR!
const obj: {x: string, y: number} = u // ERR!
```

- Tuple
```ts
// 배열아이템의 위치에 각각의 타입을 지정
// 배열과 달리 아이템의 개수를 명시하게 됨
const tuple: [string, number, boolean] = ['a', 1, false]
const tuple: [string, number, boolean] = ['a', 1, false,2] // ERR!
// 숫자, 문자, 불린 형태 - 순서와 개수 모두 맞춰주어야 함
const users: [number, string, boolean][] 
  = [[1, 'Neo', true], [2, 'Wangi', false]]
```

- Void
```ts
// parmeter 의 타입은 문자, 리턴하는 값의 키워드는 void
// return 값이 없는 경우 void, (undefined 로 타입규정시 에러발생)
function hello (msg: string) : void {
  console.log(`Hello ${msg}`)
}
const hi : void = hello('world') // Hello World
```

- Never
```ts
// 절대 발생하지 않을 타입 - ex. 배열데이터로 아무것도 할당할 수 없음
// 보통 타입지정이 잘못되었을때 에러메시지로 뜨는 경우 있음
const nev : [] = []
new.push(0)
```

- Union
```ts
// 문자 또는 숫자 데이터 할당 가능
let union : string | number
union = 'Hello Ts'
union = 123
union = false // 불린은 ERR

let union : string | number | boolean
union = false // 이렇게 하면 가능

// 배열데이터의 아이템의 타입을 규정 - "배열"
let union : (string | number)[]
union = 'Hello Ts' // ERR
union = 123 // ERR
union = false // ERR
```

- Intersection
```ts
interface User {
  name: string,
  age : number
}

interface Validation {
  isVaild: boolean
}

const heropy: User & Validation = {
  name : 'NEo',
  age: 85,
  isVaild: true
}

const heropy: User & Validation = {
  name : 'NEo',
  age: 85,
} // ERR! -> Validation 에서 필수로 사용할 불린값이 없기 때문에 에러 발생
```