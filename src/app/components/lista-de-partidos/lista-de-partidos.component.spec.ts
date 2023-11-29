import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePartidosComponent } from './lista-de-partidos.component';

describe('ListaDePartidosComponent', () => {
  let component: ListaDePartidosComponent;
  let fixture: ComponentFixture<ListaDePartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDePartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
