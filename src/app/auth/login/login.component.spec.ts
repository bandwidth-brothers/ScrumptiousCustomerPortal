import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import {
    LoggerConfig,
    NGXLogger,
    NGXLoggerHttpService,
    NgxLoggerLevel,
    NGXMapperService,
} from 'ngx-logger';
import {
    NGXLoggerHttpServiceMock,
    NGXMapperServiceMock,
} from 'ngx-logger/testing';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import PathConstants from '../../../environments/paths';
import {
    HttpErrorResponse,
    HttpEventType,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/entities/user';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let authService: AuthService;
    let notificationServiceSpy: NotificationService;

    const expectedFormFields = [
        'email',
        'password',
        'rememberMe'
    ];

    const mockUser: User = {
        userId: '00000000-0000-0000-0000-000000000000',
        email: 'dave@a.com',
        password: 'dave',
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                NGXLogger,
                { provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock },
                { provide: NGXMapperService, useClass: NGXMapperServiceMock },
                { provide: LoggerConfig, useValue: { level: NgxLoggerLevel.ERROR } },
                DatePipe,
            ],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, MatSlideToggleModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = fixture.debugElement.injector.get(Router);
        authService = fixture.debugElement.injector.get(AuthService);
        notificationServiceSpy = fixture.debugElement.injector.get(NotificationService);
    });

    afterEach(() => {
        component.loginForm.reset();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to homepage if logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        const navigate = spyOn(router, 'navigate');

        component.ngOnInit();

        expect(navigate).toHaveBeenCalledWith(['/']);
    });

    it('should NOT navigate if not logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        const navigate = spyOn(router, 'navigate');

        component.ngOnInit();

        expect(navigate).not.toHaveBeenCalled();
    });

    it('should attempt login if form valid', () => {

        component.loginForm.setValue({ 'email': 'dave@a.com', "password": 'dave', "rememberMe": 'true' });

        const email = component.loginForm.get('email')?.value;
        const password = component.loginForm.get('password')?.value;

        const login = spyOn(authService, 'login').and.returnValue(
            of({ userId: 'some-uuid', token: 'some token', expiresAt: 5 })
        );

        component.login();

        expect(login).toHaveBeenCalledWith(email, password);
    });



    it('should handle error on login error', () => {
        component.loginForm.setValue({ 'email': 'fake@a.com', "password": 'doesntwork', "rememberMe": 'true' });

        const email = component.loginForm.get('email')?.value;
        const password = component.loginForm.get('password')?.value;

        const login = spyOn(authService, 'login').and.returnValue(
            throwError('SOME ERROR')
        );

        component.login();

        expect(login).toHaveBeenCalledWith(email, password);
    });

    it('should navigate to homepage on successful login', () => {
        const navigate = spyOn(router, 'navigate');
        component.handleLoginSuccess();
        expect(navigate).toHaveBeenCalledWith(['/']);
        expect(component.isLoading).toBeFalse();
        expect(component.errorMsg).toBeUndefined();
    });

    it('should set error message on login failure', () => {
        let err: HttpErrorResponse = {
            error: undefined,
            type: HttpEventType.Response,
            headers: new HttpHeaders(),
            ok: false,
            statusText: '',
            name: 'HttpErrorResponse',
            message: 'Something bad happened.',
            status: 403,
            url: null,
        };

        component.handleLoginFailure(err);

        expect(component.isLoading).toBeFalse();
        expect(component.errorMsg).toBe('Invalid email or password');

        err = {
            error: undefined,
            type: HttpEventType.Response,
            headers: new HttpHeaders(),
            ok: false,
            statusText: '',
            name: 'HttpErrorResponse',
            message: 'Something bad happened.',
            status: 401,
            url: null,
        };

        component.handleLoginFailure(err);

        expect(component.isLoading).toBeFalse();
        expect(component.errorMsg).toBe('Invalid email or password');

        err = {
            error: undefined,
            type: HttpEventType.Response,
            headers: new HttpHeaders(),
            ok: false,
            statusText: '',
            name: 'HttpErrorResponse',
            message: 'Something bad happened.',
            status: 404,
            url: null,
        };

        component.handleLoginFailure(err);

        expect(component.isLoading).toBeFalse();
        expect(component.errorMsg).toBe(
            'An error occurred while logging in. Please try again.'
        );
    });

    it('should navigate to forgot password on click', () => {
        const navigate = spyOn(router, 'navigateByUrl');

        component.goToForgetPasswordPage();

        expect(navigate).toHaveBeenCalledWith('/auth/forgotpassword');
    });

    it('should navigate to create component', () => {
        const navigate = spyOn(router, 'navigateByUrl');

        component.makeAnAccount();

        expect(navigate).toHaveBeenCalledWith('/auth/register');
    });

});