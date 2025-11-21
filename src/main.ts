import { LocationStrategy, HashLocationStrategy, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { environment as sys_config } from 'src/environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: LOCALE_ID,
            useValue: sys_config.locale.language
        }, {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: sys_config.locale.currency_code
        }, {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: {
                dateFormat: sys_config.locale.date_format,
                timezone: sys_config.locale.timezone
            }
        }, provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideAnimationsAsync(),
        provideEnvironmentNgxMask(),
        providePrimeNG({ 
            theme: {
                preset: Aura
            }
        })
    ]
})
  .catch(err => console.error(err));
