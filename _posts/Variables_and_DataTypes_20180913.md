---
layout: post
title:  "[JavaScript] 변수와 자료형"
subtitle:   "[JavaScript] 변수와 자료형"
categories: JavaScript
---





![JavaScript](/assets/img/es5.png)


## 변수 선언(var)



자바스크립트는 `var`**를 사용해 변수를 선언**한다.

자바스크립트는 **동적 타입(dynamic typed)의 언어** 혹은 **느슨한 타입(loosely typed)**의 언어라고 한다.
var 변수에는 문자열, 숫자와 같은 데이터 이외에도 객체, 함수를 정의할 수 있다.
이 부분이 Java와 같이 int, String 변수의 타입이 있는 **정적 타입의 언어**와 다른 대표적인 부분이라고 볼 수 있다.

```sh
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

* **선언** : `var a;`에서 자바스크립트 엔진은 데이터의 공간을 만들고 그 공간에 a라는 이름을 붙인다. 이를 **선언**이라고 한다.

* **할당** : `var a = '';`에서 **a라는 변수에 ''를 할당한다**고 한다.

* **초기화** : 위와 같이 변수의 선언과 동시에 할당하는 과정을 **초기화**라고 한다.

추가적으로 var은 **함수형 스코프(function-scope)**이기 때문에 지역 변수의 선언은 함수 내에서만 의미가 있다.
이 부분은 차후 Hoisting과 관련하여 자세히 설명하도록 하겠다.

<br/>

## 자바스크립트의 자료형

#### 기본자료형

- - -

###### 숫자
Java에는 `int`,`long`,`float`,`double` 과 같이 여러 개의 숫자 타입이 존재한다. 이와 달리 자바스크립트는 하나의 숫자형만 존재한다.
자바스크립트에는 정수형이 따로 없고 실수형을 데이터를 처리한다.
Java에서의 `/`가 몫을 반환했다면 자바스크립트에서는 실수형 데이터를 반환한다.

###### 문자열
자바스크립트에서 문자열은 `''` 나 `""`로 표현한다.
또한 자바스크립트에서의 문자열은 배열처럼 index로 접근가능하고 첫번째 글자부터 0번째 요소이다.
하지만 문자열의 경우 한 번 할당된 이후에는 재할당이 불가능하다.
```sh
var str = 'Hello';
console.log(str[0]); //H

str[0] = 'h';
console.log(str); //Hello
```

###### Boolean
true와 false를 표현한다.

###### undefiend
변수를 선언하면 값이 할당되기 전까지 undefiend값이 할당된다.

###### null
undefined의 경우 자동으로 값이 할당되지만, null의 경우 개발자가 직접 할당해줘야한다.
객체가 없음을 뜻한다.

undefined와 null 모두 **값이 없음**을 뜻하지만, `===`로 비교해보면 false를 반환한다.
그 이유는, `==`연산자는 타입을 일치시킨 다음에 값을 비교하지만, `===`연산자는 타입 변환을 하지 않기 때문이다.
`===`연산자의 경우, 비교하는 값의 타입과 값이 모두 같아야 true를 반환한다.

```sh
var a;
var b = null;

console.log(a == b); //true
console.log(a === b); //false
```
<br/>

#### 참조 자료형(Object)

자바스크립트의 객체는 `key : value` 형태의 property를 저장하는 컨테이너이다.
자바스크립트 객체는 모두 **Object 객체를 상속**하고 있다.
또한, **객체의 property는 동적으로 생성하고 삭제 및 수정이 가능**하다.

```sh
var obj = { //obj 객체 생성
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

```sh
var obj2 = { //obj2 객체 생성
	stu1 : 'Jang'
    stu2 : 'Kim'
    stu3 : 'Kang'
}

console.log('stu1' in obj2); //true
console.log(hasOwnProperty('stu1')); //true

var prop;
for (prop in obj2) {
	console.log(prop, obj2[prop]);
    /* 출력
    stu1 Jang
    stu2 Kim
    stu3 Kang
    */
}
```

* * *

<br/>

#### Reference
- 인사이드 자바스크립트 (송형주, 고형준)

