import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrl: './edit.component.css',
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{
  public title: string;
  public project: Project;
  public save_project:any;
  public status: string;
  public filesToUpload: Array<File>
  public url: string;

  constructor(
    private _projectService : ProjectService,
    private _uploadService : UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.title = "Editar proyecto";
    this.project = new Project('', '', '', '', 2024, '', '')
    this.status = "";
    this.filesToUpload = []
    this.url = Global.url
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id)
    })
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe({
      next: response => {
        this.project = response.project;
      },
      error: error => {
        console.log(<any>error)
      }
    })
  }

  onSubmit(form:any){
    //Guardar los datos del proyecto
    this._projectService.saveProject(this.project).subscribe({
      next: response => {
        if(response.project){

          //Subir la imagen
          if(this.filesToUpload.length){
            this._uploadService.makeFileRequest(Global.url+'uploadImage/'+response.project._id, [], this.filesToUpload ,'image').then((result:any) => {
              this.save_project = result.project
              this.status = "success"
            })
          } else {
            this.save_project = response.project
              this.status = "success"
          }
        } else {
          this.status = "failed"
        }
      },
      error: error => {
        console.log(<any>error)
      }}
    )
  }
  fileChangeEvent(filenput:any){
    this.filesToUpload = <Array<File>>filenput.target.files;
  }


}
