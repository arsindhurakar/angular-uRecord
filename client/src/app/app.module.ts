import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard, AuthInterceptor } from './auth';
import { SearchFilter } from './pipes';
import { MdbModule } from './shared/modules/mdb.module';

import * as components from './components';
import * as sharedComponents from './shared/components';

import { UserService, SharedFormService } from './services';
import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { FormErrorMessagePipe } from './pipes/form-error-message.pipe';

@NgModule({
  declarations: [
    components.AppComponent,
    components.HeaderComponent,
    components.HomeComponent,
    components.HeroComponent,
    components.FooterComponent,
    components.RegistrationComponent,
    components.LoginComponent,
    components.DashboardComponent,
    components.UsersRecordComponent,
    components.EditRecordComponent,
    components.RemoveRecordComponent,
    components.NotFoundComponent,
    components.AddRecordComponent,
    sharedComponents.FormComponent,
    sharedComponents.InputComponent,
    sharedComponents.ButtonComponent,
    sharedComponents.TableComponent,
    PasswordStrengthDirective,
    SearchFilter,
    NumbersOnlyDirective,
    FormErrorMessagePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
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
  bootstrap: [components.AppComponent],
})
export class AppModule {}
