##  为什么使用React Native

### 团队方面：

- 团队中没有人有iOS开发经验，在工具链的选择上没有偏好
- 没有人会Swift或者Object-C语言，大家都没有时间（懒）另学一门新的语言

### 敏捷开发方面：

- 项目上手快：RN使用JS作为主要开发语言，不必新学专用iOS开发的语言，开箱即用，易于上手，方便快速实现项目想法
- 开发周期短：考虑到Bref主要工作在UI/UX方面，没有很复杂的底层逻辑，在面对新的需求时，RN完全可以胜任
- 产品迭代快：JS相比于Object-C，Swift有更好的代码可读性，配合VCS如Git，团队内可以更快交流想法，进行新特性实验，更快的更新迭代
- 测试驱动：RN提供了完整的测试模块，可以方便地进行测试，甚至进一步采用测试驱动的开发模式

### 软件工程方面：

- 可移植性：RN顶层用JS编写代码逻辑，底层分别用Xcode Compiler（iOS）和Java（Android）来编译代码。可以在只做少量编辑的情况下，共用一套顶层代码，方便实现应用的跨平台移植
- 模块化：RN中的JS采用面向对象的方式组织代码逻辑。通过类的继承，可以以模块化的方式设计代码结构，实现代码的高复用率。并且测试通过的模块可以作为构件，采用基于构件的开发模式，降低项目Bug出现的几率
- 构件库：我们的开发模式有点偏向基于构件的开发（感谢RN社区提供了丰富的第三方构件），通过npm（node package manager)，可以方便地从开发者社区获得所需的构件，然后进行一些微调或封装，就可以应用到项目的代码中，非常方便快捷
- 文档：RN由Facebook开发和维护，API文档非常全面和细致，方便在开发的时候查询
- 开发者社区：RN官方社区，Github，RN中国官网社区这些开发者社区都非常活跃，一些常见的问题都有详细的解决方案

### 框架本身：

- RN用类似HTML的形式组织UI视图，通过StyleSheet（样式表）和Flexbox可以方便地设计排版
- APP本身主要存储用户的历史日记数据，RN提供了[AsyncStorage](http://facebook.github.io/react-native/releases/0.34/docs/asyncstorage.html) （异步存储）机制来提供本地存储服务
- APP的特性（feature）需要有拍照，选取照片，记录地理信息，地图视图等等，RN都提供了原生的支持：
  - 拍照：[CameraRoll](http://facebook.github.io/react-native/releases/0.34/docs/cameraroll.html)
  - 选取照片：[ImagePickerIOS](http://facebook.github.io/react-native/releases/0.34/docs/imagepickerios.html)
  - 记录地理信息：[Geolocation](http://facebook.github.io/react-native/releases/0.34/docs/geolocation.html)
  - 地图视图：[MapView](http://facebook.github.io/react-native/releases/0.34/docs/mapview.html)
- 对于非原生的特性，社区都提供了文档齐全的构件，如安全性验证方面的TouchID:
  - TouchID: [Github React Native Touch ID](https://github.com/naoufal/react-native-touch-id)

### 在线演示：

- [Facebook React Native UIExplorer](http://www.reactnative.com/uiexplorer/)
- [React Native Playground](https://rnplay.org/)

---

Author: Soros

2016-10-12