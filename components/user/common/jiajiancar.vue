<template>
    <div>
        <div class="addcar" v-if="!goods.numbers" @click="insertgoods" >
            <img src="../goods/static/img/new-cart.png">
        </div>
        <div class="compute" v-else>
            <img src="../goods/static/img/jian.png" @click="reducegoods">
            <div class="num">{{goods.numbers}}</div>
            <img src="../goods/static/img/jia.png" @click="addgoods">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "jiajiancar",
        props:{
            goods:{
                type:Object,
                require:true,
            },
            isemit:{
                type: Boolean,
                default:false
            }
        },
        data(){
            return{
                cart:null
            }
        },
        methods:{
            _initCart(){
                localStorage.cart=JSON.stringify({
                    total:0,
                    price:0,
                    discount:0,
                    goods:[]
                });
            },
            _isExistCart(){
                if (localStorage.cart){
                    return true
                }
                return false
            },
            getCart(){
                this.cart=JSON.parse(localStorage.cart);
            },
            calinfo(){
                let total=0;
                let price=0;
                let discount=0;
                this.cart.goods.forEach((ele)=>{
                    total+=ele.numbers;
                    price+=ele.numbers*ele.gdiscount
                });
                discount=price* 0.8;
                this.cart.total=total;
                this.cart.price=price;
                this.cart.discount=discount.toFixed(2)
            },
            getCart1(){
                this.cart=localStorage.cart ? JSON.parse(localStorage.cart): null;
                if (this.cart){
                    let goods=this.cart.goods.filter(ele=>ele.gid==this.goods.gid)[0];
                    if (goods) {
                        Vue.set(this.goods,'numbers',goods.numbers)
                    }
                }
            },
            saveCart(){
                localStorage.cart=JSON.stringify(this.cart)
            },
            insertgoods(){
                Vue.set(this.goods,'numbers',1);
                Vue.set(this.goods,'isCheck',true);
                if (!this._isExistCart()){
                    this._initCart();
                }
                this.getCart();
                this.cart.goods.push(this.goods);
            },
            addgoods(){
                this.getCart()
                let goods=this.cart.goods.filter(ele=>ele.gid===this.goods.gid)[0];
                ++this.goods.numbers;
                goods.numbers=this.goods.numbers;
            },
            reducegoods(){
                this.getCart()
                let goods=this.cart.goods.filter(ele=>ele.gid===this.goods.gid)[0];
                --this.goods.numbers;
                goods.numbers=this.goods.numbers;
                if (this.goods.numbers==0){
                    this.cart.goods=this.cart.goods.filter(ele=>ele.gid!=this.goods.gid)
                }
            }
        },
        created:function(){
            this.getCart1();
        },
        watch:{
            cart:{
                handler:function () {
                    this.isemit && this.$emit('carchange')
                    this.saveCart();
                    this.calinfo()
                },
                deep:true
            }
        }

    }
</script>

<style scoped>

</style>
