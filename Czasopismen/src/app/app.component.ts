import { Component, SimpleChange, SimpleChanges, Input, OnChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDate: number = Date.now();
  title: String = 'Czasopisma';
  @Input() inputName: number = 0;
  isPageFirst: boolean = true

  currentValue: string = "";
  previousInputValue: string = "";

  constructor(){
    this.timeUpdater()
    console.log("s")
  }
  

  public validateInput(e: Event | null)
  {

    console.log("is e null", e)

    let text: string = (e?.currentTarget as HTMLInputElement).value

    if(e == null){
      console.log("no event")
      return false;
    }else{
      var rgx = /^[0-9]*\.?[0-9]*$/;
      console.log("prec value", this.previousInputValue);
      if(text.match(rgx)){
        console.log("regex matcghe")
        this.previousInputValue = text
        return true;
      }else{
        console.log("set prev");
        (e.currentTarget as HTMLInputElement).setAttribute('value', this.previousInputValue);
        return true;
      }
    }

  }

  public changeValue(event: Event){

    let eventTarget: EventTarget = event.currentTarget!;

    let targetInput = document.querySelector(".htmlhack .cash")

    var rgx = /^[0-9]*\.?[0-9]*$/;
    if((targetInput as HTMLInputElement).value.match(rgx)){
      console.log("good value")

      this.previousInputValue = (targetInput as HTMLInputElement).value;

    }else{
      console.log("bad value, fix:", this.previousInputValue, this.inputName);

      let elements = document.querySelectorAll(".cash");

      elements.forEach(e => {
        (e as HTMLInputElement).value = this.previousInputValue
      });

      //(document.querySelector("#cash") as HTMLInputElement).value = this.previousInputValue

    }


  }

  public notifyChange = (event: Event) => {

    if(Number(event) == 666.66){
      this.isPageFirst = false
    }

  }

  private timeUpdater = () => {
    this.currentDate = Date.now()
    setTimeout(() => this.timeUpdater(), 1000)
  }

}
