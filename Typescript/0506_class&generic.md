## class
### 접근 제어자(Access Modifiers)
1. public: 어디서나 자유롭게 접근 가능, 클래스 바디에서 생략 가능
2. protected: 나와 파생된 후손 클래스 내에서 접근 가능
3. private: 내 클래스에서만 접근 가능

```ts
class UserA {
  // 클래스의 body 부분에서 this로 접근하는 속성의 타입을 지정
  public first : string = '' // A,B,C 모두 접근 가능
  protected last : string = '' // A,B 만 접근 가능
  private age : number = 23 // A만 접근 가능
  constructor(first: string, last: string, age: number){
    this.first = first
    this.last = last
    this.age = age
  }
  // 메소드 역시 접근제어자 사용 가능
  protected getAge(){
    return `${this.first} ${this.last} is ${this.age} `
  }
}

class UserB extends UserA {
  getAge(): string {
    // age는 UserA 내에서만 사용 가능 -> ERR!
    return `${this.first} ${this.last} is ${this.age} `
  }
}

class UserC extends UserB {
  getAge(): string {
      // age는 UserA 내에서만 사용 가능 -> ERR!
      // last는 UserA와 후손클래스인 UserB 에서만 사용가능 -> ERR!
    return `${this.first} ${this.last} is ${this.age} `
  }
}

const neo = new UserA('Neo', 'Anderson', 102)
console.log(neo.first)
console.log(neo.last)
console.log(neo.age)
```
- 매개변수 부분에서의 접근제어자 사용 및 축약
```ts
class UserA {
  // 클래스의 body 부분에서 this로 접근하는 속성의 타입을 지정
  // 매개변수 부분에선 접근제어자 생략 불가
  constructor(
    public first: string = '',
    public last: string = '',
    public age: number = 23
    ){
  }

  protected getAge(){
    return `${this.first} ${this.last} is ${this.age} `
  }
}
```

## Generic
### 1. 함수
```ts
interface Obj {
  x: number
}
type Arr = [number, number]

// // 함수 오버로딩을 통한 타입 지정 = (params 타입): 리턴값 타입
// function toArray(a: string, b: string):string[]
// function toArray(a: number, b: number):number[]
// function toArray(a: boolean, b: boolean):boolean[]
// function toArray(a: Obj, b: Obj):Obj[]
// function toArray(a: Arr, b: Arr):Arr[]
// function toArray(a: any, b: any) {
//   return [a, b]
// }

// Generic 문법 활용
function toArray<T>(a: T, b: T){
  return [a, b]
}

console.log(
 // T -> string 타입을 정의
  toArray<string>('Neo', '123'), // 숫자 데이터 들어가면 ERR!
  toArray(1, 2),
  toArray(true, false),
  toArray({x: 1}, {x: 2}),
  // tuple 이 아닌 number[]로 인식
  // toArray([1, 2],[3, 4]),

  // <arr> 붙여서 튜플로 인식
  toArray<Arr>([1, 2],[3, 4]),
)
```

### 2. Class
```ts
class User<P> {
  constructor(public payload : P) {}
  getPayload(){
    return this.payload
  }
}

interface UserAType {
  name: string
  age: number
  isValid : boolean
}

interface UserBType {
  name: string
  age: number 
  emails: string[]
}

// 인수로 객체를 전달 -> UserAType 지정
// 
const heropy = new User<UserAType> ({
  name : 'Heropy',
  age: 85,
  isValid: true,
  // emails: [] // UserAType 과 일치하지 않기에 ERR!
})

const neo = new User<UserBType>({
  name: 'Neo',
  age: 23,
  emails: ['neo@gmail.com']
})
```
➡ 타입을 제네릭 문법을 활용하여 유연하게 사용이 가능

### 3. 인터페이스 & 제약조건
- 인터페이스 사용 예시
```ts
interface MyData<T> {
  name: string
  value : T
}

const dataA : MyData<string> = {
  name: 'Data A',
  value: 'Hello word'
}

const dataB: MyData<number> = {
  name: 'Data B',
  value: 1234
}

const datatC: MyData<boolean> = {
  name: 'Data C',
  value: true
}

// 숫자 아이템 베열
const dataD : MyData<number[]> = {
  name : 'Data D',
  // 타입에 맞는 아이템
  value: [1, 2, 3, 4]
}
```

- 제약조건
```ts
// T의 타입을 특정 타입으로 제한하고 싶을때 -> 제약 조건
// 문자, 숫자 타입만 허용
interface MyData<T extends string | number > {
  name: string
  value : T
}

// 불린인 dataC, 배열인 dataD 는 ERR!
```