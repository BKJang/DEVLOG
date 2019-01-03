---
layout: post
title:  "[Linux] 5. 권한 자동 설정(UMASK)"
date:   2018-11-08
description: "UMASK에 대해서"
tags:
- linux
draft: false
path: '/posts/umask'
category: 'LINUX'
---

## UMASK



권한을 설정할 때, 수동적으로 권한을 주지 않고 **파일이나 디렉토리가 생성됨과 동시에 지정된 권한이 주어지도록** 하는데 이를 `UMASK`라고 한다.

> `umask [바꾸고자하는 umask 값]`



![SetUID](/assets/img/linux_umask1.png)



```sh
if (permission>750){
    umask = 022
}else{
    umask = 002
}
```
위의 흐름으로 umask가 결정된다.

허가원이 몇이냐에 따라 umask의 값이 달라지도록 Linux상에서 제공이 되고 있는데, 이는 반대로 생각하면 **umask값에 따라 파일이나 디렉토리의 허가권이 달라지도록 제공**되고 있다는 것을 의미하기도 한다.



## UMASK 값은 어떤 방식으로 달라지는가?



![SetUID](/assets/img/linux_umask2.png)



파일의 Permission(허가권)의 값은 최대 **666**이고, 디렉토리의 Permission의 값은 최대 **777**이다. **여기서 UMASK값을 뺀 값이 해당 파일의 허가권(Permission)이 되는 것**이다.

예를 들어, a라는 파일이 **UMASK값이 022로 설정이 되어있다면 그 파일의 허가권은 644가 되는 것**이다. 이처럼 UMASK값을 통해 파일이나 디렉토리가 생성될 때, 설정해둔 상황에 따라 다른 허가권을 줄 수가 있는 것이다.

다음 그림을 보면 쉽게 이해할 수 있을 것이다.



![SetUID](/assets/img/linux_umask3.png)



위의 그림은 **UMASK를 통해 파일과 디렉토리의 허가권을 설정하는 과정**이고, 

밑의 그림은 **디렉토리와 파일이 허가권(755, 664)를 갖기 위해 UMASK 값을 결정하는 과정**이다.



> UMASK를 통해 **자동으로 파일과 디렉토리의 허가권을 결정**할 수 있다는 장점이 있지만, 그 장점만큼 **관리자의 입장에서 UMASK를 결정하는 것은 중요**하다. <br/> 왜냐하면 권한이 어떻게 설정되느냐가 서버의 보안에 큰 영향을 미치기 때문이다.