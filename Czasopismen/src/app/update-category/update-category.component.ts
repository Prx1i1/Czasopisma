import { Component } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent {

  constructor(){
    this.sendPhpRequest("a", "b", "c")
  }

  private sendPhpRequest(type: String, field: String, value: String) {
    fetch("http://localhost/xmlChanges.php", {
      method: "POST",
      body: JSON.stringify({
        type: type,
        field: field,
        value: value
    })
    }).then(e => e.text()).then(e => {
      alert(e);
    });
  }


}
