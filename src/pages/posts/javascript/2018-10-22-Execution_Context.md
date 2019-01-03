---
layout: post
title:  "[JavaScript] 6. 실행 컨텍스트"
date:   2018-10-22
description: "실행 컨텍스트에 대하여"
tags:
- javascript
- execution context
draft: false
path: '/posts/execution-context-of-js'
category: 'ES5'
---

## 실행 컨텍스트



실행 컨텍스트는 자바스크립트가 동작하는 원리라고 할 수 있다.

쉽게 말하면, **코드가 실행되는 환경**이라고 보면 된다.

* 전역 컨텍스트 생성 후, **함수 호출 시마다 함수 컨텍스트가 생긴다.**

* 컨텍스트 생성 시 컨텍스트 안에 `변수객체(arguments, variable) `, `scope chain`, `this`가 생성된다.

* 컨텍스트 생성 후 함수가 실행되는데, **사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.**

* **함수 실행이 끝나면 해당 컨텍스트는 사라지고, 페이지가 종료되면 전역 컨텍스트는 사라진다.**



### 실행 컨텍스트 스택

코드가 실행 될 때, **실행 컨텍스트 스택(Stack)**이 생성하고 소멸한다. 

현재 **실행 중인 컨텍스트에서 관련없는 코드(예를 들어, 다른 함수)가 실행되면 새로운 컨텍스트가 생성**된다.

```js
var global = 'global';

function foo() {
    var local1 = 'local1';

    function bar() {
        var local2 = 'local2';
        console.log(local1, local2, global); //local1 local2 global
    }

    bar();
}

foo();
```



![JavaScript](/assets/img/js_ec_stack.png)



## 변수 객체(Variable Object)



실행 컨텍스트가 생성되면 자바스크립트 엔진은 **실행에 필요한 여러 정보들을 담을 객체를 생성**한다. 이를 **Variable Object(VO / 변수 객체)**라고 한다. 

변수 객체는 **arguments(인수 정보)**와 **variable(스코프의 변수)**을 담고 있고, 전역 컨텍스의 경우와 함수 컨텍스트의 경우에 가리키는 객체가 다르다.



### 전역 컨텍스트

전역 컨텍스트의 경우, 변수 객체는 `arguments`를 가지지 않는다.

그리고 **변수 객체는 모든 전역 변수, 전역 함수 등을 포함하는 전역 객체(Global Object / GO)를 가리킨다.** 

전역 객체는 전역 변수와 전역 함수를 프로퍼티로 가진다.



![JavaScript](/assets/img/js_global_context.png)




### 함수 컨텍스트

함수 컨텍스트의 경우, **변수 객체는 Activation Object(AO / 활성 객체)를 가리킨다.**

또한, 전역 컨텍스트와 다르게 매개변수와 인수들의 정보를 배열의 형태로 담고 있는 유사 배열 객체 `arguments`도 가진다.



![JavaScript](/assets/img/js_function_context.png)



## 스코프 체인(Scope Chain)



스코프 체인은 **현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 담고 있으며**, 연결 리스트의 형태와 유사하게 생성된다.

이 리스트를 이용해 현재 컨텍스트의 변수와 상위 실행 컨텍스트의 변수에도 접근할 수 있다.

이 리스트는 **현재 실행 컨텍스트의 활성 객체**를 먼저 가리키고 순차적으로 **상위 컨텍스트의 활성 객체**를 가리키고 마지막으로 **전역 객체**를 가리킨다.



![JavaScript](/assets/img/js_scope_chain.png)



> 즉, 스코프 체인은 식별자 중 **변수를 검색하는 것**을 말하고, 변수가 아닌 **객체의 프로퍼티를 검색하는 것**을 [프로토타입 체인](https://bkjang.github.io/ProtoType_Chain/)이라고 말한다.



## this



this는 따로 설정되어 있지 않으면 window를 가리킨다.

this를 바꾸려면 new를 호출하거나 bind를 하면 된다.

* [함수의 호출과 this](https://bkjang.github.io/Calling_Function_and_this/
)



## 호이스팅



**함수선언식은 변수 객체(VO)에 함수명을 프로퍼티로 추가하고 함수 객체를 즉시 할당**하지만, **함수 표현식은 일반 변수의 방식**을 따른다. 

따라서 함수선언식의 경우, 선언문 이전에 함수를 호출할 수 있다. 
이를 **함수 호이스팅**이라고 한다.

```js
bar(); // (3)
foo(); // (4) foo is not a function

var foo = function() { // (1) 선언 (5) 대입
  console.log('This is 함수 표현식');
}
function bar() { // (2) 선언과 동시에 초기화(함수 호이스팅)
  console.log('This is 함수 선언식');
}
```

위의 코드를 보면 `bar()` 함수는 **함수 선언식**이므로 컨텍스트 생성 후 바로 대입이 된다.

반면, `foo()` 함수는 **함수 표현식**이므로 대입되기 전에 호출이 발생하기 때문에 `foo is not a function`이라는 에러가 발생한다.

위의 코드에서 호이스팅이 발생했을 때, 코드로 이렇게 예상해볼 수 있다.

```js
var foo;
function bar() { 
  console.log('This is 함수 선언식'); 
}

bar();
foo();

foo = function() {
  console.log('This is 함수 표현식');
}
```

<br/>

#### Reference

- 인사이드 자바스크립트 (송형주, 고형준)
- [실행 컨텍스트와 자바스크립트의 동작 원리](https://poiemaweb.com/js-execution-context)