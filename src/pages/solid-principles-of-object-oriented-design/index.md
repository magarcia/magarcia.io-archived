---
title: SOLID - Principles of Object-Oriented Design
date: '2019-12-07'
spoiler: SOLID Principles are a valuable tool to write good object-oriented
  software. This article tries to put some light on the subject with simple
  explanations and examples for each principle using TypeScript.
tags:
  - Object-Oriented
  - Computer Science
  - SOLID
  - TypeScript
---

> This article is based on the work done by [Samuel Oloruntoba](https://twitter.com/KayandraJT) in his article
> [S.O.L.I.D: The First 5 Principles of Object Oriented Design](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) but using
> TypeScript instead of PHP for the examples.

**SOLID** is an acronym for the first five principles of the article
[_Principles of Object-Oriented Design_](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
by Robert C. Martin.

Applying these principles helps to develop maintainable and extensible code. They
also help to catch code smells, refactor code easily, and practice a good agile
development.

- **S** stands for **SRP** - Single Responsibility Principle
- **O** stands for **OCP** - Open-Closed Principle
- **L** stands for **LSP** - Liskov Substitution Principle
- **I** stands for **ISP** - Interface Segregation Principle
- **D** stands for **DIP** - Dependency Inversion Principle

## SRP - Single Responsibility Principle

> A software entity (classes, modules, functions, etc.) should have one, and
> only one, reason to change.

This principle means that an entity should do only one thing. So single
responsibility denotes some **work in isolation**. Therefore if we have a
software entity that performs some calculations the only reason to change it is
if these calculations need to change.

In order to understand better the principle, we can do an example. Let's say
that we have to implement an application that given some shapes it calculates the
sum of the area of these shapes and prints the output. So, let's start creating
our shapes classes:

```typescript
class Circle {
  public readonly radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }
}

class Square {
  public readonly side: number;

  constructor(side: number) {
    this.side = side;
  }
}
```

Now we create an `AreaCalculator` class that is going to have the logic to sum
the area of our shapes.

```typescript
class AreaCalculator {
  public readonly shapes: Shape[];

  constructor(shapes: Shape[]) {
    this.shapes = shapes;
  }

  public sum(): number {
    // logic to sum the areas
  }

  public output(): string {
    return `Sum of the areas of provided shapes: ${this.sum()}`
  }
```

To use the `AreaCalculator` we have to create an array of shapes, instantiate
the class and show the output.

```typescript
const shapes: any[] = [new Circle(2), new Circle(3), new Square(5)];

const areas = new AreaCalculator(shapes);

console.log(areas.output());
```

But this implementation has a problem. In this example, `AreaCalculator`
handles the logic to calculate the sum of the areas **and** to output the data.
What if the user wants the output in JSON?

Here is when _Single Responsibility Principle_ comes into play. `AreaCalculator`
should only change if we change how we calculate the sum of the areas, not when
we want a different output or representation.

We can fix this by implementing a class which its only responsibility is to
output the data.

```typescript
const shapes: any[] = [new Circle(2), new Circle(3), new Square(5)];

const areas = new AreaCalculator(shapes);
const output = new Outputter(areas);

console.log(output.text());
console.log(output.json());
```

Now we have two classes with one responsibility each one, if we want to change
how calculations are made only `AreaCalculator` will change and the same to
change the output, it will affect only `Outputter`.

## OCP - Open-Closed Principle

> Software entities (classes, modules, functions, etc.) should be open for
> extension, but closed for modification.

A desirable property that our software entities is to be easy to extend his
functionality without the need to change the entity itself.

Using the previous example, now we want to introduce a new fancy shape: the
_Triangle_. But first, take a closer look at the sum part of our `AreaCalculator`
class.

```typescript
class AreaCalculator {
  public readonly shapes: Shape[];

  constructor(shapes: Shape[]) {
    this.shapes = shapes;
  }

  public sum() {
    let sum: number = 0;

    for (let shape of this.shapes) {
      if (shape instanceof Circle) {
        sum += Math.PI * Math.pow(shape.radius, 2);
      } else if (shape instanceof Square) {
        sum += shape.side * shape.side;
      }
    }

    return sum;
  }
}
```

Here we are violating the _Open/Close Principle_, because in order to add support
for triangles we have to modify `AreaCalculator` adding a new `else if` block in
order to handle the calculation of the new area.

To fix this we can move the code that calculates the area to the corresponding
shapes, and make that shapes implement an interface that describes better what
a shape can do.

```typescript
interface Shape {
  area(): number;
}

class Circle implements Shape {
  public readonly radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public area(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}
```

Now the `AreaCalculator` looks like the code below, that allows us to create new
kind of shapes and it will work always that this new shape implements the `Shape`
interface.

```typescript
class AreaCalculator {
  public readonly shapes: Shape[];

  constructor(shapes: Shape[]) {
    this.shapes = shapes;
  }

  public sum(): number {
    let sum: number = 0;

    for (let shape of this.shapes) {
      sum += shape.area();
    }

    return sum;
  }
}
```

## LSP - Liskov Substitution Principle

> Derived class must be substitutable for their base class.

What this principle means is that objects in a program should be replaceable
with instances of their subtypes without altering the correctness of that
program. So if you pass a subclass of an abstraction you need to make sure you
don’t alter any behavior or state semantics of the parent abstraction.

Continuing with the `AreaCalculator` class, now we want to create a
`VolumeCalculator` class that extends `AreaCalculator`:

```typescript
class VolumeCalculator extends AreaCalculator {
  public readonly shapes: Shape[];

  constructor(shapes: Shape[]) {
    this.shapes = shapes;
  }

  public sum(): number[] {
    // logic to calculate the volumes and then return
    // and array of output
  }
}
```

To understand better this example let's make a more detailed version of the
`Outputter` class.

```typescript
class Outputer {

  private calculator;

  constructor(calculator: AreaCalculator) {
    this.calculator = calculator;
  }

  public json(): string {
    return JSON.stringify({
      sum: this.calculator.sum();
    })
  }

  public text(): string {
    return `Sum of provided shapes: ${this.calculator.sum()}`;
  }
}
```

With this implementation, if we try to run a code like this:

```typescript
const areas = new AreaCalculator(shapes2D);
const volumes = new VolumeCalculator(shapes3D);

console.log('Areas - ', new Ouputter(areas).text());
console.log('Volumes - ', new Ouputter(volumes).text());
```

The program is not gonna fail but the output will not be consistent since one
output will be something like `Areas - Sum of provided shapes: 42`, and the
other `Volumes - Sum of provided shapes: 13, 15, 14`. This is not what we expect
from our program.

This happens because the violation of the _Liskov Substitution Principle_, the
`sum` method of the `VolumeCalculator` class is an array of numbers while the
`AreaCalculator` is just a number.

To fix this we have to reimplement the sum method of `VolumeCalculator` to
return a number instead of an array.

```typescript
class VolumeCalculator extends AreaCalculator {

  // constructor

  public function sum(): number {
      // logic to calculate the volumes and then return
      // and array of output
      return sum;
  }
}
```

## ISP - Interface Segregation Principle

> Make fine grained interfaces that are client specific.

In this case, we want to keep interfaces as small as possible, so clients are not
forced to implement methods that they don't actually need.

<!-- REVIEW: This explanation could be more detailed -->

So, coming back to our shape interface, now that we can calculate volumes our
interface looks similar to this:

```typescript
interface Shape {
  area(): number;
  volume(): number;
}
```

But we know that not all our shapes have a volume, `Square` is a 2D shape but
because of the interface, we are forced to implement a `volume` method.

Applying the _Interface Segregation Principle_ we split the `Shape` interface
into two different interfaces, one to define 2D shapes and another for 3D shapes.

```typescript
interface Shape2D {
  area(): number;
}

interface Shape3D {
  volume(): number;
}

class Cuboid implements Shape2D, Shape3D {
  public area(): number {
    // calculate the surface area of the cuboid
  }

  public volume(): number {
    // calculate the volume of the cuboid
  }
}
```

## DIP - Dependency Inversion Principle

> Depend on abstractions, not on concretions.

What this principle comes to says is that high-level modules should not depend
on low-level modules, but they should depend on abstractions.

<!-- REVIEW: This explanation could be more detailed -->

This principle allows for decoupling, an example that seems like the best way to
explain this principle. Let's see a new class to save our shapes `ShapeManager`:

```typescript
class ShapeManager {
  private database;

  constructor(database: MySQL) {
    this.database = database;
  }

  public load(name: string): Shape {}
}
```

In this case, `ShapeManager` is a high-level module while `MySQL` is a low-level
module, but this is a violation of the `Dependency Inversion Principle` since we
are forced to depend on `MySQL`.

If we want to change our database in the future we would have to edit the `ShapeManager`
class and thus violates _Open-Close Principle_. In this case we should not care
about which kind of database are we using, so to depend on abstractions on this
case we will make use of an interface:

```typescript
interface Database {
  connect(): Connection;
}

class MySQL implements Database {
  public connect(): Connetion {
    // creates a connection
  }
}

class ShapeManager {
  private database;

  constructor(database: Database) {
    this.database = database;
  }

  public load(name: string): Shape {}
}
```

And now our high-level and low-level modules are depending on abstractions.

## Conclusion

When starting to write Object-Oriented programing the **SOLID** principles could
be difficult to understand and, if they are understood, see where and when to
apply them is not trivial. But they are an example of one of the most important
things in software development, practice and experience will make you apply
these principles in a very natural and intuitive way.
