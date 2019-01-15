---
layout: post
title:  "[ES6] 5. 디스트럭처링(Destructuring)"
date:   2019-01-15
description: "ES6의 디스트럭처링에 대해서"
tags:
- javascript
- es6
- destructuring
draft: false
path: '/posts/destructuring'
category: 'ES6'
---

## 디스트럭처링

디스트럭처링은 **구조화된 배열 혹은 객체를 분해하여 변수에 할당**하는 방식이다. 이 개념을 몰랐더라도 `React`를 사용해봤던 개발자라면 아마 많이 봤을 문법이다.

```js
const { state } = this.props;
```

오른쪽의 특정 값을 해체하여 왼쪽에 할당하는 표현식을 **`Destructuring Assignment`**라고 한다.

## 배열 디스트럭처링

```js
//ES5
var arr = ['JS', 'Java', 'Node.js'];

var x = arr[0];
var y = arr[1];
var z = arr[2];

console.log(x, y, z); //JS Java Node.js
```

```js
//ES6
const arr = ['JS', 'Java', 'Node.js'];

let [x, y, z] = arr;

console.log(x, y, z); //JS Java Node.js
```

```js
const numArr = [1, 2, 3, 4];

let [x, y, ,z] = numArr;

console.log(x, y, z); //1 2 4
```

위의 결과를 보면 알 수 있듯이 배열을 디스트럭처링하면 각각의 변수에 배열의 `index`를 기준으로 할당된다.

디스트럭처링을 사용했을 때 편한 대표적인 예는 **변수의 swap처리**를 할 때다.

```js
//ES5(For Swap)
var x = 1;
var y = 2;
var tmp = y;

console.log(x, y); //1 2

y = x;
x = tmp;

console.log(x, y); //2 1
```

```js
//ES6
let x = 1;
let y = 2;

console.log(x, y); //1 2

[x, y] = [y, x];

console.log(x, y); //2 1
```

## 객체 디스트럭처링

객체 또한 디스트럭처링이 가능하며 배열과 크게 다르지 않다.

```js
//ES5
var obj = { name : 'BKJang', lang : 'Korean', job : 'Developer' };

var name = obj.name;
var lang = obj.lang;
var job = obj.job;

console.log(name, lang, job); //BKJang Korean Developer
```

```js
//ES6
const obj = { name : 'BKJang', lang : 'Korean', job : 'Developer' };

let { name, lang, job } = obj;

console.log(name, lang, job); //BKJang Korean Developer
```

만약 변수 명을 다르게 하고 싶다면 다음과 같이 처리하면 된다.

```js
var obj = { a: 1, b: 'hello' };
var { a: key, b: value } = obj;

console.log(key, value); // 1, 'hello'
```

중첩 객체의 경우에는 아래와 같이 사용한다.

```js
const developer = {
  name: 'BKJang',
  stack: {
      front : 'HTML / CSS / JS',
      back : 'Java / Node.js'
  }
};

const { name, stack: { front } } = developer;

console.log(name, front); //BKJang HTML / CSS / JS
```

디스트럭처링을 사용하면 **기본 값(Default Value)**이나 **기본 파라미터(Default Parameter)**를 세팅할 수 있고, [Speread Operator](https://bkdevlog.netlify.com/posts/spread-rest)또한 사용할 수도 있다.


## Spread Operator

```js
const arr = [1, 2, 3, 4];

let [x, y, ...z] = arr;

console.log(x, y, z); //1 2 [3, 4]
```

```js
const obj = { one : 1, two: 2, three: 3, four: 4 };

let { one, two, ...rest } = obj;

console.log(one, two, rest); //1 2 {three: 3, four: 4}
```

## 기본 값(Default Value)

```js
const arr = [1, 2];

let [x, y, z = 3] = arr;

console.log(x, y, z); //1 2 3
```

```js
const obj = { one : 1, two : 2 };

let { one, two, three = 3 } = obj;

console.log(one, two , three); //1 2 3
```

## 기본 파라미터(Default Parameter)

```js
const doSomething = (name, stack = 'FrontEnd') => {
    stack = stack === null ? 'FullStack' : stack;

    console.log(`${name}은 ${stack}개발자입니다.`);
}

doSomething('BKJang'); //BKJang은 FrontEnd개발자입니다.
doSomething('BKJang', 'BackEnd'); //BKJang은 BackEnd개발자입니다.
doSomething('BKJang', undefined); //BKJang은 FrontEnd개발자입니다.
doSomething('BKJang', null); //BKJang은 FullStack개발자입니다.

//Default Parameter는 함수의 length에 포함되지 않는다.
console.log(doSomething.length); //1
```

자바스크립트에서 함수는 `length`프로퍼티를 가지는데 인자의 갯수를 나타낸다.<br/>**`Default Parameter`는 이 `length`프로퍼티에 포함되지 않는다.**

<br/>

#### Reference

- [MDN Web Docs - 구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [[ES6] 5. Destructuring and Default Parameter](https://jaeyeophan.github.io/2017/04/18/ES6-4-Spread-Rest-parameter/)
- [Destructuring 디스트럭처링](https://poiemaweb.com/es6-destructuring)
- [ImD/Dev-Docs - Destructuring_Assignment](https://github.com/Im-D/Dev-Docs/blob/master/ECMAScript/Destructuring_Assignment.md)
