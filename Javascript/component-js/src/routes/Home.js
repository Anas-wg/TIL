import { CoreComponent } from "../core/heropy";
import TextField from "../components/TextField";
import Message from "../components/Message";
import Title from "../components/Title";

// 메인 화면 컴포넌트

export default class Home extends CoreComponent {
  render(){
    this.el.innerHTML = /* html */`
      <h1>Home Page!</h1>
    `
    // input 요소 밀어넣기 
    this.el.append(
      new TextField().el,
      // messageStore.state.message 출력
      new Message().el,
      new Title().el
      )
  }
}

