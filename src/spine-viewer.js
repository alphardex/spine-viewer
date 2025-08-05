import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

class SpineViewer extends HTMLElement {
  constructor() {
    super();
    this.app = null;
    this.spine = null;
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["src", "animation-name", "scale"];
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    // 清理之前的内容
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.shadowRoot.innerHTML = "";

    const src = this.getAttribute("src");
    const animationName = this.getAttribute("animation-name") || "idle";
    const scale = parseFloat(this.getAttribute("scale")) || 0.3;

    if (!src) {
      this.shadowRoot.innerHTML =
        '<div style="color: red;">Error: src attribute is required</div>';
      return;
    }

    // 创建容器
    const container = document.createElement("div");
    this.container = container;
    container.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    `;
    this.shadowRoot.appendChild(container);

    await this.renderSpine({ src, animationName, scale });

    // 监听窗口大小变化
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this);
  }

  async renderSpine({
    src,
    animationName = this.getAttribute("animation-name"),
    scale = this.getAttribute("scale") || 0.3,
  }) {
    if (this.app) {
      this.app.destroy(true);
      this.app = null;
    }
    // 清理spine相关引用
    this.spine = null;
    this.spineContainer = null;

    try {
      // 创建PIXI应用
      this.app = new PIXI.Application({
        width: this.clientWidth || 400,
        height: this.clientHeight || 400,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        antialias: true,
        powerPreference: "high-performance",
      });

      this.container.appendChild(this.app.view);

      // 预加载资源
      const resource = await this.loadResources(src);

      // 创建Spine动画
      this.spine = new Spine(resource.spineData);

      if (this.spine.spineData) {
        // 创建容器来包装spine
        this.spineContainer = new PIXI.Container();
        this.spineContainer.addChild(this.spine);
        this.app.stage.addChild(this.spineContainer);

        // 设置动画
        if (this.spine.state.data.skeletonData.findAnimation(animationName)) {
          this.spine.state.setAnimation(0, animationName, true);
        } else {
          console.warn(
            `Animation '${animationName}' not found, using first available animation`
          );
          const animations = this.spine.spineData.animations;
          if (animations.length > 0) {
            this.spine.state.setAnimation(0, animations[0].name, true);
          }
        }

        // 获取边界并设置位置
        this.spine.skeleton.setToSetupPose();
        this.spine.update(0);
        const localRect = this.spine.getLocalBounds();
        this.spine.position.set(-localRect.x, -localRect.y);

        this.spineContainer.scale.set(scale, scale);
        this.spineContainer.position.set(
          (this.app.screen.width - this.spineContainer.width) * 0.5,
          (this.app.screen.height - this.spineContainer.height) * 0.5
        );
      }
    } catch (error) {
      console.error("Failed to load Spine animation:", error);
      this.shadowRoot.innerHTML = `<div style="color: red;">Error loading Spine animation: ${error.message}</div>`;
    }
  }

  async loadResources(src) {
    try {
      const resource = await PIXI.Assets.load(src);
      if (resource && resource.spineData) {
        return resource;
      } else {
        throw new Error("Failed to load Spine data");
      }
    } catch (error) {
      throw new Error(`Failed to load Spine animation: ${error.message}`);
    }
  }

  centerSpine() {
    if (!this.spineContainer || !this.app || !this.spine) return;

    this.spineContainer.position.set(
      (this.app.screen.width - this.spineContainer.width) * 0.5,
      (this.app.screen.height - this.spineContainer.height) * 0.5
    );
  }

  handleResize() {
    if (!this.app || !this.spine || !this.spineContainer) return;

    this.app.renderer.resize(this.clientWidth || 400, this.clientHeight || 400);
    this.centerSpine();
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.app) {
      this.app.destroy(true);
    }
  }

  // 公共方法
  setAnimation(animationName, loop = true) {
    if (this.spine && this.spine.state) {
      // 设置新动画
      this.spine.state.setAnimation(0, animationName, loop);
    }
  }

  getAnimations() {
    if (this.spine && this.spine.spineData) {
      return this.spine.spineData.animations.map((anim) => anim.name);
    }
    return [];
  }

  setScale(scale) {
    if (this.spineContainer && this.app && this.spine) {
      this.spineContainer.scale.set(scale, scale);
      this.centerSpine();
    }
  }
}

// 注册自定义元素
customElements.define("spine-viewer", SpineViewer);

export default SpineViewer;
export { SpineViewer };
