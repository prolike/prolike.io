
function githubIssue() {
    var element = document.getElementById("btn");
        element.parentNode.removeChild(element);

    if (document.getElementById('issue_yes').checked) {

        document.getElementById("response").innerHTML = 
        '<div class="col-12"><h4>Github Repo</h4><p>Choose the repository from the list, or type it manually in the format "user/repo"</p><input type="radio" name="repo" value="prolike/copenhagencoaching.dk"> CCC <br><input type="radio" name="repo" value="prolike/ccc-moodle"> CCC <br><input type="radio" name="repo" value="prolike/ccc-support"> CCC <br><input type="radio" name="repo" value="prolike/cyklingudenalder.dk"> cyklingudenalder.dk <br><input type="radio" name="repo" value="itmorten/itsystemdesign"> IT System Design <br><input type="radio" name="repo" value="prolike/dillydally"> Dilly Dally <br><input type="radio" name="repo" value="republicdomain/republicdomain.dk"> RePublicDomain <br><input type="radio" name="repo" value="prolike/wteam.dk"> wteam.dk <br><input type="radio" name="repo" value="prolike/prolike.io"> Prolike <br><input type="radio" name="repo" value="prolike/champagnekaelderen"> champagnekaelderen <br><input type="radio" name="repo" value=""> other <input type="text> <br></div> <div class="col-12"><h4>Issue number <span>*</span></h4><input type="text" required></div><div class="col-12"><h4>Fixed price</h4><p>(hh:MM) Default is, that the work will billed as per the estimate on the issue. You only need to use this optional field if you want to override that default (e.g. to indicate that it is free of charge)</p><input type="time" name="fixedPrice"></div><div class="col-12"><button class="btn">Submit</button></div>'

    } else {
        document.getElementById("response").innerHTML = 
        '<div class="col-12"> <h4>Category <span>*</span></h4><select class="dropdown" name="category"><option value="discussingCustomerAffairs">Discussing customer affairs</option><option value="marketing">Marketing</option><option value="accountManagement">Account management</option><option value="recruitment/Retention">Recruitment/retention</option><option value="sales">Sales</option><option value="fridaysCodeCafe">Fridays code cafe</option><option value="event">Attended an event</option><option value="meeting">Meeting</option><option value="bookKeeping">Book keeping</option></select></div><div class="col-12"><h4>Describe the issue <span>*</span></h4><input type="text"></div><div class="col-12"><button class="btn">Submit</button></div>'
    }
}