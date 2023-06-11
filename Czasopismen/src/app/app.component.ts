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

  previousInputValue: string = "";

  constructor(){
    this.timeUpdater()
    console.log("s")
  }

  public validateInput(e: Event | null)
  {

    let text: string = (e?.currentTarget as HTMLInputElement).value

    let mutatedEvent: KeyboardEvent = e as KeyboardEvent

    console.log("wild mutation:", mutatedEvent)

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


  public notifyChange = (event: Event) => {

    let eventTarget: EventTarget = event.currentTarget!;

    console.log(event, eventTarget)

  }

  private timeUpdater = () => {
    this.currentDate = Date.now()
    setTimeout(() => this.timeUpdater(), 1000)
  }

}
