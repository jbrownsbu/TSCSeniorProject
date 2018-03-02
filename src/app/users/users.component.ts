import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User [] ;

  selectedUser: User;
  user: User = {
    id: 1,
    firstName: 'Johnny',
    lastName: 'Jones',
    email: 'jjones@sbuniv.edu',
    phone: '931-206-5222'
  };

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

}
