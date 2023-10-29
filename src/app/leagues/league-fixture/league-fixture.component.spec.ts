import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFixtureComponent } from './league-fixture.component';

describe('LeagueResultComponent', () => {
  let component: LeagueFixtureComponent;
  let fixture: ComponentFixture<LeagueFixtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueFixtureComponent]
    });
    fixture = TestBed.createComponent(LeagueFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
