# JS Directory Description

---

### Directory Structure

```
js
├── README.md
├── actions.js
├── component
│   ├── Location.js
│   ├── Photo.js
│   └── Storage.js
├── config
│   └── config.js
├── data
│   └── DiaryItem.js
├── page
│   ├── OriginalScene.js
│   ├── ProfileScene.js
│   ├── ReviewScene.js
│   └── TodayScene.js
└── style
	└── style.js
```
### Sub-directory / File Description

- action.js: Provide public action method on **Diary** class, based on **Reflux**, being used to control data flow.
- component:
  - Location.js: TODO
  - Photo.js: TODO
  - Storage.js: Cooperate with **action.js**, be used to store diary data.
- config:
  - config.js: TODO
- data:
  - DiaryItem.js: **Diary** class definition, provide methods to create a diary and modify a diary
- page:
  - OriginalScene.js: TODO
  - ProfileScene.js: TODO
  - ReviewScene.js: TODO
  - TodayScene.js: TODO
- Style:
  - style.js: TODO

### For developer:

Q: How to use **storage** component ?

A: In your page component, (like **TodayScene.js**), import below components:

```javascript
import Reflux from 'reflux';
import diaryStore from './../component/Storage';
import DiaryActions from './../actions';
```

then in your component definition, add this line:

```javascript
mixins =  [Reflux.connect(diaryStore, 'store')];
```

then, when you need to store something, simply call like below code:

```javascript
onSubmitEditing={(timeStamp, text) => {DiaryActions.createDiary(timeStamp, this.state.text)} }
```