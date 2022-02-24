import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any = [];
  modalTitle: string = '';
  activeAddEditInspectionComponent: boolean = false;
  inspection: any;

  inspectionTypesMap: Map<number, string> = new Map();

  constructor(private service: InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionsList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  modalAdd(){
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId: null
    }
    this.modalTitle = 'Add Inspection';
    this.activeAddEditInspectionComponent = true;
  }

  modalEdit(item: any){
    this.inspection = item;
    this.modalTitle = 'Edit Inspection';
    this.activeAddEditInspectionComponent = true;
  }

  modalDelete(item: any){
    if(confirm(`Are you sure you want to delete inspection ${item.id}`)){
      this.service.deleteInspections(item.id).subscribe(
        res => {
          var closeModelBtn = document.getElementById('add-edit-modal-close');
          if(closeModelBtn){
          closeModelBtn.click();
         }
         var showDeleteSuccess = document.getElementById('delete-success-alert');
          if(showDeleteSuccess){
          showDeleteSuccess.style.display = 'block';
          }
          setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = 'none';
            }
          }, 4000);
          this.inspectionList$ = this.service.getInspectionsList();
        }
      );
    }
  }

  modalClose(){
    this.activeAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionsList();
  }

  refreshInspectionTypesMap(){
    this.service.getInspectionTypesList().subscribe(
      data => {
        this.inspectionTypesList = data;
        for (let i = 0; i < data.length; i++)
        {
          this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
        }
      }
    );
  }

}
