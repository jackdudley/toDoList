import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrListComponent } from './curr-list.component';

describe('CurrListComponent', () => {
  let component: CurrListComponent;
  let fixture: ComponentFixture<CurrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
