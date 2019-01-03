---
layout: post
title:  "[Linux] 2-3. 리눅스의 기본 명령어 세번째"
date:   2018-09-27
description: "head, tail, more, nl에 대해서"
tags:
- linux
draft: false
path: '/posts/basic-command3'
category: 'LINUX'
---

## head



* **head - 파일의 내용을 위에서부터 10줄을 출력해낸다(기본 값이 10줄)**



![head](/assets/img/linux_head.png)



위에서부터 3줄만 출력하고 싶다면 `head -3 file명` 이런 식으로 명령어를 입력하면 된다.

### 옵션

* **-c :** 파일의 해당 용량만큼 위에서부터 출력해준다.(`head -c 300 test`)



## tail



* **tail - 파일의 내용을 아래에서부터 10줄을 출력해낸다(기본 값이 10줄)**



![tail](/assets/img/linux_tail.png)



아래에서부터 4줄만 출력하고 싶다면 `tail -4 file명` 이런 식으로 명령어를 입력하면 된다.

### 옵션

**1. -c :** 파일의 해당 용량만큼 아래서부터 출력해준다.(`tail -c 300 test`)

**2. -f :** 로그파일의 실시간 모니터링을 지원한다. 굉장히 많이 쓰이는 옵션이다.(`tail -f /log/test`)



## more



* **more - 내용이 많은 파일을 화면단위로 끊어 보여준다.**



![more](/assets/img/linux_more.png)
 


**화면에서 보여주고 있는 만큼의 내용을 %로 표현하여 보여준다.**

개인적인 생각이지만 more보다는 head나 tail을 사용할 경우가 더 많은 것 같다. 



## nl



* **nl - 파일의 내용을 출력했을 때 몇번 째 줄인지 각각의 줄마다 표시를 해준다.(number line)**



![nl](/assets/img/linux_nl1.png)



위의 그림을 보면 밑의 10이 잘려있는 것을 볼 수 있다. 각 줄의 라인넘버를 표시해주면서 파일의 **모든 내용을** 출력해준다.

그렇다면, 위에서부터 5줄만 보면서 각각의 줄에 라인넘버를 표시해주고 싶다면 어떻게 하면 될까?



![nl2](/assets/img/linux_nl2.png)



**`|(shift+\\)`을 쓰면 두개의 명령어를 같이 쓸 수 있다.**
단, '|'뒤의 **nl 명령어가 먼저 적용이 되고 앞의 head 명령어가 실행**된다.


**즉, testing파일의 모든 내용에 라인넘버를 붙이고 나서 위에서부터 5줄을 자른 것이라고 생각하면 된다.**
