import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueaderosComponent } from './parqueaderos.component';

describe('ParqueaderosComponent', () => {
  let component: ParqueaderosComponent;
  let fixture: ComponentFixture<ParqueaderosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueaderosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
