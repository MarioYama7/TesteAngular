import {Component, Inject, OnInit} from '@angular/core';
import { CourseElement } from 'src/app/v/home/home.component';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
/*Importações vindas do material Design, para as caixinhas de preenchimento*/

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: CourseElement;
  isChange!: Boolean; /*Condição importante para aplicar na criação ou edição*/
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: CourseElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  /*Condição para saber se vai alterar ou Editar*/
  ngOnInit(): void{
    if (this.data.position != null) {
      this.isChange = true;
    } else{
      this.isChange =false;
    }
  }

  /*Para o botão de cancelar*/
  onCancel(): void {
    this.dialogRef.close();
  }

}
