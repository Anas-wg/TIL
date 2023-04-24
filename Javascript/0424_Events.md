
## 이벤트 추가 및 제거
- .addEventListener() : 대상에 지정한 이벤트 발생시 지정된 함수(Handler)가 호출
📚 이벤트 청취(Listen)를 등록
```jsx
// 부모요소 클릭시 출력
parentEL.addEventListener('click',() => {
  console.log('Parent')
})

// 자식요소 클릭시 출력
childEl.addEventListener('click',() => {
  console.log('child') // child Parent (부모요소역시 포함되기 때문)
})
```

- .removeEventListener() : 등록했던 이벤트 청취를 제거
💡 메모리 관리 위해 등록한 이벤트 제거하는 과정 필요할 수 있음  
```jsx
// 리무브이벤트리스너 사용위해 함수를 변수에 할당
const handler = () => {
  console.log('Parent')
}

parentEL.addEventListener('click',handler)

// 자식요소에서 클릭시, 부모요소에 있는 이벤트리스너에서 핸들러 함수를 제거
childEl.addEventListener('click',() => {
  parentEL.removeEventListener('click',handler)
})
```
## 이벤트 객체
### 대상에서 발생한 이벤트 정보를 담은 객체
```jsx
// 이벤트객체(클릭, 스크롤, 키... etc)를 event 매개변수로 받음
parentEl.addEventListener('click',event => {
  console.log(event.target, event.currentTarget)
})

// 부모요소 클릭시 둘다 부모요소를
// 자식요소 클릭시 target 은 자식요소, curtarget 은 부모요소
// 🚨 target = 이벤트 발생된 요소, currentTarget = 이벤트가 등록된 요소
```

## 기본 동작 방지 : event.preventDefault()
기본동작? : 스크롤, 페이지 이동 등등...
```jsx
// 마우스 휠의 스크롤 동작 방지
parentEl.addEventListener('wheel',event => {
  event.preventDefault() // 문자출력은 되지만 스크롤이 안됨
  console.log('Wheel!')
})

// a 태그에서 페이지 이동 방지
const anchorEl = document.querySelector('a')
anchorEl.addEventListener('click',event => {
  event.preventDefault() // 역시 문자 출력은 되지만 페이지이동은 불가
  console.log('Click!')
})
```
➡ 브라우저의 기본동작과 의도하려는 동작이 다를 경우 이를 사용,
## 버블링 과 캡쳐링
- 이벤트 버블링 : 발생한 이벤트가 상위 요소로 전파되는 것
```jsx
const parentEl = document.querySelector('.parent')
const childEl = document.querySelector('.child')
const anchorEl = document.querySelector('a')

window.addEventListener('click',event => {
  console.log('Window!')
})

document.body.addEventListener('click',event => {
  console.log('Body!')
})

parentEl.addEventListener('click',event => {
  console.log('Parent!')
})

childEl.addEventListener('click',event => {
  console.log('Child1!')
  event.stopPropagation() // 버블링 정지!
})

childEl.addEventListener('click',event => {
  console.log('Child2!')
})

anchorEl.addEventListener('click',event => {
  console.log('Anchor!')
})

```
➡ 부모요소 클릭시 화면,body,부모요소 모두 클릭했기 때문에 3가지가 모두 출력됨, 이게 바로 이벤트 버블링  
#### 🚨 anchor 요소 클릭시 상위 요소 모두를 클릭했지만 .stopPropagation으로 인해 anchor 와 child1, child2 출력

- 이벤트 캡쳐링 : 상위 요소의 이벤트가 먼저 실행되도록 캡쳐 옵션을 전달하는 것
```jsx
// 3번째 인수로 capture 옵션 전달,
document.body.addEventListener('click',event => {
  console.log('Body!')
},{capture: true})
```
#### 🚨 클릭시 Body - child -  parent -  window 순으로 출력, capture 옵션 전달된 body 부터 먼저 동작!


- Case 2
```jsx
const handler = () => {
  console.log('Parent!')
}

// 🚨 이벤트 청취를 제거 해도 캡쳐옵션 전달시 제거되지 않고 그대로 출력 -> 제거시에도 캡쳐옵션 전달시 제거 완료
parentEl.addEventListener('click',handler,{
  capture: true
})
parentEl.removeEventListener('click',handler)
```
## 이벤트 옵션
```jsx
- once : 핸들러 한번만 실행
parentEl.addEventListener('click',event => {
  console.log('Parent!') // 계속 클릭해도 한번만 출력
},{
  once:true
})
```

- passive : 기본 동작과 핸들러 실행을 분리
```jsx
parentEl.addEventListener('wheel',() => {
  // for 반복문 = handler
  for(let i = 0; i < 10000; i += 1) {
    console.log(i)
  }
},{ 
  passive:true // console출력과 화면의 움직임을 분리 -> 이게 없다면 동작이 조금 더뎌짐(처리할 것이 많기 때문)
})
```


## 이벤트 위임(delegation)
### 비슷한 패턴의 이벤트를 여러 요소에서 핸들링하는 경우, 단일 조상 요소에서 제어하는 이벤트 패턴
```html
  <div class="parent">
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
    <div class="child">4</div>
  </div>
```

