<template>
  <div>

      <!-- 1) logo -->
      <div class="lc_align_initial">
          <img alt="logo" class="lc_logo" src="../assets/logo.png">
      </div>

      <!-- 2) search -->
      <div>
          <img v-if="showSearchLoader" class="lc_width_20px lc_verticalAlign_middle lc_padding_8px" src="https://i.gifer.com/ZZ5H.gif"/>
          <img v-else class="lc_width_20px lc_verticalAlign_middle lc_padding_8px" src="../assets/search.svg"/>

          <!-- search input -->
          <dropdown >

              <div slot="select">
                  <input @input=m_input class="lc_verticalAlign_middle lc_padding_4px lc_searchInput" v-model="searchInput">
              </div>

              <div slot="options"
                   class="lc_align_initial lc_padding_4px"
                   @click="m_searchMovies(movie.title)"
                   v-if="searchSuggest.length>0"
                   v-for="movie in searchSuggest">
                  {{movie.title}}
              </div>
          </dropdown>
      </div>

      <!-- 3) movie list -->
      <div class="lc_align_initial" v-if="currentDisplayStr">

          <!-- title -->
          <div class="lc_color_white lc_borderBottom_1px_w lc_text_24px">
              Search Results For "{{ currentDisplayStr }}"
          </div>

          <!-- movies -->
          <movie v-for="movie in displaySearchMovies"
                 :movie="movie"
                 @click.native="m_clickMovie(movie.imdbID)"/>

          <!-- No Results -->
          <div v-if="displaySearchMovies.length===0" class="lc_margin_top_16px lc_text_20px lc_color_white">
              No Results
          </div>
      </div>

      <!-- 4) wishList-->
      <div class="lc_align_initial lc_margin_top_16px" v-if="c_showWishList">
          <!-- title -->
          <div class="lc_color_white lc_borderBottom_1px_w lc_text_24px">
              your Wishlist
          </div>

          <!-- movies -->
          <div>
              <!-- movies -->
              <movie v-for="movie in c_wishList"
                     :movie="movie"
                     @click.native="m_clickMovie(movie.imdbID)"/>
          </div>
      </div>

      <!-- 5) popup -->
      <popup :show-pop-up="showPopUp" >

          <div v-if="popUpData" class="lc_grid_1fr1fr">

              <!-- image -->
              <div class="lc_verticalAlign_middle">
                  <img :src="popUpData.image"/>
              </div>

              <!-- more data -->
              <div class="lc_verticalAlign_middle lc_color_white">
                  <div class="lc_text_24px lc_margin_8px">
                      {{popUpData.title}}
                  </div>
                  <div>
                      <b>release:</b>
                      {{popUpData.release}}
                  </div>
                  <div>
                      <b>date:</b>
                      {{popUpData.date}}
                  </div>
                  <div>
                      <b>genres:</b>
                      {{popUpData.genres}}
                  </div>
                  <div>
                      <b>director:</b>
                      {{popUpData.director}}
                  </div>
                  <div>
                      <b>actors:</b>
                      {{popUpData.actors}}
                  </div>
                  <div>
                      <b>plot:</b>
                      {{popUpData.plot}}
                  </div>
                  <div>
                      <b>IMDBrating:</b>
                      {{popUpData.IMDBrating}}
                  </div>

                  <div v-if="popUpData.website">
                      <b>website:</b>
                      {{popUpData.website}}
                  </div>
              </div>
          </div>

          <!-- loader -->
          <img v-else class="lc_verticalAlign_middle lc_padding_8px" src="https://i.gifer.com/ZZ5H.gif"/>

      </popup>

  </div>
</template>

<script>
// @ is an alias to /src
import {server_info, server_search} from "@/services/server";
import Popup from "@/components/Popup";
import store from "@/store";
import Movie from "@/components/Movie";
import Dropdown from "@/components/Dropdown";

export default {
    name: 'Home',
    components: {Dropdown, Movie, Popup},
    data(){
        return {
            searchInput: "",
            currentDisplayStr: "",
            delayInputToServerMilSec : 300,
            lastSetTimeoutId : null,

            showSearchLoader : false,

            searchSuggest: [],
            displaySearchMovies: [],

            popUpData: null,
            showPopUp : {val : false}
        }
    },
    computed:{
        c_wishList(){
            return store.state.lovedMoviesInfo_byId ? store.state.lovedMoviesInfo_byId : {}
        },
        c_showWishList(){
            return Object.keys(this.c_wishList).length > 0
        }
    },
    methods:{

        m_input() {
            this.searchSuggest = []
            clearTimeout(this.lastSetTimeoutId)

            this.lastSetTimeoutId = setTimeout(async () => {
                this.showSearchLoader = true
                this.searchSuggest = await server_search(this.searchInput)
                this.showSearchLoader = false
            },this.delayInputToServerMilSec)
        },
        async m_searchMovies(str) {
            this.searchSuggest = []
            this.searchInput = str

            this.displaySearchMovies = await server_search(this.searchInput)
            this.currentDisplayStr=str
        },

        async m_clickMovie(movieId) {
            this.popUpData = null
            this.showPopUp.val = true
            this.popUpData = await server_info(movieId)
        }
    },
}
</script>

<style>


.lc_grid_1fr1fr{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.lc_width_20px{
    width: 20px
}

.lc_searchInput{
    width: 300px;
}

.lc_verticalAlign_middle{
    vertical-align: middle;
    align-self: center;
}

.lc_padding_8px{
    padding: 8px;
}

.lc_padding_4px{
    padding: 4px;
}

.lc_margin_8px{
    margin: 8px;
}


.lc_margin_top_16px{
    margin-top: 16px;
}


.lc_logo{
    background: black;
    padding: 8px;
    border-radius: 5px;
    width: 300px;
}




.lc_align_initial{
    text-align: initial;
}


.lc_color_white{
    color: white;
}

.lc_text_24px{
    font-size: 24px;
}

.lc_text_20px{
    font-size: 20px;
}

.lc_borderBottom_1px_w{
    border-bottom: 1px solid white;

}
.lc_bg_white{
    background: white;
}





</style>
