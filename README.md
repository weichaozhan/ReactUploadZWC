[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=weichaozhan&repo=ReactUploadZWC&theme=onedark)](https://github.com/anuraghazra/github-readme-stats)

# React Upload Component
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/weichaozhan/ReactUploadZWC/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-upload-zwc.svg?style=flat)](https://www.npmjs.com/package/react-upload-zwc)

&middot; This is a file upload component for react.

&middot; Support Typescript

## Environment Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| IE11, Edge| last 2 versions| 44| last 2 versions |

## Installation

```bash
npm i -S react-upload-zwc
```

## Scripts

```bash
# Install dependencies
npm i

# Run demo
npm run start
```
## Online Demo

https://weichaozhan.github.io/ReactUploadZWC/demo/

## Example

http://localhost:3002/

## Usage

```js
import React from 'react';
import Upload from 'react-upload-zwc';

const { Dragger } = Upload;

React.render(
  <div>
    <Upload
      action="http://localhost:9001/api/upload"
      onChange={changeFiles}
      multiple={true}
    >
      上传文件
    </Upload>

    <Dragger
      width={300}
      height={300}
      action="http://localhost:9001/api/upload"
    >
      <p>
        拖拽文件
      </p>
    </Dragger>
  </div>,
  container
);
```

## API

### Upload props

|name|type|default| description|
|-----|---|--------|----|
|accept | string | - | Types for files to accept which is used to upload.See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept). |
|action | string&#124;((file: File[]) => Promise) | - | Address to upload. |
|className | string | - | Label component className. |
|method | 'post'&#124;'get' | 'post' | Request method. |
|directory | boolean | "span"| Can upload folders. |
|onChange | (file: File[] &#124; FileList &#124; null) => any | - | Emit function when upload file change. |
|style | CSSProperties | {} | Label component style |
|data | Object | - | Upload required additional parameters. |
|fileName | string | 'file' | Name for upload files. |
|multiple | boolean | false | Multiple files can be uploaded. |
|beforeUpload | (files: FileList &#124; File[] &#124; null) => (boolean &#124; Promise&lt;any&gt;) | - | Emit function before upload. |
|uploadSuccess | (...rest: any[]) => any | - | Triggered after successful upload. |
|uploadFailed | (...rest: any[]) => any | - | Triggered after upload failed. |
|disabled| boolean | false | If disabled |
|outterClassName | string | - | Outter wrapper. |
|innerClassName | string | - | Inner wrapper. |

### Dragger props

|name|type|default| description|
|-----|---|--------|----|
|height | number | 100 | Set height of dragger |
|width | number | 100 | Set width of dragger |

## License

React is [MIT licensed](./LICENSE).
