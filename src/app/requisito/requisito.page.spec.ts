import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequisitoPage } from './requisito.page';

describe('RequisitoPage', () => {
  let component: RequisitoPage;
  let fixture: ComponentFixture<RequisitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
