import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl(''),
    password :new FormControl('',Validators.required),
  })
  constructor(
    private authService:AuthenticationService, 
    private router:Router,
    private toast:HotToastService
    ) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const{email,password} = this.loginForm.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success:'Log in Exitoso',
        loading:'Logeando',
        error:'Hubo un problema'
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    })
  }
}
