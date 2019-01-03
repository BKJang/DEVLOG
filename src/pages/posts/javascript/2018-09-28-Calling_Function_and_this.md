---
layout: post
title:  "[JavaScript] 3-5. 함수의 호출과 this"
date:   2018-09-28
description: "함수의 호출 패턴과 this에 대해서"
tags:
- javascript
- function
draft: false
path: '/posts/this-of-js'
category: 'ES5'
---

## 함수 호출 패턴과 this 바인딩



JavaScript에서는 함수를 호출할 때, arguments객체와 함께 this 인자가 함수 내부로 전달된다.

문제는 this인자가 함수가 호출되는 방식(패턴)에 따라 다른 객체를 참조하기 때문에 이를 이해하기 어려울 수 있다.

> * 객체의 메서드 호출할 때 
> * 함수를 호출할 때(내부 함수의 this 바인딩)
> * 생성자 함수를 호출할 때
> * call과 apply메서드의 사용을 통한 this 바인딩



## 객체의 메서드 호출할 때 this 바인딩



객체의 메서드를 호출할 때 this는 해당 메서드를 호출한 객체에 바인딩 된다.

```javascript
var obj = {
    lang : 'Korean',
    returnLang : function() {
        console.log(this.lang);
    }
}

obj.returnLang(); //Korean
```

위의서 볼 수 있듯이 obj객체의 `returnLang()`이라는 메서드를 호출할 경우, **this는 obj객체에 바인딩** 되어 `console.log(this.lang);`의 결과 값으로 Korean이 나오는 것을 확인할 수 있다.



## 함수를 호출할 때 this 바인딩



JavaScript에서 함수를 호출할 때, 함수 내부에서 사용된 **this는 전역객체(window 객체)에 바인딩** 된다.

```javascript
var lang = 'Korean';
console.log(window.lang); //Korean

function returnLang() {
    var lang = 'English';
    console.log(this.lang);
}

returnLang(); //Korean
```

### 내부함수에서의 this 바인딩

```javascript
var lang = 'Korean';

var obj = {
    lang : 'English',
    outerFunc : function() {
        console.log('outerFunc : ', this.lang);

        innerFunc1 = function() {
            console.log('innerFunc1 : ', this.lang);

            innerFunc2 = function() {
                console.log('innerFunc2 : ', this.lang);
            }

            innerFunc2();
        }

        innerFunc1();
    }

}

obj.outerFunc();

/*
outerFunc : English
innerFunc1 : Korean
innerFunc2 : Korean
*/
```
위의 코드를 보면, 당연히 결과 값은 `outerFunc : English innerFunc1 : English innerFunc2 : Engilsh`가 나올 것 같지만 그렇지 않다.
그 이유는 JavaScript에서 **내부함수의 호출 패턴을 따로 정해놓지 않았기 때문**이다.

즉, innerFunc1,2를 호출할 때는 내부 함수를 호출하는거지만 **일반 함수를 호출하는 것으로 판단하고 this를 전역객체에 바인딩 하는 것**이다.

내부 함수가 가지는 이러한 문제를 해결하기 위해선 **외부함수(부모함수)의 this를 특정 변수에 저장하고 이 변수에 접근하는 방법**이 있다.
보통 일반적으로 이 변수를 `that`으로 많이 지정한다.

```javascript
var lang = 'Korean';

var obj = {
    lang : 'English',
    outerFunc : function() {
        var that = this;
        console.log('outerFunc : ', this.lang);

        innerFunc1 = function() {
            console.log('innerFunc1 : ', that.lang);

            innerFunc2 = function() {
                console.log('innerFunc2 : ', that.lang);
            }

            innerFunc2();
        }

        innerFunc1();
    }
}

obj.outerFunc();

/*
outerFunc : English
innerFunc1 : English
innerFunc2 : Engilsh
*/
```

`outerFunc`의 this를 `that`이라는 변수에 저장하고 내부 함수인 **innerFunc1,2에서는 that으로 접근**하는 것을 확인할 수 있다.



## 생성자 함수를 호출할 때 this 바인딩



생성자 함수를 호출할 때 this는 일반 함수를 호출할 때와 다르게 **새로 생성되는 빈 객체에 바인딩이 된다.**

```javascript
var Developer = function(name) {
    this.name = name;
}

var confunc = new Developer('BKJang');

console.log(confunc.name); //BKJang
```

### new를 쓰지 않고 호출했을 경우

