## 기본
- Example
```ts
interface User {
  name: string,
  age: number,
  isValid : boolean
}

const heropy : User = {
  name: 'Heropy',
  age: 85,
  isValid: true
}

// 불린데이터 없기때문에 에러
const neo : User = {
  name: 'Neo',
  age: 102
}
```
### 선택적 속성 : ?
```ts
interface User {
  name: string,
  age: number,
  isValid? : boolean // ?를 사용해서 있을수도 있고 없을수도 있다(선택적 속성)
}

// ERR 없이 정상실행
const neo : User = {
  name: 'Neo',
  age: 102
}
```
### 읽기 전용 속성 : readonly
```ts
interface User {
  name: string,
  readonly age: number,
  isValid? : boolean
}

heropy.isValid = false
heropy.age = 33 // ERR! -> 읽기 전용이기때문에 값을 재할당하는것이 불가능
```

## 함수 타입 - 호출 시그니쳐(Call Signature)
```ts
interface GetName {
  // 매개변수의 타입과 리턴값의 타입을 지정
  // 소괄호를 통해 함수의 타입을 지정하는 것 : 호출 시그니쳐
  // 재사용하려면 일일히 함수타입 지정보단 호출 시그니처를 이용하는 것이 좋다.
  (message: string): string
}

interface User {
  name: string,
  age: number,
  // 1. 함수 타입 지정 (위에 GetName 인터페이스는 없어도 됨)
  getName : (message: string) => string
  // 2. 호출 시그니처 이용
  getName : GetName
}

const heropy : User = {
  name: 'Heropy',
  age: 85,
  getName(message: string){
    console.log(message)
    return this.name
  }
}

heropy.getName('Hello~')
```


## 인덱싱 기능 타입 - 인덱스 시그니처
```ts
// Array
interface Fruits {
  // 대괄호를 통해 배열타입지정 : 인덱스 시그니처
  [item : number] : string
  // item 지정하는 키(0,1,2...)는 숫자타입, value 는 문자타입 지정
}

const fruits: Fruits = ['Apple', 'Banana', 'Cherry']
console.log(fruits[0]) //Apple

// Object
interface User {
  // 속성값으로 어떤값이 올지 정확히 알수 없다
  [key: string] : unknown
  name: string
  age : number
}

const heropy : User = {
  name: 'Heropy',
  age: 34
}

// [key: string] : unknown 가 없다면 대괄호 표기법은 사용이 불가능함
heropy['isValid'] = true
heropy['emails'] = ['aaaa@gmail.com', 'bbbb@gmail.com']
console.log(heropy) // name,age,isValid,email 모두 출력
```

```ts
interface Payload {
  // 인덱스 시그니처 사용
  [key: string] : unknown
}

function logValues(payload: Payload) {
  for(const key in payload) {
    console.log(payload[key])
  }
}

interface User {
  // 이렇게 인덱스 시그니쳐를 User 에도 쓰면 에러 해결 가능
  [key:string]: unknown
  name: string
  age: number
  isVaild: boolean
}

const heropy : User = {
  name: 'Heropy',
  age: 85,
  isVaild: true
}

// User에 인덱스시그니쳐가 없어서 Payload와 다름 -> ERR! 
logValues(heropy)
```

## 확장(상속)
```ts
interface UserA {
  name: string
  age: number
}

// UserA를 상속(확장)!
interface UserB extends UserA {
  isValid: boolean
}

const heropy : UserA = {
  name: 'Heropy',
  age: 84,
  // isValid 가 User A에 없기 때문에  ERR!
  isValid: true
}


const neo : UserB = {
  name: 'Neo',
  age: 23,
  // UserB 에는 있기때문에 정상 작동
  isValid: true
}
```

```ts
interface FullName {
  firstName: string
  lastName: string
}

interface FullName {
  // 새로운 속성 추가
  middleName: string
  // 똑같은 속성에 다른 타입이 지정되어 ERR!
  lastName: boolean
}


interface FullName {
  firstName: string
  lastName: string
}

interface FullName {
  // 새로운 속성 추가
  middleName: string
  // 똑같은 속성에 다른 타입이 지정되어 ERR!
  lastName: string
}

const fullName : FullName = {
  firstName: 'Tomas',
  middleName: 'Sean',
  lastName: 'Connery'
}
```

