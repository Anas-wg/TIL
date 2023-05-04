import { CoreComponent } from "../core/heropy";
// 출력할 메시지 가져오기
import messageStore from "../store/message";

export default class Message extends CoreComponent {
  constructor(){
    super()
    // 구독할 데이터 이름, 콜백함수 인수로 전달
    // message.js 에서 데이터가 변경되는지 안되는지를 구독, 변경시 콜백함수를 실행
    messageStore.subscribe('message',()=> {
      this.render()
    })
  }
  render(){
    this.el.innerHTML = /* html */`
      <h2>${messageStore.state.message}</h2>
    `
  }
}