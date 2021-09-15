import { Pipe } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {

    transform(rawNum) {
    
    var country = rawNum.slice(0, 3);
    var city = rawNum.slice(3, 6);
    var number = rawNum.slice(6);

    return ("(" +country+ ") " + city + "-" + number).trim();
   
  }
}