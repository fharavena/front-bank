import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { NotfoundComponent } from './components/common/notfound/notfound.component';
import { HistoryComponent } from './components/history/history.component';
import { RecipientaddComponent } from './components/recipientadd/recipientadd.component';
import { TransferaddComponent } from './components/transferadd/transferadd.component';


const routes: Routes = [
  { path: '', component: RecipientaddComponent },
  { path: 'historial', component: HistoryComponent },
  { path: 'transferir', component: TransferaddComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
