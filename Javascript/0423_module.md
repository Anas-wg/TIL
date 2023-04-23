# 목차
[1. 개요](#개요)  
[2. 가져오기와 내보내기](#가져오기와-내보내기-패턴)  
[3. 동적으로 모듈 가져오기 및 가져온 모듈 배로 내보내기](#동적으로-모듈-가져오기-가져온-모듈-바로-내보내기)  

## 개요
### 모듈 : 특정 데이터들의 집합(파일).
➡ 모듈 가져오기(Import), 내보내기(Export)
```jsx
// module.js
export const hello = 'Hello World!'

// main.js
import { hello } from "./module";
console.log(hello) // Hello World!
```
```html
<!-- index.html -->
<script src="./main.js" defer type="module"></script>
```

## 가져오기와 내보내기 패턴
- 기본 내보내기
```jsx
// module.js
export default 123
export default 'ABC' // 🚨ERROR! -> 기본 내보내기는 하나의 데이터만!

// main.js
// 임의의 이름으로 가져오기 가능
import number from './module.js'
console.log(number) //123
```

- 이름 내보내기
```jsx
// module.js
export const str = 'ABC'

// main.js
import xyz, { str , arr, hello } from './module.js'

console.log(xyz) // 123 -> 임의의 변수로 가져오기도 가능
console.log(str) // ABC
console.log(hello) // 함수 데이터
console.log(arr) // []

// 가져온 데이터의 변수이름을 변경 가능
import { str as xyz , arr, hello } from './module.js'
console.log(str) // 🚨 ReferenceError!
console.log(xyz) // ABC


// 모든 데이터 가져올경우 ( * ➡ wildcard 문자)
import * as abc from './module.js'
console.log(abc) // module.js 에서 내보내는 모든 데이터 출력
```

## 동적으로 모듈 가져오기, 가져온 모듈 바로 내보내기
💡 import 코드는 JS 파일 최상단에만 작성가능
```jsx
// 이런건 안됨
setTimeout(() => {
  import * as abc from './module.js'
},1000)
```
➡ 그럼 어떻게? : import 함수 사용
```jsx
setTimeout(() => {
  import('./module.js').then(abc => {
    console.log(abc)
  })
},1000)

// 비동기개념- async, await 사용
setTimeout(async() => {
  const abc = await import('./module.js')
  console.log(abc)
},1000)
```

- 기존 방식
```jsx
// main.js
import { a } from "./a.js";
import { b } from './b.js'

console.log(a()) // 123
console.log(b()) // 456
```

- 하나의 JS 모듈로 내보내기 및 가져오기
```jsx
// utils.js
export { a } from './a.js'
export { b } from './b.js'

// main.js
import { a, b } from './utils.js'
console.log(a()) // 123
console.log(b()) // 456
```


