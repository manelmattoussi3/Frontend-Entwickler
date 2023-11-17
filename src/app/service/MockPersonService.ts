// mock-person.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MockPersonService implements InMemoryDbService {
  createDb() {
    const persons = [
      { id: 1, firstName: 'John', lastName: 'Doe', emailAddress: 'john@example.com' },
      { id: 2, firstName: 'Alice', lastName: 'Smith', emailAddress: 'alice@example.com' },
      // Add more mock data as needed
    ];

    return { persons };
  }
}
