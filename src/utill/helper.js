
function printDate(){
    let now = new Date()
    console.log(now.getDate())
}

function printMonth(){
 let no = new Date()
console.log("the current Month is:",no.getMonth()+1)

}
function BatchInfo(){
    
   console.log("Plutonium,w3D5,nodejs")
   
   }
   module.exports.printDate=printDate
   module.exports.printMonth=printMonth
   module.exports.BatchInfo= BatchInfo