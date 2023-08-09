# gradle tutorial

## Building Java Applications Sample

- https://docs.gradle.org/

### Create a project folder

- Gradle comes with a built-in task, called `init`, that initializes a new Gradle project in an empty folder. 
    The `init` task uses the (also built-in) `wrapper` task to create a Gradle wrapper script, `gradlew`.
- The first step is to create a folder for the new project and change directory into it.



### Run the init task

![image-20230804133837034](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230804133837034.png)



### `settings.gradle`

```groovy
rootProject.name = 'demo'
include('app')
```

- `rootProject.name` assigns a name to the build
    default behavior of naming the build after the directory it’s in.
- `include("app")` means the build consists of one subproject (app)
    `app` contains the actual code and build logi
    you can add another subprojects in `include(...)`
    `app` represents the java application -> configured in the `app/build.gradle`



### `app/build.gradle`

![image-20230804134353783](C:\Users\iui47\AppData\Roaming\Typora\typora-user-images\image-20230804134353783.png)

### Run the application

- `application` plugin 덕분에 명령창에서 바로 실행가능
    `run` task는 `app/build.gradle`의 `mainClass` 속성 클래스의 `main` 메소드를 실행하게 만든다

- 처음 `gradlew` 실행시 `~/.gradle/wrapper/dists`에 해당 `gradle`이 다운받아지는데 시간이 걸린다
    ```groovy
    $ ./gradlew run
    > Task :app:run
    ```



### Bundle the application

- `application` plugin은 모든의존성과 함께 bundle시켜준다

    ```groovy
    $ ./gradlew build
    ```

- 결과는 다음 두 파일을 생성한다  `app/build/distributions/app.tar` and `app/build/distributions/app.zip`.



### Publish a Build Scan

- The best way to learn more about what your build is doing behind the scenes, is to publish a [build scan](https://scans.gradle.com/). To do so, just run Gradle with the `--scan` flag.



### Summary

That’s it! You’ve now successfully configured and built a Java application project with Gradle. You’ve learned how to:

- Initialize a project that produces a Java application
- Run the build and view the test report
- Execute a Java application using the `run` task from the `application` plugin
- Bundle the application in an archive

