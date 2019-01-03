---
layout: post
title:  "[JavaScript] 8-3. 객체지향 프로그래밍(캡슐화)"
date:   2018-11-11
description: "캡슐화와 모듈 패턴에 대하여"
tags:
- javascript
- encapsulation
- module pattern
- oop
draft: false
path: '/posts/oop-encapsulation-of-js'
category: 'ES5'
---

## 캡슐화(정보 은닉)



캡슐화는 OOP의 대표적인 특징 중 하나로 **정보 은닉**의 개념을 포함한다.
하지만, 자바스크립트는 자바와 같이 `private`과 `public` 같은 키워드를 제공하지 않는다. 따라서 다른 방법으로 구현 가능하다.



## 모듈 패턴(Module Pattern)



```javascript
var Developer = function(arg) {
  var lang = arg ? arg : '';

  return {
    getLang : function() {
      return lang;
    },
    setLang : function(arg) {
      lang = arg;
    }
  
  }
};

var bkjang = new Developer('javascript');

console.log(bkjang.getLang()); //javascript

bkjang.setLang('java');

console.log(bkjang.getLang()); //java
```

위의 코드를 보면 Developer 생성자 함수에서 **`this`가 아닌 `var lang = arg ? arg : '';`으로 선언하면 자바스크립트는 함수형 스코프를 따르기 때문에 private해진다.** 

그리고 `getLang()` 과 `setLang()` 이라는 함수는 **클로저**이기 때문에 외부에서는 `lang`이라는 변수의 값에 접근할 수 있는 인터페이스가 된다.

위와 같이 `getLang()`과 `setLang()`과 같은 public 메서드를 인터페이스로 제공하고 `lang`과 같은 private한 변수에 인터페이스를 통해서만 접근하도록 하는 것이 **모듈 패턴**이다.



그렇다면 private 멤버 변수가 객체나 배열일 경우는 어떻게 될까?

```js
var Developer = function (obj) {
  var developerInfo = obj;

  return {
    getDeveloperInfo: function() {
      return developerInfo;
    }
  };
};

var developer = new Developer({ name: 'BKJang', lang: 'javascript' });

var bkJang = developer.getDeveloperInfo();
console.log('bkJang: ', bkJang);
// bkJang:  {name: "BKJang", lang: "javascript"}

bkJang.lang = 'java'; //인터페이스가 아닌 직접 변경

bkJang = developer.getDeveloperInfo();
console.log('bkJang: ', bkJang);
// bkJang:  {name: "BKJang", lang: "java"}

console.log(Developer.prototype === bkJang.__proto__); //false
```

**일반 변수가 아닌 객체나 배열을 멤버 변수로 가지고 이를 그대로 반환할 경우, 외부에서 이 멤버를 변경할 수 있다.**

왜냐하면, 객체나 배열을 반환하는 경우는 얕은 복사(shallow copy)로 private 멤버의 **참조값을 반환**하게 된다. 

따라서, 반환할 객체나 배열의 정보를 담은 **새로운 객체를 만들어 깊은 복사(deep copy)를 거친 후 반환**해야 한다.



또한, 위처럼 일반 객체를 반환하면 프로토타입 객체는 `Object.prototype` 객체가 되기 때문에 **상속을 구현할 수 없다.** 따라서 **함수를 반환**해야 한다.

```js
var Developer = (function() {
  var lang;

  //생성자 정의
  function Developer(arg) {
    lang = arg ? arg : '';
  }

  Developer.prototype = {
    getLang : function() {
      return lang;
    },
    setLang : function(arg) {
      lang = arg;
    }
  }
  
  return Developer;
}());

var bkJang = new Developer('javscript');

console.log(bkJang.getLang()); //javscript

bkJang.lang = 'java'; //인터페이스를 통해서가 아닌 직접 변경
console.log(bkJang.getLang()); //javscript

bkJang.setLang('java');
console.log(bkJang.getLang()); //java

console.log(Developer.prototype === bkJang.__proto__); //true
```

마지막 출력 값을 보면 **인스턴스인 `bkJang`의 프로토타입 객체가 `Developer.prototype` 객체임을 알 수 있고 이는 상속을 구현할 수 있음을 의미**한다.

<br/>



#### Reference

- 인사이드 자바스크립트 (송형주, 고형준)
- [자바스크립트 객체지향 프로그래밍](https://poiemaweb.com/js-object-oriented-programming)
