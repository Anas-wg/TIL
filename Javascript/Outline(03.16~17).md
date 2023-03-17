# Node.js
## Chrome V8 JS 엔진으로 빌드된 JS 런타임
- Run-time : 프로그래밍 언어가 동작하는 환경  
웹페이지 개발을 위한 도구의 개념  

- 웹페이지는 HTML,CSS,JS 만 구동이 가능하다  
문제점: 이것들만 쓰면 너무나 비효율적
  - Node.js 환경에서 여러 모듈을 설치하고 이를 활용하면 더 효율적인 개발이 가능
  - Node.js 가 모듈을 JS로 변환 해준다


# NPM
## Node Package Manager 

- 전 세계 개발자들이 만든 다양한 기능들을 관리
- npm 생태계 내 있는 어떤 패키지를 우리가 Install
- 학습 난도 증가와 구성의 복잡함이라는 단점과 관리 효율 증가와 손쉬운 기능 고도화라는 장점이 존재
- 플래그 : CLI 에서 사용하는 명령어
  - Ex. npm -v(버전 확인)  

```html
💡install 시 개발용과 배포용 패키지를 구분하는 것이 중요하다!  
npm install --save-dev(= -D, 개발용 의미)
```

- dependencies : 의존성, 외부의 다른 개발자가 만든 패키지에 의존하는것

# Parcel, 개발 서버 실행과 빌드

- package.json > scripts
```bash 
"scripts": {
    "dev": "parcel ./index.html"
  },
```
- 개발 서버 실행 플래그
```bash
npm run dev
```
실행시 scripts 에 올려놓은 대로 명령어가 실행  

- 번들러가 ts 파일 역시 JS 로 변환
- dist 파일
  - distribute 파일
  - 배포되는 파일이 들어있는 디렉토리


- 빌드 플래그
```bash
npm run build
```  


# 유의적 버전(Semver)
## EX. ^4.17.21

### 형식: Major.Minor.Patch

- Major(4): 기존 버전(3.X.X)과 호환되지 않는 새로운 버전
- Minor(17): 기존 버전(4.16.X)과 호환되는 기능이 추가된 버전
- Patch(21): 기존 버전(4.17.X)과 호환되는 버그 및 오타 등이 수정된 버전

- ^ 기호(caret)(^4.17.21)
  - Major 버전 안에서 가장 최신 버전으로 업데이트 가능
  - 4버전 안에서 최신 버전으로 업뎃이 가능 (ex. 4.18.22)

- ~ 기호
  - Minor 버전 안에서 가장 최신 버전으로 업데이트 가능


- 패키지 버전 확인 플래그
``` bash
  npm info 패키지 이름
```

- 특정 버전 패키지 설치 플래그
``` bash
npm install lodash@4.17.19
```