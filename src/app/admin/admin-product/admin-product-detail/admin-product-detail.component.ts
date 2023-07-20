import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/service/product.service";
import {Product} from "../../../shared/model/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, finalize, map, Subscription} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
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
  categories:string[] =[];
  brands:string[] =[];
  regions:string[] =[];
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
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  fileSizeLimit = 5 * 1024 * 1024;
  fileError: boolean=false;

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
    this.getAllCategories();
    this.getAllBrands();
    this.getAllRegions();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title = "Edit Product";
      this.id = id;
      this.productService.getProduct(id,"admin").subscribe(res => {
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
      capacity: ['',[Validators.pattern(/^[0-9]+(ml|L)$/)]],
      brand: ['',[Validators.required]],
      region: ['',[Validators.required]],
      category: ['Red Wine',[Validators.required]],
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
    if (file && file.size <= this.fileSizeLimit) {
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
    }else{
      this.fileError=true;
    }
  }

  onSaveProduct() {
    console.log(this.productForm);
    // create formData
    const formData = new FormData();
    // add file to formData
    formData.append("file", this.file||new Blob());
    // add product to formData
    const product:Product = this.productForm.value;
    product.discount = 1;
    product.productStatus = ProductStatus.AVAILABLE;
    product.reviews = [];
    formData.append('product', JSON.stringify(product));
    this.productService.addProduct(formData).subscribe(res => {
      if (res.success) {
        console.log(res.data);
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: "Success",
            message: "Product added successfully!"
          }
        });
        this.router.navigate(['/admin/product-list']).catch();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
    // this.uploadSub = this.uploadService.uploadFile(formData).subscribe(event => {
    //   if (event.type == HttpEventType.UploadProgress) {
    //     this.totalProgress = Math.round(50 * (event.loaded / (event.total || 1)));
    //     console.log("upload:",this.totalProgress);
    //   } else if (event.type === HttpEventType.Response) {
    //     const res = event.body as DataResponse<string>;
    //     this.saveProduct(res.data);
    //   }
    // });
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
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: "Success",
              message: "Product added successfully!"
            }
          });
          this.router.navigate(['/admin/product-list']).catch();
        } else {
          console.log(res);
          alert(res.message);
        }
      }
    });


  }




  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }



  onUpdateProduct() {
    const product:Product = this.productForm.value;
    product.id = this.product.id;
    console.log(product);
    if(this.util.checkSame(product, this.product)){
      alert("No change");
      return;
    }
    if (this.file) {
      const formData = new FormData();
      formData.append("file", this.file||new Blob());
      this.uploadService.uploadFile(formData).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.totalProgress = Math.round(50 * (event.loaded / (event.total || 1)));
          console.log("upload:", this.totalProgress);
        } else if (event.type === HttpEventType.Response) {
          const res = event.body as DataResponse<string>;
          this.updateProduct({...product, image: res.data});
        }
      });
    }else {
      this.updateProduct(product);
    }

  }

  updateProduct(product:Product) {
    this.productService.updateProduct(product,"admin").subscribe(res => {
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
      this.product.image = "";
      this.fileName = null;
      this.file = null;
    }

    // change the value of fileUpload input tag
    this.productForm.get('image')?.setValue( null);
    console.log(this.productForm.get('image')?.value);
    this.reset();

    this.imageUrl$.next(null);
    this.fileUpload.nativeElement.value = '';
    this.cdr.detectChanges();
  }

  addNewCategory(event:Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (selected=="add") {
      console.log("add new category");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data:  "Category"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categories.push(result);
          this.productForm.get('category')?.setValue(result);
          this.productService.addCategory(result,"admin").subscribe(res => {
            if (res.success) {
              console.log(res.data);
              this.cdr.detectChanges();
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
    }

  }

  addNewBrand(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (selected=="add") {
      console.log("add new brand");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data:  "Brand"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.brands.push(result);
          this.cdr.detectChanges();
          this.productForm.get('brand')?.setValue(result);
          this.productService.addBrand(result,"admin").subscribe(res => {
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
    if (selected=="add") {
      console.log("add new region");
      const dialogRef = this.dialog.open(AddOptionDialogComponent, {
        data: "Region",
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.regions.push(result);
          this.cdr.detectChanges();
          this.productForm.get('region')?.setValue(result);
          this.productService.addRegion(result,"admin").subscribe(res => {
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

    protected readonly Math = Math;

  thumbUp(id: number | undefined) {

  }

  thumbDown(id: number | undefined) {

  }

  getAllCategories() {
    this.productService.getAllCategories().subscribe(res => {
      if (res.success) {
        this.categories = res.data.map(category => category.name).sort((a,b)=>a.localeCompare(b));
        console.log(this.categories)
        this.cdr.detectChanges();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  getAllBrands() {
    this.productService.getAllBrands().subscribe(res => {
      if (res.success) {
        this.brands = res.data.map(brand => brand.name).sort((a,b)=>a.localeCompare(b));
        this.cdr.detectChanges();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  getAllRegions() {
    this.productService.getAllRegions().subscribe(res => {
      if (res.success) {
        this.regions=res.data.map(region => region.name).sort((a,b)=>a.localeCompare(b));
        this.cdr.detectChanges();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }
}
