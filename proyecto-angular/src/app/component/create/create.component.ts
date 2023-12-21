import { Component } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs';
import { UploadService } from '../../services/upload.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, UploadService]
})
export class CreateComponent {
  public title: string;
  public project: Project;
  public status: string;

  constructor(
    private _projectService : ProjectService,
    private _uploadService : UploadService
  ){
    this.title = "Crear proyecto"
    this.project = new Project('', '', '', '', 2023, '', '')
    this.status = "";


  }

  onSubmit(form:any){
    this._projectService.saveProject(this.project).subscribe({
      next: response => {
        if(response.project){
          this.status = "success"
          form.reset()
        } else {
          this.status = "failed"
        }
      },
      error: error => {
        console.log(<any>error)
      }}
    )
  }
}
