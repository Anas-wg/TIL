## Inference : 타입추론
- TS 는 타입을 일일히 지정하는 것이 아닌, 추론을 이용하고 필요한 곳에서만 지정함

```ts
let num = 12 // number 라고 쓰지 않아도 숫자데이터를 할당했기에 이를 숫자로 추론
num = 'Hi TS!' // 따라서 문자를 할당했기 때문에 에러 발생
```

- Case
```ts
// 추론 근거
// 1. 초기화된 변수
// 2. 기본값이 설정된 매개 변수
// 3. 변환값이 있는 함수

// 초기화된 변수 'num'
let num = 12

/* 
  기본값이 지정된 매개변수 'b' -> 기본값으로 숫자 지정, 숫자로 타입 추론
  변환값이 확실한 함수 'add'  -> a,b가 둘다 확실하게 숫자, ts 는 반환값 역시 숫자로 추론
*/
function add( a: number, b = 2 ){
  return a + b
} 
```

## Assertions : 타입 및 할당 단언 (as , !)
```ts
// Non-null 단언 연산자 -> !

const el = document.querySelector('body')
el.textContent = 'Hello world?!' 
// ERR -> "possibly" null, body 태그를 못찾을 가능성을 가정
// TS는 script 코드내에서만 추론하기에 개발자가 이를 "단언"해주어야 함

// 키워드 : as 사용하여 단언
const el = document.querySelector('body') as HTMLBodyElement

// Non-null 단언 연산자 : ! 사용 -> 개발자를 통해 null 값이 아님을 확인,코드상 ERR 발생 X
// But, title 요소가 html 상 없음에도 코드상에서 에러를 막아버리게 됨 -> console에서 ERR 발생
const el = document.querySelector('.title')
el!.textContent = 'Hello world?!' 


// 💡 해결책 -> if 문 활용
// 물리적으로 데이터가 있는경우에만 실행 ---> 타입 가드
if (el) {
  el.textContent = 'Hello world?!' 
}
```

- Case 2
```ts
function getNumber(x : number | null | undefined) {
  return Number(x.toFixed(2)) // ERR! : "possibly" null or undefined
}
getNumber(3.1415926535)
getNumber(null)


// 잘못된 타입 단언 -> 코드상에선 에러 X
function getNumber(x : number | null | undefined) {
  return Number((x as Number).toFixed(2)) 
}
getNumber(3.1415926535)
getNumber(null) // null 데이터가 들어오게 되면 실행이 불가능
//Uncaught TypeError: Cannot read properties of null (reading 'toFixed')


// Non-null 단언 연산자 활용
function getNumber(x : number | null | undefined) {
  return Number(x!.toFixed(2)) 
}

// 조건문을 통해 걸렀기 때문에 굳이 타입 단언이 필요 없음 -> 타입가드
function getNumber(x : number | null | undefined) {
  if(x) {
    return Number(x.toFixed(2)) 
  }
}
```

- Case 3
```ts
function getValue(x: string | number, isNumber : boolean) {
  if(isNumber) {
    return Number(x.toFixed(2))
  }
  return x.toUpperCase() //숫자,문자 두개의 타입에서 모두 대문자화가 불가 -> ERR!
}

getValue('hello world', false) // HELLO WORLD
getValue(3.1415926535, true) // 3.14

// x 값 맞는 타입으로 단언
// !는 사용하지 못함, 각 상황마다 타입을 지정해주어야 함, null, undefined 가 들어올 이유가 없음
function getValue(x: string | number, isNumber : boolean) {
  if(isNumber) {
    return Number((x as Number).toFixed(2))
  }
  return (x as string).toUpperCase() 
}

getValue('hello world', false) // HELLO WORLD
getValue(3.1415926535, true) // 3.14
```

### 할당 단언
```ts
let num : number
console.log(num) // 할당 전에 사용하므로 에러!
num =123


// 할당 단언 (non-null 아님), undefined 출력하고 싶을때
let num!: number
console.log(num) // undefined
num = 123
```

## Guard : 타입 가드
➡ 에러가 발생할 수 있는 상황을 코드상에서 방어
```ts
function logText(el: Element) {
  console.log(el.textContent) // TypeError: Cannot read properties of null (reading 'textContent')
}

const h1El = document.querySelector('h1') as HTMLHeadingElement
logText(h1El)

// 타입가드를 활용

// 타입가드 -> null 값은 falsy 기에 if문 통과 자체가 안됨
if(h1El) {
  logText(h1El)
}

// Case2
// class 의 인스턴스가 존재한다면(= h1 요소가 있다면) 호출 가능
if(h1El instanceof HTMLHeadingElement) {
  logText(h1El)
}
```

- Case 2
```ts
// 숫자는 소수점 2자리까지, 문자는 대문자로바꾸는 함수
function add(val: string | number) {
  let res = `Result => `
  // val의 type 이 number 일 경우에만 (타입 가드사용!)
  if (typeof val === 'number') {
    res += val.toFixed(2)
  } else {
    res += val.toUpperCase()
  }
  console.log(res)
}

// 만약 boolean 을 추가시,
function add(val: string | number | boolean) {
  let res = `Result => `
  if (typeof val === 'number') {
    res += val.toFixed(2)
  } 
  // if 문을 통한 타입가드로 문자열일 경우에만 실행
  if (typeof val === 'string'){
    res += val.toUpperCase()
  }
  console.log(res)
}

add(3.141592)
add('hello')
```