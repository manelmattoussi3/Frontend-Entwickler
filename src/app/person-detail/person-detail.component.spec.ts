import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PersonDetailComponent } from './person-detail.component';
import { PersonService } from '../service/person.service';

// Import PersonDetailComponent and PersonService

// Create a manual mock for Location
class MockLocation {
  back(): void {} // Mock the back method
}

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;
  let mockPersonService: jasmine.SpyObj<PersonService>;
  let mockActivatedRoute: any;
  let mockLocation: MockLocation;

  const mockPerson = { id: 1, firstName: 'John', lastName: 'Doe', emailAddress: 'john@example.com' };

  beforeEach(async () => {
    mockPersonService = jasmine.createSpyObj('PersonService', ['getPersonById']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } } // Simulate route parameter 'id'
    };
    mockLocation = new MockLocation();

    await TestBed.configureTestingModule({
      declarations: [PersonDetailComponent],
      providers: [
        { provide: PersonService, useValue: mockPersonService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation } // Provide the manual mock for Location
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailComponent);
    component = fixture.componentInstance;

    // Mocking the service method to return a person
    mockPersonService.getPersonById.and.returnValue(of(mockPerson));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch person details', () => {
    expect(component.person).toEqual(mockPerson);
  });

  it('should navigate back when goBack() is called', () => {
    spyOn(mockLocation, 'back');
    component.goBack();

    expect(mockLocation.back).toHaveBeenCalled();
  });

  // Add more tests as needed for specific functionality or edge cases
});
