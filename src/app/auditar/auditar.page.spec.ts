import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditarPage } from './auditar.page';

describe('AuditarPage', () => {
  let component: AuditarPage;
  let fixture: ComponentFixture<AuditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
