import axios from "axios"
axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Method'] = ['GET, POST, PUT, DELETE'];
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.baseURL = 'http://18.212.235.182:8080/api/'
if(sessionStorage.getItem("jwtToken") != null && sessionStorage.getItem("jwtToken") != ""){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("jwtToken");
}
