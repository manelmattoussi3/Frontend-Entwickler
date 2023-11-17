import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../service/person.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person: Person | undefined;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPersonDetails();
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