```jsx
const parentEl = document.querySelector('.parent')
const childEls = document.querySelectorAll('.child') 


// Foreach 로 모든 대상 요소에 이벤트 등록 -> 4번 이벤트 등록
childEls.forEach(el => {
  el.addEventListener('click',event => {
    console.log(event.target.textContent)
  })
})

// 조상 요소에 이벤트 위임! -> 부모요소에 1번만 등록
parentEl.addEventListener('click',event => {
  const childEl = event.target.closest('.child') // 이벤트 발생한 요소에 자식요소가 있다 = 자식요소 클릭
  if(childEl){
    console.log(childEl.textContent)
  }
})
```

## 마우스와 포인터 이벤트
```jsx
// 💡click : 클릭시
childEl.addEventListener('click',() => {
  childEl.classList.toggle('active')
})

// 💡dblclick : 더블 클릭시
childEl.addEventListener('dblclick',() => {
  childEl.classList.toggle('active')
})

// 💡mousedown : 버튼을 누를 때
childEl.addEventListener('mousedown',() => {
  childEl.classList.add('active')
})
// 💡mouseup : 버튼을 뗄 때
childEl.addEventListener('mouseup',() => {
  childEl.classList.remove('active')
})

// 💡mouseenter: 포인터가 요소 위로 들어갈때
childEl.addEventListener('mouseenter',() => {
  childEl.classList.add('active')
})
// 💡mouseleave : 포인터가 요소 밖으로 나올때
childEl.addEventListener('mouseleave',() => {
  childEl.classList.remove('active')
})
// 💡mousemove : 포인터가 움직일때
childEl.addEventListener('mousemove',(event) => {
  console.log(event) // 마우스 이벤트 객체 출력
})

// 💡contextmenu : 우클릭 했을 때
childEl.addEventListener('contextmenu',(event) => {
  event.preventDefault() // 우클릭시 메뉴는 안보이지만 콘솔엔 출력
  console.log(event) // Pointerevent 객체 출력
})

// 💡wheel : 휠 버튼 회전시
parentEl.addEventListener('wheel',event => {
  console.log(event) //
})
```


## 키보드 이벤트
```jsx
const inputEl = document.querySelector('input')

// keydown : 키를 누를때
inputEl.addEventListener('keydown', event => {
  console.log(event.key) // 입력된 값 그대로 출력, enter, space, ctrl... 등등
})

// keyup: 키를 뗄때
inputEl.addEventListener('keyup', event => {
  console.log(event.key) 
})
```
- Case
```jsx
inputEl.addEventListener('keydown', event => {
  if(event.key === 'Enter'){
    console.log(event.target.value) // 입력후 엔터를 눌렀을때 그때 입력된 값을 출력
    // 한글치면 2번 입력되는현상 존재,(ex.CJK문자) => 한단계 더 필요하기 때문...
  }
})
```

  - 해결해보자!
    ```jsx
    inputEl.addEventListener('keydown', event => {
      if(event.key === 'Enter' && !event.isComposing){
        console.log(event.isComposing)
        console.log(event.target.value) // 입력후 엔터를 눌렀을때 그때 입력된 값을 출력
      }
    ```

## Focus & Form 이벤트
```html
  <form>
    <input type="text" placeholder="ID">
    <input type="text" placeholder="PW">
    <button type="submit">제출</button>
    <button type="reset">초기화</button>
  </form>
```

```jsx
const formEl = document.querySelector('form')
const inputEls = document.querySelectorAll('input')

inputEls.forEach(el => {
  //💡focus : 요소가 포커스 받았을 경우
  el.addEventListener('focus',() => {
    formEl.classList.add('active')
  })
  // 💡blur : 요소가 포커스 잃은 경우
  el.addEventListener('blur', () => {
    formEl.classList.remove('active')
  })
  // 💡input: 값이 변경될 경우
  el.addEventListener('input', event => {
    console.log(event.target.value)
  })
  // 💡change: 상태가 변경되었을때
  el.addEventListener('change', event => {
    console.log(event.target.value)
  })
})

// 💡submit: 제출 버튼을 선택했을때
formEl.addEventListener('submit',event => {
  event.preventDefault() // submit 의 기본동작 = 페이지 새로고침, 이를 방지하여 id,pw 객체 얻기 위함
  const data = {
    // target[0] -> 1ST input 요소 = id
    id: event.target[0].value,
    pw: event.target[1].value
  }
  console.log('Submit!',data)
})

// 💡Reset : 초기화(reset) 
formEl.addEventListener('reset',event => {
  console.log('Reset!')
})
```
## 커스텀 이벤트 & dispatch

```jsx
child1.addEventListener('click',()=> {
  // 강제로 이벤트 발생 -> 1번에 클릭이벤트 전달시 2번에 이벤트를 강제로 발생
  child2.dispatchEvent(new Event('click'))
  child2.dispatchEvent(new Event('wheel'))
  child2.dispatchEvent(new Event('keydown'))
})

child2.addEventListener('click',event => {
  console.log('child2 Click!')
})

child2.addEventListener('wheel',event => {
  console.log('child2 Wheel!')
})

child2.addEventListener('keydown',event => {
  console.log('child2 Keydown!')
})


// 🚨 hello-world 커스텀이벤트 강제 실행 가능
child1.addEventListener('hello-world',event => {
  console.log('커스텀 이벤트!')
  console.log(event.detail) // 123 출력
})

// 두번째 인수로 전달하고자 하는 데이터를 입력, CustomEvnet 생성자 실행시 조회 가능
child2.addEventListener('click', () => {
  child1.dispatchEvent(new CustomEvent('hello-world',{
    detail: 123
  }))
})
```