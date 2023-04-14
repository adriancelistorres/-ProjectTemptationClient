import { Component } from '@angular/core';
import { IProducts } from '../../../Interfaces/IProducts';
import { ProductosService } from '../../../services/productos.service';
import { Router } from '@angular/router';
import { ISize } from '../../../Interfaces/ISize';
import { IColor } from 'src/app/Interfaces/IColor';
import { SizeService } from 'src/app/services/size.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-prod-vestidos',
  templateUrl: './prod-vestidos.component.html',
  styleUrls: ['./prod-vestidos.component.css']
})
export class ProdVestidosComponent {
  listProducts: IProducts[] = [];
  selectprod: IProducts | any;
  id:any;
  listSize: ISize[] = [];
  selectedOption: string[] = ['S', 'M', 'L'];
  isChecked: boolean = false;
  tallaSeleccionada: string|any;
  colorSeleccionada: String | any
  listcolor: IColor[] = []
  idcolor: any|undefined;
  idsize: any|undefined;

  constructor(
    private _productService: ProductosService,
    private router:Router,
    private _sizeService: SizeService,
    private _colorservice: ColorService,
    ){

    this._productService.RefreshRequired.subscribe((result)=> {
      this.getOnlyVestidos();
      this.miSize();
      this.micolor();
      this.SizeColorDetector();
    })
  }

  ngOnInit(){
    this.getOnlyVestidos();
    this.miSize();
    this.micolor();
    this.SizeColorDetector();
    const url = this.router.url;
    localStorage.setItem('url',url);
    console.log("URL",url);
  }

  getOnlyVestidos() {
    this._productService.getProducts().subscribe((data: IProducts[]) =>
    {
      this.listProducts = data.filter(op=>op.idcat ==13);
    });
  }

  getOneProduct(id:number){
    this.router.navigate(['/detproducto',id])
    // this.detprodview.getOneProduct(id);

  }

  miSize() {
    this._sizeService.getSize().subscribe(
      (option5: any[]) => {
        this.listSize = option5.filter(op=>op.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  micolor(){
    this._colorservice.getColors().subscribe(
      (option5: any[]) => {
        this.listcolor = option5.filter(op=>op.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  /*Piero Avance */
  handleidSizeChange(event: any){
    const isChecked = event.target.checked;
    if(isChecked){
      this.tallaSeleccionada = event.target.value;
      console.log("SIZE",this.tallaSeleccionada)
    }else{
      this.tallaSeleccionada = null
    }
    this.SizeColorDetector()
  }

    /*Piero Avance */
    handleidColorChange(event: any){
      const isChecked = event.target.checked;
      if(isChecked){
        this.colorSeleccionada = event.target.value;
        console.log("COLOR",this.colorSeleccionada)
      }else{
        this.colorSeleccionada = null
      }
      this.SizeColorDetector()
    }

    SizeColorDetector(){

      if(this.colorSeleccionada != null && this.tallaSeleccionada != null){
        this.handleComboChange(this.tallaSeleccionada,this.colorSeleccionada);
      }else if(this.colorSeleccionada != null){
        this._productService.getProducts().subscribe(
          (options: any[]) => {
            this.listProducts = options.filter(option=>option.idcolor == this.colorSeleccionada && option.idcat == 13);
            console.log("LOG1",this.listProducts)
          },
          (error: any) => {
            console.log(error);
          }
        );
      }else if(this.tallaSeleccionada != null){
        this._productService.getProducts().subscribe(
          (options: any[]) => {
            this.listProducts = options.filter(option=>option.idsize == this.tallaSeleccionada && option.idcat == 13);
            console.log("LOG1",this.listProducts)
          },
          (error: any) => {
            console.log(error);
          }
        );
      }else{
        this.getOnlyVestidos();
      }
    }

  handleComboChange(size: any, color: any){
        if(color!= null && size != null){
          console.log("COlOR",this.colorSeleccionada)
          console.log("SIZE",this.tallaSeleccionada)
          this._productService.getProducts().subscribe(
            (options: any[]) => {
              this.listProducts = options.filter(option=>option.idsize == size && option.idcolor == color && option.idcat == 13);
              console.log("LOG1",this.listProducts)
            },
            (error: any) => {
              console.log("ERROR DE METODO COMBO",error);
            }
          );
      }
    }

}
