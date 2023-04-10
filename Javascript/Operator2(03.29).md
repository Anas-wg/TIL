## Nulish 병합, 삼항 연산자


- Nulish 병합 연산자 - ??
  - Nulish -> Null, undefined
```jsx
const n = 0; 

//or 연산자 사용 -> 거짓이 아닌 참인 데이터를 찾음(Falsy 데이터 기준)
const num1 = n || 7
console.log(num1) // 7

//Nulish 연산자 -> null,undefined를 제외한 Falsy 데이터를 반환 -> 더 엄격한 기준
const num2 = n ?? 7
console.log(num2) // 0

//null, undefined 는 반환 X
console.log(null ?? 1) // 1

// 다른 데이터로 넘어가야 하지만 없기때문에 undefined 출력
console.log(null ?? undefined) // undefined

console.log(false ?? 1 ?? 2) // false
```

- 삼항 연산자
  - 형식:  조건 ? [참일 경우] : [거짓일 경우]

```jsx
const a = 1

// 동일한 charm 출력

// if 조건문
if( a < 2 ) {
  console.log("charm!") //charm
} else {
  console.log("거짓...")
}

//삼항 연산자 
console.log(a < 2 ? "charm" : "geojit") //charm
```


```jsx
//예시
function getAlert(message) {
  return message ? message : "메시지가 없습니다."
}

console.log(getAlert("안녕하세요~"))
console.log(getAlert("")) // 메시지가 없습니다.
```


## 전개 연산자(Spread Operator) - ...
- 배열내 데이터 전개(펼쳐 놓는) 기능

```jsx
const a = [1, 2, 3]
const b = [4, 5, 6]

//concat 두개의 배열 합칠때 사용하는 메서드
const c = a.concat(b)
console.log(c) // [1, 2, 3, 4, 5, 6]


const d = [a , b]
console.log(d)  //[Array(3), Array(3)]

//전개 연산자 사용
const e = [...a, ...b]
console.log(e) // [1, 2, 3, 4, 5, 6]
```

```jsx
const a = { x : 1, y : 2 }
const b = { y : 3, z : 4 }

//Object assgin
const c = Object.assign({}, a, b)
console.log(c) //{x: 1, y: 3, z: 4}

//전개 연산자
const d = {...a, ...b}
console.log(d)//{x: 1, y: 3, z: 4}
```

```jsx
function fn(x, y, z) {
  console.log(x, y, z)
}

fn(1, 2, 3)

const a = [1, 2, 3]

fn(a[0], a[1], a[2]) //1 2 3
fn(...a) //1 2 3
```

---

## 구조 분해 할당 (Destructing assignment)

```jsx
const arr = [1, 2, 3]
//각각 인덱싱
const a = arr[0]
const b = arr[1]
const c = arr[2]

//구조분해 할당
const [a, b, c] = arr

console.log(a,b,c) //1 2 3
```

```jsx
let a = 0 
let b = 0
let c = 0


const arr = [1, 2, 3]

//구조분해 할당
[a, b, c] = arr

console.log(a,b,c) //Reference Err!
```

  - 에러의 이유
    ```jsx
    const arr = [1, 2, 3][a, b, c] = arr
    ```
    로 이해함.   
    arr 배열 초기화 전에 이를 사용하려 하기 때문

    - 해결책 : 세미 콜론 활용
    ```jsx
    ;[a, b, c] = arr
    ```
  

- Case 2

```jsx
let b = 0
let c = 0
const arr = [1, 2, 3]

//2->b 3-> c 위해서는 앞에 쉼표로 자리 비워두어야 함.
;[, b, c] = arr

console.log(b,c) //2, 3
```

- Case 3
```jsx
const arr = [1, 2, 3]
//rest 변수에 2, 3을 할당하려는 의도
const [a, rest] = arr

console.log(a, rest) // 1 ,2 -> 의도와 다름
```

```jsx
const [a, ...rest] = arr

console.log(a, rest) // 1 ,[2, 3]
```


- Case 4 (객체 데이터)
```jsx
const obj = {
  a: 1,
  b: 2,
  c: 3
}

// 개별 할당
// const a = obj.a
// const b = obj.b
// const c = obj.c

//구조 분해 할당
const {a, b} = obj

console.log(a, b) //1, 2 

// 새로운 key & value 할당 가능
const {a, b, x = 4} = obj

console.log(a, b, x) //1, 2, 4
```

- 구조분해할당시 유의점
나머지 요소의 오른쪽 뒤 쉼표가 존재하면 SyntaxError 발생
```jsx
var [a, ...b,] = [1,2,3]; // ERROR!
```
-> 상식적으로 생각해보았을때, a 변수에 1을, 전개연산자를 활용하여 b 변수에 나머지 요소들을 다 할당.  
쉼표를 통해 만들어진 새로운 변수에 할당될 요소가 없기 때문에 당연히 에러가 뜨는 것