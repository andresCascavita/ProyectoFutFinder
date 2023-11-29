import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dataUser: any;
  redirect(url: string): void {
    window.location.href = url;
  }

  go(url: string): void {
    window.location.href = url;
  }

  voy(url: string): void {
    window.location.href = url;
  }
  constructor() { }

  ngOnInit(): void {
  }
  login(){
    this.redirect('/dashboard')
  }

}
