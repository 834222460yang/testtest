<template>
    <div>
        <img :src="film.poster"  class="imgfilm"/>
        <div class="icon"> 
            <span @click="go" class="iconfont icon-jiantou1"></span>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            film:{}
        }
    },
    created(){
        this.$axios.get("/mz/gateway",{
            params:{
                filmId:this.$route.params.id,
                k:Date.now()
            },
            headers:{
                "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15625940271288490188906"}`,
                "X-Host": "mall.film-ticket.film.info"
            }
        }).then((res)=>{
            this.film=res.data.data.film
        })
    },
    methods:{
        go(){
            this.$router.go(-1);
        }
    }
}
</script>
<style>
.icon{
    background: #ccc;
    opacity: 0.7;
    width:0.5rem;
    height:0.5rem;
    border-radius: 50%;
    text-align:center;
    line-height: 0.5rem;
    Z-index:5;
    position:fixed;
    top:0.2rem;
    left:0.2rem;

}
.imgfilm{
    width:100%; 
}
</style>

