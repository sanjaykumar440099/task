import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  userList = [];
  data: string;
  select: any;
  
  ngOnInit() {
    this.userList = [
      { id: 'basic', value: 'Basic' },
      { id: 'premium', value: 'Premium' }
    ];
  }

  //submit user type
  public submitUser(user: any) {
    if (!user) {
      Swal.fire({
        title: 'Alert',
        text: 'Please select user type to proceed.',
        type: 'warning',
        showCancelButton: false
      });
    } else {
      this.router.navigate(['/user-details', user]);
    };
  };

}
