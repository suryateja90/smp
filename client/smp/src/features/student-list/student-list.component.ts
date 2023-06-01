import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentViewComponent } from '../studet-view/student-view.component';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'id', 'email', 'actions'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 0;
  totalItems!: number;
  items: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  

  constructor(private http: HttpClient,
    private router: Router, private api: ApicallsService, public serv: GenericService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    const url = 'get-students';
    this.api.get(url).subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.totalItems = result && result.length;
      this.items = result;
      console.log(result)
    });
  }
   
  openViewPopup(info: {}): void {
    const dialogRef = this.dialog.open(StudentViewComponent,  {
      data: info,
      width: '600px',
      height: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    });
  }

  openEditPopup(info: {}) {
    this.serv.addEditData(info)
    this.router.navigate(['edit'])
  }
  

  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
