import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MagicMessageAppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MagicMessageAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MagicMessageAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'magic-message-angular-app'`, () => {
    const fixture = TestBed.createComponent(MagicMessageAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('magic-message-angular-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(MagicMessageAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to magic-message-angular-app!');
  });
});
