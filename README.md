# Spine Viewer

一个用于在网页中显示 Spine 动画的自定义 HTML 元素，基于 PIXI.js 构建。

注：支持 Spine 4.1 及以下版本，4.2 暂不支持。

## 依赖

确保你的项目中已安装以下依赖：

```bash
npm install pixi.js@7.4.3 pixi-spine
```

## 安装

```bash
npm install @alphardex/spine-viewer
```

## 在线体验

地址：https://spine-viewer-alphardex.netlify.app/

## 使用方法

### 1. 导入组件

```javascript
import "@alphardex/spine-viewer";
```

### 2. 在 HTML 中使用

```html
<spine-viewer
  src="/path/to/your/animation.skel"
  animation-name="idle"
  scale="0.3"
>
</spine-viewer>
```

### 3. 通过 JavaScript 控制

```javascript
const viewer = document.querySelector("spine-viewer");

// 设置动画
viewer.setAnimation("walk", true);

// 设置缩放
viewer.setScale(0.8);

// 获取所有动画列表
const animations = viewer.getAnimations();
console.log("可用动画:", animations);
```

## 属性

| 属性             | 类型   | 默认值 | 描述                           |
| ---------------- | ------ | ------ | ------------------------------ |
| `src`            | string | -      | Spine .skel 文件的路径（必需） |
| `animation-name` | string | 'idle' | 要播放的动画名称               |
| `scale`          | number | 0.3    | 缩放比例                       |

## API 方法

### `setAnimation(animationName, loop)`

设置要播放的动画。

- `animationName` (string): 动画名称
- `loop` (boolean): 是否循环播放，默认为 true

### `getAnimations()`

返回所有可用的动画名称数组。

### `setScale(scale)`

设置动画的缩放比例。

- `scale` (number): 缩放比例

### `renderSpine(options)`

切换到新的 Spine 动画文件。

- `options` (object): 配置选项
  - `src` (string): 新的 Spine .skel 文件路径
  - `animationName` (string, 可选): 要播放的动画名称，如果不指定则自动选择第一个动画

```javascript
// 切换到新的Spine文件
viewer.renderSpine({
  src: "/path/to/new-character.skel",
  animationName: "idle",
});

// 只指定文件路径，自动选择动画
viewer.renderSpine({
  src: "/path/to/new-character.skel",
});
```

## 样式

你可以通过 CSS 来设置 `spine-viewer` 元素的大小和样式：

```css
spine-viewer {
  width: 800px;
  height: 400px;
}
```

## 文件结构要求

确保你的 Spine 动画文件按以下结构组织：

```
animations/
├── character.skel
├── character.atlas
└── character.png
```

所有文件必须具有相同的基础名称（如 `character`），组件会自动查找对应的 `.atlas` 和 `.png` 文件。

## 示例

### 基础示例

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import "@alphardex/spine-viewer";
    </script>
    <style>
      spine-viewer {
        width: 800px;
        height: 400px;
      }
    </style>
  </head>
  <body>
    <spine-viewer
      src="/animations/character.skel"
      animation-name="idle"
      scale="0.3"
    >
    </spine-viewer>
  </body>
</html>
```

### 动态控制示例

```html
<spine-viewer id="myViewer" src="/animations/character.skel"></spine-viewer>

<button onclick="changeAnimation('walk')">走路</button>
<button onclick="changeAnimation('run')">跑步</button>
<input
  type="range"
  min="0.1"
  max="1.0"
  step="0.1"
  value="0.6"
  onchange="changeScale(this.value)"
/>

<script>
  const viewer = document.getElementById("myViewer");

  function changeAnimation(name) {
    viewer.setAnimation(name, true);
  }

  function changeScale(scale) {
    viewer.setScale(parseFloat(scale));
  }
</script>
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
