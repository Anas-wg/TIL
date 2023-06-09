# 선언과 표현, 호이스팅

## 선언문(Declaration)
```jsx
function hello () {}
```
## 표현식(Expression)
```jsx
// 할당연산자를 사용한 표현식
const hello = function() {}
```
➡ 선언문과 표현식은 호이스팅에서 차이 존재

## 호이스팅
### 함수 선언부가 유효범위 내 최상단으로 끌어올려지는 현상

```jsx
// 호출을 먼저 하고 나중에 선언해도, 콘솔에 잘 출력된다 -> 호이스팅
hello()

function hello () {
  console.log("hello~") //hello~
}

//함수 선언문이 호이스팅되어 에러 없이 작동하는 것.
```

🚨 함수 표현식에선 호이스팅 X
```jsx
hello()

const hello = function () {
  console.log("hello~") //ReferenceError: Cannot access 'hello' before initialization
}
```


# 반환 및 종료

```jsx
```

```jsx
function hello () {
  return 'hello~'
  //🚨 Return 키워드 다음 문장은 실행 X
}
// 함수를 호출하여 반환된 결과를 콘솔에 출력
console.log(hello()) //hello~
console.log(hello) // 함수 데이터 자체가 출력
```

```jsx
function hello () {
  return  //데이터 반환 X
}

console.log(hello()) //undefined
```
- Case 1

```jsx
function plus(num) {
  return num + 1
}

console.log(plus(2)) //3
console.log(plus(7)) //8
console.log(plus()) //NaN


function plus(num) {
  if(typeof num !== 'number'){
    console.log("숫자를 입력해주세요")
    return 0
  }
  return num + 1
}


console.log(plus(2)) //3
console.log(plus(7)) //8
console.log(plus()) //0
```

# 매개변수 패턴

## 기본값
```jsx
function sum(a , b) { // a, b => 매개변수
  return a + b
}

console.log(sum(1, 2)) //1, 2 => 인수
console.log(sum(7)) // NaN


// b의 기본값 지정
function sum(a , b = 1) {
  return a + b
}

console.log(sum(7)) // 8
```

## 구조 분해 할당
- 객체 구조 분해 할당
```jsx
const user = {
  name: "wangi",
  age: 84
}

function getName(user) {
  return user.name
}

console.log(getName(user)) //wangi

//구조 분해 할당 사용 - Case 1
function getName(user) {
  const { name } = user
  return name
}

console.log(getName(user)) //wangi

// 구조 분해 할당 사용 - Case 2

function getName({name}) {
  return name
}

console.log(getName(user)) //wangi
```

- Case 1
```jsx
function getEmail({email = "이메일이 존재하지 않습니다"}){
  return email
}

console.log(getEmail(user)) //이메일이 존재하지 않습니다
```

- 배열 구조 분해 할당
```jsx
const fruits = ['apple', 'banana', 'cherry']

function getSecondItem(array){
  return array[1]
}

console.log(getSecondItem(fruits)) //banana

//배열 구조 분해 할당 사용
const fruits = ['apple', 'banana', 'cherry']
const numbers = [1, 2, 3, 4 ,5]
function getSecondItem([ , b  ]){
  return b
}

console.log(getSecondItem(fruits)) //banana
console.log(getSecondItem(numbers)) //2
```

## 나머지 매개변수  

🚨전개연산자를 사용하여 나머지 매개변수 사용

```jsx
function sum(...rest) {
  console.log(rest)

  //유사 배열
  console.log(arguments)

  //reduce 메서드 -> 배열 아이템 갯수 만큼 콜백함수 실행
  // ex. sum(1, 2)
  // 첫번째 호출시 acc 의 초기값 = 0, cur =1
  // 두번째 호출시 acc = 1, cur = 2

  return rest.reduce(function(acc, cur){
    return acc + cur
  }, 0)
}

console.log(sum(1, 2)) //3

console.log(sum(1, 2, 3, 4)) //10

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)) // 55
```

cf> 유사 배열 (Array-Like)  
나머지 매개변수 처럼 배열과 유사하게 함수로 들어오는 인수의 정보를 가짐  
그러나 배열 데이터가 아니기에 reduce 같은 메서드 사용 X  
-> Array.isArray 로 판별 가능

# 화살표 함수(표현)  

🚨 할당 연산자를 사용하여 함수를 간략히 표현
- 차이점 
1. function 키워드 생략가능  
2. 중괄호와 리턴 키워드 생략가능
```jsx
const sum = () => {}

const sum = (a, b) => {
  return a + b
}
console.log(sum(1, 2)) //3

// 중괄호, 리턴 생략
const sum = (a, b) => a + b
```

- Case
```jsx
// 1. 기본 형태
const a = () => {}

// 2. 매개변수 1개면 소괄호 생략 가능
const b = x => {}

// 3. 2개부턴 생략 불가
const c = (x, y) => {}

// 4. 리턴 및 중괄호 생략 가능
const d = x => { return x * x }
const e = x => x * x

// 5. 주의 사항1 : 함수 내 리턴 키워드 말고 다른 명령문 있으면 생략 불가
const f = x => {
  console.log(x*x)
  return x * x
}

// 6. 주의 사항 2: 객체데이터 반환 시
const g = () => {return { a: 1}}
// ERROR! => 객체데이터의 리터럴 = 함수 블록으로 인지, 잘못된 방법
const h = () => { a : 1}
// 해결책 -> 소괄호 사용
const i = () => ({a : 1})

// 7. 배열데이터 반환할때는 소괄호 사용 필요 X
const j = () => { return [1, 2 ,3]}
const k = () => [1, 2, 3]
```


# 즉시실행함수(IIFE)
## Immediately-Invovled Function Expression
함수를 만들자 마자 바로 사용이 가능
- Example
```jsx
const a = 7

const double = () => {
  console.log(a * 2) // 14
}
//호출이 필요한 기존 함수
double()

//호출 없이 출력이 가능한 즉시 실행함수
;(() => {
  console.log(a * 2) // 14
})()
```

- Case Pattern
```jsx
// 1. (F)()
;(()=> {console.log(a * 2)})()

// 2. (F)() 
;(function (){console.log(a * 2)})() 

// 3. (F())
;(function (){console.log(a * 2)}()) 

// 4. !F()
;!function() {console.log(a * 2)}()

 // 5. +F()
;+function() {console.log(a * 2)}()
```


