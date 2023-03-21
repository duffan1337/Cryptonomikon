<template>
          <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
              >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                v-model="ticker"
                v-on:keydown.enter="add"
                @input="onSearchInput"
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
              />
            </div>
            <div
              class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
            >
              <span
                v-for="h in hints"
                v-bind:key="h"
                @click="onHintsClick(h)"
                class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
              >
                {{ h }}
              </span>
            </div>
            <div v-if="elementIsAdded" class="text-sm text-red-600">
              Такой тикер уже добавлен
            </div>
          </div>
        </div>
        <add-button
          :disabled="disabled"
          @click="add"
          type="button"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >

        </add-button>
      </section>
</template>
<script>
import AddButton from "./AddButton.vue"

export default {
    components:{
        AddButton
    },
    
    data(){
        return {
            ticker:'',

        }
    },
    props:{
        disabled:{
            type: Boolean,
            required:false,
            default:false
        }
    },

    emits:{
         'add-ticker':value => typeof value === "string" && value.length > 0
    },

    methods: {
        add() {
      
    //   let isInArray = this.tickers.find(
    //     (ticker) => ticker.name.toLowerCase() === this.ticker.toLowerCase()
    //   );
              
    //   if (isInArray === undefined) {
    //     this.elementIsAdded = false;
        // const currentTicker = { name: this.ticker, price: "-" };
        // this.tickers=[...this.tickers,currentTicker]
        if(this.ticker.length===0){
            return 
        }
        this.$emit('add-ticker',this.ticker)
        this.ticker=""
        // this.filter = "";
        
 
    //   } else {
    //     this.elementIsAdded = true;
    //   }
    },
    }
}
</script>
