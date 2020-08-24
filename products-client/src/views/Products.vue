<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="product in products" :key="product._id">
                <SingleProduct :product="product" class="mb-3" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getProducts } from '@/api/queries';
import { Product } from '@/models/Produc.model';
import SingleProduct from '@/components/SingleProduct.vue';

@Component({
    components: {
        SingleProduct
    }
})
export default class Products extends Vue {

    products: Product[] = [];

    async created() {
        this.products = await getProducts();
    }
}
</script>

<style>

</style>