import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';

//Others
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SearchFilter } from './pipes/search-filter.pipe';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { HeroComponent } from './components/dashboard/home/hero/hero.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersRecordComponent } from './components/dashboard/users-record/users-record.component';
import { EditRecordComponent } from './components/dashboard/users-record/edit-record/edit-record.component';
import { RemoveRecordComponent } from './components/dashboard/users-record/remove-record/remove-record.component';
import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedFormComponent } from './shared/components/form/form.component';
import { SharedFormService } from './services/shared-form.service';
import { InputComponent } from './shared/components/input/input.component';
import { AddRecordComponent } from './components/dashboard/users-record/add-record/add-record.component';
import { ButtonCancelComponent } from './shared/components/buttons/button-cancel/button-cancel.component';
import { ButtonSubmitComponent } from './shared/components/buttons/button-submit/button-submit.component';
import { ButtonOkComponent } from './shared/components/buttons/button-ok/button-ok.component';
import { TableComponent } from './shared/components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HeroComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    UsersRecordComponent,
    EditRecordComponent,
    RemoveRecordComponent,
    PasswordStrengthDirective,
    NotFoundComponent,
    SharedFormComponent,
    InputComponent,
    AddRecordComponent,
    ButtonSubmitComponent,
    ButtonCancelComponent,
    ButtonOkComponent,
    TableComponent,
    SearchFilter,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
    SharedFormService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
