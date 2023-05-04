import { CoreComponent } from "../core/heropy";

export default class FruitItem extends CoreComponent {
  constructor(payload){
    // super - coreComponent 실행부분
    super({
      // this.el 은 li tag 로 생성
      tagName: 'li',
      // payload 로 넘어온 props를 props 변수에 할당
      // 따라서 이렇게 할당된 데이터는 coreComponent 의 this.props 에 등록 -> render() 말고도 다양한 기능에 참조가 가능
      props: payload.props
    })
  }
  render() {
    this.el.innerHTML = /* html */`
    <span>${this.props.name}</span>
    <span>${this.props.price}</span>
    `
  // this.el 에 클릭이벤트 발생시 props 의 이름과 가격을출력
    this.el.addEventListener('click',()=> {
      console.log(this.props.name, this.props.price)
    })
  }
}
