/*importações necessárias para fazer a ponte, ligar a home*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/s/element-dialog/element-dialog.component';

/*Componentes que serão utilizado para todos campos, em tudo. E o tipo para seu preenchimento*/
export interface CourseElement {
  course: string;
  position: number;
  instructor: string;
  localization: string;
  load: number;
  date: String; 
} /*Obs: Tentei utilizar o Datapicker para solicionar a questão da data, mas não consegui por isso está em String-->*/

/*Dentro do Element, quais eram as informações pré-preenchidas. Os exemplos*/
const ELEMENT_DATA: CourseElement[] = [
  {position: 1, course: 'Front-End', instructor: 'Genival Barbosa', localization: 'Recife', load: 60, date: '25/01/2023'},
  {position: 2, course: 'Full-Stack', instructor: 'Mário Yama', localization: 'Abreu e Lima', load: 150, date: '05/02/2023'},
  {position: 3, course: 'Back-End', instructor: 'Márcia Silva', localization: 'Olinda', load: 70, date: '10/02/2023'},
  {position: 4, course: 'UX/UI', instructor: 'Ivson Nogueira', localization: 'Recife', load: 60, date: '01/02/2023'},
  {position: 5, course: 'Security', instructor: 'Flávia Carolina', localization: 'Paulista', load: 60, date: '01/02/2023'},
  {position: 6, course: 'Agile Coach', instructor: 'Eduardo Santos', localization: 'Recife', load: 40, date: '01/02/2023'},
  {position: 7, course: 'JAVA', instructor: 'Aline Fernanda', localization: 'Recife', load: 100, date: '01/02/2023'},
  {position: 8, course: 'Angular', instructor: 'Bruno Cordeiro', localization: 'Recife', load: 60, date: '01/02/2023'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'course', 'instructor', 'localization' , 'load', 'date', 'actions' ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {} 

  ngOnInit(): void {

  }

  /*Isso aqui vai faz o Dialog, entender a edição ou criação. Inclui também os espações vazios ou o que já era. Por isso o element.campo selecionado*/
  openDialog(element: CourseElement | null): void{ 
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '700px', /*tamanho da janela que abre pra inclusão/edição*/
    data: element === null ? {
      position: null,
      course: '',
      instructor: '',
      localization: '',
      load: null,
      date: '',
    } : {
      position: element.position,
      course: element.course,
      instructor: element.instructor,
      localization: element.localization,
      load: element.load,
      date: element.date,
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      if (this.dataSource.map(p => p.position).includes(result.position)){
        this.dataSource[result.position -1] = result;
        this.table.renderRows();
      } else{
        this.dataSource.push(result);
        this.table.renderRows();
      }
    }
  });
}

  editElement(element:CourseElement): void {
    this.openDialog(element);

  }

  deleteElement(position: number): void{
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }
}

