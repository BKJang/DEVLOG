---
layout: post
title:  "[JavaScript] 8-2. 객체지향 프로그래밍(상속)"
date:   2018-11-05
description: "상속 패턴에 대하여"
tags:
- javascript
- inheritance
- oop
draft: false
path: '/posts/oop-inheritance-of-js'
category: 'ES5'
---

## 의사 클래스 패턴(Pseudo-classical) 상속



의사 클래스 패턴은 **자식 생성자 함수의 프로토타입 객체를 부모 생성자 함수의 인스턴스로 교체하는 방식**이다.

```javascript
var Person = (function() {
  //생성자 정의
  function Person(job) {
    this.job = job;
  }

  //메서드 정의
  Person.prototype.getJob = function() {
    return this.job;
  };

  return Person;
}());

var Developer = (function() {
  //생성자 정의
  function Developer(job, name) {
    this.job = job;
    this.name = name;
  }

  Developer.prototype = new Person();

  //Override
  Developer.prototype.getJob = function() {
    console.log(this.job);
  }

  Developer.prototype.getName = function() {
    console.log(this.name);
  }

  return Developer;
}());

var jsDeveloper = new Developer('web Developer', 'BKJang');

jsDeveloper.getJob(); //web Developer
jsDeveloper.getName(); //BKJang

console.log(jsDeveloper.__proto__); //Person {job: undefined, getJob: ƒ, getName: ƒ}
console.log(Developer.prototype.__proto__ === Person.prototype); //true
console.log(jsDeveloper.constructor); //Person(job)
```

위의 코드를 보면 자식 생성자 함수인 `Developer()`함수의 프로토타입 객체를 Person 생성자 함수의 인스턴스로 교체하고 있다.

그리고 **자식 생성자 함수(`Developer()`)의 `[[Prototype]]`프로퍼티는 부모 생성자 함수(`Person()`)의 프로토타입 객체를 가리키고 있다.**



#### 의사 클래스 패턴의 문제



* **constructor 링크의 파괴**

자식 생성자 함수의 인스턴스인 `jsDeveloper`의 생성자는 원래라면 `Developer()` 생성자 함수여야하지만 **`Developer()` 함수의 프로토타입 객체를 교체하는 과정에서 `constructor`의 연결이 깨지게 된다.**

* **다른 생성자 함수와의 new 연산자를 통한 불필요한 과정**

자바스크립트에서 **객체에서 다른 객체에 직접적으로 연결하여 상속을 구현하는 것**이 아닌 **다른 생성자 함수와 `new` 연산자를 통해 객체를 생성하는 불필요한 과정이 존재**한다.

* **객체리터럴 방식으로 생성한 객체의 상속이 불가능**

의사 클래스 패턴은 기본적으로 생성자 함수를 사용하기 때문에 **객체 리터럴 방식으로 생성한 객체로는 상속을 구현할 수 없다.**

기본적으로 **객체 리터럴로 생성한 객체의 `constructor`는 `Object()` 생성자 함수를 가리키고** 이는 변경할 수 없기 때문이다.



## 프로토타입 패턴(Prototypal) 상속



프로토타입 패턴에서는 `Object.create()` 함수를 사용한다.

Object.create() 함수의 인자로는 상속을 구현할 프로토타입 객체를 전달한다.

코드로 살펴보자.

```javascript
var Person = (function() {
  //생성자 정의
  function Person(job) {
    this.job = job;
  }

  Person.prototype.getJob = function() {
    return this.job;
  };

  return Person;
}());

var jsDeveloper = Object.create(Person.prototype);
jsDeveloper.job = 'Front Developer';

var javaDeveloper = Object.create(Person.prototype);
javaDeveloper.job = 'Back Developer';

jsDeveloper.name = 'BKJang'

//Override
jsDeveloper.getJob = function() {
  console.log(this.job);
}

jsDeveloper.getName = function() {
  console.log(this.name);
}

console.log(javaDeveloper.getJob()); //Back Developer
jsDeveloper.getJob(); //Front Developer
jsDeveloper.getName(); //BKJang

console.log(jsDeveloper); //Person {job: "Front Developer", name: "BKJang", getJob: ƒ, getName: ƒ}
console.log(javaDeveloper); //Person {job: "Back Developer"}
console.log(jsDeveloper.__proto__ === javaDeveloper.__proto__); //true
```

![Javascript](/assets/img/js_protypal_inheritance.png)

프로토타입 패턴 상속은 **객체 리터럴 방식으로 생성한 객체도 상속을 구현할 수 있다.**

```javascript
var person = {
  job : 'Front Developer',
  getJob : function() {
    return this.job;
  }
};

var jsDeveloper = Object.create(person);
var javaDeveloper = Object.create(person);

jsDeveloper.name = 'BKJang'

//Override
jsDeveloper.getJob = function() {
  console.log(this.job);
}

jsDeveloper.getName = function() {
  console.log(this.name);
}

javaDeveloper.job = 'Back Developer';


console.log(javaDeveloper.getJob()); //Back Developer
jsDeveloper.getJob(); //Front Developer
jsDeveloper.getName(); //BKJang

console.log(jsDeveloper); //{name: "BKJang", getJob: ƒ, getName: ƒ}
console.log(javaDeveloper); //{job: "Back Developer"}
console.log(jsDeveloper.__proto__ === javaDeveloper.__proto__); //true
```

<br/>



#### Reference

- 인사이드 자바스크립트 (송형주, 고형준)
- [자바스크립트 객체지향 프로그래밍](https://poiemaweb.com/js-object-oriented-programming)
