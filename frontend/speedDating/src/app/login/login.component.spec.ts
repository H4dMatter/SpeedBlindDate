import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesComponent } from 'angular2-flash-messages/module/flash-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { routes } from '../app-routing.module';
import { ChatComponent } from '../chat/chat.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ShowUserComponent } from '../show-user/show-user.component';


describe('LoginComponent', () => {
  let location: Location;
  let router: Router;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let legend: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
      ],
      declarations: [
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        FlashMessagesComponent,
        ChatComponent,
        ProfileFormComponent,
        ShowUserComponent
      ],
      providers: [
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    legend = fixture.nativeElement.querySelector('legend');
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should contain Welcome!', () => {
  expect(legend.innerText).toContain('Welcome');
  });



  it ('should click submit button once', () => {
    fixture.detectChanges();

    spyOn(component, 'onClickSubmit');
    document.getElementById('submit').click();

    expect(component.onClickSubmit).toHaveBeenCalledTimes(1);
    }
  );

  /*it ('should redirect on click register button', async(() => {
      fixture.detectChanges();
      document.getElementById('register').click();
      expect(location.path()).toBe('/user');
    }
  ));*/
});

