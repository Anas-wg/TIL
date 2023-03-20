# 03.19 TIL - 참조형, 형변환

## Array(배열)
- 생성자(JavaScript Class)를 이용한 배열 생성
```jsx
  const hope = new Array('i','want', 'to', 'drink', 'soju')
```
- 배열 리터럴 : 중괄호([]) 이용
  - 리터럴: 기호를 통해 데이터를 생성하는 것
```jsx
  const hope = ['i','want', 'to', 'drink', 'soju']
```

- Indexing, 대괄호 표기법으로 1번 아이템(=요소=element)을 인덱싱
  - Zero-based Numbering: 0번부터 시작
```jsx
  console.log(hope[1]) //want
```

- length 속성: 배열 길이 확인
```jsx
  console.log(hope.length) // 5
```

- 마지막 아이템 인덱싱
```jsx
  console.log(hope[hope.length - 1])

```

# Object(객체)
## Key(= Property = 속성): Value(= 값 ) 형태의 데이터 생성
- 생성자 함수 방식
```jsx
function User() {
  this.name = "Wangi"
  this.age = 85
}

const user = new User()
```

- 객체 리터럴
```jsx
const user = {
  name: 'wangi',
  age: 85
}
```

- 특정 value 필요시 -> 점 표기법 혹은 대괄호 표기법 사용
```jsx
console.log(user.name)//Wangi
console.log(user['name'])//Wangi

const key = 'age'
console.log(user[key]) // 변수 채워넣기 가능
```

- 객체 데이터 내부 순서는 존재하지 않는다
  - 속성의 Key는 고유함, 따라서 동일한 Key는 나중에 만든 것이 우선됨

- 객체 내부 데이터로 객체 활용이 가능
  - 여러 뎁스로 객체 데이터가 들어있는 구조도 존재함

```jsx
const userA = {
  name: 'Wangi',
  age: 85
}

const userB = {
  name:"Neo",
  age: "22",
  parent: userA //userA 객체를 value로 사용
}

console.log(userB.parent.name) // Wangi
console.log(userB['parent']['name'])//Wangi
```
```jsx
//indexing
const users = [userA, userB]

console.log(users[0].name)//Wangi
console.log(users[0]['name'])//Wangi
```

# Function(함수)
- 함수 역시 하나의 데이터,
- 함수 자체와 함수 호출은 다른 개념임을 유의할 것

```jsx
  function hello() {
  console.log('hello!')
}

hello() //call, 호출
hello // 함수 데이터 덩어리
```
```jsx
function getNumber () {
  return 123
}

console.log(getNumber) //함수 데이터 출력
console.log(getNumber()) //123
```

- 익명 함수 - 이름이 없는 함수
```jsx
const getNumber = function(){
  return 123
}
```
- Parameter = 매개변수
```jsx
//Case 1
const a = function () {
  console.log('A')
}

const b = function (c) {
  console.log(c)
}

b(123) //123
b(a) // 함수 데이터 출력

//Case 2
const a = function () {
  console.log('A')
}

const b = function (c) {
  console.log(c)
  c()
}

b(a) //A
```

# Type Conversion - 형변환
- 일치 ,동등 연산자
```jsx
const a = 1 //number
const b = '1' //string

console.log(a === b) //false , 일치 연산자
console.log(a == b) //true , 동등 연산자
```
-> 동등 연산자 사용으로 형변환 발생

# Truthy & Falsy - 참과 거짓
```jsx
//123 = Truthy

if (123) {
  console.log('charm')
}
```
- Falsy만 알고 있으면 편하다
  - false
  - 0
  - null
  - undefined
  - NaN
  - ""(빈 문자 데이터)
  - 0n (BigInt 데이터 타입)  


# 데이터 타입 확인
- typeof 활용
```jsx
const a = 123
console.log(typeof a) //number
console.log(typeof false === "boolean") //True
console.log(typeof null === "null") //False
console.log(typeof null === "object")//True
```
null, Array, Object가 구분이 안된다는 단점

- constructor 속성
```jsx
console.log([].constructor) //ƒ Array() { [native code] }
console.log([].constructor === Array) //True
console.log([].constructor === Object) //False
```
null 은 error 가 발생하기때문에 이것도 사용불가

- null 확인 방법
```jsx
console.log(Object.prototype.toString.call(null).slice(8, -1)) //Null
```

- 데이터 타입 판별 함수
```jsx
function checkType(data){
  return Object.prototype.toString.call(data).slice(8, -1)
}

console.log(checkType(null)) //null
console.log(checkType(123)) // number
