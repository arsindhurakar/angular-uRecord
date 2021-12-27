import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() name: string;

  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {}

  handleLogout() {
    this._userService.removeToken();
    this._router.navigateByUrl('/login');
  }
}
