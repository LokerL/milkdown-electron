<template>
  <div class="header">
    <div>tools</div>
    <div
      class="title"
      @dblclick="toggleMaxmize"
      @mousedown.self="winDown"
      @mousemove.self="winMove"
      @mouseup.self="winUp"
    >
      title
    </div>
    <div>
      <span>s</span>
      <span>m</span>
      <span>c</span>
    </div>
  </div>
</template>

<script setup>
const { ipcRenderer } = require("electron");
let canMoving = false;
let XY = {};

const winDown = () => {
  canMoving = true;
  const win_XY = ipcRenderer.sendSync("win-start");
  XY = JSON.parse(win_XY);
};
const winMove = (e) => {
  if (!canMoving) return;
  const params = {
    x: e.screenX - XY.x,
    y: e.screenY - XY.y,
  };
  ipcRenderer.send("win-move", JSON.stringify(params));
};
const winUp = () => {
  canMoving = false;
};

const toggleMaxmize = () => {
  ipcRenderer.send("window-maximize");
};
</script>

<style scoped>
.header {
  height: var(--milkdown-menu-height);
  width: 100%;
  display: flex !important;
  align-items: center;
  border-top-right-radius: var(--milkdown-border-radius);
  border-top-left-radius: var(--milkdown-border-radius);
  margin-bottom: var(--milkdown-menu-margin-bottom);
  /* -webkit-app-region: drag; */
  background-color: #fff;
  justify-content: space-between;
}
.header .title {
  user-select: none;
  /* -webkit-app-region: no-drag; */
  flex: 1;
  background-color: aqua;
  text-align: center;
}
</style>
