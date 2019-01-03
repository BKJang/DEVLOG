---
layout: post
title:  "[JavaScript] 3-3. 함수의 종류"
date:   2018-09-20
description: "함수의 종류에 대해서"
tags:
- javascript
- function
draft: false
path: '/posts/kins-of-jsfunction'
category: 'ES5'
---

자바스크립트에서 함수는 여러 가지 형태를 가진다.

## 익명함수



```javascript
var add = function(x, y) {
	return x + y;
}
```
* **익명함수는 이름이 없다.**
* **주로 변수에 할당되거나 함수의 인자값(parameter) 또는 반환값으로 사용된다.**
* **콜백함수의 생성에 사용된다**



## 콜백함수



위의 익명함수의 대표적인 용도 중 하나가 콜백함수의 생성이다.
콜백함수가 많이 쓰이는 비동기 통신을 예로 들어보자.

```javascript
function getData(callbackFunc) {
	$.get('/getData', function (response) {
		callbackFunc(response); // 서버에서 받은 데이터를 callbackFunc()에 넘긴다.
	});
}

getData(
	function (value) {
		console.log(value); // $.get()의 response 값이 value 전달
	}
);
```
1. getData라는 함수를 호출한다.
2. getData함수 내부에서 비동기 통신을 수행하고 response값을 서버로 부터 받는다.
3. response 값을 callback함수의 인자값으로 넘긴다.
4. console.log(value)가 실행된다.

간단히 설명하면, 비동기 통신이 일어난 이후 특정 동작이 일어나고 싶게 하고 싶을 때, 주로 콜백함수를 사용한다.



## 내장함수(Inner Function)



내장함수를 사용하면 **전역 스코프의 있는 함수의 범위를 줄일 수 있고**, 내장함수를 통해 객체지향의 **캡슐화, 정보은닉**의 개념을 구현할 수 있다.

```javascript
function outerFunc() {
    var returnValue = 10;

    function innerFunc() {
      return returnValue + 1;
    }

    return innerFunc();
}

console.log(outerFunc()); //11
console.log(innerFunc()); //innerFunc is not defined
```

* **특정 함수에서만 사용할 기능이라면 전역 스코프에 함수를 구현하지 않고, 특정 함수 내부에 구현할 수 있다.**
* **함수 스코프로 변수의 스코프가 이루어지므로, 내부 함수에서는 내부에 정의된 변수에 접근할 수 있다.**
* **일반적으로 특정 함수의 외부에서는 그 안에 구현된 내장 함수에 접근할 수 없다.**

### 내장함수를 함수 스코프 외부에서 호출

위에서 일반적으로 **일반적으로 특정 함수의 외부에서는 그 안에 구현된 내장 함수에 접근할 수 없다.** 라고 했는데, 외부에서 내장 함수를 호출하기 위해선 다음과 같이 구현할 수 있다.

```javascript
function outerFunc() {
    var returnValue = 10;

    function innerFunc() {
    	return returnValue + 1;
    }

    return innerFunc;
}

var inner = outerFunc();
inner(); //11
```
이와 같이, 실행이 끝난 outerFunc()와 같은 부모 함수의 스코프 내에 있는 변수를 참조하는 inner()와 같은 함수를 **클로저**라고 한다.



## 즉시실행함수(Immediate Function)



함수를 정의함과 동시에 실행하는 함수를 **즉시실행함수**라고 한다.

```javascript
(function (returnValue) {
	console.log(returnValue);
})('Hello World');
```

즉시실행함수의 경우 함수를 정의하자마 실행되기 때문에, 같은 함수를 다시 호출할 수 없다.
이러한 특성을 이용해 최초에 한 번만 실행되는 초기화 코드에서 사용할 수 있다.

즉시실행함수의 경우, 변수를 전역으로 선언하는 것을 피할 수 있기 때문에, 라이브러리를 만들 때 많이 사용한다.

```javascript
var moduleFunction = (function () {

  var a = 3;

  function helloWorld(){
    console.log('Hello');
  }

  return {
    a : a,
    sayHello: helloWorld
  }
})();

function doSomething(x) {
  console.log("moduleFunction - a :" , x);
}

moduleFunction.sayHello();
doSomething(moduleFunction.a);
```

<br/>



#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)

