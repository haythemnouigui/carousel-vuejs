export default class Carousel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false,
        pagination: false,
        navigation: true,
        infinite: false,
      },
      options
    );
    let children = [].slice.call(element.children);
    this.isMobile = true;
    this.currentItem = 0;
    this.moveCallback = [];
    this.offset = 0;

    this.root = this.createDivWithClass("carousel");
    this.container = this.createDivWithClass("carousel__container");
    this.root.setAttribute("tabindex", "0");
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.items = children.map((child) => {
      let item = this.createDivWithClass("carousel__item");
      item.appendChild(child);
      return item;
    });

    if (this.options.infinite) {
      this.offset = this.options.slidesVisible + this.options.slidesToScroll;

      if (this.offset > children.length) {
        console.error("stop", element);
      }
      this.items = [
        ...this.items
          .slice(this.items.length - this.offset)
          .map((item) => item.cloneNode(true)),
        ...this.items,
        ...this.items.slice(0, this.offset).map((item) => item.cloneNode(true)),
      ];
      this.goToItem(this.offset, false);
    }

    this.items.forEach((item) => this.container.appendChild(item));

    this.setStyle();

    if (this.options.navigation) {
      this.createNavigation();
    }

    if (this.options.pagination) {
      this.createPagination();
    }

    this.moveCallback.forEach((cb) => cb(this.currentItem));
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.root.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "Right") {
        this.next();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        this.prev();
      }
    });

    if (this.options.infinite) {
      this.container.addEventListener(
        "transitionend",
        this.resetInfinite.bind(this)
      );
    }

    new CarouselTouchPlugin(this);
  }

  /**
   *
   */
  setStyle() {
    let ratio = this.items.length / this.slidesVisible;

    this.container.style.width = ratio * 100 + "%";
    this.items.forEach(
      (item) => (item.style.width = 100 / this.slidesVisible / ratio + "%")
    );
  }
  /**
   * description
   */
  createNavigation() {
    let nextButton = this.createDivWithClass("carousel__next");
    let prevButton = this.createDivWithClass("carousel__prev");

    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);

    nextButton.addEventListener("click", this.next.bind(this));
    prevButton.addEventListener("click", this.prev.bind(this));

    if (this.options.loop === true) {
      return;
    }

    this.onMove((index) => {
      if (index === 0) {
        prevButton.classList.add("carousel__prev--hidden");
      } else {
        prevButton.classList.remove("carousel__prev--hidden");
      }

      if (this.items[this.currentItem + this.slidesVisible] === undefined) {
        nextButton.classList.add("carousel__next--hidden");
      } else {
        nextButton.classList.remove("carousel__next--hidden");
      }
    });
  }

  /**
   * description
   */
  createPagination() {
    let pagination = this.createDivWithClass("carousel__pagination");
    let buttons = [];
    this.root.appendChild(pagination);

    for (
      let i = 0;
      i < this.items.length - 2 * this.offset;
      i = i + this.options.slidesToScroll
    ) {
      let button = this.createDivWithClass("carousel__pagination__button");
      button.addEventListener("click", () => this.goToItem(i + this.offset));
      pagination.appendChild(button);
      buttons.push(button);
    }
    this.onMove((index) => {
      let count = this.items.length - 2 * this.offset;
      let activeButton =
        buttons[
          Math.floor(
            ((index - this.offset) % count) / this.options.slidesToScroll
          )
        ];

      if (activeButton) {
        buttons.forEach((button) =>
          button.classList.remove("carousel__pagination__button--active")
        );
        activeButton.classList.add("carousel__pagination__button--active");
      }
    });
  }

  translate(percent) {
    this.container.style.transform = "translate3d(" + percent + "%,0,0)";
  }

  /**
   * description
   */

  next() {
    this.goToItem(this.currentItem + this.slidesToScroll);
  }
  /**
   * description
   */

  prev() {
    this.goToItem(this.currentItem - this.slidesToScroll);
  }
  /**
   * description
   */

  goToItem(index, animation = true) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.items.length - this.slidesVisible;
      } else {
        return;
      }
    } else if (
      index >= this.items.length ||
      (this.items[this.currentItem + this.slidesVisible] === undefined &&
        index > this.currentItem)
    ) {
      if (this.options.loop) {
        index = 0;
      } else {
        return;
      }
    }
    let translateX = (index * -100) / this.items.length;

    if (animation === false) {
      this.disableTransition();
    }
    this.translate(translateX);
    this.container.offsetHeight;
    if (animation === false) {
      this.enableTransition();
    }
    this.currentItem = index;

    this.moveCallback.forEach((cb) => cb(index));
  }
  /**
   * description
   */

  resetInfinite() {
    if (this.currentItem <= this.options.slidesToScroll) {
      this.goToItem(
        this.currentItem + (this.items.length - 2 * this.offset),
        false
      );
    } else if (this.currentItem >= this.items.length - this.offset) {
      this.goToItem(
        this.currentItem - (this.items.length - 2 * this.offset),
        false
      );
    }
  }

  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }

  onMove(cb) {
    this.moveCallback.push(cb);
  }

  onWindowResize() {
    let mobile = window.innerWidth < 800;
    if (mobile !== this.isMobile) {
      this.isMobile = mobile;
      this.setStyle();
      this.moveCallback.forEach((cb) => cb(this.currentItem));
    }
  }

  disableTransition() {
    this.container.style.transition = "none";
  }

  enableTransition() {
    this.container.style.transition = "";
  }

  get slidesToScroll() {
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }

  get slidesVisible() {
    return this.isMobile ? 1 : this.options.slidesVisible;
  }

  get containerWidth() {
    return this.container.offsetWidth;
  }

  get carouselWidth() {
    return this.root.offsetWidth;
  }
}

