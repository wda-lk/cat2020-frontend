import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SchoolModule } from './app/school.module';


platformBrowserDynamic().bootstrapModule(SchoolModule)
  .catch(err => console.error(err));
