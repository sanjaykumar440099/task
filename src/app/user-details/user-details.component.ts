import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  userType: any;
  ipList = [];
  pattern: any;
  buttonDisabled: boolean;
  indexMessage: string;
  indexNumber: any;
  savingList : Array<Object>;

  ngOnInit() {
    this.userType = this.route.snapshot.params['userId'];

    this.ipList = [
      { ipName: "IP address", ipValue: "" }
    ];

    //validate
    this.pattern = new RegExp("^([0-9]{1,3}\.){3}[0-9]{1,3}$");
    this.buttonDisabled = true;
  }

  //add ip
  public addIpFeild() {
    if (this.userType === 'premium') {
      if (this.ipList.length === 10) {
        Swal.fire({
          title: 'Alert',
          text: 'You have reached with maximum number of IP feild.',
          type: 'warning',
          showCancelButton: false
        });
        return true;
      };
    };

    if (this.userType === 'basic') {
      if (this.ipList.length === 5) {
        Swal.fire({
          title: 'Alert',
          text: 'You have reached with maximum number of IP feild.',
          type: 'warning',
          showCancelButton: false
        });
        return true;
      };
    };

    this.ipList.push({
      ipName: "IP address", ipValue: ""
    });
    this.buttonDisabled = true;
    this.indexMessage = undefined;
  };

  //delete ip
  public deleteIpFeild(index: any) {
    if (this.ipList.length === 1) {
      this.ipList.forEach(value => {
        value.ipValue = '';
      });
    } else {
      this.ipList.splice(index, 1);
    };
  };

  //enable save button
  public onMatchChange(event: any, i: any) {
    if (this.pattern.test(event)) {
      this.buttonDisabled = false;
      this.indexNumber = null;
    } else {
      this.buttonDisabled = true;
      this.indexMessage = 'Invalid input';
      this.indexNumber = i;
    };
    if (event === '' || !event) {
      this.buttonDisabled = true;
    };
  };

  //save data to local storage
  public saveUser() {
	  this.savingList = [];
	  this.ipList.forEach(values => {
		  if(values.ipValue !== ''){
			  var newList = {
				  ipName: values.ipName,
				  ipValue: values.ipValue
			  };
			this.savingList.push(newList);
		  };
	  });
    localStorage.setItem('ipData', JSON.stringify(this.savingList));
    Swal.fire({
      type: 'success',
      title: 'Data saved successfully...',
      showConfirmButton: false,
      timer: 1500
    })
  };
}
