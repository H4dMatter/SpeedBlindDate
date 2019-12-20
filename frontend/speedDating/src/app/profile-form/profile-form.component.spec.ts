import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileFormComponent } from './profile-form.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesComponent } from 'angular2-flash-messages/module/flash-messages.component';
import { FormsModule } from '@angular/forms';


/*describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;
  let h1: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        ProfileFormComponent,
        NavbarComponent,
        FlashMessagesComponent
      ],
      providers: [
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display profile', () => {
    expect(h1.textContent).toContain('profile');
  });
});*/
