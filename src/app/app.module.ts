import { ErrorHandler, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { HomeComponent } from './Components/Dashboard/home/home.component';
import { AuthService } from './Services/Authentication/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { JWT_Module_Options } from './Utils/jwt.auth';
import { ErrorHandlerService } from './Utils/error.handler';
import { provideHttpClient } from '@angular/common/http';
import { LoadingComponent } from './Components/Shared/loading/loading.component';
import { LucideIconsModule } from './Utils/lucide-icons.module';
import { RequiredFieldAlertDivComponent } from './Components/Shared/required-field-alert-div/required-field-alert-div.component';
import { BrandNameComponent } from './Components/Shared/brand-name/brand-name.component';
import { GradientBorderComponent } from './Components/Shared/gradient-border/gradient-border.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LoadingComponent,
    RequiredFieldAlertDivComponent,
    BrandNameComponent,
    GradientBorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options),
    LucideIconsModule,
    BrowserAnimationsModule,
    // MarkdownModule.forRoot({
    //   sanitize: SecurityContext.NONE,
    // }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthService,
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
