import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  searchName: string = '';
  filteredPersons: Person[] = [];

  constructor(private personService: PersonService,
    private router: Router) {}

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.personService.getAllPersons().subscribe(
      (data: Person[]) => {
        this.persons = data;
        this.filteredPersons = data;
      },
      (error) => {
        console.error('Error fetching persons:', error);
      }
    );
  }
  filterPersons() {
    this.filteredPersons = this.persons.filter((person) =>
      person.firstName.toLowerCase().includes(this.searchName.toLowerCase()) ||
      person.lastName.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
  showDetails(personId: number): void {
    this.router.navigate(['/person-details', personId]);
  }
  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe(
      () => {
        this.fetchPersons(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting person:', error);
      }
    );
  }

}
