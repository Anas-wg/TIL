# 원시형 데이터
## String(문자열 데이터)
```jsx
const string1 = "Hello";
const string2 = 'hello';
const string3 = `hello ${string1} ?!`;
```
- 리터럴 템플릿
  - 백틱(``) 기호를 사용하여 데이터를 생성, 보간시 주로 사용

## Number(숫자형 데이터)

```jsx
const number = -123
const pi = .14

console.log(number + undefined) //NaN(Not a Number)
console.log(pi) //0.14
```
- NaN
  - 숫자데이터는 맞으나 다른 데이터 타입이 섞여서 연산이 불가함을 의미

- 부동소수점 오류
  - 컴퓨터가 10진수를 2진수로 바꾸는 과정에서 값에 초과 혹은 손실이 발생하는 경우
  - Ex.

    ```jsx
    const a = 0.1
    const b = 0.2

    console.log(a + b) //0.300000000004
    ```

  - toFixed()
    - 단 숫자데이터를 문자데이터로 변환하여 반환하는 것 유의!
    ```jsx
    console.log((a + b).toFixed(1)) //0.3
    ```

  - 그래서 숫자 데이터로 어떻게?
    - Number 데이터 형식 사용
    ```jsx
    console.log(typeof Number((a + b).toFixed(1))) // number
    ```

## Boolean
```jsx
// boolean
const a = true
const b = false

if(b){
  console.log("hello") //출력 안됨
}
```
- true 와 false 를 사용하는 논리 데이터, 특정 상황에서의 분기 처리에 활용이 가능


## null
```jsx
let age = null

console.log(age) //null

setTimeout(function(){
  age = 85
  console.log(age) //85
},1000)
```
- 명시적으로 값이 없음을 나타낼때 사용
- 값이 존재하지 않는다, 값이 비어 있다

## undefined
```jsx
let age //undefined
```
- 암시적으로 변수에 할당된 값이 없을때 js 내부적으로 이를 할당

## 직접 값이 없다고 작성하는 것(null)과 값이 할당되지 않는 것(undefined)은 확연히 다른 것을 유의!