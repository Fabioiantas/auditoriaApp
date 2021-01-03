import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemRequisitosPage } from './item-requisitos.page';

describe('ItemRequisitosPage', () => {
  let component: ItemRequisitosPage;
  let fixture: ComponentFixture<ItemRequisitosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRequisitosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemRequisitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
