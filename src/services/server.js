import {ClassMovieInfo, ClassMovieSearch} from "@/services/classes";
import store from "@/store";

const axios = require("axios")

const server = "http://localhost:3000/"

const endPoints = {
    search : "search",
    info : "info",
}

const responseStatus = {
    success : 200
}

// server_search
export const server_search = async (searchText) => {

    return new Promise(async (resolve) => {

        // 1) check in store
        if (store.state.search_byStr[searchText]) {
            console.log("server_search", "store")
            resolve(store.state.search_byStr[searchText])
            return
        }

        // 2) http call
        console.log("server_search", "http call")
        let response = await axios.get(`${server}${endPoints.search}?s=${searchText}`)

        // 3) format data
        let ans = []
        if (response.status === responseStatus.success) {
            let data = response.data
            if (data.Error) {
                console.log(data.Error)
            }else if(data.Search){
                data.Search.forEach(item => {
                    ans.push(new ClassMovieSearch({
                        title: item.Title,
                        year: item.Year,
                        imdbID: item.imdbID,
                        type: item.Type,
                        poster: item.Poster
                    }))
                })
            }
        }

        // 4) save in store
        store.commit('search_byStr_add', {
            data: ans,
            str: searchText
        })

        // 5) return value
        resolve(ans)
    })
}

// server_info
export const server_info = async (imdbID) => {

    return new Promise(async (resolve) => {

        // 1) check in store
        if (store.state.info_byId[imdbID]) {
            console.log("server_info", "store")
            resolve(store.state.info_byId[imdbID])
            return
        }

        // 2) http call
        console.log("server_info", "http call")
        let response = await axios.get(`${server}${endPoints.info}?i=${imdbID}`)

        // 3) format data
        let ans;
        if (response.status === responseStatus.success) {
            let data = response.data

            ans = new ClassMovieInfo({
                image: data.Poster,
                title : data.Title,
                release : data.Released,
                date : data.Year,
                genres : data.Genre,
                director : data.Director,
                actors : data.Actors,
                plot : data.Plot,
                IMDBrating : data.imdbRating,
                website : data.Website
            })
        }

        // 4) save in store
        store.commit('info_byId_add', {
            data: ans,
            id: imdbID
        })

        // 5) return value
        resolve(ans)

    })


}

