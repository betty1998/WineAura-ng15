import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../shared/model/Product";
import {OrderService} from "../../shared/service/order.service";
import {ProductService} from "../../shared/service/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog.component";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit, AfterViewInit{
  searchText: any;
  displayedColumns: string[] = ['id', 'name', 'price','category', 'stock', 'sold', 'status', 'action'];
  products: Product[] = [];
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selected: string="";

  constructor(private productService:ProductService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      if (res.success) {
        this.products = res.data;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.setDataSourceAttributes();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.setDataSourceAttributes();
    }

  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteProduct(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(id).subscribe(res=>{
          if (res.success) {
            this.products = this.products.filter(product => product.id !== id);
            this.dataSource = new MatTableDataSource<Product>(this.products);
            this.setDataSourceAttributes();
          } else {
            console.log(res);
            alert(res.message);
          }
        });
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterBy(event: Event) {
    console.log(this.selected);
    if (this.selected) {
      const filterType = this.selected;
      const customFilterPredicate = (data: Product, filter: string) => {
        switch (filterType) {
          case 'category':
            return data.category.toLowerCase().includes(filter.toLowerCase());
          case 'brand':
            return data.brand.toLowerCase().includes(filter.toLowerCase());
          case 'status':
            return data.productStatus.toLowerCase().includes(filter.toLowerCase());
          default:
            return data.toString().toLowerCase().includes(filter.toLowerCase());
        }
      };
      this.dataSource.filterPredicate = customFilterPredicate;
    }
  }
}
