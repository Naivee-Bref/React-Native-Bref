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
│   ├── NewScene.js
│   ├── OriginalScene.js
│   ├── SettingsScene.js
│   ├── SitesScene.js
│   └── TimelineScene.js
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
  - NewScene.js: TODO
  - OriginalScene.js: TODO
  - SettingScene.js: TODO
  - SitesScene.js: TODO
  - TimelineScene.js: TODO
- Style:
  - style.js: TODO

### For developer:

---

Q: How to use **storage** component ?

A: In your page component, (like **NewScene.js**), import below components:

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
onSubmitEditing={(event) => {DiaryActions.createDiary(timeStamp, this.state.text)} }
```

---

Q: What can I do to a **Diary** item?

A: You can basically do *create*, *delete*, *modify*, *delete all* .

More specifically, here is the available methods:

- ​
```javascript
  createDiary(timeStamp, text, city, imageUrl, tag)
  //timeStamp: Date object
  //text: string
  //city: string
  //imageUrl: string
  //tag: Array[string]
```

- ​
```JavaScript
  deleteDiary(toDeleteDiary)
  //toDeleteDiary: Js obejct, use timeStamp to match
  //				must in format like :
  //        		toDeleteDiary = {timeStamp: a-date-object, ...}
```

- ​
```JavaScript
  editDiary(toEditDiary)
  //toEditDiary: Js object, use timeStamp to match
  //				must in format like:
  // 				toEditDiary = {timeStamp: a-date-object,
  //								text: a-string,
  //								city: a-string,
  //								imageUrl: a-string,
  //								tag: a-array-of-string}
```

- ​
```JavaScript
  deleteAllDiaries()
```

Note that all these methods must be called with prefix: ''**DiaryActions.** ''

---

Q: What's the limit of geocoding request?

A: The api supports 600 requests per minute and query up to 50 locations per request.