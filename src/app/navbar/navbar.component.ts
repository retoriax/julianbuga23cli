import {Component, OnInit} from '@angular/core';
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {
    const list = document.querySelectorAll('.list');
    function activeLink(this: HTMLElement){
      list.forEach((item) =>
        item.classList.remove("active"));
        this.classList.add("active");
    }

    list.forEach((item) =>
      item.addEventListener('click', activeLink));
  }

}
