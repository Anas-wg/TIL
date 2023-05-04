import { CoreComponent } from '../core/heropy'
import messageStore from '../store/message'

export default class TextField extends CoreComponent {
  render(){
    this.el.innerHTML = /* html */`
    <!-- 여기서 입력받은 데이터를 다른 컴포넌트에서 출력해보자 -->
    <!-- 가져온 store의 state의 message 를 사용 => 값을 조회해서 넣거나(Getter) -->
      <input value="${messageStore.state.message}"/>
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input',() => {
      // 할당연산자를 통해 값을 지정해서 넣거나(Setter)
      messageStore.state.message = inputEl.value
      console.log(inputEl.value)
    })
  }
}