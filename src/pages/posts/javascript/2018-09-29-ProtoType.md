---
layout: post
title:  "[JavaScript] 4-1. 프로토타입(Prototype)"
date:   2018-09-29
description: "프로토타입에 대하여"
tags:
- javascript
- prototype
draft: false
path: '/posts/prototype-of-js'
category: 'ES5'
---

## 프로토타입 객체



기본적으로 자바스크립트는 객체지향 프로그래밍을 지원한다. 단, Java와 다르게 **프로토타입 기반의 객체지향 언어**이다.

자바스크립트는 **클래스가 없다.**(사실, 하다보면 느끼겠지만 지원하지 않는다기보단 클래스를 만들어 사용할 수는 있다. 또한, ES6부터는 클래스를 지원하고 이는 기존 ES5의 **Syntatic Sugar**이다.)

Java에서는 class를 이용해서 객체를 생성하지만, 자바스크립트에서는 **객체 리터럴이나 생성자 함수를 이용해 객체를 생성**한다.

이 때, 생성된 객체의 부모 객체를 가리켜 **프로토타입 객체**라고 한다.


```javascript
var obj = {
    name : 'BKJang',
    age : 25,
    sex : 'male'
}

console.log(obj.toString()); //[object Object]
console.dir(obj);
```


![JavaScript](/assets/img/js_prototype1.png)

`console.dir(obj)`의 결과를 보면 `__proto__ : Object`를 볼 수 있을 것이다.

자바스크립트의 **모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다.**
크롬 브라우저서는 숨겨진 [[Prototype]] 프로퍼티를 `__proto__`프로퍼티로 표현하고 있다. 

즉, `obj`객체는 `__proto__`프로퍼티로 **프로토타입 객체인 Object.prototype**를 가리키고 있다.



![JavaScript](/assets/img/js_prototype2.png)



그리고 Object.prototype 객체의 내부를 보면 `toString()`메서드가 구현된 것을 볼 수 있다.

즉, obj객체는 부모 객체인 **Object.prototype객체 내부에 있는 `toString()`메서드를 사용했기 때문**에, `obj`객체 안에 `toString()`메서드가 구현이 안 되어있어도 에러가 안났던 것이다.

```javascript
var obj = {
    name : 'BKJang',
    age : 25,
    sex : 'male'
}

console.log(obj.__proto__ === Object.prototype); //true
```



## [[Prototype]] 프로퍼티([[Prototpye]] 링크)와 prototype 프로퍼티



여기서부터 [[Prototype]] 프로퍼티를 **[[Prototpye]]링크**라고 하겠다.

```javascript
//Developer 생성자 함수
function Developer(name, age) {
    this.name = name;
    this.age = age;
}

//new 객체 생성
var web = new Developer('BKJang', 25);

console.dir(Developer);
console.dir(web);

console.log(Developer.prototype); 
/* 출력
{constructor: ƒ}
constructor: ƒ Developer(name, age)
__proto__: Object
*/

console.log(web.__proto__);
/* 출력
{constructor: ƒ}
constructor: ƒ Developer(name, age)
__proto__: Object
*/

console.log(web.prototype); //undefined

console.log(Developer.prototype === web.__proto__); //true
console.log(Developer.__proto__ === Function.prototype); //true (함수 객체의 __proto__([[Prototype]]링크))는 Function.prototype을 가리킨다.
```


![JavaScript](/assets/img/js_prototype3.png)



### prototype 프로퍼티

> * **함수 객체만 가지고 있는** 프로퍼티이다.
> * 함수 객체(Developer)를 통해 생성될 **객체(web)의 부모 역할을 하는 객체(프로토타입 객체)를 가리킨다.**



### [[Prototype]] 링크

> * 함수를 포함한 **모든 객체가 가지고 있는 프로퍼티**이다.
> * 객체의 입장에서 부모인 프로토타입 객체를 가리키며, **함수 객체의 경우 Function.prototype을 가리킨다.** (다음 포스팅에서 이어질 프로토타입 체이닝에서 설명할 예정이다.)



## constructor 프로퍼티



**프로토타입 객체(Prototype Object)는 constructor 프로퍼티를 가진다.**

constructor 프로퍼티는 **객체 자신**을 **생성한 객체**를 가리킨다.

```javascript
function Developer(name) {
    this.name = name;
}

var web = new Developer('BKJang');

/* Developer.prototype을 생성한 객체는 Developer 함수 객체 */
console.log(Developer.prototype.constructor === Developer); //true

/* web 객체를 생성한 객체는 Developer 함수 객체 */
console.log(web.constructor === Developer); //true

/* Developer를 생성한 객체는 Function 함수 객체 */
console.log(Developer.constructor === Function); //true
```



> * 프로토타입 객체(Prototype Object) : 생성한 객체의 **부모 역할을 하는 객체**
> * 프로토타입 링크([[Prototype]] 링크) : 크롬 브라우저에서는 `__proto__`로 표현하고 있으며, **부모 역할을 하는 프로토타입 객체를 가리킨다.**
> * 프로토타입 프로퍼티(Prototype 프로퍼티) : 함수 객체(Developer)만 가지고 있으며, **이 객체를 통해 생성될 객체(web)의 프로토타입 객체를 가리킨다.**
> * constructor 프로퍼티 : 객체 입장에서 **자신을 생성한 객체를 가리킨다.**

 

![JavaScript](/assets/img/js_prototype4.png)

<br/>


#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)