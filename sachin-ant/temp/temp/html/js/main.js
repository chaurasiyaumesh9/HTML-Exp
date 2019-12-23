$(window).on("load", function() {
    $('#preloader').fadeOut('slow',function(){$(this).remove();});
    //console.log("this will not be triggered");
});
$(window).ready(function(){
    animateTopPanel();
    addActive();
    checkUncheck();
    selectBank();
    loginpop();
    plusMinus();
    cartScroll();
    addItem();
    socialPop();
    customise();
    diyanchor();
});

// animate top panel
function animateTopPanel() {
    var shrinkHeader = 100;
    $(window).scroll(function() {
        var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
            $('#topPanel').addClass('shrink');
        }
        else {
            $('#topPanel').removeClass('shrink');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
}

// Active Heart
function addActive() {
    $('.btPanel .iconLink').click(function () {
        $(this).toggleClass('active');
        return false;
    })
}

// check uncheck radio
function checkUncheck() {
    $('.payMthLink').click(function () {
        $('.payMthLink').find('input[type=radio]').prop('checked', false);

        if($(this).find('input[type=radio]').prop('checked')==false){
            $(this).find('input[type=radio]').prop('checked', true);
        }else{
            $('.payMthLink').find('input[type=radio]').prop('checked', false);
        }
    })
}

// bank list
function selectBank(){
    $('.bankList a').click(function () {
        $('.bankList a').removeClass('active');
        $(this).toggleClass('active');
    })

    // fillter
    $('.dropdown-menu').on({
        "click":function(e){
            e.stopPropagation();
        }
    });
}

// login popup
function loginpop() {
    //signup
    $('.signup').click(function () {
        if($('#signupCont').is(':hidden')){
            $('#signupCont').fadeIn();
            $('#loginCont').hide();
            $('#login').find('.modal-title').html("Sign Up");
        }
        return false;
    })

    //login
    $('.login').click(function () {
        if($('#loginCont').is(':hidden')){
            $('#loginCont').fadeIn();
            $('#signupCont').hide();
            $('#login').find('.modal-title').html("Login");
        }
        return false;
    })

    // forgot password
    $('.forgetPass').click(function () {
        if($('#forgotCont').is(':hidden')){
            $('#forgotCont').fadeIn();
            $('#loginCont').hide();
            $('#login').find('.modal-title').html("Forgot Password");
        }
        return false;
    })
    $('.backToLog').click(function () {
        if($('#loginCont').is(':hidden')){
            $('#loginCont').fadeIn();
            $('#forgotCont').hide();
            $('#login').find('.modal-title').html("Login");
        }
        return false;
    })
    $('.restPass').click(function () {
        if($('.recPass').is(':hidden')){
            $('.recPass').fadeIn();
            $('.forget').hide();
        }
        return false;
    })

    // make payment
    $('.showAddress').click(function () {
        if($('#addForm').is(':hidden')){
            $('.delDetailAmt').hide();
            $('.delDetailAdd').hide();
            $('#addForm').fadeIn();
            $('#delDetails').hide();
            $('#makePayment').find('.modal-title').html("Add Address");
            $('#backPay').removeClass('text-hide');
        }
        return false;
    })
    $('#backPay').click(function () {
        $('.delDetailAmt').fadeIn();
        $('.delDetailAdd').fadeIn();
        $('#addForm').hide();
        $('#delDetails').fadeIn();
        $('#makePayment').find('.modal-title').html("Delivery Details");
        $(this).addClass('text-hide');
    })

    // donate
    $('#dntSub').click(function () {
        if($('.dntThanks').is(':hidden')){
            $('.dntThanks').fadeIn();
            $('#dntScreen1').hide();
            $('#donate').find('.modal-title').html("Thank You For your Time");
        }
        return false;
    })
    $('#backDnform').click(function () {
        $('.dntThanks').hide();
        $('#dntScreen1').fadeIn();
        $('#donate').find('.modal-title').html("Choose your Charity");
    })


    // processing loader
    $('.load').click(function() {
        var $this = $(this);
        var butName = $this.attr("name");
        var loadText = $this.attr("data-loading-text");
        $this.attr('disabled', 'disabled').html(loadText);
        setTimeout(function () {
            $this.removeAttr('disabled').html(butName);
        }, 3000)
    });
}

// plus minus
function plusMinus() {
    $(".minus").click(function(){
        var currentVal = parseInt($(this).next(".qty").val());
        if (currentVal != NaN && currentVal > 0) {
            $(this).next(".qty").val(currentVal - 1);
        }
    });
    $(".add").click(function(){
        var currentVal = parseInt($(this).prev(".qty").val());
        if (currentVal != NaN) {
            $(this).prev(".qty").val(currentVal + 1);
        }
    });
}

// cart scroll bar
function cartScroll(){
    $("#cartScroll").niceScroll({ cursorborder: "", cursorcolor: "#eeeeee", boxzoom: false });
    $(".diyScroll").niceScroll({ cursorborder: "", cursorcolor: "#eeeeee", boxzoom: false });
}

// add to cart
function addItem(){
    var addCart = document.getElementsByClassName('adCart'),
        mainCont = document.getElementsByClassName('plusMinus'),
        toaster = document.getElementById('showRight')

    function hasChanged() {
        $(toaster).addClass('hasChanged');
        setTimeout(function () {
            $(toaster).removeClass('hasChanged');
        },1000)
    }
    $(addCart).click(function () {
        $(this).addClass('invisible');
        $(this).parent().find(mainCont).removeClass('invisible');
        $(this).parent().addClass('noneBorder');
        $(toaster).addClass('active');
        hasChanged();
    })
}

// share social popover
function socialPop() {
    $("[data-toggle=popover]").each(function(i, obj) {
        $(this).popover({
            html: true,
            content: function() {
                var id = $(this).attr('id')
                return $('#popover-content-' + id).html();
            }
        });
    });
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
}

// customise
function customise() {
    $(".customise .cusList .custItem").click(function () {
        $(this).toggleClass('added');
    })
}

// diy anchoring
function diyanchor(){
    var ActualPositions = (function(){
        var positions = {};
        $('.catNavItem > a').each(function(){
            var targetId = $(this).attr('href');
            //console.log('targetId : ',targetId);
            if (targetId && targetId != "#") {
                var targetElement = $($(this).attr('href')) || null;
                if ( targetElement ) {
                    var _y = targetElement.position().top;
                    positions[targetId] = _y;
                };
            };
           
        });
        return positions;
    })();
    $('.catNavItem > a').click(function(e){
        e.preventDefault();
        //console.log('ActualPositions :',ActualPositions);
        var targetID = $(this).attr('href');
        var targetElement = $($(this).attr('href'));
        //console.log('target : ',target.eq(0));
        if(targetElement){
            var scrollTo = ActualPositions[targetID];
            //console.log('scrollTo :',scrollTo);
            $('.diyScroll').animate({scrollTop: scrollTo+'px'}, 800);
        }
    });
}

