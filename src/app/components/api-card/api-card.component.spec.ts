import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APICardComponent } from './api-card.component';

describe('APICardComponent', () => {
  let component: APICardComponent;
  let fixture: ComponentFixture<APICardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [APICardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(APICardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
