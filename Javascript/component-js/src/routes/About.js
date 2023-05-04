import { CoreComponent } from "../core/heropy";

// About 화면 컴포넌트

export default class About extends CoreComponent {
  render(){
    const { a , b, c } = history.state
    this.el.innerHTML = /* html */`
      <h1>About Page!</h1>
      <h2>${a}</h2>
      <h2>${b}</h2>
      <h2>${c}</h2>
    `
  }
}