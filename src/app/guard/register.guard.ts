import { CanDeactivateFn } from '@angular/router';

export const registerGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  if (component.canDeactivate) {
    return component.canDeactivate(); 
  }
  return true; 
}
