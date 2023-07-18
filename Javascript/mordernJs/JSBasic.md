### Statement(문)
1. semi-colon : 줄바꿈으로 생략 가능
```js
alert("alert!")
[1,2].foreach // ERR! -> 대괄호 앞은 ; 있다고 가정 X, 단일문으로 해석
```

2. 주석 : 코드의 기능, 특이사항 등을 글로 작성

3. 엄격모드 : 호환성 이슈, ES5의 기본에선 변경 활성화 X
- "use strict" : 최상단에 선언하여 모던 JS 로 변경(1번 선언시 되돌리기 불가)
- class, module 사용시 생략가능


### 변수와 상수
1. 변수 : Data 를 저장하는 저장소 개념
- let 키워드 사용
- 대소문자 구분

2. 상수 : 변치않는 정보(변수)를 저장
- const 키워드

>>cf : 올바른 변수명이란?  
서술적이고 간결한 영단어, 변수 추가는 좋은 습관

### 자료형(8가지)
1. 숫자형 : 정수와 소수점 숫자
2. BigInt 
3. 문자열
4. 불린형
5. null 값 : 의도적인 빈값
6. undefined : 변수는 선언됐으나 값이 할당되지 않은 경우
7. Object & Symbol  : 여러자료형을 통해 복잡한 표현 가능
8. typeof

### 상호작용
1. alert : 모달창
2. prompt(title, [default]) : 보여지는 문자열과, input field 를 보여줌
3. confirm : 질문과 확인/취소 버튼

### 형변환
1. 문자형으로 변환 
- String(~)
2. 숫자형으로 변환
- 수학관련 함수나 연산에서 자동 변환 "2" / "1" =  2(int)
- Number(~)
- 숫자와 다른 type 이 같이 있는걸 숫자형으로 변환시 NaN
```js
console.log("b" + "a" + + "a" + "a") // baNaNa
```
- null -> 0, undefined -> null
- true -> 1, false -> 0
3. 불린형으로 변환
- 논리연산 수행
- Boolean

### 기본 연산자 & 수학
1. 피연산자 = 인수 , 연산을 수행하는 대상
2. 연산자 : 사칙연산 + 나머지 + 거듭제곱
3. 이항연산자 + 문자열 -> 문자열연결, 둘 중 하나라도 문자열일경우 문자열로 연결
```js
console.log("2"+"2") // 22
```
4. 단항연산자 + -> 숫자가 아닌 것을 숫자로 변환

5. 연산자 우선순위

6. 할당연산자 =
- 복합할당연산자 +=, -=, /=. *=
- 증감연산자 ++ --
  - 전위 ++x : 증감 후 반환
  - 후위 x-- : 반환 후 증감
- 비트연산자

- 비교연산자 : ==
  - 문자열 비교 : 사전순 비교 ex. "2" > "12" -> "2" > "1" : TRUE
  - 다른 tpye 간 비교 : 숫자형으로 변경 ex '2' > 1 => 2 > 1 :TRUE

- 일치연산자 : ===
  - 0, false, null, undefined 까지 구분 가능
  - null 과 undefined 비교
  - null 과 0
  - undefined 는 비교 불가

=> null 과 undefined가 비교연산의 피연산자가 되지 않도록 주의

### if 와 ? 를 사용한 조건처리
1. if 문 : if(조건문) 형식, 조건을 평가하여 boolean 값을 리턴
- 0, null, undefined... 등 falsy data를 조건으로 걸면 무조건 false
- 1 은 truthy
- else 붙여서 false 일 경우 실행
- else if 활용하여 복수 조건

2. 조건부 연산자 = 삼항연산자 : ?
- (조건문) ? true 일 경우 : false 일 경우

=> if문은 여러 분기를 만드는데 활용, ? 은 조건에 따라 반환값을 달리하는데 사용

```js
let message;

if (login == '직원') {
  message = '안녕하세요.';
} else if (login == '임원') {
  message = '환영합니다.';
} else if (login == '') {
  message = '로그인이 필요합니다.';
} else {
  message = '';
}
```

```js
let message = (login == '직원') ? '안녕하세요.' :
  (login == '임원') ? '환영합니다.' :
  (login == '') ? '로그인이 필요합니다.' :
  '';
```

### 논리연산자
논리연산 -> 피연산자가 꼭 불린값은 아니고, 다른 타입도 다 가능(-> 반환값이 중요)

1. OR(||) : 둘 중 하나라도 True => True 리턴
- 첫번째 Truthy 값을 찾음
  - Boolean 값으로 변환
  - Truthy 찾기
  - 원래 값으로 변환 후 이를 리턴
- 변수나 표현식 중 첫번째 Truthy 값 얻기, 단락평가 등에 활용

2. AND(&&) : 둘 중 하나라도 False => False 리턴
- 첫번째 Falsy 값을 찾음
- && 의 우선순위가 || 보다 더 높음

3. NOT(!)

>> 예제 1.
```js
alert( alert(1) || 2 || alert(3) );
```
alert는 리턴값이 없음. => undefined를 반환  
따라서 falsy || Truthy || falsy 로 변환 => 결국 1, 2 만 출력이 되고 멈춤

>> 예제 2.
```js
alert( 1 && null && 2 );
```
&&은 첫번째 falsy 값을 리턴 -> null 을 리턴, 따라서 null 출력

>> 로그인 구현하기
```js
let login = prompt("Who's There?");

if(login == "Admin"){

  let pass = prompt("PW?");
  if(pass == "TheMaster"){
    alert("Welcome!")
  } else if (pass == '' || pass == null) {
    alert("Canceled")
  } else {
    alert("Wrong PW")
  }
} else if (login == ''|| login == null) {
  alert("Canceled")
} else {
  alert("I dont know you")
}
```

### nulish 병합연산자 : ??
여러 피연산자 중 "확정된" 변수

```js
(a ?? b)
```
1. a !== null && a !== undefined : a
2. 그 이외 모두 : b

- OR와의 차이
  - OR 같은 경우 첫번째 Truthy 의 값(0, null, undefined 구분 X)
  - ?? 같은 경우 정의된 값을 리턴
  ((0, null, undefined 구분 O)


### 반복문
1. while : 조건이 Truthy 면 본문 반복
- do ~ while : do 안에 본문 1번 실행후 while 문의 조건 체크

2. for 

- 반복문 빠져 나오기 : break (본문 가운데 혹은 여러곳에서 본문조건 처리시)
- 다음 반복으로 이동 : Continue(중첩을 줄이는데 도움)

3. Break/continue label
```js
outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`(${i},${j})의 값`, '');

    // 사용자가 아무것도 입력하지 않거나 Cancel 버튼을 누르면 두 반복문 모두를 빠져나옵니다.
    if (!input) break outer; // (*)

    // 입력받은 값을 가지고 무언가를 함
  }
}
alert('완료!');
```

