import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutmeComponent } from "./component/aboutme/aboutme.component";
import { ProjectsComponent } from "./component/projects/projects.component";
import { CreateComponent } from "./component/create/create.component";
import { ContactComponent } from "./component/contact/contact.component";
import { ErrorComponent } from "./component/error/error.component";
import { DetailComponent } from "./component/detail/detail.component";
import { EditComponent } from "./component/edit/edit.component";

const appRoutes: Routes = [
  {path: '', component: AboutmeComponent},
  {path: 'sobre-mi', component: AboutmeComponent},
  {path: 'proyectos', component: ProjectsComponent},
  {path: 'crear-proyecto', component: CreateComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'editar-proyecto/:id', component: EditComponent},
  {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRoutes)
