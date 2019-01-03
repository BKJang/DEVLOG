---
layout: post
title:  "[Linux] 4. 리눅스의 특수 권한"
date:   2018-10-30
description: "SetUID, SetGid, Sticky bit에 대해서"
tags:
- linux
draft: false
path: '/posts/special-autority'
category: 'LINUX'
---

## SetUID, SetGID



SetUID의 경우 사용자가 사용을 할 때만, **소유자의 권한**으로 파일을 실행시키고 SetGID의 경우 사용자가 사용을 할 때만, **그룹의 권한**으로 파일을 실행한다.

> 기존의 허가권 앞에 **4를 [SetUID]**, 기존의 허가권 앞에 **2를 [SetGID]** 붙인다)



![SetUID](/assets/img/linux_setUID.png)



기존에 x가 없으면 `S(대문자)`, 있으면 `s(소문자)`로 표시된다.

SetGID도 같은 방식으로 작업을 하면 된다.

그렇다면 기존에 줬던 이 특수권한을 없애려면 어떻게 해야할까?<br/>
그냥 단순한게 허가권을 chmod명령어를 이용해 numeric method를 쓰면 없어지지 않는다.<br/>
**이 특수권한을 없애려면 symbolic method를 사용하여 없애야 한다.**



* 디렉토리에서 SetUID나 SetGID 권한을 뺄 때

![SetUID](/assets/img/linux_SetGID,UID.png)



1번과 2번의 경우를 비교해보면 **numeric method**와 **symbolic method**를 쓸 때의 차이를 쉽게 알 수 있다.



## SetUID 권한의 중요성



SetUID 권한은 쉽게 말해, **사용자에게 관리자의 권한을 파일이 실행될동안 빌려준다는 것**을 의미한다. 이 부분이 굉장히 중요하고 무서운 부분이다.

왜냐하면, 이러한 관리자의 권한이 적용된다는 점을 노려 Attacker(해커)가 서버에 침입했을 때, **표적이 될 수 있는 모든 파일이 이 SetUID가 적용된 파일이기 때문**이다.

그렇다면, 이 SetUID가 적용된 파일을 관리자가 알 수 있어야 하는데 어떻게 알 수 있을까? 

여기선 find 명령어를 사용하면 된다.

![perm](/assets/img/linux_perm.png)



이렇게 `-perm`옵션(permission)을 사용하여 허가권이 **4000이상**인 모든 파일을 찾아주는 것이다.

그렇다면 이 파일들을 Attacker가 훼손하지 못하도록 하기 위해서는 어떻게 해야할까?

비밀번호를 변경할 때 사용되는 `passwd`라는 명령어를 예로 들어보자.

**각각의 허가권을 실행파일에 적용했을 때, 허가권을 4750을 주면 필요한 권한을 가지되, 사용자 입장에서는 사용할 수 없게 된다.**

물론, 각각의 파일마다 권한을 다르게 줘야하는건 당연한 것이고, passwd는 사용자 입장에서 본인의 계정 암호 변경이 가능해야 하기 때문에 허용이 되도록 설정하는 것이 맞다.<br/>
`passwd`는 하나의 예시일뿐이니 혼돈하는 일이 없길 바란다.



![perm](/assets/img/linux_4750.png)



## Sticky bit



Sticky bit가 설정된 디렉토리에는 누구든 접근가능하고, 파일을 생성해낼 수 있다.<br/> 하지만 생성된 파일을 **삭제시에는 소유자(파일 생성자)와 관리자만 지울 수 있게 된다.**<br/>
다른 사용자는 **자신의 소유가 아닌 파일을 삭제할 수 없다.**

root가 교수님이고 a, b(a, b는 사용자 계정)가 학생이라고 가정을 해보자.



1. **교수님이 `/professor/test/`에 testing이라는 숙제파일을 올리라고 지시를 했다.**



![perm](/assets/img/linux_Stickybit1.png)



2. **a는 성실한 학생이라 올렸는데 b는 a가 숙제를 올리면 그 숙제를 삭제해버린다.**



![perm](/assets/img/linux_Stickybit2.png)

![perm](/assets/img/linux_Stickybit3.png)



위의 예제를 보면, a가 만든 testing이라는 파일을 b의 계정으로 로그인을 해서 삭제가 된다. 사실상 말이 안되는 경우이다.



3. **그래서 a는 교수님에게 말하고 교수님은 권한을 재설정한다.(Sticky bit)**



![perm](/assets/img/linux_Stickybit4.png)



a의 말을 듣고 교수님은 관리자(root) 계정으로 `/professor/test/` 디렉토리에 **Sticky bit를 적용해 권한을 재설정**한다.



4. **a는 다시 숙제를 서버에 올리고, b는 다시 삭제하려하지만 실패한다.**



![perm](/assets/img/linux_Stickybit5.png)

![perm](/assets/img/linux_Stickybit6.png)



Sticky bit가 적용된 후 b에서 a의 파일을 제거하려고 했을 때 **명령을 허용하지 않는 것**을 볼 수 있다.

> 이처럼 Sticky bit가 적용된 디렉토리내에 **파일을 생성하는 것은 사용자 누구나** 가능하지만, **삭제는 생성자 본인과 관리자만 가능**하게 된다.