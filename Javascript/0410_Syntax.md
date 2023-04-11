# 선택적 체이닝 - ?
```jsx
const user = {null}
console.log(user.name) // error -> null 에선 속성 읽기 불가능, undefined도 마찬가지
```
null, undefined 같이 속성을 조회하는 것이 불가능한 데이터 형식을 사용할때 선택적 체이닝을 통해서 조회 가능

```jsx
const user = undefined
console.log(user?.name)// undefined
```

- Case  
속성이 없는 값에 대한 "예외" 처리  
-> address 값이 있는 userA, 값이 없는 userB, userB 속성 조회시 선택적 체이닝사용
```jsx
const userA = {
  name: "wangi",
  age: 85,
  address : {
    country: "egypt",
    city: "maadi"
  }
}

const userB = {
  name: "Neo",
  age: 22
}

// function getCity(user){
//   return user.address.city
// }

function getCity(user){
  //OR 연산자, undefined || truthy 데이터 -> truthy 데이터 출력
  return user.address?.city || '주소 없음'
}

console.log(getCity(userA))//maadi
//선택적 체이닝 없이 조회할 경우 userB는 address 속성이 없기때문에 타입에러 발생
console.log(getCity(userB))// ERROR! -> 주소 없음
```

# For, For of, For in 반복문
- 형식
```jsx
for(초기화; 조건; 증감) {
  반복 실행할 코드
}

//i가 10보다 작을때까지 반복,명령 실행시 i++ -> 총 10회 반복
for (let i = 0; i < 10; i += 1){
 console.log("i") //0 ~ 9 까지 출력
}
```

- break
```jsx
for(let i = 0; i < 10; i += 1){
 console.log(i); // 0 ~ 5 까지 출력
 if (i > 4) {
  break
 }
}
```

- continue  
현재 반복을 종료(무시)하고 다음 반복으로 넘어감
```jsx
for (let i = 9; i > -1; i -= 1) {
  // 짝수일 경우 반복 Skip
  if(i % 2 === 0){
    continue
  }
  console.log(i); // 9,7,5,3,1 출력
}
```

## for of 반복문
```jsx
const fruits = ['apple','banana', 'cherry']

for(let i = 0; i < fruits.length; i ++){
  console.log(fruits[i]) // apple , banana, cherry 출력
}

//for of , 
for (const a of fruits) {
  console.log(a) //apple , banana, cherry 출력
}
```  

- for of 반복문 예시
  ```jsx
      const users = [
      {
        name: 'heropy',
        age: 85
      },
      {
        name: 'neo',
        age: '22'
      },
      {
        name: 'lewis',
        age: 34
      }
    ]

    for (let i = 0; i < users.length; i+= 1){
      console.log(users[i])
    }
    // 배열 데이터 -> of
    for (user of users){
      console.log(user)
      console.log(user.name)
    }
  ```

## For in 반복문
객체내 value 는 순서가 없기 때문에 순서보장 X 임을 유의
```jsx
const user = {
  name: 'wangi',
  age: 24,
  isValid: true,
  email: 'wg12181218@gmail.com'
}

//객체데이터 -> in , of 사용시 ERROR!
for (const key in user) {
  console.log(key) // value 출력
  console.log(user[key]) // value 에 해당하는 key 값 출력
}
```

# While, Do while 반복문

## while
while : 조건이 거짓이 되면 반복문이 종료
```jsx
// 조건이 계속 참이면 무한 반복 -> 브라우저 뻗는다.
let n = 0
while (n < 4) {
  console.log(n) // 무한 루프!
}

let n = 0
while (n < 4) {
  console.log(n) //0,1,2,3 출력  n = 4 되면 거짓이 되면서 반복문 종료
  n += 1
}
```

## Do while

```jsx
let n = 0

while (n) {
  console.log(n) // 출력 X , 0은 Falsy 데이터기 때문
}

do {
  console.log(n) // 0 출력
} while (n)
```
Q. 왜 출력이 달라질까?

A. 중괄호 부분을 먼저 실행, 그 후 while 로 넘어가서 조건 확인, 조건이 거짓이기 때문에 반복 X
```
🚨조건이 거짓이더라도 최초 1회는 실행🚨
```

- Case 
```jsx
do {
  console.log(n) // 0,1,2,3
  n += 1
} while (n < 4)
```

