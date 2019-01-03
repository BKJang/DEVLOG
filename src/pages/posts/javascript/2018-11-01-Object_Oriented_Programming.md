---
layout: post
title:  "[JavaScript] 8-1. 객체지향 프로그래밍(클래스 vs 프로토타입)"
date:   2018-11-01
description: "프로토타입 기반의 OOP에 대하여"
tags:
- javascript
- prototype
- oop
draft: false
path: '/posts/oop-class-of-js'
category: 'ES5'
---

## 객제지향 프로그래밍



객체지향 프로그래밍은 **현실에 존재하는 객체를 소프트웨어에 표현하기 위해 상태와 행위를 추상화(abstraction)하여 모델링하는 프로그래밍 패러다임**을 말한다. 

다시 말해, 우리가 주변의 사물과 우리의 행위를 프로그래밍에 접목하려는 것을 말한다.



## 클래스 기반



Java나 C++ 같은 클래스 기반의 언어에서는 `class`를 이용하여 **속성(attribute)과 행위(method)를 정의**한다.

`new`를 사용하여 **인스턴스화하는 과정을 통해 객체를 생성**한다.

```java
class Person {
  private String job;

  public Person(String job) {
    this.job = job;
  }

  public void setJob(job) {
    this.job = job;
  }

  public String getJob() {
    return this.job;
  }

  public static void main(String args[]) {
    Person bkjang = new Person("developer");

    String job = bkjang.getJob();
    System.out.println(job); //developer
  }
}
```



## 프로토타입 기반



자바스크립트는 클래스라는 개념이 없다.(ES6에서 class가 생기긴 했지만 **이는 사실 함수이며 프로토타입 기반의 syntatic sugar**다.)

자바스크립트는 대표적인 **프로토타입 기반**의 객체지향 언어이다.

클래스라는 개념이 없지만 자바스크립트에는 3가지의 객체 생성 방법이 있다.

> * 객체 리터럴
> * Object() 생성자 함수
> * 생성자 함수

```javascript
// 객체 리터럴
var obj = {
  name : 'BKJang',
  job : 'Developer'
}


// Object 생성자 함수
var obj = new Object();
obj.name = 'BKJang';
obj.job = 'Developer';


// 생성자 함수
function Person(name, job) {
  this.name = name;
  this.job = job;
}

var obj = new Person('BKJang', 'Developer');
```



## 생성자 함수를 이용한 객체 생성



자바스크립트는 생성자 함수를 이용해 객체를 생성할 수 있다.

```javascript
function Developer(lang) {
  this.lang = lang;

  //메서드 정의
  this.setLang = function(lang) {
    this.lang = lang;
  };

  this.getLang = function() {
    return this.lang;
  };
}

var frontEnd = new Developer('Javascript');
var backEnd = new Developer('Java');

console.log(frontEnd.getLang()); //Javascript
console.log(backEnd.getLang()); //Java

backEnd.setLang('Node.js');

console.log(backEnd.getLang()); //Node.js
```

위 예제에서 볼 수 있듯이 **생성자 함수내에 프로퍼티와 메서드를 정의하고 `new`연산자를 이용해 객체를 생성**한다.

```javascript
console.log(frontEnd); //{lang: "Javascript", setLang: ƒ, getLang: ƒ}
console.log(backEnd); //{lang: "Node.js", setLang: ƒ, getLang: ƒ}
```

하지만 위에서 볼 수 있듯이 `frontend`와 `backend` 객체는 각각 `setLang()`과 `getLang()` 메서드를 가지고 있다.

위의 방식으로 구현하면 객체가 많아질수록 **불필요하게 같은 메서드를 모두 각각** 가지고 있게 되며 이는 **메모리의 낭비**로 이어질 수 있다.

이를 막기 위해 자바스크립트에서는 **[프로토타입](https://bkjang.github.io/ProtoType/)**을 이용할 수 있다.



## 프로토타입 체인을 이용한 참조



자바스크립트에서 모든 객체는 **프로토타입이라는 내부 링크**를 갖고 있고 프로토타입을 통해 객체를 연결한다. 이를 **[프로토타입 체인](https://bkjang.github.io/ProtoType_Chain/)**이라고 한다.

```javascript
function Developer(lang) {
  this.lang = lang;

  //메서드 정의
  Developer.prototype.setLang = function(lang) {
    this.lang = lang;
  };

  Developer.prototype.getLang = function() {
    return this.lang;
  };
}

var frontEnd = new Developer('Javascript');
var backEnd = new Developer('Java');

console.log(frontEnd.getLang()); //Javascript
console.log(backEnd.getLang()); //Java

backEnd.setLang('Node.js');

console.log(backEnd.getLang()); //Node.js
```

위의 코드를 보면 **생성자 함수 내부에서 `Developer()` 함수의 프로토타입 프로퍼티가 가리키는 `Developer.prototype` 객체에 `setLang()`과 `getLang()`을 정의**한다.

이후 `frontEnd`와 `backEnd`객체에서는 프로토타입 체인을 통해 `[[Prototype]]` 프로퍼티가 가리키는 **즉, 부모 객체인 `Developer.prototype`객체에 정의된 메서드들을 사용**할 수 있다.

```javascript
console.log(frontEnd); //Developer {lang: "Javascript"}
console.log(backEnd); //Developer {lang: "Node.js"}

console.log(frontEnd.__proto__ === backEnd.__proto__); //true
console.log(frontEnd.__proto__ === Developer.prototype); //true
console.log(Developer.prototype); //{setLang: ƒ, getLang: ƒ, constructor: ƒ}
```

위 코드의 출력 값들을 보면 `frontEnd.__proto__`와 `backEnd.__proto__`는 모두 `Developer.prototype` 객체를 가리킨다.

또한 `getLang()`과 `setLang()` 메서드는 **`frontEnd`와 `backEnd` 각각의 객체가 아닌 `Developer.prototype` 객체에만 정의되어 있는 것**을 볼 수 있다.

이를 통해 첫 번째 예제에서 문제가 됐던 메모리 낭비 부분을 없앨 수 있다.



![JavaScript](/assets/img/js_oop1.png)



이어질 객체지향 프로그래밍 두번째 포스팅에서는 상속과 캡슐화 그리고 그에 따른 패턴들에 대해서 다루도록 하겠다.

<br/>

#### Reference

- 인사이드 자바스크립트 (송형주, 고형준)
- [자바스크립트 객체지향 프로그래밍](https://poiemaweb.com/js-object-oriented-programming)
