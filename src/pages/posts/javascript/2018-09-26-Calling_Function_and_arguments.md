---
layout: post
title:  "[JavaScript] 3-4. 함수의 호출과 arguments객체"
date:   2018-09-26
description: "함수의 호출과 arguments객체에 대해서"
tags:
- javascript
- function
draft: false
path: '/posts/arguments-of-js'
category: 'ES5'
---

## JavaScript에서의 함수 호출



모든 언어에서 함수의 기본적인 작동 원리는 **호출에 의한 동작**이다.

Java에서 함수를 호출할 때 보다 JavaScript에서의 함수 호출은 자유롭다.

```javascript 
//Java
class TestMain {

   public static void main(String[] args) {
        System.out.println(add(2, 3)); //5
        System.out.println(add()); //Error
        System.out.println(add(2, 3, 4)); //Error
   }

   public add(x, y) {
       return x + y;
   }
}

```

```javascript
//JavaScript
function add(x, y) {
    return x + y;
};

console.log(add(2,3)); //5
console.log(add(2,3,4)); //5
console.log(add()); //NaN
```

Java에서는 정의된 함수의 인자 개수만큼 함수를 호출 할 때 매개변수를 넘기지 않으면 에러가 발생한다.

하지만, JavaScript에서는 **인자의 개수보다 적게 넘길 경우 undefined가 할당**된다.(`add();`를 호출할 경우, 인자 x,y에 `undefined`가 할당되고 `NaN(Not a Number)`가 반환된다.)
반대로 많이 넘길 경우엔 **앞에서부터 함수의 인자 갯수만큼만 할당**한다.(`add(2,3,4));`를 호출할 경우, 앞의 2, 3만 인자로 할당하여 함수를 동작시킨다.)

**JavaScript에서 함수의 호출이 이루어졌을 때 동적으로 인자의 갯수에 따라 다르게 결과 값을 반환할 경우, arguments 객체를 사용할 수 있다.**



## arguments 객체



```javascript
function add() {
    var result = 0;

    for(var i=0; i<arguments.length; i++) {
        result += arguments[i];
    }

    return result;
}

console.log(add(2,3)); //5
console.log(add(2,3,4)); //9
console.log(add()); //0
```

> arguments 객체는 함수가 호출되면, **JavaScript가 자동으로 생성하고 매개변수와 함께 함수 내부로 전달**된다.
> arguments 객체는 **유사배열객체**다.(유사배열객체이기 때문에 위의 코드 처럼 배열 형태로 접근할 수 있다.)
> arguments 객체를 이용해서 **매개변수의 갯수에 따라 다른 처리를 해야하는 함수를 구현**할 수 있다.

<br/>



#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)