import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
              private errorService : ErrorService,
              private dialogRef : MatDialogRef<LoadingComponent>,
              private snackBar: MatSnackBar
  ) { }

  noData: boolean = false;
  ngOnInit(): void {

    // si a los 10 segundos no obtuvo la data lanza este cartel
    setTimeout(() => {
        if(!this.noData){
           this.openSnackBarWithClose('Parece que está tardando mucho.', 'Cerrar');
        }
      }, 10000);


   
    // se cierra cuando el componente obtiene la data
    this.errorService.isLoading$.subscribe((emitted) => {
      if (emitted) {
        this.dialogRef.close();
        this.errorService.isLoading$.next(false);
        this.noData = true;
      }
    });
  }
  


  openSnackBarWithClose(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 0, // se mantiene el snackbar abierto hasta que el usuario haga clic en "Cerrar"
    });

    snackBarRef.onAction().subscribe(() => {
      this.dialogRef.close();
      this.errorService.isLoading$.next(false);
      snackBarRef.dismiss(); 
    });
  }
}