export class CarouselTouchPlugin {
  constructor(carousel) {
    carousel.container.addEventListener("dragstart", (e) => e.preventDefault());
    carousel.container.addEventListener("mousedown", this.startDrag.bind(this));
    carousel.container.addEventListener(
      "touchstart",
      this.startDrag.bind(this)
    );
    carousel.container.addEventListener("mousemove", this.drag.bind(this));
    carousel.container.addEventListener("touchmove", this.drag.bind(this));
    carousel.container.addEventListener("touchend", this.endDrag.bind(this));
    carousel.container.addEventListener("mouseup", this.endDrag.bind(this));
    carousel.container.addEventListener("touchcancel", this.endDrag.bind(this));
    this.carousel = carousel;
  }

  startDrag(e) {
    if (e.touches) {
      if (e.touches.length > 1) {
        return;
      } else {
        e = e.touches[0];
      }
    }
    this.origin = { x: e.screenX, y: e.screenY };
    this.width = this.carousel.containerWidth;
    this.carousel.disableTransition();
  }

  drag(e) {
    if (this.origin) {
      let point = e.touches ? e.touches[0] : e;
      let translate = {
        x: point.screenX - this.origin.x,
        y: point.screenY - this.origin.y,
      };

      if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
        e.preventDefault();
        e.stopPropagation();
      } else if (e.touches) {
        return;
      }
      let baseTranslate =
        (this.carousel.currentItem * -100) / this.carousel.items.length;
      this.lastTranslate = translate;
      // console.log(translate)
      this.carousel.translate(baseTranslate + (100 * translate.x) / this.width);
    }
  }

  endDrag() {
    if (this.origin && this.lastTranslate) {
      this.carousel.enableTransition();

      if (
        this.lastTranslate.x > this.lastTranslate.y ||
        -this.lastTranslate.x > -this.lastTranslate.y
      ) {
        // console.log('ddhd')
        this.carousel.goToItem(this.carousel.currentItem);
      }

      if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
        if (this.lastTranslate.x < 0) {
          this.carousel.next();
        } else {
          this.carousel.prev();
        }
      } else {
        this.carousel.goToItem(this.carousel.currentItem);
      }
    }

    this.lastTranslate = null;
    this.carousel.enableTransition();

    this.origin = null;
  }
}
