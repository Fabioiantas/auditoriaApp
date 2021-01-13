import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntegracaoPage } from './integracao.page';

describe('IntegracaoPage', () => {
  let component: IntegracaoPage;
  let fixture: ComponentFixture<IntegracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntegracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
