import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as xml2js from 'xml2js';

import { HttpClient, HttpParams } from '@angular/common/http';


interface DatesInterface {
  date: number;
}

@Component({
  selector: 'app-dates-page',
  templateUrl: './dates-page.component.html',
  styleUrls: ['./dates-page.component.css']
})
export class DatesPageComponent implements OnInit {

  yearinit: String | null = null;

  //all matching entries
  data: object = new Object;
  brand : String | null = "";
  chosenYear: Object[] = [];

  years: Map<number, number> = new Map()

  constructor(private _Activatedroute:ActivatedRoute, private httpClient:HttpClient) {
    this.brand = this._Activatedroute.snapshot.paramMap.get("brand")
    this.yearinit = this._Activatedroute.snapshot.paramMap.get("yearinit")  

    console.log("data from url", this.brand, this.yearinit)

    this.data = this.getXml(this.brand)

    this.selectedDate(null , null)
    //this.populateYearsData()

  }

  public goBack(){
    //function test
  }

  public ToString(key: keyof Object){
    return String(key)
  }

  public getImage(value: any){
    // console.log("val", value)
    return "<img src=" + "'http://atarionline.pl/biblioteka/czasopisma/" + this.brand + "/" + value + "'/>"
  }

  public selectedDate(selected: any, priotityYear: any){
    console.log("pressed date: " + selected)

    if(this.yearinit != null){
      selected = this.yearinit;
      console.log("initiating from year: ", this.yearinit)
    }else{
      console.log("year unspecified")
    }

    let number: String = "";
    let all: boolean = false;

    if(selected == "wszystkie"){
      all = true;
    }else{
      number = String(selected)
    }

    this.chosenYear = []

    for(let [prop, value] of Object.entries(this.data)){
      for(let [propsus, valuesus] of Object.entries(value)){
        //console.log(propsus)
        if(propsus == "$"){
          // console.log("$$")
          // console.log(Object(valuesus).rok )
          if(all || Object(valuesus).rok == String(number)){
            this.chosenYear.push(Object(value))
          }else{

          }
        }
      }
    }

    console.log("redir", number)

    // if(this.chosenYear.length == 0 && number != "null"){
    //   window.location.replace("/");
    // }

    // console.log("year filtered:" + this.chosenYear)

  }

  private populateYearsData(data: object) {
    for(let [prop, value] of Object.entries(data)){
      for(let [propsus, valuesus] of Object.entries(value)){
        //onsole.log("gepropen", propsus, valuesus)
        if(propsus == "$"){
          if(this.years.get(Object(valuesus).rok)){
            this.years.set(Object(valuesus).rok, Number(this.years.get(Object(valuesus).rok)) + 1)
          }else{
            this.years.set(Object(valuesus).rok, 1)
          }

        }
      }
    }

    console.log("all years", this.years)
  }

  private xmlToJson (xml: String): object {
    let response: object = new Object()
      const parser = new xml2js.Parser({explicitArray: false});
          parser.parseString(xml, (err, result) => {
            console.log(result);
            console.log(typeof result)
            console.log(result.czasopisma.zmienne.Atari_Age.src)

            response = result.czasopisma

          });
      return response;
  }

  private getXml(brand: String | null): object{

    let returnedData: object = new Object;

   this.httpClient.get("/assets/czasopisma.xml", { responseType: 'text' })
		.subscribe((data) => {
      //xml parsed data
			console.log("rawdata", data);
      let json: object = this.xmlToJson(data)

      for(let [prop, value] of Object.entries(json)){
        console.log(prop == brand)
        if(prop == brand){
          returnedData = value;
          console.log("retrieved brand data:", value)
          this.populateYearsData(value)

          this.data = value;
          break;
        }
      }

      if(this.yearinit != null){
        this.selectedDate(null, null)
      }

    })

    return returnedData;
  }

  getFromObject(parent: Object,param: String){
    for(let [prop, value] of Object.entries(parent)){
      // console.log("detect missing", prop, value)
      // console.log(prop, param)
      if(prop == param){
        return value;
      }
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

}
