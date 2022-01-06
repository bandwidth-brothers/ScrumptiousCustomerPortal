import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';

//import PathConstants from '../../../environments/paths';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    errorMsg?: string = undefined;
    isLoading = false;
    hide = true;
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(localStorage.getItem('savedUserEmail'), [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        rememberMe: new FormControl(localStorage.getItem('savedUserEmail') !== null)
    });


    constructor(
        private titleService: Title,
        private notificationService: NotificationService,
        private router: Router,
        private authService: AuthService,
        private log: NGXLogger
    ) { }

    ngOnInit(): void {
        //this.authService.logout();
        this.titleService.setTitle('Scrumptious - Login');
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;


        this.isLoading = true;

        this.authService.login(email, password).subscribe(
            () => {
                this.handleLoginSuccess().then(() => this.loginForm.reset());
                if (rememberMe) {
                    localStorage.setItem('savedUserEmail', email);
                } else {
                    localStorage.removeItem('savedUserEmail');
                }
            },
            (err: HttpErrorResponse) => {
                this.handleLoginFailure(err).then(() => this.loginForm.controls['password'].reset());
            }
        );
    }

    async handleLoginSuccess() {

        this.errorMsg = undefined;
        this.isLoading = false;
        await this.router.navigate(['/home']);
    }

    async handleLoginFailure(err: HttpErrorResponse) {
        this.log.debug('Failure', err);
        this.isLoading = false;
        if (err.status === 403 || err.status === 401) {
            this.errorMsg = 'Invalid email or password';
        } else {
            this.errorMsg = 'An error occurred while logging in. Please try again.';
        }
        this.notificationService.openSnackBar(this.errorMsg);
    }

    goToForgetPasswordPage() {
        this.router.navigateByUrl('/auth/forgotpassword');
    }

    makeAnAccount() {
        this.router.navigateByUrl('/auth/register');
    }

}