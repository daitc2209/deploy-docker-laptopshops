<template>
  <div>
	<head><title>Lịch sử mua hàng</title></head>
    <section class="breadcrumbs d-flex flex-row align-items-center col-12 container mt-3">
      <ul class="m-0">
        <li>
          <a href="/home">Trang chủ</a>
        </li>
        <li class="active">
          <a href="#">
            <i class="fa fa-angle-right" aria-hidden="true"></i>Lịch sử mua hàng
          </a>
        </li>
      </ul>
    </section>

    <section class="purchase-history p-0">
      <div class="order-container container">
		
		<div class="col-3"><menuShared/></div>
		<div id="toast">
    	</div>
		<div class=" col-9 p-0">
        	<div class="row">
				<div class="purchase-history__order">
					<div class="purchase-history__order-container">
						<div class="content-item">
							<p class="item-content title">{{ this.total_order }}</p>
							<p class="item-content text">Đơn hàng</p>
						</div>
						<div class="content-item">
							<p class="item-content title">{{ this.total_order_received }}</p>
							<p class="item-content text">Tổng đơn đã giao thành công</p>
						</div>
					</div>
				</div>
				<div class="order-range">
					<div class="order-date">
						<label class="order-range__from" for="startDate">Từ </label>
						<div class="date-picker">
							<VueDatePicker v-model="startDate" format="yyyy-MM-dd"></VueDatePicker>
						</div>
					</div>
					<div class="order-date">
						<label class="order-range__from" for="endDate">Đến </label>
						<VueDatePicker v-model="endDate" format="yyyy-MM-dd"></VueDatePicker>
					</div>
					<button class="order-range__btn btn btn-primary" @click="search">Tìm kiếm</button>
				</div> 
				<div class="order-container__status">
					<div class="order-status">
						<button @click="getOrderByStatus('all')" id="btn-all" class="order-status__item active">Tất cả</button>
						<button @click="getOrderByStatus('pending')" id="btn-pending" class="order-status__item">Chờ xác nhận</button>
						<button @click="getOrderByStatus('confirmed')" id="btn-confirmed" class="order-status__item">Đã xác nhận</button>
						<button @click="getOrderByStatus('delivering')" id="btn-delivering" class="order-status__item">Đang vận chuyển</button>
						<button @click="getOrderByStatus('received')" id="btn-received" class="order-status__item">Đã giao</button>
						<button @click="getOrderByStatus('cancelled')" id="btn-cancelled" class="order-status__item">Đã hủy</button>
					</div>
				</div>
				<!-- <h3 class="text-center mb-4">Danh sách đơn hàng</h3> -->
				<table>
					<thead>
					<tr>
						<th>No.</th>
						<th>Tên người đặt</th>
						<th>Ngày đặt</th>
						<th>Tổng tiền</th>
						<th>Hình thức thanh toán</th>
						<th>Thanh toán</th>
						<th>Trạng thái</th>
						<th>Thao tác</th>
					</tr>
					</thead>
					<tbody>
					<template v-if="order != null && order != ''">
						<tr v-for="(item, index) in order" :key="item.id" :id="'trow_' + item.id">
						<td class="td1">{{ index + 1 }}</td>
						<td class="td2">
							<h6>{{ item.name }}</h6>
						</td>
						<td class="td3">
							<h6>{{ formatDate(item.created_at) }}</h6>
						</td>
						<td class="td4">
							<h6>{{ formatCurrency(item.total_money) }}</h6>
						</td>
						<td class="td5">
							<h6>{{ item.payment }}</h6>
						</td>
						<td class="td6">
							<h6>{{ getStateCheckoutDisplay(item.stateCheckout) }}</h6>
						</td>
						<td class="td7">
							<h6>{{ getStateOrderDisplay(item.stateOrder) }}</h6>
						</td>
						<td class="td8 text-primary">
							<h6 data-bs-toggle="modal" :data-bs-target="'#Modal' + item.id">See details</h6>
							</td>

							<div class="modal" :id="'Modal' + item.id">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title">Chi tiết đơn hàng</h4>
											<button id="openModal" type="button" class="btn-close" data-bs-dismiss="modal" ></button>
										</div>
										<div class="modal-body p-0">
											<section class="order p-0">
											<div class="container">
												<div class="order-form">
												<div class="row">
													<div class="col-lg-6">
													<div class="information-detail">
														<h4 class="order-text">Thông tin đơn hàng</h4>
														<div class="col-12 mb-2 border info-user p-3">
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Mã đơn hàng:</label>
																<label>#{{ item.codeOrder }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Họ và tên :</label>
																<label>{{ item.name }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Email :</label>
																<label>{{ item.email }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">SĐT :</label>
																<label>{{ item.phone }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Địa chỉ nhận hàng :</label>
																<label>{{ item.address_delivery }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Ngày đặt:</label>
																<label>{{ formatDate(item.created_at) }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Số lượng :</label>
																<label>{{ item.num }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Tổng tiền :</label>
																<label>{{ formatCurrency(item.total_money) }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Hình thức thanh toán :</label>
																<label>{{ item.payment }}</label>
															</div>
															<div class="col-lg-12 d-flex align-items-center">
																<label class="info-user_text">Ghi chú :</label>
																<label>{{ item.note }}</label>
															</div>
														</div>
													</div>
													</div>
													<div class="col-lg-6">
														<div class="place-order">
															<h4 class="order-text">Thông tin sản phẩm</h4>
															<div class="order-total">
																<ul class="order-table p-0">
																	<li><span>Sản phẩm</span><span>Số lượng</span><span>Giá</span><span>Discount</span><span>Tổng</span></li>
																	<li class="fw-normal" v-for="(orderdetail, index) in item.orderdetail" :key="index">
																			<span><img :src="orderdetail.product.img" style="width:50px; height:50px" alt="Product Image" /></span>
																			<span>{{orderdetail.num}}</span>
																			<span>{{ formatCurrency(orderdetail.product.price) }}</span>
																			<span>{{ orderdetail.product.discount }}%</span>
																			<span>{{ formatCurrency(orderdetail.totalPrice) }}</span>
																	</li>
																	<li class="total-price">Tổng số lượng <p>{{item.num}}</p></li>
																	<li class="total-price">Tổng tiền <p>{{ formatCurrency(item.total_money) }}</p></li>
																	<li class="total-price">Phí vận chuyển <p>{{formatCurrency(40000)}}</p></li>
																	<li class="total-price">Thành tiền <p>{{formatCurrency(item.total_money+40000)}}</p></li>
																</ul>
																<div :id="'cancelOrderBtn_'+ item.id" v-if="(item.stateOrder === 'PENDING')" class="order-btn"><a @click="clickCancelOrder(item.id, this.status)"><button type="button" class="site-btn place-btn">Hủy đơn hàng</button></a></div>
																											
															</div>
														</div>
													</div>
												</div>
												</div>
											</div>
											</section>
										</div>
										<!-- Modal footer -->
										<div class="modal-footer">
											<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
										</div>
									</div>
								</div>
							</div>
						</tr>
					</template>
					<template v-else>
						<tr>
						<td colspan="8">
							<h5 class="text-start p-4">Không có bản ghi nào!!!</h5>
						</td>
						</tr>
					</template>
					</tbody>
				</table>
			</div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import userApi from '../../../service/User';
import {showSuccessToast, showErrorToastMess, formatDate, formatCurrency, getStateCheckoutDisplay, getStateOrderDisplay } from "../../../assets/web/js/main";
import menuShared from "../profile/menu-shared.vue";
export default {
	components: {
        menuShared,
		VueDatePicker
    },
	data() {
		return {
			order: [],
			total_order: 0,
			total_order_received:0,
			status:"",
			startDate: null,
			endDate: null,
		};
	},
  	methods: {
		formatDate,
		formatCurrency,
		getStateCheckoutDisplay,
		getStateOrderDisplay,

		async getOrderByStatus(data){
			try{
				var buttons = document.getElementsByClassName('order-status__item');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].classList.remove('active');
				} 
				var selectedButton = document.getElementById('btn-' + data);
					selectedButton.classList.add('active');

				//Cập nhật lại trạng thái đơn hàng
				this.status = data
				
				//Nếu không chọn ngày thì sẽ lọc bình thường
				if(this.startDate !== null || this.endDate !== null)
					this.search()
				else{
					const res = await userApi.getPurchaseHistory(data)
					if(res.data.order != null)
						this.order = res.data.order.reverse()
					else
						this.order = null
				}
			}catch(err){
				console.log("loi purchase history !!!" + err)
			}
		},
		async search(){
			try{
				let start = null
				let end = null
				if(this.startDate !== null || this.endDate !== null)
				{
					start = this.formatDate(this.startDate)
					end = this.formatDate(this.endDate)
				}
				let status = this.status
				let data = {start,end,status}
				if (start > end) {
					showErrorToastMess('Ngày bắt đầu không được lớn hơn ngày kết thúc.')
				} else {
					const res = await userApi.findByRangeDay(data)
					if(res.data.orderDay != null)
						this.order = res.data.orderDay.reverse()
					else
						this.order = null
				}
			}
			catch(err){
				showErrorToastMess("loi r")
				console.log("err: "+err)
			}
		},

		async clickCancelOrder(id,status){
			try{
				this.startDate = null
				this.endDate = null
				const res = await userApi.postPurchaseHistory(id,status)
				if(res.data){
					this.order = res.data.order.reverse()
					this.getTotalOrderReceived()
					showSuccessToast('Hủy đơn hàng thành công')
				}
				bootstrap.Modal.getInstance(document.getElementById("Modal"+id)).hide()
			}
			catch(err){
				showErrorToastMess('Xảy ra lỗi khi hủy đơn hàng. Vui lòng thử lại sau !')
			}
			// await userApi.postSendMailCancelled(codeOrder)
		},

		async getTotalOrderReceived(){
			try{
				const res = await userApi.getTotalOrderReceived()
				this.total_order = res.data.total_order
				this.total_order_received = res.data.total_order_received
			}catch(err){
					console.log("lỗi lấy tổng đơn hàng đã nhận và tiền đã tiêu !!!" + err)
				}
		},

		init(){
			this.getTotalOrderReceived();
			this.getOrderByStatus("all")
		}
	},
	mounted(){
		if(sessionStorage.getItem("login"))
			this.init()
		else
		{
			window.location.href = "/auth/sign-in"
			sessionStorage.setItem("err",true)
		}
	
  }
};
</script>
  
<style>

</style>