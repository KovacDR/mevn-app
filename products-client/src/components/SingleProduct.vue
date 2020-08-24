<template>
    <div>
        <div class="card product" @click="openProduct(product)">
            <img :src="source" :alt="product.name" class="card-img-top">
            <div class="card-body">
                <h2 class="h1">{{product.name}}</h2>
                <p class="card-text h3 lead">{{product.description}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Product } from '@/models/Produc.model';

@Component
export default class SingleProduct extends Vue{
    name = 'SinglePoduct';
    @Prop() product!: Product;

    source = 'http://localhost:3000/';
    created() {
        this.source += this.product.imageURL;
    }

    openProduct(product: Product) {
        this.$router.push(`/products/${product._id}`);
    }
}
</script>

<style scoped>

    .product {
        transition: all 0.5s;
        cursor: pointer;
    }

    .product:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 3px 17px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 3px 17px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 3px 17px 0px rgba(0,0,0,0.75);
    }
</style>