// import { Inject, Injectable, Optional } from '@nestjs/common'; // Optional providers
import { Inject, Injectable } from '@nestjs/common'; //Property-based injection

@Injectable()
export class HttpService<T> {
  // Optional providers
  // constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) { }

  // Property-based injection
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
