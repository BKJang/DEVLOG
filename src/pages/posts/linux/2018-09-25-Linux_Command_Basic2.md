---
layout: post
title:  "[Linux] 2-2. 리눅스의 기본 명령어 두번째"
date:   2018-09-25
description: "alias, cat, touch에 대해서"
tags:
- linux
draft: false
path: '/posts/basic-command2'
category: 'LINUX'
---

## alias



* **alias - 별칭을 지정한다.(ex. 단축키와 비슷하다 생각하면 편하다)**



![alias](/assets/img/linux_alias.png)



alias라는 명령어를 사용해서 현재 **숫자 '1'에 'pwd'**를 **숫자 '2'에 'ls -l'**을 별칭으로 정했다. 
즉, 'pwd' 대신에 숫자 1을 쓰면 되고, 'ls -l' 대신에 숫자 '2'를 쓰면 된다. 

이 alias라는 명령어로 정한 별칭은 시스템이 종료가 되면 자동으로 리셋이 된다.



## cat



* **cat - 텍스트 파일의 내용을 출력하는 명령어다.**



![cat1](/assets/img/linux_cat.png)



cat이라는 명령어를 통해 /cat/hello라는 파일의 내용을 출력해낸 것이다.

그리고 `cat /cat/hello > /testfile` 이라는 명령어를 통해서 원래 testfile의 내용을 hello 파일의 내용으로 변환시킬 수 있다.


또한 다음과 같이 cat을 입력하면 기존의 내용에 원하는 내용을 추가시킬 수 있다.




![cat2](/assets/img/linux_cat2.png)




`cat >> /cat/hello` 라고 입력하면 기존의 hello파일에 원하는 내용을 추가시켜 파일을 수정할 수 있다.

그리고 `ctrl + d`를 누르면 다시 원래 명령어를 입력할 수 있는 상태로 돌아온다.


cat을 이용하여 파일을 병합할 수도 있다.



![cat3](/assets/img/linux_cat3.png)




현재 위치 하위에 a라는 파일과 b라는 파일을 병합하여 c로 만들려고 한다면 `cat ./a ./b > ./c` 라고 입력하면 된다. 

위의 그림을 보면 파일 c가 a, b 두개의 파일의 용량이 **합쳐진만큼의 용량**을 가지는 것을 볼 수 있다.



## touch



* **touch - 빈 파일을 생성할 수 있다.**




![touch1](/assets/img/linux_touch.png)



**기존에 developer라는 디렉토리는 아무 파일도 없이 비어있었다.** 

그 이후 `touch`라는 명령어를 사용하여, 'Linux', 'JAVA', 'C'라는 파일을 생성을 했고 그 결과 3개의 파일이 developer디렉토리 안에 생성되었다.
그리고 `touch`는 빈 파일을 생성하는 명령어이기 때문에 할당된 **메모리의 양이 0인 것을 확인할 수 있다. **


그렇다면 위에서 소개한 cat을 이용해서 내용을 추가해본 후 변화를 살펴보자.



![touch1](/assets/img/linux_touch2.png)



cat을 이용해서 JAVA 파일에 내용을 추가한 결과 **용량이 증가한 것을 볼 수 있다.** 즉, touch로는 빈 파일만 생성할 수 있는 것이다.
