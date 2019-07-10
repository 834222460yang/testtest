<template>
    <div class="box" v-gd="vis" dis="210">
        <!-- 吸顶之后进行显示的导航 -->
        <div class="myheader" v-show="vis.flag">
            <span>电影</span>
         <div class="nav">
             <h2><router-link to="/home/film/nowplaying">正在上映</router-link></h2>           
             <h2><router-link to="/home/film/cominSoon">即将上映</router-link></h2>
        </div>   
        </div>
        <!-- 一进入组件就显示的东西 -->
        <div class="swiper">
             <p class="dw" @click="gocity">{{city}}<span class="iconfont icon-jiantou3
"></span></p>
            <mySwiper />
        </div>
        <div class="nav">
             <h2><router-link to="/home/film/nowplaying">正在上映</router-link></h2>           
             <h2><router-link to="/home/film/cominSoon">即将上映</router-link></h2>
        </div>   

        <ul id="list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="row" v-for="(item,index) in list" :key="index" @click="godetail(item.filmId)">
                    <img :src="item.poster" width="100" />
                    <div>
                        {{item.name}}
                        <p v-if="type==='nowplaying'">
                            {{item.nation}}   {{item.runtion}}
                        </p>
                        <p v-else>
                            {{item.premiereAt}}
                        </p>
                    </div>
            </li>
            </ul>
        
    </div>
</template>
<script>
import mySwiper from './mySwiper'
import {Toast} from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
export default {
    data(){
        return {
            type:'',
            city:'',
            page:1, //当前的页码  为变量 不能写死
            loading:false,//表示可以发请求  true表示不会发请求
            list:[],
            vis:{
                flag:false
            }

        }
    },
    created(){
        this.$router.push("/home/film/nowplaying")
        this.city= sessionStorage.getItem("city") || "北京"
    },
    components:{
        mySwiper
    },
    mounted(){
        console.log(document.getElementById("box"))
    },
    methods:{
         gocity(){
      this.$router.push('/city')
             },

        loadMore(){//下拉滚动加载新数据
            this.page++;
            this.getData();
        },
        godetail(id){//到详情页
            this.$router.push('/detail/'+id)//编程式导航的方式获取详情页
        },
        getData(){//按页获取数据
            if(this.page>5){
                Toast({
                    message:'已经到底了',
                    position:'bottom',
                    duration:2000
                })
                return;
            }
            var type=this.type==='nowplaying'?1:2;
            this.loading=true;//同时只能发一次请求
            this.$axios.get(`/mz/gateway?`,
            {
                params:{
                    cityId:110100,
                     pageNum:this.page,
                     pageSize:10,
                     type,
                     k:Date.now()
                },
        

                headers:{
                   "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15625890571181116012309"}`,
                    "X-Host": `mall.film-ticket.film.list`
                }
            }).then((res)=>{
               this.list=this.list.concat(res.data.data.films);//新旧数据链接在一起
              this.loading=false;
            })
        },
        resetList(){
            this.list=[];
            this.loading=false;
            this.page=1;
        }
    },

    watch:{
        $route:{
            handler(newV){
               if(newV.path==="/home/film"){
                   this.$router.push("/home/film/nowplaying")
               }
                this.type=newV.params.type;
                this.resetList();//复位
                this.getData();
            },
            deep:true,
            immediate:true
        }
    }
}
</script>
<style lang="scss">
    .box{
        position:fixed;
        top:0;
        bottom:0.98rem;
        right:0;
        left:0;
        overflow:auto;
    }
    .swiper{
    width:100%;
    height:4.2rem;
    background:cornflowerblue;
}
    .myheader{
    width:100%;
    position:fixed;
    top:0;
    left:0;
    text-align: center; 
    background:#fff; 
   
}
    .myheader span{
        font-size:0.5rem;
    }

    .row{
        display:flex;
    }
    .row{
        img{
          margin:0.3rem;
        }
        div{
            margin-top:0.3rem;
            flex:1;
        }
    }
    .dw{
        background:#ccc;
        opacity:0.3;
        height:0.5rem;
        line-height: 0.5rem;
        text-align: center;
        border-radius: .9375rem;
        padding: 0 0.15rem;
        position:fixed;
        top:0.2rem;
        left:0.1rem;
        z-index: 10;
    }
    
</style>
