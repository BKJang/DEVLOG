---
layout: post
title:  "[JavaScript] 2. 변수와 자료형"
date:   2018-09-13
description: "변수와 자료형에 대해서"
tags:
- javascript
draft: false
path: '/posts/datatype-of-js'
category: 'ES5'
---

## 변수 선언(var)

자바스크립트는 `var`**를 사용해 변수를 선언**한다.

자바스크립트는 **동적 타입(dynamic typed)의 언어** 혹은 **느슨한 타입(loosely typed)**의 언어라고 한다.
var 변수에는 문자열, 숫자와 같은 데이터 이외에도 객체, 함수를 정의할 수 있다.
이 부분이 Java와 같이 int, String 변수의 타입이 있는 **정적 타입의 언어**와 다른 대표적인 부분이라고 볼 수 있다.

```javascript
var a = ''; //문자열
var b = 0; //숫자
var c = true; //boolean
var d = null; //null
var e = undefined; //undefined
var f = []; //배열
var g = {}; //객체
var h = function(){}; //함수
```

위의 코드를 보면 var에 **여러가지 타입의 변수를 할당**하는 것을 볼 수 있다.

또한 자바스크립트는 변수를 선언할 때, 3가지의 과정을 거친다.

* **선언** : `var a;`에서 자바스크립트 엔진은 변수를 실행 컨텍스트의 변수 객체에 등록 한다. 이를 **선언**이라고 한다.

* **초기화** : 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.

* **할당** : `var a = '';`에서 **a라는 변수에 ''를 할당한다**고 한다.


추가적으로 var은 **함수형 스코프(function-scope)**이기 때문에 지역 변수의 선언은 함수 내에서만 의미가 있다.

이쯤에서 **변수의 호이스팅(Hositing)** 의 개념을 알고 넘어갈 필요가 있다.
자바스크립트는 변수의 선언부를 해당 스코프의 가장 위로 끌어올린다.
코드로 살펴보자.

```javascript
console.log(x);

var x = 1000;

console.log(x);

/*
undefined
1000
*/
```
위의 출력 결과를 보면 가장 첫 줄의 `console.log(x)`는 에러가 나야할 것 같지만, undefined로 출력이 된다.
이는 자바스크립트에서의 호이스팅이라는 개념으로 인해 변수의 선언부가 최상위로 끌어올려져서 나타나는 현상이다.
즉, 자바스크립트에서는 위와 같은 코드를 다음과 같이 해석한다.

```javascript
var x;

console.log(x);

x = 1000;

console.log(x);

```



## 자바스크립트의 자료형

### 기본자료형

##### 숫자
Java에는 `int`,`long`,`float`,`double` 과 같이 여러 개의 숫자 타입이 존재한다. 이와 달리 자바스크립트는 하나의 숫자형만 존재한다.
자바스크립트에는 정수형이 따로 없고 실수형을 데이터를 처리한다.
Java에서의 `/`가 몫을 반환했다면 자바스크립트에서는 실수형 데이터를 반환한다.

##### 문자열
자바스크립트에서 문자열은 `''` 나 `""`로 표현한다.
또한 자바스크립트에서의 문자열은 배열처럼 index로 접근가능하고 첫번째 글자부터 0번째 요소이다.
하지만 문자열의 경우 한 번 할당된 이후에는 재할당이 불가능하다.
```javascript
var str = 'Hello';
console.log(str[0]); //H

str[0] = 'h';
console.log(str); //Hello
```

##### Boolean
true와 false를 표현한다.

##### undefiend
변수를 선언하면 값이 할당되기 전까지 undefiend값이 할당된다.

##### null
undefined의 경우 자동으로 값이 할당되지만, null의 경우 개발자가 직접 할당해줘야한다.
객체가 없음을 뜻한다.

undefined와 null 모두 **값이 없음**을 뜻하지만, `===`로 비교해보면 false를 반환한다.
그 이유는, `==`연산자는 타입을 일치시킨 다음에 값을 비교하지만, `===`연산자는 타입 변환을 하지 않기 때문이다.
`===`연산자의 경우, 비교하는 값의 타입과 값이 모두 같아야 true를 반환한다.

```javascript
var a;
var b = null;

console.log(a == b); //true
console.log(a === b); //false
```


### 참조 자료형(Object)

자바스크립트의 객체는 `key : value` 형태의 property를 저장하는 컨테이너이다.
자바스크립트 객체는 모두 **Object 객체를 상속**하고 있다.
또한, **객체의 property는 동적으로 생성하고 삭제 및 수정이 가능**하다.

```javascript
var obj = {
    stu1 : 'Jang'
    stu2 : 'Kim'
    stu3 : 'Kang'
};

//객체의 property 동적 생성
obj.stu4 : 'Cho';
console.log(obj.stu4); //Cho

//객체의 property 수정
obj.stu1 : 'Park';
console.log(obj.stu1) //Park

//객체의 property 삭제
delete obj.stu4;
console.log(obj.stu4); //undefined

//객체 삭제 시도
delete obj; //delete 연산자는 객체의 property만 삭제 가능
console.log(obj.stu2); //Kim

```


추가적으로 객체에 접근하는 방법에 대해 보면 다음과 같다.

* `in` 연산자 혹은 `hasOwnProperty`메서드를 통해서 특정 프로퍼티 이름이 객체에 존재하는지 알 수 있다.
* `for in` 문을 통해 객체에 대해 loop를 돌릴 수 있다.

```javascript
var obj2 = {
	stu1 : 'Jang'
    stu2 : 'Kim'
    stu3 : 'Kang'
}

console.log('stu1' in obj2); //true
console.log(hasOwnProperty('stu1')); //true

var prop;
for (prop in obj2) {
	console.log(prop, obj2[prop]);
}

/* 출력
    stu1 Jang
    stu2 Kim
    stu3 Kang
*/
```


## Call By Reference



기본 타입과 참조 타입의 경우 함수 호출 방식에 차이가 있다.
기본 타입의 경우 값에 의한 호출 방식(Call By Value)으로 동작하고, 참조 타입의 경우 참조에 의한 호출 방식(Call By Reference)으로 동작한다.
코드로 차이를 살펴보자.

```javascript
var num = 100;
var obj1 = { value : 100 };

var callFunc = function(num, obj){
    num = 50;
    obj.value = 50;

    console.log(num);
    console.log(obj);
}

callFunc(num, obj1);

console.log(num);
console.log(obj1);

/*
50
{ value : 50 }
100
{ value : 50 }
*/
```
코드를 보면 callFunc 함수를 호출한 이후, 기본 타입인 num변수는 값이 변하지 않지만, 참조 타입인 obj1객체의 value 프로퍼티의 경우에는 값이 변하는 것을 볼 수 있다.

그 이유는 객체의 경우, callFunc 함수의 파라미터로 obj1이 전달될 때 obj1이 참조하는 객체의 위치 값이 그대로 전달되기 때문이다.

<br/>


#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)

