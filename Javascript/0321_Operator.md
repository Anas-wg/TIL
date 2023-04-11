# Operator - 연산자

## 산술, 할당, 증감 연산자
- 산술연산자
  - 산술연산 : 사칙연산(+,-,*,/) + 나머지 연산(%)
  - 연산자 = 기호, 피연산자 = Data

- 나머지 연산자 활용 예시(짝,홀 구분)
  ```jsx
  function isEven(data){
    return data % 2 === 0
  }

  console.log(isEven(4))
  ```

- 할당연산자
  ```jsx
  const a = 3
  //a 라는 변수에 3을 "할당"
  ```
  - 재할당 (let 변수 활용)
  ```jsx
  const a = 3
  a = a + 3
  console.log(a); //error

  let a = 3
  a = a + 3 // a += 3 과 동일
  console.log(a); //6
  ```


- 증감 연산자
  - 증가 연산자
    ```jsx
    let a = 3

    console.log(a++)//3
    console.log(a)//4

    console.log(++a)//4
    console.log(a)//4

    //앞, 뒤에 따라 다름
    ```
  - 감소 연산자
    ```jsx
    console.log(a--)//3
    console.log(a)//2

    console.log(--a)//2
    console.log(a)//2
    ```

## 부정, 비교 연산자
- 부정연산자 : !
  ```jsx
    console.log(!true) //false
    console.log(!false) //true
    //Falsy 데이터 역시 true로 부정되어 출력
    console.log(!0) //true
    console.log(!!0) //false
  ```

- 비교연산자
  - 동등(==) & 부등(!=) 연산자 -> 형변환 O
    ```jsx
    const a = 1
    const b = 3
    //동등
    console.log(a == b) //false
    //부등
    console.log(a != b) //true
    ```
  - 일치(===) % 불일치(!==) 연산자 -> 형변환 X
    ```jsx
    //일치
    console.log(a === b) //false
    //불일치
    console.log(a !== b) //true
    ```
  - 크기 비교
    ```jsx
    console.log(a > b) //false
    console.log(a >= b) //false
    ```
  
## 논리 연산자
- AND연산자(그리고) : &&
  - 둘다 True 면 True

  ```jsx
  const a = true
  const b = false

  if(a && b){
    console.log("모두가 참") //출력 X
  }

  //true,false 뿐만아니라 피연산자를 반환할 수도 있음
  
  // 제일 먼저 만난 거짓인 데이터(Falsy)(0)를 반환
  console.log(0 && 1) //0
  console.log(1 && 2 && 0) // 0

  // 모두가 참이면 가장 마지막 참인 데이터 반환
  console.log(1 && 2 && 3) // 3
  ```

- OR연산자(또는): ||
  - 하나만 True면 True
  ```jsx
  const a = true
  const b = false

  if(a || b){
    console.log("하나 이상이 참") //출력 O
  }

  //제일 만난 참 데이터(Truthy)(1)를 반환
  console.log(0 || 1) //1
  console.log(0 || [] || {}) //[]
  console.log(function(){} || {} || undefined) // f(){}

  //모두가 거짓이면 가장 마지막 거짓 데이터 반환
  console.log(false || 0 || NaN) //NaN
  ```