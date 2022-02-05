import { ArgumentType } from '@angular/compiler/src/core';

class Person {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName() {
    console.log(this.name + this.age);
  }
}

class Employed extends Person {
  private sueldo: number;
  constructor(name: string, age: number, sueldo) {
    super(name, age);
    this.sueldo = sueldo;
  }
}
