import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/service/product.service";
import {Product} from "../../../shared/model/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {ProductStatus} from "../../../shared/model/ProductStatus";

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit{
  id!: number;
  product!:Product;
  productForm!:FormGroup;
  categories: string[] = ['Beer', 'Wine', 'Spirits', 'Cider', 'Non-Alcoholic'];
  brands: string[] = ['brand1'];
  regions: string[] = ['region1'];
  fileName!: string|null;
  requiredFileType: string = '.png, .jpg, .jpeg';
  uploadProgress!:number|null;
  uploadSub!: Subscription|null;
  imageUrl!: string | ArrayBuffer | null;
  isLoading = false;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private router:Router,
              private fb:FormBuilder,
              private http: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = id;
      this.productService.getProduct(id).subscribe(res=>{
        if (res.success) {
          this.product = res.data;
          console.log(res.data);
        } else {
          console.log(res);
          alert(res.message);
        }
      });
    }
    this.createGroup();
  }
  createGroup() {
    this.productForm = this.fb.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]],
      taste: [''],
      style: [''],
      // pattern end with 2 decimal and with percent sign
      ABV: ['',[Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?%$/)]],
      // pattern end ml or L
      capacity: ['',[Validators.required, Validators.pattern(/^[0-9]+(ml|L)$/)]],
      brand: ['',[Validators.required]],
      region: ['',[Validators.required]],
      category: ['',[Validators.required]],
      price: ['',[Validators.required, Validators.min(0)]],
      stock: ['',[Validators.required, Validators.min(0)]],
      image: ['',[Validators.required, Validators.pattern(/\.(png|jpg|jpeg)$/)]],
    });
  }

  onFileSelected(event: Event) {

    const file:File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.isLoading = true;
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log(this.fileName);
      }
    }
  }

  addProduct() {
    const product:Product = this.productForm.value;
    product.image = this.fileName || '';
    product.discount = 1;
    product.productStatus = ProductStatus.AVAILABLE;
    product.reviews = [];
    console.log(product);
    this.productService.addProduct(product).subscribe(res=>{
      if (res.success) {
        alert("Add product successfully");
        this.router.navigate(['/admin/product']);
      } else {
        console.log(res);
        alert(res.message);
      }
    });


  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const upload$ = this.http.post(`${environment.api}/file`, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.reset())
      );

    this.uploadSub = upload$.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 1)));
      }
    })
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  cancelUpload() {
    console.log('cancel');
    this.imageUrl = null;
    this.fileName = null;
    this.cdr.detectChanges();

    // change the value of fileUpload input tag
    this.productForm.get('image')?.setValue( null);
    console.log(this.productForm.get('image')?.value);
    // this.uploadSub?.unsubscribe();
    // this.reset();
  }
  imageToShow: any;
  getImage() {
    this.http.get(`${environment.api}/file/Wine.png`,{ responseType: 'blob' }).subscribe(res=>{
      console.log(res);
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.isLoading = false;
        this.imageToShow = reader.result;
      }, false);

      if (res) {
        reader.readAsDataURL(res);
      }
    } );
  }
}
