function isValidMail(mail)
{
    return  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    
}
function ischarCode(fname)
{
    return ('/^[A-Z]+$/i', ("abcAbc^Xyz"))+$/test(fname)
}


    // function ischarCode(lname)
    // {
    //     return (Event.charCode > 64 && Event.charCode < 91) || (Event.charCode > 96 && Event.charCode < 123) || (Event.charCode==32)
    // }


module.exports={
    isValidMail,ischarCode
}

