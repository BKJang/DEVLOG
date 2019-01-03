---
layout: post
title:  "[Linux] 6. 압축하기"
date:   2018-11-09
description: "gzip, bzip2, tar에 대해서"
tags:
- linux
draft: false
path: '/posts/compression'
category: 'LINUX'
---

## gzip, bzip2



* **gzip- 해당 파일을 gz형식으로 압축한다.**
* **bzip2- 해당 파일을 bz2형식으로 압축한다.**
 


1. 용량이 줄어든다.

2. 원본유지가 안된다.

3. 단일 파일만 압축할 수 있다.



![linux](/assets/img/linux_gzip.png)




`gzip 파일명`을 입력하면 압축이 되고, `-d` 옵션을 써서 `gzip -d 파일명`을 입력하면 압축이 다시 풀린다.



![linux](/assets/img/linux_bzip2.png)



`bzip2` 역시 `gzip`과 같은 방식으로 진행을 하면 된다.

위 그림을 보면 **`bzip2` 방식과 `gzip` 방식의 압축의 효율을 비교해보면 `bzip2`방식이 더 효율이 좋은 것을 볼 수 있다.**    

그렇다면, **여러 개의 파일을 하나로 압축**하려면 어떻게 해야 할까?

위에서 설명했다시피, `gzip`과 `bzip2`는 단일 파일만 압축이 가능하다.

그래서 여러개의 파일을 하나로 압축하고 싶다면 `tar`라는 명령어를 사용한다.

## tar



* **tar- 해당 파일을 보관파일로 바꿔준다.**



1. 용량이 늘어난다

2. 원본유지가 가능하다.

3. 다중파일이 가능하다.

### 옵션

**1. c :** 새로운 보관파일 생성한다.

**2. x :** 보관파일을 풀어준다.

**3. v :** 파일이 묶이거나 풀리는 과정을 보여준다.

**4. f :** 보관 파일명을 지정해준다.

**5. z :** gzip방식 추가

**6. j :** bzip2 방식 추가



- 단일 파일로 보관하기

![linux](/assets/img/linux_tar1.png)



- 보관파일 내의 내용 보기

![linux](/assets/img/linux_tar2.png)



- 보관파일 풀기

![linux](/assets/img/linux_tar3.png)



- 다중 파일을 하나의 파일로 보관 후 이를 압축하기

![linux](/assets/img/linux_tar4.png)

tar로 묶은 보관 파일을 gzip으로 압축해서 용량을 줄이는 것이다.

여기서 살펴볼 것 중의 하나는 tar의 기본용량은 단일 파일이든 다중 파일이든 기본 용량이 **10240byte**기 때문에 **이를 넘지 않는 이상 파일 용량은 동일**하다.


그러나 위의 방식을 직접 해보면 알겠지만 보관 파일로 만든 뒤 압축을 진행하는 방식이다.

**이를 더 간단히 하기 위해서 z 옵션과 j 옵션을 사용하는 것**이다.



![linux](/assets/img/linux_tar5.png)

![linux](/assets/img/linux_tar6.png)

![linux](/assets/img/linux_tar7.png)



위의 방식은 **`bzip2`방식의 옵션을 사용하여 압축한 것이고 이를 `gzip`방식으로 사용하고 싶다면 `j` 옵션 대신에 `z`방식을 사용하면 된다**.

그리고 압축을 풀고싶다면 같은 방식으로 `xvfj` 혹은, `xvfz` 옵션을 사용하여 풀면 된다.
