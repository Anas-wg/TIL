## 패키지의 타입 선언

```ts
// main.ts
// install 해도 왜 에러?- lodash 는 JS로 설계, 타입지정이 하나도 안되어있기 때문
import _ from 'lodash'

const str = 'the brown fox jumps over the lazy dog.'

console.log(_.camelCase(str))
console.log(_.snakeCase(str))
console.log(_.kebabCase(str))

```

```ts
// lodash.d.ts
// dts 파일 -> lodash 모듈 타입 선언 
declare module 'lodash'{
  interface Lodash {
    camelCase: (str: string) => string
    snakeCase: (str: string) => string
    kebabCase: (str: string) => string
  }
  const _: Lodash
  export default _
}
```

- 만약 dts 파일 이름을 바꾸고 싶다면 -> 삼중 슬래시 지시자 & 참조태그 사용
```ts
/// <reference path="./main.d.ts" />
```

- 패키지 설치마다 타입선언을 할 수는 없다... lodash 선언하는 타입이 따로 있음
- 개발자들이 타입을 정의해두었다(Definitly Type)
[Repo Link](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ko.md)


## 타입가져오기와 내보내기
```ts
// main.ts
// 중괄호 이용하여 이름으로 함수데이터, 타입 가져오기
import { getFullName, User } from './user'

const heropy: User = {
  firstName: 'Heropy',
  lastName: 'Park',
  age: 34,
  isValid: true
}
const fullName = getFullName(heropy)

console.log(fullName)
console.log(heropy.isValid)
```

```ts
// user.ts -> 타입 내보내기
export interface User {
  firstName : string
  lastName : string
  age: number
  isValid: boolean
}

export function getFullName(user: User){
  return `${user.firstName} ${user.lastName}`
}
```

## tsconfig.json 구성옵션
1. compilerOptions
```json
// 컴파일할 ES 버전 명시 - ES2015 권장
"target" : "ES3"

// 모듈 시스템 지정 - "CommonJS","AMD","ESNext(-> 웹에서 쓰는 ESM 의 최신버전)"
"module" : "CommonJS"

// 모듈 해석 방식 지정 - "Node", "Classic"
"moduleResolution" : "Node"

// ESM 모듈 호환성 활성화 여부
"exModuleIntercop" : false
...
```

[옵션 관련 링크](https://codingapple.com/unit/typescript-tsconfig-json/)

2. include
```json
// 컴파일할 파일 경로 목록
  "include": [
    "src/**/*.ts"
  ],
```
3. exclude
```json
// 컴파일에서 제외할 파일 경로 목록
  "exclude": [
    "node_modules"
  ]
```