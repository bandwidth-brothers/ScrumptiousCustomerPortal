import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [
                MatDialogModule,
                HttpClientTestingModule,
                LoggerTestingModule
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
