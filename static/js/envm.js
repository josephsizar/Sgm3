
Vue.config.delimiters = ['[[',']]']

var app = new Vue({
  el: "#app",
  data:{
     
     is_form:true,
     lieu:"Meknes",
     dato:"24/4/2024",
     datob:"",
     lieulist:[
       "1° BAFRA",
       "2° BAFRA",
       "3° BAFRA",
       "4° BAFRA",
       "5° BAFRA",
       "6° BAFRA",
       "7° BAFRA",
       "BASG",

       "TANGER",
       "RABAT",
       "SALE ECOLE DE LANGE",
       "SALE"
     ],
     but:"Détachment a Tanger",
   },
  
  methods:{

    genpdf(){
      let name = this.but + this.dato.replace("/\//g","") +".pdf"

      let pg = document.getElementById("pdf")
      
      html2PDF(pg,{
        jsPDF:{
          format:"a4",

        },
        imageType: 'image/jpeg',
        output: name
      })

     },

    datoHandle(){
      const dateParts = this.datob.split("-")
     // alert(dateParts)
      const year  = dateParts[0]
      const month = dateParts[1]
      const day   = dateParts[2]

      this.dato = `${day}/${month}/${year}`

    },
    timeHandle(){

    }

}
  
})
