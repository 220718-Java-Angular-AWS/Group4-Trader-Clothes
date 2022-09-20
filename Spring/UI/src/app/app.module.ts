import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CatalogDisplayComponent } from './catalog-display/catalog-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { CheckoutcartComponent } from './checkoutcart/checkoutcart.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { UpdateAddressComponent } from './update-address/update-address.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
    LoginComponent,
    SearchBarComponent,
    CatalogDisplayComponent,
    OrderhistoryComponent,
    CheckoutcartComponent,
    PersonalInfoComponent,
    ItemDetailsComponent,
    ProfileDisplayComponent,
    OrderHistoryComponent,
    ResetPasswordComponent, 
    ChangeEmailComponent,
    PaymentInfoComponent,
    UpdateAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
