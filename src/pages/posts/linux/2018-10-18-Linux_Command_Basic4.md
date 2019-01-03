---
layout: post
title:  "[Linux] 2-4. 리눅스의 기본 명령어 네번째"
date:   2018-10-18
description: "cal, date, rdate, find, shutdown에 대해서"
tags:
- linux
draft: false
path: '/posts/basic-command4'
category: 'LINUX'
---

## cal



* **cal- 달력을 출력해준다.**



![cal](/assets/img/linux_cal.png)



## date, rdate



* **date- 현재의 시간과 날짜를 확인할 수 있다.**
* **tail - 타임서버에서 시간 정보를 얻고, 그 정보를 가지고 시간정보를 변경한다.**

### rdate 옵션

**1. -p :** 타임서버의 현재시간을 확인한다.

**2. -s :** HOST 시간 타임서버와 동기화한다.



![date](/assets/img/linux_date.png)



1. rdate에 옵션 `-p`를 활용하면 현재 서버의 시간을 보여준다. 
2. 그리고 `-s` 옵션을 사용하면 HOST의 시간과 서버의 시간을 동기화 시켜준다. 
3. 그 결과, 마지막 명령어인 date를 살펴보면 **서버의 시간과 동기화** 된 것을 볼 수 있다.



## find



* **find- 파일 및 디렉토리를 검색한다. (Windows에서 ctrl+f키를 누르면 뜨는 찾아보기의 기능과 같다.)**

### 옵션

**1. -name :** 파일명에 해당하는 파일을 찾아준다. (`find [경로] -name [파일명]`)



![find](/assets/img/linux_find_name.png)



**2. -type d/f :** -d를 입력하면 디렉토리를, f를 입력하면 파일을 출력해준다. (`find [경로] d || f`) 



![find](/assets/img/linux_find_type.png)



**3. -newer :** 당 파일을 이후에 작성된 파일을 찾아준다. (`find [경로] -newer [파일명]`)



![find](/assets/img/linux_find_newer.png)



**4. -exec :** 실행명령에 따라서 찾은 파일을 처리한다. (`find -name [파일명] -exec [실행 명령]`)



![find](/assets/img/linux_find_exec.png)



## shutdown



* **shutdown - 옵션에 따라 종료 및 재부팅을 명령할 수 있다.**

### 옵션

**1. -h :** 시스템 종료를 명령하는 옵션

**2. -r :** 시스템 재부팅을 명령하는 옵션



![shutdown](/assets/img/linux_shutdown.png)



`-h` 옵션을 실행시킨 결과이고 ctrl+c를 입력하면 취소가 된다.

그리고 재부팅도 같은 방식으로 진행할 수 있고, **종료하는 메시지는 이 서버를 이용하는 모든 사용자에게 전달**되게 되어 있다. 



![shutdown](/assets/img/linux_shutdown_메시지.png)



이처럼 메시지가 이 서버를 사용하고 있는 모든 사용자에게 전송이 된다. 
이또한 `ctrl+c`를 하면 명령을 취소할 수 있다.
