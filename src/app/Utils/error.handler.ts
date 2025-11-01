import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any): string {
    if (error instanceof HttpErrorResponse) {
      // handle HTTP errors
      console.error('HTTP Error: ', error);
      return this.HandleHttpError(error);
    } else if (error instanceof Error) {
      // client side error handling
      console.error('Client side Error: ', error.message);
    } else {
      console.log('Unexpected Error: ', error.message);
    }
    return error.message;
  }

  private HandleHttpError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return error.error.error;
      case 401:
        return error.error.error;
      case 403:
        return error.error.error;
      case 404:
        return error.error.error;
      case 409:
        return error.error.error;
      case 204:
        return error.error.error;
      case 500:
        return 'Server error. Please try again later';
      default:
        return 'Unexpected Error occured. Please try again later.';
    }
  }
}
