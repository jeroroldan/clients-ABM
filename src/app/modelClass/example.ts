import { ajax } from 'rxjs/ajax';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { Position } from '@angular/compiler';
import { error } from 'console';

const myObservable = of(1, 2, 3);

const myObserver = {
  next: (x) => console.log('Observer got a next value' + x),
  error: (err) => console.log('Observer got an error: ' + err),
  complete: () => console.log('Observer got complete notification'),
};

myObservable.subscribe(myObserver);
