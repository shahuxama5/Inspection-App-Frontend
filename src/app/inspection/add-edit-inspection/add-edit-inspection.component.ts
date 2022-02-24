import { InspectionApiService } from './../../inspection-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;

  @Input() inspection: any;
  id: number = 0;
  status: string = '';
  comments: string = '';
  inspectionTypeId!: number; 

  constructor(private service: InspectionApiService) { }

  ngOnInit(): void {
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusList();
    this.inspectionList$ = this.service.getInspectionsList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }

  addInspection(){
    var inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    }
    this.service.addInspections(inspection).subscribe(
      res => {
        var closeModelBtn = document.getElementById('add-edit-modal-close');
        if(closeModelBtn){
          closeModelBtn.click();
        }
        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess){
          showAddSuccess.style.display = 'block';
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display = 'none';
          }
        }, 4000);
      }
    );

  }

  updateInspection(){
    var inspection = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    }
    var id: number = this.id;
    this.service.updateInspections(inspection, id).subscribe(
      res => {
        var closeModelBtn = document.getElementById('add-edit-modal-close');
        if(closeModelBtn){
          closeModelBtn.click();
        }
        var showUpdateSuccess = document.getElementById('update-success-alert');
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = 'block';
        }
        setTimeout(function(){
          if(showUpdateSuccess){
            showUpdateSuccess.style.display = 'none';
          }
        }, 4000);
      }
    );
  }
}
