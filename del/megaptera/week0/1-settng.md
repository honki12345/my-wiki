---
layout  : wiki
title   : 1-setting
summary : 
date    : 2023-07-26 22:35:47 +0900
updated : 2023-07-26 22:35:47 +0900
tag     : megaptera week0
toc     : true
public  : true
parent  : [[/megaptera/week0]]
latex   : false
resource: 24B47207-1EE6-4AA1-9AAF-044FDF67C26E
---
* TOC
{:toc}

## note

#### brew의 필요성

- 의존성 설치는 brew만 사용하여 의존성을 한 곳에서 관리하는 습관이 필요

#### Github 연결

- SSH를 통한 Github 연결
https 연결 지양

#### CLI

- 명령어 수행은 반드시 CLI 환경에서 진행
GUI도구로 의도한 결과가 일어났는지 지속적인 확인

#### gradle

- `gradle` 폴더는 Gradle wrapper를 위한 파일들이 모여있다.
- `gradlew` 파일은 Gradle wrapper 스크립트를 실행할 수 있는 파일이다.
우리가 애플리케이션을 실행하거나 빌드, 테스트 등을 실행할 때 사용한다.
- `settings.gradle` 파일은 프로젝트 설정파일이다.
프로젝트 이름과 여러 프로젝트들이 있을 때 설정한다.
- `build.gradle`은 애플리케이션 빌드 스크립트 파일이다.
의존성 관리를 한다.
- `app` 폴더에 `src` 폴더와 `test` 폴더로 대칭되어 나누어져있다.
