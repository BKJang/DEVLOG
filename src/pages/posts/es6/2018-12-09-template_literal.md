---
layout: post
title:  "[ES6] 2. 템플릿 리터럴(Template Literal)"
date:   2018-12-09
description: "ES6의 Template Literal에 대해서"
tags:
- es6
- template literal
draft: false
path: '/posts/template-literal'
category: 'ES6'
---

## 템플릿 리터럴(Template Literal)



ES6(ECMA Script2015)에서는 새로운 문자열 표기법이 도입됐는데 이것이 **템플릿 리터럴**이다.

템플릿 리터럴을 사용하면 기존 문자열 표기 방법의 불편함을 어느 정도 해결할 수 있다.

* **템플릿 리터럴은 `(백틱)을 사용**한다.

* 이스퀘이프 시퀀스를 사용하지 않아도 템플릿 리터럴 내의 white space가 그대로 인식된다.

```js
//ES5
var str = 'Hello.\n My Name is BKJang. \n I\'m developer.';

//ES6
let templateStr = `Hello.
May Name is BKJang
I'm developer.`;

console.log(templateStr);
/*
Hello.
May Name is BKJang
I'm developer.
*/
```

* **여러 개의 문자열을 연결할 때는 `+`연산자를 사용하지 않고 `String Interpolation(문자열 인터폴레이션)`을 사용**한다.

```js
let str1 = 'Hello';
let str2 = 'World';
let id = 'bkjang';

//ES5
console.log(str1 + ' ' + str2); //Hello World

//ES6
console.log(`${str1} ${str2}`); //Hello World

let url = `http://localhost:3000/api/user/${id}` 

console.log(url); //http://localhost:3000/api/user/bkjang
```

```js
console.log('1 더하기 2 는 ' + (1 + 2) + ' 입니다,');

console.log(`1 더하기 2 는 ${1 + 2} 입니다.`);
```
<br/>

#### Reference

- [템플릿 리터럴](https://poiemaweb.com/es6-template-literals)
- [Template literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)
