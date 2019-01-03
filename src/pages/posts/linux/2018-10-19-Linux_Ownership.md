---
layout: post
title:  "[Linux] 3. 리눅스의 소유권(Ownership)과 허가권(Permission)"
date:   2018-10-19
description: "chmod, chown에 대해서"
tags:
- linux
draft: false
path: '/posts/ownership-permission'
category: 'LINUX'
---

## 허가권(Permission)



`ls` 명령어를 실행해서 파일과 디렉토리의 목록을 보면 앞에 다음과 같이 나타나는 부분이 있을 것이다. 이것을 리눅스에서는 **허가권(Permission)이라고 부른다.**



![cal](/assets/img/linux_perm1.png)



* `-rw-r--r--` : 파일(**앞이 -라면 파일**)
* `drwxr-xr-x` : 디렉토리(**앞이 d라면 디렉토리**)

### rwx란?

![cal](/assets/img/linux_rwx.png)



> * **r** : read(읽기)
> * **w** : write(쓰기)
> * **x** : execute(실행, 접근)

#### r - read(읽기)

- **파일에서의 'r'의 의미** : 파일의 내용을 읽어들이는 명령어들과 관련이 있다.
- **디렉토리에서의 'r'의 의미** : 디렉토리 내용을 읽어들이는 것과 관련있다.(ls)

#### w - write(쓰기)

- **파일에서의 'w의 의미** : 내용을 수정, 변경하는 명령어들과 관련이 있다.
- **디렉토리에서의 'w'의 의미** : 디렉토리 및 그 내부의 생성 및 삭제와 관려이 있다.

#### x - execute(실행, 접근)

- **파일에서 'x'의 의미** : x가 있으면 실행파일, 없으면 문서파일, 접근 권한을 포함한다.
- **디렉토리에서 'x'의 의미** : 접근 권한의 여부



![cal](/assets/img/linux_rwx2.png)



> **접근**을 할 수 있어야 파일 및 디렉토리를 **읽을 수 있고,** 읽을 수 있어야 **수정하거나, 삭제**할 수 있다. 즉, 접근 권한이 보장이 되어야 한다.



## chmod



* **chmod - 허가권 설정(사용자 권한 : w / 그룹의 권한 : r / 그외 사용자 : o)**

### 1. numeric method

`> chmod 461 file/directory`<br/> 
(4 : r / 6 : r+w / 1 : x)

> 사용자에게 읽기 권한 부여 / 그룹에 읽고 쓰기 권한 부여 / 그 외 사용자에게 접근권한 부여



ex) test파일에 관하여 사용자, 그룹, 그 외 사용자 모두에게 일체의 권한을 주지 않겠다.

![cal](/assets/img/linux_chmod1.png)



### 2. symbolic method

`> chmod g+r file/directory`<br/>
(g : group / r : read)

> 그룹에 읽기 권한 부여



ex) 그룹에 읽기 권한과 쓰기 권한을 부여하겠다.

![cal](/assets/img/linux_symbolic.png)



### numeric method와 symbolic method 문제

1. `/a/`라는 디렉토리를 생성한다.
2. `/a/testing`이라는 파일을 생성한다.
3. `rw-r----x`로 허가권을 변경한다.(numeric method를 이용하여)
4. `r--rwxrw-`로 허가권을 변경한다.(symboilic method를 이용하여)



![cal](/assets/img/linux_chmod2.png)



`rw-r----x` : **rw-[6] / r--[4] / --x[1]**
> owner(user) [읽기, 쓰기 권한 부여] / group [읽기 권한 부여] / other [접근 권한 부여]

`r--rwsrw-` : **r--[u-w] / rws[g+wx] / rw-[o+rw-x]**
> owner(user) [읽기 권한 부여] / group [읽기,쓰기,접근 권한 부여] / other [읽기, 쓰기 권한 부여]



## 소유권(Ownership)



`ls` 명령어를 실행했을 때 표시된 이 부분을 보고 리눅스에서는 소유권(Permission)이라고 부른다.



![cal](/assets/img/linux_owner1.png)



**앞 부분의 root가 소유자**, **뒤의 root가 소유그룹**이다.



## chown



* **chown - 소유자 및 소유그룹 설정**



![cal](/assets/img/linux_chown.png)



1. **소유자만 변경하고 싶을 때 (소유자 root를 tcpdump로 변경)**<br/>
`> chown tcpdump /a/testing`

2. **소유자와 소유그룹 모두 변경하고 싶을 때 (소유자를 root로 소유그룹을 test로 변경)**<br/>
`> chown root:test /a/testing`

3. **소유그룹만 변경하고 싶을 때 (소유그룹 test를 root로 변경)**<br/>
`> chown .root /a/testing`



소유그룹만 변경하고 싶을 때는 1번 예제에서 명령어를 `chgrp`로만 변경하여 사용하여도 무방하다. 하지만, `chown`을 주로 쓰기 때문에 3번과 같이 써도 된다.