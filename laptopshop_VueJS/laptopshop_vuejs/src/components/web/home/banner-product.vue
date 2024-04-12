<template>
    
  <section class="container banner-brand">
		<div class="row">
			<div class="col-md-4 col-sm-4 col-4 py-3 py-md-0">
				<div class="card"><a href="#laptop"><img src="../../../images/banner/ASUS-1.png" alt=""></a></div>
			</div>
			<div class="col-md-4 col-sm-4 col-4 py-3 py-md-0">
				<div class="card"><a href="#keyboard"><img src="../../../images/banner/KEYBOARD-LOGITECH-1.png" alt=""></a></div>
			</div>
			<div class="col-md-4 col-sm-4 col-4 py-3 py-md-0">
				<div class="card"><a href="#mouse"><img src="../../../images/banner/MOUSE-LOGITECH-5.png" alt=""></a></div>
			</div>
		</div>
		<h1 class="m-4 text-center" style="margin-top: 30px; color: #1c1c50; text-shadow: 1px 1px 1px black;">THƯƠNG HIỆU</h1>
		<div class="row mb-4">
			<div class="col-md-3 col-sm-3 col-3 py-3 py-md-0 mt-2" v-for="item in brands" :key="item.id">
				<div class="card brands"><img :src="item.img" alt=""></div>
			</div>
		</div>
	</section>
	
</template>

<script>
import brandsApi from "../../../service/Brands";
export default {
	data() {
		return {
            brands: []
        }
	},
	methods:{
		async getBrands(){
            try{
                const res = await brandsApi.getBrands()
                this.brands = res.data.brands
            }
            catch(err){
                console.log("err: "+err)
            }
        },
	},
	mounted(){
		this.getBrands()
	}
}
</script>

<style>
@import url("../../../assets/web/css/banner-product.css");
</style>