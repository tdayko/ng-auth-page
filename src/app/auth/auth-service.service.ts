import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  constructor() {}

  register(user: User): Observable<boolean> {
    const existingUser = this.users.find(u => u.email === user.email);
    
    if (existingUser) {
      return of(false);
    }

    user.id = this.users.length + 1;
    this.users.push(user);
    
    return of(true);
  }

  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserSubject.next(user);
      return of(true);
    }
    
    return of(false);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}