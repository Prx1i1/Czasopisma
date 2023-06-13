import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as xml2js from 'xml2js';

interface CustomArray{
  brand: String,
  source: any[]
}

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  innerHtmlInsert: string = ""
  innerHtmlGeneration: CustomArray[] = []

  constructor(private httpClient:HttpClient){
    this.sendPhpRequest("add", "b", "c")
  }

  private xmlToJson (xml: String): object {
    let response: object = new Object()
      const parser = new xml2js.Parser({explicitArray: false});
          parser.parseString(xml, (err, result) => {
            console.log(result);
            console.log(typeof result)

            response = result.czasopisma.zmienne

          });
      return response;
  }

  private sendPhpRequest(type: String, field: String, value: String) {
    fetch("http://localhost:3000/xmlChanges.php", {
      method: "POST",
      body: JSON.stringify({
        type: type,
        field: field,
        value: value
    })
    }).then(e => e.text()).then(e => console.log(e))
  }

  ngOnInit(): void {

    const params = new HttpParams().set("test", "test")
		this.httpClient.get("/assets/czasopisma.xml", { responseType: 'text' })
		.subscribe((data) => {
      //xml parsed data
			console.log(data);
      let json: object = this.xmlToJson(data)

      console.log("json data", json)

      for (let obj of Object.entries(json)){
        this.innerHtmlInsert += "<form method='post' action='/xmlChanges.php'><tr><td class='cell'><input name='field' value='" + obj[0] + "'/></td><td class='cell'><input name='field' value='" + obj[1].src +"'/></td><td><button type='submit' class='buttonOverwrite'>Overwrite</button></td></tr></form>"
        this.innerHtmlGeneration.push({brand: obj[0], source: obj[1].src})
      }
    
      console.log("html", this.innerHtmlInsert)
      let coll = document.querySelectorAll(".modifyData")
      coll.forEach(n => {
        n.innerHTML = this.innerHtmlInsert
      })

      document.querySelectorAll(".buttonOverwrite").forEach(e => {
        let coll: HTMLCollection = e.parentElement!.parentElement!.children

        //coll.item(0 1)
        e.addEventListener('click', function(){
          console.log("VALUE", coll.item(0)?.children.item(0))
          fetch("http://localhost:3000/xmlChanges.php", {
            method: "POST",
            body: JSON.stringify({
              type: 'update',
              field: coll.item(0)?.children.item(0)!.getAttribute("value"),
              value: "<src>" + coll.item(1)?.children.item(0)!.getAttribute("value") + "</src>"
          })
          }).then(e => e.text()).then(e => console.log(e))
        })
      })


    })
  }

}
