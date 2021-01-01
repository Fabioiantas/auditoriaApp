import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditoriaLocalPage } from './auditoria-local.page';

describe('AuditoriaLocalPage', () => {
  let component: AuditoriaLocalPage;
  let fixture: ComponentFixture<AuditoriaLocalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaLocalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