```javascript
var Developer = function(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

var confunc = Developer('BKJang', 25, 'male');

console.log(confunc); //undefined

console.log(window.name); //BKJang
console.log(window.age); //25
console.log(window.sex); //male
```

위의 코드 처럼 `new`를 쓰지 않고 생성자 함수를 호출했을 경우, `this`는 전역 객체에 바인딩이 되므로 코드의 에러가 발생할 수 있다.

이를 막기 위해 **강제로 인스턴스를 생성하는 패턴**이 있다.

```javascript
function Developer(name, age, sex) {
    if(!(this instanceof arguments.callee)) //this가 Developer의 인스턴스인지 확인
        return new Developer(name, age, sex); //인스턴스가 아니라면 생성

    this.name = name ? name : '';
    this.age = age ? age : 0;
    this.sex = sex ? sex : '';
}

var a = new Developer('BKJang1', 25, 'male');
var b = Developer('BKJang2', 26, 'female');

console.log(a); //Developer {name: "BKJang1", age: "25", sex: "male"}
console.log(b); //Developer {name: "BKJang2", age: "26", sex: "female"}
console.log(window.age); //undefined
```
위의 코드를 보면 **this가 해당 생성자 함수의 인스턴스인지 확인하고 아니라면 new로 Developer를 호출하여 반환하도록 했다.**

`callee`는 현재 실행되고 있는 함수 객체를 뜻한다. 즉, **함수 객체 자신을 가리키는 수단**이다.
(위의 코드에서 `arguments.callee`는 `Developer`로 바꿔도 무방하다.)

위의 패턴으로 코드를 짜면 `var b = Developer('BKJang2', '26', 'female');`라고 호출해도 window객체에 바인딩 되지 않고 해당 생성자 함수의 인스턴스에 바인딩되는 것을 볼 수 있다.



## call과 apply메서드의 사용을 통한 this 바인딩



이전에 봤던 경우들과 다르게 JavaScript 내부적으로 바인딩하는 방식도 있지만, 명시적으로 특정 객체에 바인딩할 수도 있다.

```javascript
var Developer = function(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

var obj = {};

Developer.apply(obj, ['BKJang', 25, 'male']);

console.log(obj); //{name: "BKJang", age: 25, sex: "male"}

Developer.call(obj, 'BKJang', 26, 'female');

console.log(obj); //{name: "BKJang", age: 26, sex: "female"}
```
위의 코드를 보면, 객체 리터럴 방식으로 생성한 빈 객체 obj에 Developer함수를 호출하면서 this를 바인딩하는 것이다.

`apply`메서드의 경우, Developer함수를 호출하면서 바인딩할 인자들을 **배열 방식**으로 넘기고 있다.
반면, `call`메서드의 경우, 배열 형태가 아니라 **각각을 넘겨주고 있다.**

`call`과 `apply`메서드의 장점은 this를 원하는 값으로 매핑해서 특정 함수나 메서드를 호출하는데 있다.
그 예가 arguments 객체(이전 포스팅에서 유사배열객체라고 했다.)에서 사용할 수 없는 배열 메서드들을 사용가능하도록 하는 것이다.

```javascript
function testArg() {
    console.log(arguments);
    console.log(arguments.join()); //join은 배열의 메서드
}

testArg(1, 2, 3);
/*
Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
Uncaught TypeError: arguments.join is not a function
*/
```
arguments와 같은 유사배열객체는 `join()`과 같은 배열의 메서드를 쓸 수 없다.
이에 따라 위의 코드에서 `console.log(arguments.join());`의 결과 값으로 에러가 나는 것을 볼 수 있다.

```javascript
function testArg() {
    console.log(arguments);
    var args = Array.prototype.slice.apply(arguments);
    console.log(args);
}

testArg(1, 2, 3);

/*
Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
(3) [1, 2, 3]
*/
```
위의 코드의 출력 값을 보면 `[1, 2, 3]`이라는 배열이 출력되는 것을 볼 수 있다.
즉, `apply`메서드를 통해 유사배열객체인 arguments객체에서 **마치 배열의 메서드가 있는 것 처럼 처리**할 수 있다.

> `slice(start, end)`메서드는 배열의 **start부터 end-1인덱스 까지**를 복사해 새로운 배열을 리턴한다.
> 단, `slice()`의 형태로 인덱스를 정하지 않고 사용할 경우, **전체 배열을 복사해 리턴한다.**

<br/>


#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)