import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { PersonService } from '../service/person.service';
import { of } from 'rxjs';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let mockPersonService: jasmine.SpyObj<PersonService>;

  const mockPersons = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', emailAddress: 'alice@example.com' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', emailAddress: 'bob@example.com' },
    // Other mock persons...
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent],
      providers: [{ provide: PersonService, useValue: jasmine.createSpyObj('PersonService', ['getAllPersons']) }],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    mockPersonService = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;
    mockPersonService.getAllPersons.and.returnValue(of(mockPersons));
    fixture.detectChanges();
  });

  it('should fetch and display a list of persons', () => {
    expect(component.persons).toEqual(mockPersons);
    const personElements = fixture.nativeElement.querySelectorAll('.person-item');
    expect(personElements.length).toBe(mockPersons.length);
  });

  it('should display persons sorted by name', () => {
    const sortedNames = mockPersons.map((person) => person.firstName).sort();
    const displayedNames = Array.from(fixture.nativeElement.querySelectorAll('.person-name') as NodeListOf<HTMLElement>)
      .map((element: HTMLElement) => element.textContent?.trim());
    expect(displayedNames).toEqual(sortedNames);
  });
  it('should delete a person and update the list', () => {
    const deletePersonId = 1;
    const remainingPersons = mockPersons.filter((person) => person.id !== deletePersonId);
    mockPersonService.deletePerson.and.returnValue(of({ success: true }));
    component.deletePerson(deletePersonId);
    fixture.detectChanges();
    expect(component.persons).toEqual(remainingPersons);
    const personElements = fixture.nativeElement.querySelectorAll('.person-item');
    expect(personElements.length).toBe(remainingPersons.length);
  });
});
