<template>
  <div class="wrapper">
    <h2 class="header">
      Sorting Training System
      <button class="button" id="show-modal" @click="showModal = true">Start sorting!</button>
    </h2>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <PopUp :show="showModal" @close="showModal = false" @numberOfPeople="getNumberOfPeople">
    </PopUp>
  </Teleport>
  </div>
</template>

<script>
import PopUp from './PopUpModal.vue';
import { faker } from '@faker-js/faker';

export default {
  name: 'sorting-main',
  data() {
    return {
      showModal: false,
      people: [],
      potatoNumber: []
    }
  },
  mounted(){
    let randomName = faker.random.numeric();
    console.log(randomName);
  },
  methods:{
    getNumberOfPeople (numberOfPeople) {
      this.people = [];
      for(let i = 0; i< numberOfPeople; i++){
        let potato = this.randomNumber(faker.random.numeric());
        let tempPeople = {
          name: faker.name.findName(),
          email: faker.internet.email(),
          tag: 'Customer',
          potato: potato,
          location: faker.address.country()
        };
        this.people.push(tempPeople);
      }
    },
    randomNumber(potato){
      if(this.people.some(data => data.potato === potato)){
        this.randomNumber(faker.random.numeric());
      }
      return potato;
    }
  },
  components:{
    PopUp
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #ddd;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  border-radius: 3px;
  background-color: #F5F5F5;

  .header {
    text-align: left;
    overflow: hidden;
  }
  .button {
    float: right;
  }
}
</style>