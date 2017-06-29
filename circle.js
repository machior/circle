/**
 * Created by Bartek on 26.05.2017.
 */

var radius = 31;
var step = 5;

function circValue(percent){
    window.clearInterval(window.timer);
    var dd = $("#arc").attr("d");

    var i = dd.split("L").length - 1;
    if(i<1 || !i)   i=0;

    var demandedAngle = percent/100 * 360;
    var angle = step * i;

    if(angle > demandedAngle)
        buttonCircRegr(i, angle, demandedAngle);
    else
        drawCircle(i, angle, demandedAngle);

}

function buttonCircRegr(i, angle, demandedAngle){

    window.timer = window.setInterval(
        function() {
            angle -= step;
            if(angle+step <= demandedAngle){
                window.clearInterval(window.timer);
                return;
            }

            var dd = $("#arc").attr("d");
            var n = dd.lastIndexOf("L");
            var res = dd.substring(0, n);

            actualisePseudoGif(res, angle/360*50);
            i--;
        }
        ,15)
}

function drawCircle(i, angle, demandedAngle) {

    window.timer = window.setInterval(
        function() {
            angle += step;
            if(angle+step >= demandedAngle){
                window.clearInterval(window.timer);
                return;
            }
            angle %= demandedAngle;
            var radians= (angle/180) * Math.PI - Math.PI/2;
            var x = 48.1 + Math.cos(radians) * radius;
            var y = 42 + Math.sin(radians) * radius;
            var e = $("#arc").attr("d");
            if(i==0)
                var d = e+ " M "+x + " " + y;
            else
                var d = e+ " L "+x + " " + y;

            actualisePseudoGif(d, angle/360*50);
            i++;
        }
        ,15)
}

function actualisePseudoGif(d, newValue){
    $("#arc").attr("d", d);
    $('#slider_handle').css('transform', "translate("+ (newValue-5) +"px,0)");
    var roundedValue = Math.round( newValue );
    value.innerHTML = roundedValue*2;

    if(roundedValue>9)
        value.style.transform = "translate(36px, 49px)";
    else
        value.style.transform = "translate(42px, 49px)";
}