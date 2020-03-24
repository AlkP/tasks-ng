import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_URL_TOKEN } from './config';
import { environment } from '../environments/environment';
import { ProductsService } from './shared/services/products.service';
import { CardComponent } from './content/products/card/card.component';
import { ImgUrlPipe } from './shared/pipes/img-url.pipe';
import { InterceptorService } from './shared/services/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { product } from 'projects/module1/src/mocks/products';
import {  ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('[Modуль 5] Общие тесты приложения', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, StarRatingComponent, CardComponent, ImgUrlPipe, HeaderComponent],
      imports: [HttpClientModule, MatIconModule, AppRoutingModule],
      providers: [
        ProductsService,
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true,
        },
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  it(`компонент должен иметь правильный заголовок `, () => {
    const title = fixture.debugElement.query(By.css('.toolbar span'));
    const [
      {
        nativeNode: { textContent },
      },
    ] = title.childNodes;
    expect(textContent).toEqual('Курс по Angular');
  });

  it('компонент должен правильно интерполировать подзаголовок', () => {
    const subTitle = fixture.debugElement.query(By.css('.content span'));
    const [
      {
        nativeNode: { textContent },
      },
    ] = subTitle.childNodes;
    expect(textContent.trim()).toContain('5. Навигация в приложении');
  });
});

describe('[Moдуль 5] Пайпы', () => {
  let pipe: ImgUrlPipe;
  beforeEach(() => {
    pipe = new ImgUrlPipe();
  });
  it('существование метода transform', () => {
    expect((pipe as any).transform).toBeTruthy();
  });
  it('transform должен правильно преобразовывать изображение в ссылку', () => {
    expect((pipe as any).transform((product as any).images)).toBe((product as any).images[0]?.url);
  });
});
describe('[Moдуль 5] Роутер', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [RouterTestingModule],
  //     declarations: [AppComponent],
  //     providers: [ProductsModule, CartModule],
  //   });

  //   router = TestBed.inject(Router);
  //   location = TestBed.inject(Location);

  //   router.initialNavigation();
  // });

  // xit('navigate to "**" redirects you to products', fakeAsync(() => {
  //   const navigateSpy = spyOn(router, 'navigate');
  //   expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  // }));
  // xit('path "" redirects you to products', fakeAsync(() => {
  //   const navigateSpy = spyOn(router, 'navigate');
  //   expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  // }));
  // xit('path "products" imports ProductsModule', fakeAsync(() => {
  //   router.navigate(['']).then(() => {
  //     expect(location.pathname).toBe('products');
  //   });
  // }));
  // xit('path "cart" imports CartModule', fakeAsync(() => {
  //   router.navigate(['']).then(() => {
  //     expect(location.pathname).toBe('cart');
  //   });
  // }));
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const route = ({ data: of({  }) } as any) as ActivatedRoute
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('the path should be', () => {
    expect(component).toEqual('products');
  });
});

