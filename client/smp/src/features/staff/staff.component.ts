import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApicallsService } from 'src/app/services/apicalls.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  constructor(private staff:ApicallsService,private fb: FormBuilder) {
    this.formInit();
  }
  
  public dataSource!: any[];
  public filterValues:any;
  public fields = [
    "clientIp",
    "clientIpDetails",
    "createdAt",
    "email",
    "hostname",
    "serverIp",
    "serverIpDetails",
    "statusCode",
    "statusMessage",
    "updatedAt",
    "uri"
  ]
  public displayedColumns: any = ["select","uri",'email',"clientIp",'client_org',"serverIp",'server_org',"statusMessage","createdAt","updatedAt"]
  public totalCount=0;
  public form!:FormGroup;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  public selection = new SelectionModel<any>(true, []);

  ngOnInit():void{
    this.getFilterValues();
    this.getAudits(0,5)
  }

  public getAudits(pageIndex: any,pageSize:any){
    const formValues = this.form.getRawValue();
    // this.staff.getAudits(pageIndex,pageSize,formValues).subscribe((res:any)=>{
    //   this.dataSource = res.audits;
    //   this.totalCount = res.totalCount;
    // })
  }

  public getFilterValues(){
    // this.staff.getStaffFilterValues().subscribe((res:any)=>{
    //   this.filterValues = res
    // })
  }

  public pageNavigate(event:PageEvent){
    this.getAudits(event.pageIndex,event.pageSize);
  }

  private formInit(){
    this.form = this.fb.group({
      statusCode:[''],
      statusMessage:[''],
      email:[''],
    })
  }

  public applyFilter(){
    this.selection.clear()
    this.paginator.firstPage();
    this.getAudits(this.paginator.pageIndex,this.paginator.pageSize);
  }

  public clearFilter(){
    this.form.reset();
    this.selection.clear()
    this.paginator.firstPage();
    this.getAudits(this.paginator.pageIndex,this.paginator.pageSize);
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected == numRows;
  }

  public masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.forEach(row => this.selection.select(row));
  }

  /** For single selection uncomment this code. */
  public selectRow(row: any){
    this.selection.clear()
    this.selection.select(row);
    console.log(this.selection.selected)
  }

}
