# Prototype
JS는 프로토타입 기반의 언어지만, 클래스 개념 사용이 가능

- 1. 프로토 타입이란?
-> 인스턴스(= 생성자 함수에서 반환된 결과) 에서 사용 가능한 별도의 속성, 메소드를 등록한 객체
```jsx
// 생성자 함수
const fruits = new Array( 'Apple', 'Banana', 'Cherry')

// 배열데이터는 length, includes 같은 메소드를 사용 가능
// 이때 이러한 메소드를 "프로토타입" 이라고 함
console.log(fruits) // Array
console.log(fruits.length) // 3
console.log(fruits.includes('Banana'))  // true
console.log(fruits.includes('Orange')) // false

// 베열데이터에서 새로만든 함수를 메소드로 사용
Array.prototype.heropy = function () {
  console.log(this)
}

fruits.heropy() // this = Array 데이터 출력
```

- Case

```jsx
const heropy = {
  firstName: "Heropy",
  lastName: "Park",
  getFullName: function (){
    return `${this.firstName} ${this.lastName}`
  }
}

// neo 객체에도 풀네임 반환하려면?
// 1. 메소드 복사 -> 같은 로직이 2번, 비효율적
const neo = {
  firstName:'Neo',
  lastName: 'Anderson',
}

console.log(heropy.getFullName())

// 2. 메소드 빌려오기 - call 메소드 활용 -> 객체가 여러개라면...? 계속 call 쓰는것은 힘들다
console.log(heropy.getFullName.call(neo))

// 3. Prototype

function User(first, last) {
  this.firstName = first
  this.lastName = last
}

// 프로토 타입의 메소드 => 일반함수 사용!
// getFullName 함수를 프로토타입 메소드로 등록
User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}
const heropy = new User('Heropy', 'Park')
const neo = new User('Neo', 'Anderson')

console.log(heropy) 
console.log(neo)

console.log(heropy.getFullName()) // Heropy Park
console.log(neo.getFullName()) // Neo Anderson
```

-> 이것 프로토타입이 2015년, ES6 의 클래스 문법으로 간소화된 작성, 고도화된 기능을 지원시작

# ES6 Class 기본 문법

- 프로토타입 -> Class 방식
```jsx
// ProtoType
function User(first, last) {
  this.firstName = first
  this.lastName = last
}
User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}

const heropy = new User('Heropy', 'Park')
const neo = new User('Neo', 'Anderson')

console.log(heropy.getFullName())
console.log(neo.getFullName())


//class
class User {
  constructor(first, last){
    this.firstName = first
    this.lastName = last
  }
  getFullName(){
    return `${this.firstName} ${this.lastName}`
  }
}

const heropy = new User('Heropy', 'Park')
const neo = new User('Neo', 'Anderson')

console.log(heropy.getFullName())
console.log(neo.getFullName())
```

# Getter, Setter
## Getter - 값을 얻는(조회) 용도의 메소드
## Setter - 값을 지정하는(할당) 용도의 메소드

- Case
```jsx
class User {
  constructor(first, last){
    this.firstName = first
    this.lastName = last
    // 간단한 방식 - 그러나 새로운 값을 지정했을때, 새로운 값으로 변하지 않는 다는 단점
    // this.fullName = `${first}${last}`
  }
  // 메소드 생성 -> 계속 함수를 호출해야한다는 단점
  // getFullName(){
  //   return `${this.firstName} ${this.lastName}`
  // }

  // get 키워드 사용 -> fullname 메소드 = "getter"
  get fullName(){
    console.log('Getting full Name!')
    return `${this.firstName} ${this.lastName}`
  }
  // "setter"
  set fullName(value) {
    console.log(value)
    // 배열 구조분해할당 사용
    ;[this.firstName, this.lastName] = value.split(' ')
  }
}

const heropy = new User('Heropy', 'Park')

console.log(heropy.fullName)

heropy.firstName = 'Neo'

console.log(heropy.fullName)
// fullname 값을 지정, -> Setter
heropy.fullName = 'Neo Anderson'
console.log(heropy) // Neo Anderson
```

# 정적 메소드

- Example
```jsx
class User {
  constructor(first, last) {
    this.firstName = first
    this.lastName = last
  }
  getFullName(){
    return `${this.firstName} ${this.lastName}`
  }
  // 클래스에서 직접 호출 가능( 인스턴스 X) -> 정적 메소드, 일종의 보조함수 역할 수행
  static isUser(user) {
    if(user.firstName && user.lastName) {
      return true
    }
    return false
  }
}

const heropy = new User('Heropy', 'Park')
const neo = new User('Neo', "Anderson")
const lewis = {
  name: 'Leiws yang',
  age: 56
}

console.log(heropy)
console.log(neo)
// console.log(User.getFullName()) // 직접 호출 불가
// console.log(heropy.isUser()) // 인스턴스에선 정적 메서드 호출 불가

console.log(User.isUser(heropy)) // true
console.log(User.isUser(lewis)) // false
```

# 상속과 instanceof
## 상속

```jsx
// 운송수단
class Vehicle{
  constructor(acceleration = 1){
    this.speed = 0
    this.acceleration = acceleration
  }
  accelerate(){
    this.speed += this.acceleration
  }
  decclerate(){
    if(this.speed <= 0 ){
      console.log('Stop')
      return
    }
    this.speed -= this.acceleration
  }
}


// extends -> 위의 운송수단 클래스와 연결(상속)
class Bicycle extends Vehicle {
  constructor(price = 100, acceleration){
    // extend 사용시 내부에서 super 함수 사용 -> Vehicle 클래스의 constructer 부분
    super(acceleration)
    this.price = price
    this.wheel = 2
  }
}

const bicycle = new Bicycle(300)
bicycle.accelerate()
bicycle.accelerate()

console.log(bicycle)

// 자동차
// 자전거 클래스와 연결
class Car extends Bicycle {
  constructor(license, price, acceleration){
    super(price, acceleration)
    this.license = license
    this.wheel = 4
  }
  // 오버라이딩
  accelerate(){
    if(!this.license){
      console.error('무면허!')
      return
    }
    this.speed += this.acceleration
    console.log('가속' + this.speed)
  }
}

const carA = new Car(true, 7000 ,10)
const carB = new Car(false, 4000, 6)

carA.accelerate()
carA.accelerate()

carB.accelerate()

console.log(carA)
console.log(carB)

// 보트
class Boat extends Vehicle {
  constructor(price, acceleration){
    super(acceleration)
    this.price = price
    this.motor = 1
  }
}

const boat = new Boat(10000, 5)
console.log(boat)
```

## instanceof
- 키워드 앞쪽 데이터가 뒤쪽 클래스의 인스턴스인지를 확인
```jsx
console.log(bicycle instanceof Bicycle) // true
console.log(bicycle instanceof Vehicle) // true

console.log(carA instanceof Car) // true
console.log(carB instanceof Bicycle) // true

console.log(boat instanceof Bicycle) //false
```


# instanceof 와 constructor 
```jsx
class A {
  constructor(){}
}

class B extends A {
  constructor(){
    super()
  }
}

class C extends B {
  constructor(){
    super()
  }
}

// instance 생성
const a = new A()
const b = new B()
const c = new C()

console.log(c instanceof A) //true
console.log(c instanceof B) //true
console.log(c instanceof C) //true


console.log(c.constructor === A ) // false
console.log(c.constructor === B ) // false
console.log(c.constructor === C ) // true
```