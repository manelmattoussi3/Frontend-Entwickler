import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PersonEditComponent } from './person-edit.component';
import { PersonService } from '../service/person.service';

// Import PersonEditComponent and PersonService

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let mockPersonService: jasmine.SpyObj<PersonService>;
  let mockRouter: Router;
  let mockActivatedRoute: any;

  const mockPerson = { id: 1, firstName: 'John', lastName: 'Doe', emailAddress: 'john@example.com' };

  beforeEach(async () => {
    mockPersonService = jasmine.createSpyObj('PersonService', ['getPersonById', 'updatePerson']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } } // Simulate route parameter 'id'
    };

    await TestBed.configureTestingModule({
      declarations: [PersonEditComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: PersonService, useValue: mockPersonService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;

    // Mocking the service method to return a person
    mockPersonService.getPersonById.and.returnValue(of(mockPerson));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load person details into the form', () => {
    expect(component.personForm.value).toEqual(mockPerson);
  });

  it('should update person details on form changes', () => {
    component.personForm.patchValue({
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      emailAddress: 'updated@example.com'
    });
    expect(component.personForm.value).toEqual({
      id: 1,
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      emailAddress: 'updated@example.com'
    });
  });

  it('should navigate back to person detail after form submission', fakeAsync(() => {
    const updatedPerson = { ...mockPerson, firstName: 'Updated' };

    component.personForm.patchValue({
      firstName: 'Updated'
      // Update other fields if needed
    });

    mockPersonService.updatePerson.and.returnValue(of(updatedPerson));
    component.onSubmit();
    tick(); // Simulate waiting for observable to complete

    expect(mockPersonService.updatePerson).toHaveBeenCalledWith(updatedPerson);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/persons', mockPerson.id]);
  }));

  // Add more tests for form validations, edge cases, etc.
});
