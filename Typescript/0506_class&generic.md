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