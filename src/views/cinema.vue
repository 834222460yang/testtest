<template>
    <div class="about">
        <div class="title">
            <h2>影院</h2>
        </div> 
        <div class="icon-2">
            <span class="iconfont icon-sousuo4"></span>
       </div>
        <div class="tag">
            <div>全城<span class="iconfont icon-jiantou3"></span></div>
            <div>APP订票<span class="iconfont icon-jiantou3"></span></div>
            <div>最近去过<span class="iconfont icon-jiantou3"></span></div>

        </div>
    </div>
    
</template>
<script>
    export default{
        created(){
            this.$axios.get("/mz/gateway?cityId=110100&ticketFlag=1&k=2064363",{
                headers:{
                "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15625940271288490188906"}`,
                "X-Host": "mall.film-ticket.cinema.list"    
                }
            }).then((res)=>{
                this.cinemas=res.data.data.cinemas;
                var set=new Set();
                this.cinemas.forEach((item)=>{
                    set.add(item.districtName)
                })
                this.distributes=[...set];  
            })
        },
        data(){
            return {
                cinemas:[],
                distributes:[],//存储区域
                index:0 //0 全城 非0 其他区域
            }
        },
        computed:{
            filterList(){
                
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss">
    .about{
        margin:0 auto;
        position:relative;
    }
    .title{
        width:4rem;
    }
    .title h2{
       font-weight:400;
       margin-top:0.2rem;
        text-align:right;
    }
    .about .icon-2{
        position: absolute;;
        top:0.1rem;
        left:6.8rem;
    }
    .tag{
        font-size: 0.28rem;
        color:#191a1b;
        margin-top:0.1rem;
        width:100%;
        height:0.98rem;
        border-bottom:1px solid #ccc;
        border-top:1px solid #ccc;
        display:flex;

    }
    .tag div{
        flex:1;
        height:0.98rem;
        line-height:0.98rem;
        text-align: center;

    }
</style>
