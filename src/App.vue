<template>
  <carousel-slides> </carousel-slides>
</template>

<script>
import CarouselSlides from "./components/CarouselSlides.vue";

export default {
  name: "App",
  components: {
    CarouselSlides,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body,
html {
  margin: 0;
  padding: 0;
  min-height: 100%;
  overflow-x: hidden;
}
body {
  font-family: sans-serif;
  padding: 0 50px 50px;
  background: linear-gradient(45deg, #0b54ff, #3a392c) 50% no-repeat;
  line-height: 1.4;
}
.title {
  margin-top: 50px;
  font-size: 25px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 25px;
}
.item {
  margin: 10px;
  /* background-color: #fff; */
  background-color: var(--background);
    /* color: var(--text); */
  box-shadow: 0 15px 35px #3232321a, 0 5px 15px #0000001a;
  transition: transform 0.3s;
  transform: translate3d(0, -1px, 0);
}
.item:hover {
  transform: translate3d(0, -10px, 0);
}
.item img {
  display: block;
  width: 100%;
  height: 315px;
}
.item__body {
  padding: 25px;
}
.item__title {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 700;
  color: var(--text);
}
.item__description {
  color: var(--text);
}
.carousel,
.items {
  position: relative;
  outline: none;
}
.carousel {
  margin-bottom: 30px;
}
.carousel__container {
  transition: transform 0.3s;
  transform: translateZ(0);
  outline: none;
}
.carousel__container:after {
  content: "";
  clear: both;
  display: table;
}
.carousel__item {
  float: left;
}
.carousel__next,
.carousel__prev {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fff url(../public/images/right-arrow-svgrepo-com.svg) 50% no-repeat;
  background-size: 20px 20px;
  border-radius: 50%;
  top: 50%;
  margin-top: -20px;
  right: 0;
  box-shadow: 0 15px 35px #3232321a, 0 5px 15px #0000001a;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
}
.carousel__next:hover,
.carousel__prev:hover {
  transform: scale(1.2);
}
.carousel__prev {
  background-image:url(../public/images/left-arrow-svgrepo-com.svg);
  right: auto;
  left: 0;
}
.carousel__next--hidden,
.carousel__prev--hidden {
  opacity: 0;
  display: none;
}
.carousel__pagination {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  text-align: center;
  /* display: none; */
}
.carousel__pagination__button {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 3px;
  box-shadow: 0 2px 5px #3232321a;
  transition: transform 0.3s;
  cursor: pointer;
}
.carousel__pagination__button--active,
.carousel__pagination__button:hover {
  transform: scale(1.4);
}
@media screen and (min-width: 800px) {
  .carousel__pagination {
    display: block;
  }
}
@media screen and (max-width: 800px) {
  .carousel__next,
  .carousel__prev {
    display: none !important;
  }
}
:root {
    --dark: #1f1f29;
    --light: #fff;
}

@media (prefers-color-scheme: dark) {
    :root {
        --background: var(--dark);
        --text: var(--light);
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --background: var(--light);
        --text: var(--dark);
    }
}

/* body {
    background-color: var(--background);
    color: var(--text);
} */
</style>
