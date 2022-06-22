<template>
    <div class="lc_inline lc_margin_8px lc_movieWrapper"
         @mouseover="m_movie_mouseover(movie.imdbID)"
         @mouseleave="m_hoverMovie_mouseleave(movie.imdbID)">

        <img :src="movie.poster" class="lc_movieImg"/>

        <div v-if="hoverImdbID === movie.imdbID" class="lc_movieInfo">

            <div class="lc_align_initial lc_margin_4px">
                <img v-if="m_loved(movie.imdbID)" class="lc_width_24px " src="../assets/heart.png" @click.stop="m_removeMovie(movie)">
                <img v-else class="lc_width_24px " src="../assets/heartEmtpy.png" @click.stop="m_lovedMovie(movie)">
            </div>

            <div class="lc_text1">
                {{movie.title}}
            </div>
            <div class="lc_text2">
                {{movie.year}}
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import {ClassMovieSearch} from "@/services/classes";

export default {
    name: "Movie",
    data(){
        return {
            hoverImdbID : null
        }
    },
    props:{
        movie : ClassMovieSearch,
    },
    methods:{
        m_movie_mouseover(imdbID){
            this.hoverImdbID = imdbID
        },
        m_hoverMovie_mouseleave(imdbID){
            if(this.hoverImdbID === imdbID){
                this.hoverImdbID = null
            }

        },
        m_loved(id){
            return store.state.lovedMoviesInfo_byId && store.state.lovedMoviesInfo_byId[id] != null
        },
        m_lovedMovie(movieInfo){
            store.commit('lovedMoviesInfo_add', {
                movieInfo: movieInfo,
            })
        },
        m_removeMovie(movieInfo){
            store.commit('lovedMoviesInfo_remove', {
                movieInfo: movieInfo,
            })
        },
    }
}
</script>

<style scoped lang="scss">

.lc_movieWrapper{
    position: relative;
    text-align: center;
    width: 200px;
    height: 250px;

    .lc_movieImg{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .lc_movieInfo{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000bb;
        color: gold;
        cursor: pointer;


        .lc_text1{
            padding: 8px;
            margin-top: 60px;
        }
        .lc_text2{
            padding: 8px;
            margin-top: 22px;
        }
    }
}

.lc_margin_4px{
    margin: 4px;
}

.lc_inline{
    display: inline-block;
}

.lc_width_120px{
    width: 120px
}


.lc_margin_4px{
    margin: 4px;
}

.lc_width_24px{
    width: 24px
}


</style>