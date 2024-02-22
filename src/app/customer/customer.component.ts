import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [StudentComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {
  message: string;
  subscription: Subscription;
  i:number=0;
  num1:number=0;
  num2:number=0;
  j:number=0;
  a:string='abcd';
  b:string='cba';
  arr=[];
 arr1=[];
 arr2=[];


  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.subscription = this.service.currentMessage.subscribe(
      (message) => (this.message = message)
    );

    for(this.num1;this.num2<10;this.num1++){
      this.arr2[this.num1]=this.num1+this.num2;
      this.num2=this.num1+this.num2;
      console.log(this.arr2[this.num1]);
      
    }


    

      for(this.i;this.i<this.a.length;this.i++){
        this.arr[this.i]= this.a.charAt(this.i)
        this.arr.sort();
      }
      for(this.j;this.j<this.a.length;this.j++){
        this.arr1[this.j]= this.a.charAt(this.j)
        this.arr1.sort();
      }
      // for(let x=0;x<this.a.length;x++){

      // if(this.arr[x] === this.arr1[x]){
      //        console.log('valid');
      //     }
      //     else{
      //       console.log('invalid');
      //     }
      //   }

        if(this.arr.toString === this.arr1.toString && this.a.length === this.b.length){
          console.log('valid it is an anagram');
       }
       else{
         console.log('invalid it is not a anagram');
       }


      // for(let x=0;x<this.a.length;x++){
      //   for(let y=0;x<this.b.length;y++){
      //     if(this.arr[x]===this.arr1[y]){
      //       console.log('valid');
      //     }
      //     else{
      //       console.log('invalid');
      //     }
      //   }
      // }

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  getCustomerInfo() {
    //
    this.service.getCustomer().subscribe(
      (customerResponse) => {
        console.log(customerResponse);
        //
      },
      (error) => {
        console.log(error);
        //
      }
    );
  }
}
