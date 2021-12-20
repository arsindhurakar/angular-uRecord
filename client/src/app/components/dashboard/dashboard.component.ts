import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  name: string;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  //#region get user profile
  getUserProfile() {
    this._userService.getUserProfile().subscribe(
      (res) => {
        // this.userDetail = res['user'];
        this.name = res['user'].fullName.split(' ')[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //#endregion get user profile
}
