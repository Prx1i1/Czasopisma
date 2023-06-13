import { Component, OnInit } from '@angular/core';
import * as xml2js from 'xml2js';

import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'images-frame',
  templateUrl: './images-frame.component.html',
  styleUrls: ['./images-frame.component.css']
})
export class ImagesFrameComponent implements OnInit {

  htmlFrameImages: String = "";

  constructor(private httpClient:HttpClient) {

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

  ngOnInit(): void {

    const params = new HttpParams().set("test", "test")
		this.httpClient.get("/assets/czasopisma.xml", { responseType: 'text' })
		.subscribe((data) => {
      //xml parsed data
			console.log(data);
      let json: object = this.xmlToJson(data)

      console.log("json data", json)

   
      for(let [prop, value] of Object.entries(json)){
          for(let [propsus, valuesus] of Object.entries(value as Object)){
            if(propsus == "src"){
              this.htmlFrameImages += "<a href=/dates/" + prop +"><img src=" + "http://atarionline.pl/biblioteka/czasopisma/img/" + valuesus +"></a>"
            }
          }
        }

        //console.log(prop, value)
		},
		error => {
			console.log("Error", error);
		});

    // fetch("http://atarionline.pl/biblioteka/czasopisma/img", 
    // { 
    //   mode: "cors",
    //   method: "GET",
    //   headers: {'Content-Type': '*', "Access-Control-Allow-Origin": "*", "Accept" :
    //   "*", "Accept-Encoding" :
    //   "gzip, deflate"},
    //   credentials: "include",
      
      
    // })
    // .then(response => response.text())
    // .then(data => {
    //     const parser = new xml2js.Parser({explicitArray: false});
    //     parser.parseString(data, (err, result) => {
    //       console.log(result);
    //       console.log(result.czasopisma.zmienne.Atari_Age.src)
    //     });
    // })
    // .catch(console.error);
  }

}
