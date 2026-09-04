import { Component } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { NavBar } from '../../shared/components/nav-bar/nav-bar';

@Component({
  imports: [NavBar, Footer],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
