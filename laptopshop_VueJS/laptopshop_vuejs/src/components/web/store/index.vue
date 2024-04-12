<template>
  <div>
    <head>
      <title>Cửa hàng</title>
    </head>
    <div id="toast">
    </div>
    <section class="store">
      <div class="container">
        <div class="row">
          <div>
            <div class="breadcrumbs d-flex flex-row align-items-center col-12">
              <ul>
                <li><a href="/home">Trang chủ</a></li>
                <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Cửa hàng</a></li>
              </ul>
            </div>
            <div id="formStore">
              <div class="product-show-option col-4">
                <div class="row">
                  <div class="p-3 m-1">
                    <p class="filter-text">Sắp xếp: </p>
                    <div class="select-option col-11">
                      <select class="sort" v-model="formFilterProduct.sort" @change="getFilterProduct(1)">
                        <option value="low-high">Giá thấp đến cao</option>
                        <option value="high-low">Giá cao đến thấp</option>
                        <option value="a-z">Tên: A - Z</option>
                        <option value="z-a">Tên: Z - A</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                    <p class="filter-text">Danh mục: </p>
                    <div class="select-option col-11">
                      <select class="category" v-model="formFilterProduct.cateogryName" @change="getFilterProduct(1)">
                        <option value="all">Tất cả</option>
                        <option v-for="item in category" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                    <p class="filter-text">Thương hiệu: </p>
                    <div class="select-option col-11">
                      <select class="brand" v-model="formFilterProduct.brandName" @change="getFilterProduct(1)">
                        <option value="all" selected>Tất cả</option>
                        <option v-for="item in brand" :value="item.name" :key="item.name">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="p-3 m-1">
                      <p class="filter-text" for="price-range-slider">Khoảng giá:</p>
                    <div id="price-range-container">
                      <div id="price-range-slider"></div>
                      <div id="price-values">
                        <span class="price-values__min">{{ formatCurrency(formFilterProduct.minPrice) }}</span>
                        <span class="price-values__max" style="margin-left: 20px;">{{ formatCurrency(formFilterProduct.maxPrice) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-list ">
                <div class="row col-12">
                  <template v-if="listProduct.length > 0">
                    <div class="product-item col-lg-3 col-md-6 col-sm-6 col-12 " v-for="item in listProduct"  :key="item.id">
                        <div class="product-item" >
                            <div class="pi-pic " >
                              <img :src="item.img" alt="">
                              <ul>
                                <li class="w-icon active">
                                  <a @click="addToCart(item.id)"><i class="fa-solid fa-cart-shopping"></i></a>
                                </li>
                                <li class="w-icon active">
                                  <a @click="addToFavour(item.id)"><i class="fa-solid fa-heart"></i></a>
                                </li>
                                <li class="quick-view"><a :href="'/store/' + item.id">+ Quick View</a></li>
                              </ul>
                            </div>
                            <div class="pi-text">
                              <h5>{{ item.name }}</h5>
                              <div class="product-price">
                                {{ formatCurrency(item.price - (item.price * item.discount / 100)) }}
                                <del v-if="item.discount > 0">{{ formatCurrency(item.price) }}</del>
                            </div>
                            </div>
                            <div class="home-product-item__favourite">
                                <span>Giảm {{ item.discount }}%</span>
                            </div>
                        </div>
                    </div>
                  </template>
                  <div v-else>
                    <div class="col-lg-3 col-sm-6 col-6">
                      Không có sản phẩm phù hợp
                    </div>
                  </div>
                  <div class="pagination" id="pagination" v-if="paginationButtons.length >= 2">
                    <button v-for="page in paginationButtons" :key="page" 
                    :class="{ active: currentPage === page }" 
                    @click="PaginationButton(page).handleClick()">
                      {{ page }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import { showSuccessToast, showErrorToast, showWarnToast, showErrorToastMess, formatCurrency } from "../../../assets/web/js/main";
import productApi from '../../../service/Product';
import cartApi from '../../../service/Cart';
import favourApi from '../../../service/favour';
export default {
  data() {
    return {
      formFilterProduct: {
        sort: 'low-high',
        cateogryName: 'all',
        brandName: 'all',
        minPrice: 0,
        maxPrice: 30000000
      },
      currentPage: '',
      paginationButtons:[],
      listProduct: [],
      category: [],
      brand: [],
      totalPages: '',
      errorMsg: '',
      success: '',
      cart:{
        productId:'',
        num:'',
      }
    };
  },
  methods: {
    formatCurrency,
    async getFilterProduct(page){
      try{
        const res = await productApi.getFilterProduct(
          this.formFilterProduct.sort,
          this.formFilterProduct.cateogryName,
          this.formFilterProduct.brandName,
          this.formFilterProduct.minPrice,
          this.formFilterProduct.maxPrice,page)
        this.listProduct = res.data.listProduct;
        this.brand = res.data.brand;
        this.category = res.data.category;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
    
        this.SetupPagination(this.totalPages);

      }
      catch(err){
        console.log("loi store Get: "+err)
      }
    },
    async addToCart(id){
      try{
        this.cart.productId=id
        await cartApi.addToCart(this.cart)
        showSuccessToast('Thêm vào giỏ hàng thành công')
      }catch(err){
        showErrorToastMess('Thêm vào giỏ hàng thất bại')
      }
    },
    async addToFavour(id){
      if(sessionStorage.getItem("login"))
      {
        const res = await favourApi.addToFavour(id)
        if(res.responseCode == 1) 
          showSuccessToast('Đã thêm sản phẩm vào yêu thích !!')
        
        if(res.responseCode == 2)
          showWarnToast('Sản phẩm đã có trong yêu thích !!')
      }
      else{
        sessionStorage.setItem("err",true)
        this.$router.push("/auth/sign-in")
      }
    },

    PaginationButton (page) {
			return {
				page,
				isActive: this.currentPage === page,
				handleClick: async () => {
					console.log("page: "+page)
					await this.loadProducts(page);

				},
			};
		},
    SetupPagination (totalPage) {
			this.paginationButtons = [];

			let page_count = totalPage;
			for (let i = 1; i < page_count + 1; i++) {
				this.paginationButtons.push(i);
			}
		},
    async loadProducts(page) {
      try{
        const res = await productApi.getFilterProduct(
          this.formFilterProduct.sort,
          this.formFilterProduct.cateogryName,
          this.formFilterProduct.brandName,
          this.formFilterProduct.minPrice,this.formFilterProduct.maxPrice,page)

          this.listProduct = res.data.listProduct
          this.brand = res.data.brand
          this.category = res.data.category
          this.totalPages = res.data.totalPages
          this.currentPage = res.data.currentPage
      }
      catch(err) {console.log("loi store pagination !!!!")}
		},
    initPrice(){
      let timeout = null;
      const delay = 500;
      $("#price-range-slider").slider({
        range: true,
        min: 0,
        max: 30000000,
        values: [this.formFilterProduct.minPrice, this.formFilterProduct.maxPrice],
        slide: (event, ui) => {
          this.formFilterProduct.minPrice = ui.values[0];
          this.formFilterProduct.maxPrice = ui.values[1];
          clearTimeout(timeout); // Xóa timeout hiện tại (nếu có)
          timeout = setTimeout(() => {
            this.currentPage=1
            this.getFilterProduct(1);
          }, delay);
        }
      });
    },
  },
   mounted() {
     this.getFilterProduct(1);
     this.initPrice();
     if (sessionStorage.getItem("cart-empty")==1)
     {
        let mess = 'Giỏ hàng không có sản phẩm !!'
        showErrorToastMess(mess)
        sessionStorage.removeItem("cart-empty")
     }
  },
};
</script>
  
<style>

</style>