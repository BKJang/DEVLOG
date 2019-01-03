---
layout: post
title:  "[JavaScript] 3-2. 함수 객체"
date:   2018-09-18
description: "함수 객체에 대해서"
tags:
- javascript
- function
draft: false
path: '/posts/object-of-js'
category: 'ES5'
---

자바스크립트에서 함수에 대해 설명할 때, 가장 먼저 나오는 말이 있다.

> - **자바스크립트에서 함수 또한 객체다.**
> - **함수는 일급 객체다.**



## 자바스크립트에서 함수 또한 객체다.



함수는 기본적으로 코드를 실행하는 역할을 한다. 이에 더해서 자바스크립트에서는 함수 또한 일반 객체처럼 자기 자신의 프로퍼티를 가질 수 있다.

```javascript
function add(x, y) {
	return x+y;
}

//함수 객체에 print와 hello라는 프로퍼티 추가
add.print = add(1, 2);
add.hello = "Hello World";

console.log(add.print); //3
console.log(add.hello); //Hello World
```
위의 코드에서 볼 수 있듯이 함수에도 일반 객체 처럼 `print`와 `hello`처럼 프로퍼티를 추가할 수 있다.



## 함수는 일급 객체다.



자바스크립트에서 함수는 다음과 같은 특성들을 가진다.

- **변수(variable)와 객체의 프로퍼티에 담을 수 있다.**

```javascript
//변수에 할당
var a = function(x, y) { return x - y; };

//프로퍼티에 할당
var obj = {};
obj.add = function(x, y) { return x + y}
```

- **인자(parameter)로 전달할 수 있다.**

```javascript
//인자를 함수로 받는 함수
var foo = function(func) {
	func();
};

var add = function(x, y) {
	return x + y;
};

//인자로 함수로 전달
console.log(foo(add(2,3))); //5

```

- **반환값(return value)으로 전달할 수 있다.**

```javascript
var foo = function() {
	return function() {
    	console.log("return value is", 100);
    }
}

var returnFunc = foo();

returnFunc(); //return value is 100
```

이러한 특성을 가질 때, 1급 객체라고 할 수 있는데, 함수를 그냥 주고받을 수 있다는 것 뿐이지만 이것이 자바스크립트에서 요즘 떠오르고 있는 **함수형 프로그래밍**을 가능하게 만든다.

이는 차후 **함수형 프로그래밍**과 관련해 설명하겠지만, 1급 객체라는 특성으로 자바스크립트는

> 1. **고차함수(High-Order Function)를 사용할 수 있다.**
> 2. **Closure와 만났을 때, Currying과 메모제이션이 가능해진다.**

이 부분들은 일단은 기억만 해두고 넘어가면 좋을 것 같다.



## 함수 객체의 표준 프로퍼티(Property)



```javascript
var add = function(x, y) {
 	return x + y;
}

console.dir(add);
```
![funcObject](/assets/img/function_object.png)



### `name`, `caller`, `arguments`

> - **name : 함수의 이름을 나타낸다.**
> - **caller : 자신을 호출한 함수를 나타낸다. 위에선 add함수를 어디서도 호출하지 않았기 때문에 null을 반환했다.**
> - **arguments : 함수를 호출할 때 전달되는 인자 값을 나타낸다. 위에선 add함수가 호출된 상태가 아니기 때문에 null을 반환했다.**



### `__proto__`

**모든 자바스크립트 객체는 자신의 프로토타입을 가리키는 [[prototype]] 내부프로퍼티를 가지고 있다.**
이 내부 프로퍼티를 크롬 브라우저에서는 `__proto__`로 구현했다.

add함수는 객체다 즉, **함수 객체**이다.
add함수 역시 부모 역할을 하는 ProtoType 객체를 가지고 있고 `__proto__`는 이 부모 역할을 하는 ProtoType객체를 가리킨다.

이와 같이 함수 객체의 부모 역할을 하는 객체를 자바스크립트에서는 **`Function.prototype` 객체**라고 한다.
또한 **`Function.prototype` 객체** 역시 함수 객체로 정의하고 있다.

크롬 브라우저에서는 이 객체를 Empty()함수로 정의하고 있고, 이 역시 함수 객체이므로, `name`, `caller`, `arguments` 등과 같은 프로퍼티를 가진다.



### `length`, `prototype`

모든 함수는 `length`와 `prototype` 프로퍼티를 가져야 한다.

`length` 프로퍼티는 함수가 정상적으로 실행됐을 때, 기대되는 인자의 개수 즉, **함수를 정의할 때 같이 정의한 인자(Parameter)의 개수**를 나타낸다.

`prototype` 프로퍼티는 함수가 생설될 때 만들어지고, prototype과 constructor라는 프로퍼티로 서로를 참조한다.

```javascript
function test() {
	return true;
}

console.log(test.prototype); //{constructor: f}
console.log(test.prototype.constructor); //f test() { return true; }

```

코드를 살펴보면 알 수 있듯이,
test라는 함수 객체의 **prototype 프로퍼티는 constructor 프로퍼티를 참조**하고 있고,
test의 프로토타입 객체는 **constructor라는 프로퍼티로 test함수를 참조**하고 있다.



### `__proto__`와 `prototype`의 차이

>두 프로퍼티는 모두 프로토타입 객체를 가리키는 공통점을 가지고 있으나 차이점은 있고 구분해야 한다는 점이다.
>
>내부 프로퍼티인 `__proto__`(객체의 숨은 프로퍼티:암묵적 프로토타입 링크)는 **객체 입장에서 자신의 부모인 프로토타입 객체를 가리키는** 반면에, 함수 객체 자체가 가지는 명시적인 prototype 프로퍼티는 **함수가 생성자로 사용될때 이 함수를 사용하여 만들어진 객체의 부모역할을 하는 프로토타입을 가리킨다**는 점이다.


<br/>

#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)

