import { ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { IProductcar } from 'src/app/Interfaces/IProductsCar';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';


interface Prueba{
  image: String | any
  precio: number | any
  cantidad: number | any

}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {
  searchText: any;
  selectedProduct: IProductcar[] = []
  data = []  = [];
  total : Number | any
  selectProduct2: IProductcar[] = []
  val: number = 0
  num: number = 0
  constructor(private sharedDataService: SharedDataServiceService){}

  ngOnInit(){
    this.selectedProduct = this.sharedDataService.getSelectProduct();
    
    console.log("Select Product de CARRTIO",this.selectedProduct)
    //this.total  = this.selectedProduct.reduce((acc, obj) =>acc + (obj.price * obj.stock), 0);
    console.log("TOTAL:",this.total)
    this.totales()
  }

  onDeleteSelectedProduct(i: number) {
    this.sharedDataService.deleteSelectedProduct(i);
    this.totales()
  }


  incrementValue(index: number) {
   
    this.selectedProduct[index].stock++;
    this.selectProduct2 = this.selectedProduct
    this.totales()
  }

  decrementValue(index: number) {
    console.log(index)
    console.log(this.selectedProduct[index].stock)
    if (this.selectedProduct[index].stock<= 1) {
      this.selectedProduct[index].stock = 1
      this.selectProduct2 = this.selectedProduct
      this.totales()
    } else {
      this.selectedProduct[index].stock--; 
      this.selectProduct2 = this.selectedProduct
      this.totales()
    }
  }
  handleInputChange(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
      const inputValue = parseInt(inputElement.value);
      this.selectedProduct[index].stock = inputValue;
      this.totales()

  }

  totales(){
    this.val = 0
    for(const value of this.selectedProduct){

      this.num = value.price * value.stock
      this.val = this.val + this.num
      console.log("VALUES",this.val)
      }
    //this.total = this.selectedProduct.reduce((acc,obj,) => acc + (obj.price * obj.stock),0);
    //return this.total;
  }
}
