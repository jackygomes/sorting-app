<template>
  <div class="wrapper">
    <h2 class="header">
      Sorting Training System
      <button
        v-if="!gameOn"
        class="button"
        id="show-modal"
        @click="showModal = true"
      >
        Start sorting!
      </button>
      <!-- <button class="button" @click="stop">stop</button> -->
    </h2>
    <div class="list-section" v-if="people.length !== 0">
      <h3>
        <span class="timer">Time: {{ time }} Sec</span>
        {{ people.length }} people in the list
      </h3>
      <div class="list-wrapper">
        <table id="customers">
          <draggable
            v-model="people"
            group="people"
            @start="drag = true"
            item-key="id"
            element="tbody"
            @end="checkSorting"
          >
            <template #header>
              <tr>
                <th>Email</th>
                <th>Potatoes</th>
                <th>Full Name</th>
                <th>Location</th>
              </tr>
            </template>
            <template #item="{ element }">
              <tr>
                <td>{{ element.email }}</td>
                <td>{{ element.potatoes }}</td>
                <td>{{ element.name }}</td>
                <td>{{ element.location }}</td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>
    <Teleport to="body">
      <PopUp
        :show="showModal"
        :sorted="sorted"
        :score="time"
        @close="showModal = false"
        @numberOfPeople="getNumberOfPeople"
        @closeGame="closeGame"
      >
      </PopUp>
    </Teleport>
  </div>
</template>

<script>
import PopUp from "./PopUpModal.vue";
import { faker } from "@faker-js/faker";
import draggable from "vuedraggable";
import { shuffle } from "../utils/arrayShuffle";

export default {
  name: "SortingMain",
  components: {
    PopUp,
    draggable,
  },
  data() {
    return {
      showModal: false,
      people: [],
      potatoNumber: [],
      time: 0,
      timer: null,
      gameOn: false,
      sorted: false,
    };
  },
  methods: {
    checkSorting() {
      let isSorted = this.people.every(
        (p, index) => index + 1 === Number(p.potatoes)
      );
      if (isSorted) {
        this.stop();
      }
    },
    getNumberOfPeople(numberOfPeople) {
      this.people = [];

      const potatoesGenerate = Array(parseInt(numberOfPeople))
        .fill(1)
        .map((_, index) => index + 1);
      const randomPotatoes = shuffle(potatoesGenerate);

      for (let i = 0; i < numberOfPeople; i++) {
        let tempPeople = {
          name: faker.name.findName(),
          email: faker.internet.email(),
          potatoes: randomPotatoes.pop(),
          location: faker.address.country(),
        };
        this.people.push(tempPeople);
      }
      this.start();
    },
    start() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
      this.gameOn = true;
    },
    stop() {
      clearInterval(this.timer);
      this.showModal = true;
      this.sorted = true;
    },

    closeGame() {
      this.people = [];
      this.gameOn = false;
      this.time = 0;
      this.numberOfPeopleList = 0;
      this.sorted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #ddd;
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  border-radius: 3px;
  background-color: #f5f5f5;

  .header {
    text-align: left;
    overflow: hidden;
  }
  .button {
    float: right;
  }
  .list-section {
    padding: 20px 0;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ddd;
    h3 {
      text-align: right;
      padding: 0 20px;

      .timer {
        float: left;
      }
    }

    #customers {
      border-collapse: collapse;
      width: 100%;

      td,
      th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #afdbf8;
        color: #3a6785;
      }

      tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      tr:hover {
        background-color: #afdbf8;
        color: #3a6785;
      }
    }
  }
}
</style>
