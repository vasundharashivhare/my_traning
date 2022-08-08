function namelowercase(){
    const name1 ="VASUNDHARA SHIVHARE"
    const fullName =name1.toLowerCase();
    console.log(fullName)
    
}
function uppercase(){
    const name2 ="vasu shivhare"
    const fullName2 =name2.toUpperCase();
    console.log(fullName2)
  
}
function trim(){
    const name ="   vasu shivhare  "
    const fullName =name.trim();
    console.log(fullName)
    
}
module.exports.namelowercase=namelowercase
module.exports.uppercase=uppercase
module.exports.trim=trim