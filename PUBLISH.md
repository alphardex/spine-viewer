# 发布指南

这个文档说明如何将 Spine Viewer 发布到 npm。

## 准备工作

### 1. 安装依赖

```bash
cd spine-viewer
npm install
```

### 2. 构建项目

```bash
npm run build
```

这将在 `dist/` 目录中生成以下文件：
- `index.js` - CommonJS 版本
- `index.esm.js` - ES Module 版本
- `index.d.ts` - TypeScript 类型定义

## 发布到 npm

### 1. 登录 npm

```bash
npm login
```

### 2. 检查包信息

```bash
npm pack --dry-run
```

这会显示将要包含在包中的文件列表。

### 3. 发布包

```bash
npm publish
```

## 版本管理

### 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

### 发布新版本

```bash
npm run build
npm publish
```

## 测试包

### 本地测试

```bash
# 在另一个项目中
npm install /path/to/spine-viewer-package
```

### 从 npm 测试

```bash
npm install @alphardex/spine-viewer
```

## 包的使用

发布后，用户可以这样使用：

```bash
npm install @alphardex/spine-viewer
```

```javascript
// ES6 模块
import '@alphardex/spine-viewer';

// CommonJS
require('@alphardex/spine-viewer');
```

```html
<spine-viewer 
  src="./animations/character.skel" 
  animation-name="idle"
  scale="0.6">
</spine-viewer>
```

## 注意事项

1. **包名唯一性**: 确保 `package.json` 中的包名在 npm 上是唯一的
2. **版本号**: 遵循语义化版本控制 (SemVer)
3. **依赖管理**: `pixi.js` 和 `pixi-spine` 作为 peerDependencies，用户需要自行安装
4. **文档更新**: 每次发布前更新 README.md 和版本日志
5. **测试**: 确保在发布前充分测试功能

## 自动化发布 (可选)

可以使用 GitHub Actions 来自动化发布流程：

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 故障排除

### 常见问题

1. **包名已存在**: 修改 `package.json` 中的 `name` 字段
2. **权限问题**: 确保已登录正确的 npm 账户
3. **构建失败**: 检查依赖是否正确安装
4. **类型定义问题**: 确保 TypeScript 配置正确

### 撤销发布

```bash
# 撤销特定版本 (发布后24小时内)
npm unpublish @alphardex/spine-viewer@1.0.0

# 撤销整个包 (谨慎使用)
npm unpublish @alphardex/spine-viewer --force
```