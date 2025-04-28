import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParqueaderosComponent } from './admin-parqueaderos.component';

describe('AdminParqueaderosComponent', () => {
  let component: AdminParqueaderosComponent;
  let fixture: ComponentFixture<AdminParqueaderosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminParqueaderosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminParqueaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
