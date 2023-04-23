# 목차
[1. 개요](#개요)  
[2. 콜백과 콜백지옥](#콜백-과-콜백지옥)  
[3. Promise](#promise)  
[4. Async & Await](#async-await-패턴)  
[5. Resolve,Reject & Error Handling](#resolve-reject--error-handling)  
[6. 반복문에서의 비동기 처리](#반복문에서의-비동기-처리)  
[7. fetch()](#fetch)

## 개요  
### 💡동기(Sync) : 순차적으로 코드 실행 O
```jsx
// 코드를 작성한 1, 2 ,3 순차적으로 출력
console.log(1)
console.log(2)
console.log(3)
```
### 💡비동기(Async) : 순차적으로 코드 실행 X
```jsx
// 1, 3, 2 순서로 출력 -> 비동기 코드!
console.log(1)

setTimeout(()=> {console.log(2)
},1000)

console.log(3)
```

- Case 2
```jsx
const btnEl = document.querySelector('h1')

// addEventListener 의 콜백 방식 -> 비동기 코드!
btnEl.addEventListener('click',()=>{
  console.log('Clicked')
})

console.log('Hello World~!')
```
## 콜백 과 콜백지옥
- Callback 패턴
```jsx
const a = () => {
  setTimeout(()=> {
    console.log(1)
  },1000)
}
const b = () => console.log(2)

// 호출 순서 상관없이 2, 1 순서로 출력
a()
b()
```

  - 만약 1,2 순서로 출력하고 싶다면?
    ```jsx
      const a = (callback) => {
    setTimeout(()=> {
      console.log(1)
      callback() // b 함수 실행
    },1000)
      }
      const b = () => console.log(2)

      // b함수를 a함수의 callback 으로 이용
      a(() => {
        b()
      })
    ```


- 콜백지옥
```jsx
const a = (callback) => {
  setTimeout(()=> {
    console.log(1)
    callback() // b 함수 실행
  },1000)
}
const b = (callback) => {
  setTimeout(()=>{
    console.log(2)
    callback()
  }, 1000)
}

const c = (callback) => {
  setTimeout(()=>{
    console.log(3)
    callback()
  },1000)
}

const d = () => {
  console.log(4)
}

// 🚨 Callback 지옥 - 계속 들여쓰기... 해석하기도, 보기에도 쉽지 않다
a(() => {
  b(()=>{
    c(()=>{
      d()
    })
  })
})
```

## Promise
### callback 패턴에서 발생하는 콜백지옥을 Promise 로 어떻게 개선할까?
```jsx
const a = () => {
  return new Promise((resolve)=>{
    setTimeout(()=> {
      console.log(1)
      resolve() // resolve를 통해 순서 보장
    }, 1000)
  })
}

const b = () => console.log(2)

// then의 인수로들어간 함수가 resolve로 전달
a().then(()=>{
  b()
})
```

- Case 2
```jsx
const a = () => {
  return new Promise((resolve)=>{
    setTimeout(()=> {
      console.log(1)
      resolve()
    }, 1000)
  })
}

const b = () => {
  return new Promise((resolve)=>{
    setTimeout(()=> {
      console.log(2)
      resolve() 
    }, 1000)
  })
}

const c = () => {
  return new Promise((resolve)=>{
    setTimeout(()=> {
      console.log(3)
      resolve() 
    }, 1000)
  })
}

const d = () => console.log(4)
```
```jsx
// Promise 를 사용했지만 콜백 지옥과 똑같다...?!
a().then(() => {
  b().then(() => {
    c().then(() => {
      d()
    })
  })
})

// a, b, c 모두 Promise 인스턴스를 반환
a().then(() => {
  return b()
}).then(() => {
  return c()
}).then(() => {
  d()
})

// 이를 더 간단하게 쓰면
a()
  .then(() => b())
  .then(() => c())
  .then(() => d())

/* Promise 에서resolve를 호출하기때문에 
함수데이터 자체를 resovle에 전달하여 더 간단히 작성 */
a()
  .then(b)
  .then(c)
  .then(d)
  .then(() => console.log('done'))
```
## Async, Await 패턴
```jsx
// 🚨 await 키워드는 async 함수 내부에 위치
const wrap = async () =>{
  //  await 키워드를 통해 a함수 호출을 기다리고 그다음 b 함수 호출
  await a()
  b()
}
wrap() // 1  2
```
cf>  
```jsx
// 🚨 요렇게 남발하면 안됩니당~
await console.log()
```
## Resolve, Reject & Error Handling
```jsx
// 매개변수 - index, callback, ErrCallback
const delayAdd = (index, cb, errorCb) => {
  setTimeout(() => {
    if(index > 10) {
      // error 발생시
      errorCb(`${index}는 10보다 클 수 없음.`)
      // 함수 종료
      return
    }
    // 정상 작동시 
    console.log(index) // index = 4
    cb(index + 1)
  }, 1000)
}

// index < 10
delayAdd (
  4,
  res => console.log(res), // res = 5
  err => console.log(err)  // 10 미만인 4를 index로 넘겼기에 동작 X
)
// index > 10
delayAdd (
  14,
  res => console.log(res),
  err => console.error(err) // 14는 10보다 클 수 없음. => 🚨Error Handling!
)
```

➡ Promise 를 이용한 처리
```jsx
const delayAdd = index => {
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      if(index > 10) {
        reject(`${index}는 10보다 클 수 없음.`)
        return // 💡 console.log(index) 실행 방지 위해 return 키워드로 함수 종료
      }
      console.log(index)
      resolve(index + 1)
    }, 1000)
  })
}

delayAdd (14)
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('done'))
```

- Async, Await 패턴 활용
```jsx
const wrap = async () => {
  const res = await delayAdd(2)
  console.log(res)
}
wrap()
```
  - try & catch 구문 활용
    ```jsx
    const wrap = async () => {
      try {
        const res = await delayAdd(12)
        console.log(res)
      } catch (err) {
        console.error(err)
      } finally {
        console.log('done')
      }
    }
    wrap()
    ```
### 💡 resolve 실행시 reject 실행 X, 서로 반대로 움직임(Like N극과 S극 처럼...), 단 다른 코드는 그대로 실행

## 반복문에서의 비동기 처리
```jsx
const getMovies = movieName => {
  return new Promise (resolve => {
    fetch(`http://www.omdbapi.com/?apikey=e468a5ae&${movieName}`)
      .then(res => res.json)
      .then(res => resolve(res))
  })
}

const titles = ['frozen','avengers','avatar']

// Foreach 사용
titles.forEach(async title => {
  const movies = await getMovies(title)
  console.log(title, movies) // 순서대로 출력되지 않음,
})

// for of 반복문 사용
const wrap = async() => {
  for (const title of titles ) {
    const movies = await getMovies(title)
    console.log(title, movies) // 겨울왕국 - 어벤져스 - 아바타 순서대로 출력
  }
}

wrap()
```

## fetch()
### fetch(주소, 옵션) : Network를 통해 Request & Response 를 처리할 수 있음, Promise 인스턴스 반환
```jsx
fetch(`http://www.omdbapi.com/?apikey=e468a5ae&s=$avengers`,{
  // 💡 옵션 예시
  method: 'GET', // GET 메소드는 별도로 작성하지 않아도 됨, 이외에 POST, DELETE ... etc
  headers: { // 서버로 전송하는 요청에 대한 정보
    'Content-type': 'application/json'
  }, 
  body: JSON.stringify({ // 요청한 데이터 -> 항상 문자화 필요
    name: 'Wangi'
  })
})
  .then(res => res.json())
  .then(json => console.log(json)) 

const wrap = async () => {
  const res = await fetch(`http://www.omdbapi.com/?apikey=e468a5ae&s=$avengers`)
  const json = await res.json()
  console.log(json)
}

wrap()
```