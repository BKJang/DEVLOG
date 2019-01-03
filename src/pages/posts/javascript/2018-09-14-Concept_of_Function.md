---
layout: post
title:  "[JavaScript] 3-1. 함수 정의"
date:   2018-09-14
description: "함수 정의에 대해서"
tags:
- javascript
- function
draft: false
path: '/posts/function-of-js'
category: 'ES5'
---

## 함수 정의 방법



자바스크립트에서 함수를 정의하는 방법은 3가지가 있다.

* **함수 선언문 방식**
* **함수 표현식 방식**
* **Function() 생성자 함수**

```javascript
//함수 선언문 방식
function add(x, y) {
	return x+y;
}

console.log(add(1,2)) //3

//함수 표현식 방식
var add = function(x, y) {
	return x+y;
};

var add2 = add;

console.log(add(1,2)); //3
console.log(add2(1,2)); //3

//Function() 생성자 함수
var add = new Function('x', 'y', 'return x+y');

console.log(add(1,2)); //3
```
1. 함수 선언문 방식은 **반드시 함수명을 정의**한다.
2. 함수 표현식 방식은 **주로 익명함수를 사용**하고, 함수명을 정의할 수 있지만 **함수 표현식에서 사용된 함수명은 외부에서 접근할 수 없다.**
3. Function() 생성자 함수를 이용한 함수 정의 방식은 잘 사용되지 않는다.

2번에 해당하는 내용에 대해서 코드로 살펴보자.

```javascript
var facTest = function factorial(x) {
	if(x <= 1) {
    	return 1;
    }

    return x * factorial(x-1);
};

console.log(facTest(4)); //24
console.log(factorial(4)); Uncaught ReferenceError : factorial is not defined
```

함수 표현식 방식으로 함수를 정의하고 factorial이라는 함수명을 정의했다.

이에 따라 factorial함수를 호출했을 때 결과 값이 잘 나올거 같지만, 위에서 말했듯이 **함수 표현식에서 함수명을 정의햇을 때, 외부에서 해당 함수명을 사용할 수 없기 때문에 factorial은 정의되지 않았다는 에러가 발생**한다.



## 함수 호이스팅



**함수 선언문 방식**과 **함수 표현식 방식**의 가장 큰 차이 중 하나는 **함수 호이스팅**이다.

```javascript
console.log(plus(5,6)); //11
console.log(minus(2,1)); // uncaught type error

function add(x, y) {
	return x+y;
}

var minus = function() {
	return x-y;
}
console.log(plus(5,6)); //11
console.log(minus(2,1)); //1

```

함수 선언문 방식으로 함수를 정의했을 때는 함수 호이스팅이 일어나 함수 정의 이전에 해당 함수를 호출해도 잘 작동한다.
반면, 함수 표현식 방식은 type error가 발생한다. 이는 함수 표현식 방식의 경우, **함수 호이스팅이 아닌 변수 호이스팅이 일어나기 때문**이다.

이러한 이유로 코드의 구조가 엉성해질 수 있기 때문에, 더글라스 클락포드는 **함수 선언문 방식보다는 함수 표현식 방식을 권장**하고 있다.

<br/>

#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)

