import { CoreComponent } from "../core/heropy";
import messageStore from "../store/message";

export default class Title extends CoreComponent {
  constructor(){
    super({
      tagName: 'h1'
    })
    // 메시지 상태 수정될때마다 콜백 실행, render 콜백시마다 새로 실행
    messageStore.subscribe('message', newVal => {
      console.log('newVal: ', newVal)
      // 메시지 바뀌면 h2 부분을 갱신
      this.render()
    })
  }
  render(){
    this.el.textContent = `Title: ${messageStore.state.message}`
  }
}