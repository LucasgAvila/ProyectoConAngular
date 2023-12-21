import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  public title: string;
  public subtitle: string;
  public web: string;

  constructor(){
    this.title = "Lucas Avila";
    this.subtitle = "Full Stack Developer";
    this.web = "linkedin.com/in/lucas-gabriel-avila"
  }

}
