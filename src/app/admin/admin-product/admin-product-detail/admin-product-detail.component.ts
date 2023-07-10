import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/service/product.service";
import {Product} from "../../../shared/model/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, finalize, map, Subscription} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {ProductStatus} from "../../../shared/model/ProductStatus";
import {UploadService} from "../../../shared/service/upload.service";
import {DataResponse} from "../../../shared/httpResponse/dataResponse";
import {UtilService} from "../../../shared/service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../../../shared/dialog/info-dialog.component";
import {AddOptionDialogComponent} from "../../../shared/dialog/add-option-dialog.component";

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit{
  id!: number;
  product!:Product;
  productForm!:FormGroup;
  categories: string[] = ['Beer', 'Wine', 'Spirits', 'Cider', 'Non-Alcoholic','Red Wine','White Wine','Rose Wine','Sparkling Wine','Dessert Wine','Fortified Wine','Champagne','Cabernet Sauvignon','Pinot Noir','Merlot','Pinot Grigio','Riesling','test1','test2','test3'];
  brands: string[] = ['Veuve Clicquot','Austin Hope','test1','test2','test3'];
  regions: string[] = ['France','Italy','California','test1','test2','test3'];
  fileName!: string|null;
  requiredFileType: string = '.png, .jpg, .jpeg';
  uploadProgress!:number|null;
  uploadSub!: Subscription|null;
  isLoading = false;
  addProductSub!: Subscription;
  totalProgress!: number;
  file!: File|null;
  imageUrl$ = new BehaviorSubject<string | ArrayBuffer | null>("");
  title!:string;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private router:Router,
              private fb:FormBuilder,
              private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private uploadService:UploadService,
              private util:UtilService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.createGroup();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title = "Edit Product";
      this.id = id;
      this.productService.getProduct(id).subscribe(res => {
        if (res.success) {
          this.product = res.data;
          console.log(res.data);
          this.imageUrl$.next(this.product.image);
          this.fillProductFrom(this.product);
        } else {
          console.log(res);
          alert(res.message);
        }
      });
    } else {
      this.title = "Add Product";
    }
  }

  createGroup() {
    this.productForm = this.fb.group({
      name: ['name',[Validators.required]],
      description: ['description',[Validators.required]],
      taste: [''],
      style: [''],
      // pattern end with percent sign
      abv: ['',[Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?%$/)]],
      // pattern end ml or L
      capacity: ['750ml',[Validators.required, Validators.pattern(/^[0-9]+(ml|L)$/)]],
      brand: ['brand1',[Validators.required]],
      region: ['region1',[Validators.required]],
      category: ['Wine',[Validators.required]],
      price: ['',[Validators.required, Validators.min(0)]],
      stockQty: ['',[Validators.required, Validators.min(0)]],
      image: ['',[Validators.required]],
    });
  }

  fillProductFrom(product:Product){
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      taste: product.taste,
      style: product.style,
      abv: product.abv,
      capacity: product.capacity,
      brand: product.brand,
      region: product.region,
      category: product.category,
      price: product.price,
      stockQty: product.stockQty,
      image: product.image
    });
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.controls[key].markAsTouched();
    });
  }

  onFileSelected(event: Event) {
    console.log("onFileSelected")
    const file:File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.isLoading = true;
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        console.log(reader.result)
        this.imageUrl$.next(reader.result);
        this.productForm.get('image')?.setValue(reader.result);
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log(this.fileName);
      }
    }
  }

  saveProduct(imageUrl:string) {
    const product:Product = this.productForm.value;
    product.image = imageUrl;
    product.discount = 1;
    product.productStatus = ProductStatus.AVAILABLE;
    product.reviews = [];
    console.log(product);
    this.addProductSub = this.http.post(`${environment.api}/products`, product, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.reset())
      )
      .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // calculate addProduct progress as the other half of total progress
        this.totalProgress = 50 + Math.round(50 * (event.loaded / (event.total || 1)));
        console.log("save product:",this.totalProgress);
      } else if (event.type === HttpEventType.Response) {
        const res = event.body as DataResponse<Product>;
        if (res.success) {
          console.log(res.data);
          alert("Add product successfully");
          this.router.navigate(['/admin/product']).catch();
        } else {
          console.log(res);
          alert(res.message);
        }
      }
    });
  }

  addProduct() {
    console.log(this.productForm);
    this.totalProgress = 0;
    const formData = new FormData();
    formData.append("file", this.file||new Blob());

    this.uploadSub = this.uploadService.uploadFile(formData).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.totalProgress = Math.round(50 * (event.loaded / (event.total || 1)));
        console.log("upload:",this.totalProgress);
      } else if (event.type === HttpEventType.Response) {
        const res = event.body as DataResponse<string>;
        this.saveProduct(res.data);
      }
    });
  }


  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }


  updateProduct() {
    const product:Product = this.productForm.value;
    console.log(product);
    if(this.util.checkSame(product, this.product)){
      alert("No change");
      return;
    }
    product.id = this.product.id;
    this.productService.updateProduct(product).subscribe(res => {
      if (res.success) {
        console.log(res.data);
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: "Update Product",
            message: "Update product successfully"
          }
        })
        this.router.navigate(['/admin/product-list']).catch();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  deleteImage() {
    console.log("cancel image");
    if(this.product && this.product.image) {

    }
    this.imageUrl$.next("");
    this.fileName = null;
    this.file = null;
    this.cdr.detectChanges();

    // change the value of fileUpload input tag
    this.productForm.get('image')?.setValue( null);
    console.log(this.productForm.get('image')?.value);
    this.reset();
  }

  addNewCategory(event:Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (!selected) {
      console.log("add new category");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data:  "Category"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categories.push(result);
          this.productForm.get('category')?.setValue(result);
          this.productService.addCategory(result).subscribe(res => {
            if (res.success) {
              console.log(res.data);
            } else {
              console.log(res);
              alert(res.message);
            }
          } );
        }else {
          //reset the select
          this.productForm.get('category')?.setValue(null);
        };
      });
    } else {
      console.log("selected category:",selected);
    }

  }

  addNewBrand(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (!selected) {
      console.log("add new brand");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data:  "Brand"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.brands.push(result);
          this.productForm.get('brand')?.setValue(result);
          this.productService.addBrand(result).subscribe(res => {
            if (res.success) {
              console.log(res.data);
            } else {
              console.log(res);
              alert(res.message);
            }
          } );
        }else {
          //reset the select
          this.productForm.get('brand')?.setValue(null);
        };
      });
    }
  }

  addNewRegion(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (!selected) {
      console.log("add new region");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data: "Region",
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.regions.push(result);
          this.productForm.get('region')?.setValue(result);
          this.productService.addRegion(result).subscribe(res => {
            if (res.success) {
              console.log(res.data);
            } else {
              console.log(res);
              alert(res.message);
            }
          } );
        }else {
          //reset the select
          this.productForm.get('region')?.setValue(null);
        };
      });
    }
  }
}
