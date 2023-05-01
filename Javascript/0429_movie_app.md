#### 출처 : https://velog.io/@jinyoung985/Javascript-class%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
## 클래스 vs Prototype

### JS = Prototype 기반 객체지향 언어

- `Prototype` 은 뭔데 그래서?
```js
function Me(name) {
  this.name = name;
}

// prototype을 이용해서 me 함수에 wow 라는 함수(기능)을 추가
Me.prototype.wow = function () {
  console.log("WOW!");
};

/*
  person 변수에 me 함수를 호출한 값을 할당,
  me 함수안에는 wow 라는 기능이 없지만,
  우린 prototype을 이용해서 추가해놓았기 때문에 
  없어도 사용이 가능하다
*/
let person = new Me("Jason");

person.wow(); // WOW!
```

- 똑같은걸 `class` 로 바꿔보자
```js
class Me {
  constructor(name){
    this.name = name;
  }
  
  wow(){
    console.log("WOW!");
  }
}
  
let person = new Me("Jason");
person.wow() // WOW!
```


- class 살펴보기
```js
class Korean {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.country = 'Korea';
  }

  addAge() {  
    return this.age + age;
  }
}

let cho = new Korean('CHOWANGI","25")

```
1. 클래스 내 정의된 함수 =  `method`
2. 클래스를 통해 생성된 객체 =  `instance`
3. 클래스 역시 함수처럼 호출전에는 실행 X, 
4. 호출은 `new` 키워드와 `()`소괄호를 사용하여 호출
5. `constructor` 메소드
  - class 에서 필요한 기초 정보를 세팅
  - new 로 객체를 생성시 가장 먼저 호출
  - this는 본인 객체, 클래스 내 메소드간 소통 위해서 필요함

➡ 결국 Korean 클래스를 이용해서 Cho 객체를 생성시 아래와 같은 인스턴스 생성
```js
  cho : {
    name: "CHOWANGI",
    age: "25",
    contry: "Korea",
    addage(age) {
      retrun this.age + age
    }
  }
```

- 클래스 상속 & super
```js
class Pet {
    constructor(name, age) {
        console.log('IN PET CONSTRUCTOR!')
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating!`
    }
}


class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        console.log('IN CAT CONSTRUCTOR!')
        super(name, age)
        this.livesLeft = livesLeft;
    }
    meow() {
        return 'MEOWWWW'
    }
}
const monty = new Cat('monty',9);
// IN CAT CONSTRUCTOR!
// IN PET CONSTRUCTOR!

console.log(monty); // Cat {name: 'monty', age: 9, livesLeft: 9}
```
- 부모 클래스의 값을 상속 받고, 추가적으로 자식만의 값을 사용시 super 키워드 사용
- super 키워드를 통해 부모 클래스의 constructor 에서 온 이름 & 나이를 재사용, cat에 livesleft를 따로 추가


