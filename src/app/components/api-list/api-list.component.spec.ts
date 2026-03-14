import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIListComponent } from './api-list.component';

describe('APIListComponent', () => {
  let component: APIListComponent;
  let fixture: ComponentFixture<APIListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [APIListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(APIListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
