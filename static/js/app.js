Vue.config.delimiters = ['[[',']]']

var app = new Vue({
  el:"#app",
  data: {
    message: "Alert",
    fm1: false,
    checked_ids:[],
    checked_ids_string:"",
    is_pdfs:false,
  },
  methods:{
    popAlert(){
      alert(this.checked_ids_string)
    },

    handleChange(id){

      if(this.checked_ids.includes(id)){
        let  idIn = this.checked_ids.indexOf(id)
        this.checked_ids.splice(idIn,1)
        this.checked_ids_string = this.checked_ids.join("-")
        

      }else{

        this.checked_ids.push(id)
        this.checked_ids_string = this.checked_ids.join("-")

      }

      if(this.checked_ids.length === 0){
      this.is_pdfs = false

      }else{

       this.is_pdfs = true
      }

    },

    toggle_fm1(){

      this.fm1 = !this.fm1
    },
    handleDelete(id){
      let pass = window.prompt("Enter pass :")

      if(pass==="abdo"){

        const url = "http://127.0.0.1:5000/user/delete?id="+id 
        fetch(url)
          .then(response => response.json())
          .then(data =>{
            if(data.message === "ok"){
              
              location.reload()
            }else{
             alert("Did not Deleted")
            }
          })
          .catch(error => alert("Error "))

        
      }else{
        alert("wrong password")
      }
    }
  }
})
