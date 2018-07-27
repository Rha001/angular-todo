import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';

// Pipes
import { TaskOrderPipe } from './pipes/task-order/task-order.pipe';

// Services
import { SuggestService } from './services/suggest.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskOrderPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SuggestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
