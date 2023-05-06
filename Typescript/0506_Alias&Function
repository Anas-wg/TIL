## Alias : 타입 별칭
```ts
// 타입 별칭 지정
// TypeA는 문자데이터
type TypeA = string
// TypeB는 Union 데이터
type TypeB = string | number | boolean

// 객체와 tuple 타입별칭(User) 지정
type User = {
  name: string
  age: number
  isValid : boolean
} | [string, number, boolean]

const userA : User = {
  name: 'Neo',
  age: 85,
  isValid: true
}
const userB : User = ['Evan', 34, false]

// Type B 형태의 데이터를 받아 TypeA 타입의 데이터를 리턴
function someFunc(param: TypeB): TypeA {
  switch(typeof param){
    case 'string':
      return param.toUpperCase()
    case 'number' :
      //.toFixed() 는 문자데이터 반환
      return param.toFixed(2)
    default:
      // 리턴값은 문자 타입인데 불린을 리턴하니 ERR!
      return true
      // 따라서 이렇게 문자 데이터를 반환해야 ERR X
      return 'Boolean'
  }
}
```
- InterFace vs Type Alias
```ts
// 타입별칭 - 키워드(type), 이름, 할당연산자를 통해 데이터 타입을 할당
type TypeUser = {
  name: string
  age: number
  isValid: boolean
}
// 인터페이스 - 키워드(interface), 이름, 데이터 타입을 명시
interface InterfaceUser {
  name: string
  age: number
  isValid: boolean
}

// 기능적으론 차이가 없음 -> 취향차이....?
// 타입별칭은 다양한 타입의 별칭을 지정
// 인터페이스는 타입지정도 가능한데 객체데이터를 전제로 함
const heropy: InterfaceUser = {
  name: 'Heropy',
  age: 85,
  isValid: true
}
const heropy: TypeUser = {
  name: 'Heropy',
  age: 85,
  isValid: true
}
```

## 함수 - 명시적 this
```ts
interface Cat {
  name: string
  age: number
}

const cat: Cat = {
  name: 'Lucy',
  age: 3
}

function hello(message: string) {
  // ERR => 형식 주석 없어서 any 타입 포함
  console.log(`Hello${this.name}, ${message}`)
}

// 인터페이스 추가, this의 타입을 명시해서 지정
// 단 이것이 파라미터의 개념은 아님, TS의 문법으로 이해
function hello(this: Cat, message: string) {
  console.log(`Hello ${this.name}, ${message}`)
}

// cat 객체데이터 => this
hello.call(cat, 'You are pretty awesome!')
```

## 함수 - overloading
```ts
function add1(a: string, b: string) {
  return a + b
}

function add2(a: number, b: number) {
  return a + b
}

add1('hello','world~')
add2(1, 2)
// 문자 + 문자라서 ERR
add1('hello', 2)
// 숫자 + 숫자라서 ERR
add2('hello', 2)
```
- overloading 사용
```ts
// 오버로딩 - 하나의 이름으로 타입만 "분기"
function add(a: string, b:string): string // 타입선언
function add(a: number, b:number): number // 타입선언
function add(a: any, b:any) { // 함수 구현
  return a + b
}

add('hello','world~')
add(1, 2)
add('hello', 2) // ERR! 타입이 맞지 않음
```