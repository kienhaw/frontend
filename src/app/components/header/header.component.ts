import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().subscribe((data: any) => {
      console.log(data);
      this.snackBar.open('Logged out.', 'OK', {
        duration: 3000
      });
      this.auth.setLoggedIn(false);
      this.router.navigate(["/login"]);
    });

  }

}
