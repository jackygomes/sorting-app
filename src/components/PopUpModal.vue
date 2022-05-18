<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div v-if="!sorted">
            <div class="modal-header">
              <h3>
                How many people?
                <span><fa icon="close" @click="$emit('close')" /></span>
              </h3>
            </div>

            <div class="modal-body">
              <p>
                Enter a number of how many people you want to add to the list?
              </p>
              <input
                v-model="numberOfPeople"
                type="text"
                @keypress="onlyNumber"
              />
              <p v-if="warning" class="warning">
                You must input a number between 20 and 100.
              </p>
            </div>

            <div class="modal-footer">
              <button class="button" @click="$emit('close')">Close</button>
              <button class="button" @click="startSorting">Start!</button>
            </div>
          </div>

          <div v-if="sorted">
            <div class="modal-header">
              <h3>
                Yay! You've successfully sorted the list!
                <span><fa icon="close" @click="closeGame" /></span>
              </h3>
            </div>

            <div class="modal-body">
              <h2>Your Score: {{ score }} Sec</h2>
            </div>

            <div class="modal-footer">
              <button class="button" @click="closeGame">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "sorting-popup",
  data() {
    return {
      numberOfPeople: 0,
      warning: false,
    };
  },
  props: {
    show: Boolean,
    sorted: Boolean,
    score: Number,
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    startSorting() {
      if (this.numberOfPeople >= 20 && this.numberOfPeople <= 100) {
        this.$emit("numberOfPeople", this.numberOfPeople);
        this.$emit("close");
        this.warning = false;
      } else {
        this.warning = true;
      }
    },
    closeGame() {
      this.$emit("closeGame", true);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  h3 {
    margin-top: 0;
    /* color: #42b983; */
    padding: 0 30px 20px;
    border-bottom: 1px solid #9f9f9f;
  }
  span {
    color: #9f9f9f;
    float: right;
    cursor: pointer;
  }
}

.modal-body {
  margin: 20px 0;
  padding: 0 30px 50px;
  border-bottom: 1px solid #9f9f9f;

  input {
    width: 100%;
    padding: 8px 4px;
    border: 1px solid #9f9f9f;
    border-radius: 3px;
    font-size: 16px;
  }
  .warning {
    color: #ff6c6c;
  }
  h2 {
    padding: 30px 0 0;
    text-align: center;
  }
}
.modal-footer {
  padding: 0 30px;
  text-align: right;

  .button {
    margin-left: 6px;

    &:first-child {
      background-color: #eeeeee;
      color: #000;
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
