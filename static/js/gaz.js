
Vue.config.delimiters =['[[',']]']

let app =  new Vue({

  el: "#app",
  data:{
    timeinput:"",
    timearray:[],
    totalTimes:"00:00",
    tableHeads:["Duration","Number"]

  }
  ,

  methods:{

    get_total(){

     this.timearray.push(this.timeinput);

    let minutes = 0 
    let hours = 0 

    this.timearray.forEach(ele => {
      let hm = ele.split(":")
      hours += parseInt(hm[0]);
      minutes += parseInt(hm[1]);

      
      
      
    })

    hours += Math.floor(minutes/60)

    minutes = minutes % 60

      if(hours >= 10){
        if(minutes >= 10){
          this.totalTimes =`${hours}:${minutes}` 
        }else{
          this.totalTimes = `${hours}:0${minutes}`

        }

      }else{
        if(minutes >= 10){
          this.totalTimes = `0${hours}:${minutes}`
        }else{
          this.totalTimes = `0${hours}:0${minutes}`
        }
      }
    


    }


  }
})
