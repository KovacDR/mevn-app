<template>
    <div class="card card-body mb-4">
        <form @submit="onSubmit">
            <div class="row">
                <div class="col-md-5 img-sec">
                    <input type="file" accept="image/*" class="d-none" ref="file" @change="onImageSelected($event)">
                    <img :src="imageSelected" :class="edit ? 'not' : ''" class="w-100 preview" @click="$refs.file.click()">
                    <button v-if="imageSelected === ''" type="button" class="btn btn-dark selector mx-auto my-auto" @click="$refs.file.click()">Upload File</button>
                </div>
                <div class="col-md-7">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="product.name" required autocomplete="off">
                        <small>Insert the Product name</small>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="product.description" required autocomplete="off">
                        <small>Insert the Product description</small>
                    </div>
                    <button type="submit" class="btn btn-primary">Save Product</button>
                    <button type="button" class="btn btn-dark ml-3" @click="$router.push('/products')">Cancel</button>
                </div>
            </div>
        </form>
            <button type="button" v-if="edit" class="btn btn-danger mt-3" @click="doDelete">Delete</button>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { Product } from '@/models/Produc.model';
import { addPRoduct, getOneProduct, updateProduct, deletePoduct } from '@/api/queries';

interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component
export default class Form extends Vue {
    
    product: Product = {
        name: '',
        description: '',
        imageURL: ''
    }

    edit: boolean;

    imageSelected: string | ArrayBuffer | null= '';

    file: File;

    constructor() {
        super();
        this.file = new File([], 'file');
        this.edit = false;
    }

    async beforeCreate() {
        if(this.$route.params.id) {
            const product = await getOneProduct(this.$route.params.id);
            this.product = product;
            this.imageSelected = `http://localhost:3000/${this.product.imageURL}`;
            this.edit = true;
        }
    }
    
    onImageSelected(event: HtmlInputEvent) {
        if(event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            // preview
            const reader = new FileReader();
            reader.onload = () => this.imageSelected = reader.result;
            reader.readAsDataURL(this.file);
        }
    }

    async onSubmit(e: Event) {
        e.preventDefault();
        if(!this.edit) {
            if(this.imageSelected === '') {
                alert('You must select an image');
                return false;
            }
            console.log('im submitting')
            const fd = new FormData();
            fd.append('name', this.product.name);
            fd.append('description', this.product.description);
            fd.append('image', this.file);
            await addPRoduct(fd);
            this.$router.push('/products');
        } else {
            await this.onEdit();
        }
    }

    async onEdit() {
        console.log('im editting');
        const fd = new FormData();
        fd.append('name', this.product.name);
        fd.append('description', this.product.description);
        await updateProduct(this.$route.params.id, fd);
        this.$router.push('/products');
    }

    async doDelete() {
        await deletePoduct(this.$route.params.id);
        this.$router.push('/products');
    }

}
</script>

<style scoped>

    .preview {
        cursor: pointer;
    }

    .img-sec {
        max-height: 500px;
    }

    button[type="button"].selector {
        display: inline-block !important;
        height: 100%;
        width: 100%;
    }

    .not {
        pointer-events: none;
    }
</style>