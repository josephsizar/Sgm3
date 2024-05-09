Vue.config.delimiters =['[[',']]']

let app = new Vue({
  el: "#app",

  data:{

   nums:[1,2,3,4,5,6,7,8,9],
   signs:["-","+","="],
   btm:[0,":"],
   test:"",
   total:[],
   disable_numbers:false,
   is_sign_disabled:true,
   is_col_dis:false,
   timeone:[],
   timetwo:[],
   selSign:"",
   historyTimes:[],
   
   

  },

  methods:{

    tester(num){
    this.addnum(num)
    },
    signer(sign){
      switch(sign){
        case ":":
          if(!this.test.includes(":")){
          this.test += ":"
          }
          this.is_col_dis = true   
          break
        case "+":
          if(this.selSign.length ===0){
            this.selSign = "+"
          }
          this.is_sign_disabled = true
          if (this.test.length > 0 && this.test.includes(":")
          ){
          if(this.timeone.length >0){
            this.timetwo = this.test.split(":");
            
          }else{
            this.timeone = this.test.split(":");
            
          }
          }
          this.test =""
          
          break
        case "-":
          if(this.selSign.length ===0){
            this.selSign = "-"
          }
          this.is_sign_disabled = true
          if(this.test.length >0 && this.test.includes(":")
          ){
          if(this.timeone.length >0){
          this.timetwo= this.test.split(":");
          
          }else{
          this.timeone = this.test.split(":");
          
          }
          }
          this.test = ""
          break
        case "=":
          if(this.test.length >0 && this.test.includes(":")){
          if(!this.timeone.length >0){
            this.timeone = this.test.split(":")
          }else if(!this.timetwo.length >0){
            this.timetwo = this.test.split(":")
          }
            this.test = ""
          
          }

          if(this.timeone.length > 0 && this.timetwo.length > 0){
            let result = this.calculateall()
            this.test = result
            let tone_0 = this.timeone[0].length >=2 ? this.timeone[0] : `0${this.timeone[0]}`
            let tone_1 = this.timeone[1].length >= 2 ? this.timeone[1] : `0${this.timeone[1]}`
            
            let two_0 = this.timetwo[0].length >=2 ? this.timetwo[0] : `0${this.timetwo[0]}`
            let two_1 = this.timetwo[1].length >= 2 ? this.timetwo[1] : `0${this.timetwo[1]}`

            let rst = result.split(":")
            let r1 = rst[0].length >= 2 ? rst[0] : `0${rst[0]}`
            let r2 = rst[1].length >= 2 ? rst[1] : `0${rst[1]}`

            let stringtime_c = `${tone_0}:${tone_1} ${this.selSign} ${two_0}:${two_1} = ${r1}:${r2} `

            this.historyTimes.push(stringtime_c)
            this.timeone = []
            this.timetwo = []
            this.selSign = ""
            

           

          }
          

          break
        case "dl":
          this.selSign = ""
          this.timeone = []
          this.timetwo = []
          this.test = ""
          
          break
        case "x":
          this.test = this.test.slice(0,-1)
          break
        default:
          alert("Not a in our signs!")
      }
      
    },
    ftest(){
      alert("yes")
    },
    addnum(num){
      if(this.test.includes(":")){
        this.is_col_dis = true
        dur = this.test.split(":")
        if(dur[1].length===2){
         this.is_sign_disabled = false
         if(this.timeone.length > 0 && this.selSign.length >0){
          this.timetwo = dur
         }else{
          this.timeone = dur

         }
          this.test = ""


        }else{
        this.is_sign_disabled = true
        this.test += num

        }
      }else{
      
       this.test += num
       this.is_col_dis = false

      }


    },

  calculateall(){

     let m_one = parseInt(this.timeone[1])
     let h_one = parseInt(this.timeone[0]) 

     let t_min_one = m_one + (h_one * 60) 

     let m_two = parseInt(this.timetwo[1])
     let h_two = parseInt(this.timetwo[0])

     let t_min_two = m_two + (h_two * 60)

     let min_res = 0
     if(this.selSign === "-"){
      min_res = t_min_one - t_min_two
     }else{

      min_res = t_min_one + t_min_two

     }

     let t_hrs = Math.floor(min_res / 60)
     let t_muts = min_res % 60

     return `${t_hrs}:${t_muts}`
  }



  }
})
