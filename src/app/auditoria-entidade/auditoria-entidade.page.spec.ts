import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditoriaEntidadePage } from './auditoria-entidade.page';

describe('AuditoriaEntidadePage', () => {
  let component: AuditoriaEntidadePage;
  let fixture: ComponentFixture<AuditoriaEntidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaEntidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaEntidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
