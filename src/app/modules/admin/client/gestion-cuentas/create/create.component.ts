import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
public option: FormGroup;
  constructor(private _formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.option=this._formbuilder.group({
      option : ['',Validators.required]
    })
    
  }


   // Esta propiedad almacenará la opción seleccionada
  options: any[] = [
    { label: 'Opción 1', value: 'option1' },
    { label: 'Opción 2', value: 'option2' },
    { label: 'Opción 3', value: 'option3' }
  ];

  onOptionSelected() {
    console.log('Opción seleccionada:',this.option.value.option);
    // Puedes realizar acciones adicionales aquí basadas en la opción seleccionada
  }
}
