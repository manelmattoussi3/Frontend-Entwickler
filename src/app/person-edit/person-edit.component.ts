import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../service/person.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: Person | undefined;
  personForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    const personId = this.route.snapshot.paramMap.get('id');
    if (personId !== null) {
      this.personService.getPersonById(Number(personId)).subscribe((person) => {
        this.personForm.patchValue(person); 
      });
    }
  }

  initializeForm() {
    this.personForm = this.formBuilder.group({
      id: [''], 
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      
    });
  }
  

  onSubmit() {
    if (this.personForm.valid) {
      const updatedPerson = this.personForm.value;
      this.personService.updatePerson(updatedPerson).subscribe(() => {
        this.goBack();
       // this.router.navigate(['/persons', updatedPerson.id]);
      });
    }
  }
  getPersonDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personService.getPersonById(id).subscribe(
      (person: Person) => {
        this.person = person;
      },
      (error) => {
        console.error('Error fetching person details:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
