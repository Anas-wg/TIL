# 목차
[1. 정규식생성](#정규식-생성)  
[2. 메소드](#메소드)  
[3. 플래그](#플래그)  
[4. 패턴](#패턴1)  
[5. 패턴](#패턴2)  


## 정규식 생성
### 정규표현식(RegExp) - 문자 검색, 대체, 추출 가능
- 생성 방법
```jsx
// 생성자 - new RegExp('표현','옵션')
new RegExp('[a-z]','gi') // g = global(전역매칭), i : Ignore Case(대소문자 구분안함)

// 리터럴 - /표현/옵션
/[a-z]/gi

const str = `
010-1234-5678
thecond@gmail.com
hello Wrold!
the quick brown fox jumps over!
`

const regexp = new RegExp('the','')
console.log(str.match(regexp)) 
// ['the', index: 15, input: '\n010-1234-5678\ntahd@gmail.com\nhello Wrold!\n', groups: undefined]
// 유사배열 형태로 반환

// 생성자
const regexp = new RegExp('the','gi')
console.log(str.match(regexp))  // ['the', 'the']

// 리터럴
console.log(str.match(/the/gi))
```

## 메소드
- .test(문자열) : 일치 여부 반환
- 문자열.match(정규식) : 일치하는 문자의 배열 반환
- 문자열.replace(정규식, 대체문자) : 일치하는 문자를 대체
```jsx
const str = `
010-1234-5678
thecond@gmail.com
hello Wrold!
the quick brown fox jumps over!
`

const regExp = /fox/g

console.log(regExp.test(str)) // true
console.log(str.match(regExp)) // ['fox']
console.log(str.replace(regExp,'cat')) // the quick brown cat jumps over!
```

## 플래그
- g : 모든 문자 일치(global)
- i : 영어 대소문자를 구분하지 않고 일치(Ignore Case)
- m : 여러 줄 일치(Multi Line), 각각의 줄을 시작과 끝으로 인식
```jsx
console.log(str.match(/the/)) 
console.log(str.match(/the/g)) // ['the']
console.log(str.match(/the/gi)) // ['the,'The']
console.log(str.match(/\.$/gi)) // .(dot) 을 찾기 위한 표현(Escape String) -> null
console.log(str.match(/\.$/gim)) // m 옵션을 통해 줄바꿈이 되는 시작과 끝 구분 가능 => ['.']
```

## 패턴1
- ^ab : 줄 시작에 있는 ab 와 일치
- ab$ : 줄 끝에 있는 ab와 일치
- . : 임의의 한 문자와 일치
- a|b : a 또는 b와 일치
- ab? : b가 없거나 b와 일치
```jsx
// 정규 표현식에서 .(dot) 은 "임의의 문자와 일치한다"라는 뜻 갖고 있음
console.log(str.match(/^h../gm)) // ['hel]
console.log(str.match(/^h.../gm)) // ['hell']

console.log(str.match(/\.com$/g)) // null 
// -> 이메일 주소가 있는데 왜 null? : m 플래그 사용하지 않았기 때문
console.log(str.match(/\.com$/gm)) // ['com']
console.log(str.match(/...\.com$/gm)) // ['ail.com']

console.log(str.match(/fox | over|\.com/g)) // (3) ['.com', 'fox ', ' over']
// ? -> 선택적 일치, s가 선택적으로 있을수도, 없을수도
console.log(str.match(/https?/g)) // (2) ['http', 'https']
```

- {3} : 3개 연속 일치
- {3, } : 3개 이상 연속 일치
- {3,5} : 3개 이상 5개 이하 연속일치
- + : 1개 이상 연속일치, {1, } 과 동일함
```jsx
const str = `
010-1234-5678
thecond@gmail.com
hello Wrold!
The quick brown fox jumps over.
http://www.naver.com
https://localhost:1234
abbcccddddeeeee
`

console.log(str.match(/e{3}/g)) // ['eee]
console.log(str.match(/\d{3}/g)) // (4) ['010', '123', '567', '123']
console.log(str.match(/\d{3,9}/g)) // 3개 이상 9개 이하
console.log(str.match(/\d{3,}/g)) // 3개 이상 모두
```

## 패턴2 

- [ab] : a 또는 b
- [a-z] : a 부터 z 사이의 문자 구간에 일치(소문자)
- [A-Z] : A 부터 Z 사이의 문자 구간에 일치(대문자)
- [0-9] : 0 부터 9 사이 문자 구간에 일치 (숫자)
- [가-힣] : 가 부터 힣 사이의 문자 구간에 일치 (한글)

```jsx
console.log(str.match(/[ab]/g)) // str 내 모든 a, b 찾음 -> ['a', 'b', 'a', 'a', 'a', 'b', 'b']
console.log(str.match(/[a-z]+/g)) // 단어 단위로 출력
console.log(str.match(/[a-zA-Z]+/g)) // 대소문자 섞어서 찾기도 가능

```
- 이스케이프 문자
  - \w : 63개문자(Word| 대,소문자(52)+ 숫자 10개 + _(언더바 기호))
  - \b : 63개 문자와 일치하지 않는 문자 경계(Boundary)
  - \d : 숫자에 일치(Digit)
  - \s : 공백에 일치(Space, Tab)


```jsx
console.log(str.match(/\b[0-9]+\b/g)) // 앞뒤 이스케이프 b문자 추가시 앞뒤로 경계가 있는 숫자들은 제외하고 출력
console.log(str.match(/\s/g)) // 줄바꿈, 탭, 공백 출력
```

- (?:) : 그룹지정
- (?=) : 앞쪽 일치(Lookahead)
- (?<=) : 뒤쪽 일치(Lookbehind)
```jsx
// 그룹지정을 이용한 패턴
console.log(str.match(/https:?\/\/(?:\w+\.?)+\/?/g)) // ['https://localhost']

// 앞쪽 일치
// 앞에 임의의 문자 1개와 일치, s앞에 있는 내용들 찾기
console.log(str.match(/.+(?=s)/g)) // (2) ['The quick brown fox jump', 'https://localho']

// 뒤쪽 일치
// 뒤에 임의의 문자 1개와 일치, s뒤에 있는 내용들 찾기
console.log(str.match(/(?<=s).+/g)) // (2) [' over.', '://localhost:1234']

// 전화번호
console.log(str.match(/\d{3}-\d{4}-\d{4}/g)) // ['010-1234-5678']

// 이메일
// 1개 이상 워드 + @ + 1개이상 워드 + .(dot) + 1개이상 워드 
console.log(str.match(/\w+@\w+\.\w/g)) //
```
