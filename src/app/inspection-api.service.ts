import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:7077/api";

  constructor(private http:HttpClient) { }

  getInspectionsList(): Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/Inspections');
  }

  addInspections(data: any){
    return this.http.post(this.inspectionAPIUrl+'/Inspections', data);
  }

  updateInspections(data: any, id: number){
    return this.http.put(this.inspectionAPIUrl+`/Inspections/${id}`, data);
  }

  deleteInspections(id: number){
    return this.http.delete(this.inspectionAPIUrl+`/Inspections/${id}`);
  }

  getInspectionTypesList(): Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/InspectionTypes');
  }

  addInspectionTypes(data: any){
    return this.http.post(this.inspectionAPIUrl+'/InspectionTypes', data);
  }

  updateInspectionTypes(data: any, id: number){
    return this.http.put(this.inspectionAPIUrl+`/InspectionTypes/${id}`, data);
  }

  deleteInspectionTypes(id: number){
    return this.http.delete(this.inspectionAPIUrl+`/InspectionTypes/${id}`);
  }

  getStatusList(): Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl+'/Status');
  }

  addStatus(data: any){
    return this.http.post(this.inspectionAPIUrl+'/Status', data);
  }

  updateStatus(data: any, id: number){
    return this.http.put(this.inspectionAPIUrl+`/Status/${id}`, data);
  }

  deleteStatus(id: number){
    return this.http.delete(this.inspectionAPIUrl+`/Status/${id}`);
  }

}
