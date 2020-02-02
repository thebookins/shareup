import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitFollowComponent } from './twit-follow.component';

describe('TwitFollowComponent', () => {
  let component: TwitFollowComponent;
  let fixture: ComponentFixture<TwitFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
