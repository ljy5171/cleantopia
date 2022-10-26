
const $lnb_bg = $('header>.lnb_container');
const $lnb = $('header>.container>nav>.gnb>.lnb');
const $lnb2 = $('header>.container>nav>.gnb>.lnb>a');
const $gnb = $('header>.container>nav>.gnb');
const $ul = $('header>.container>nav>.gnb>.lnb>.ul_container');
const $mnu = $('header>.container>.mnu_btn');
const $snb = $('header>.container>.snb');
const $nav_icon = $('header>.container>nav>.gnb>li>a');



const $btnPrev = $('section>article>.icons>p:nth-child(1)');
const $btnNext = $('section>article>.icons>p:nth-child(2)');
const $container = $('section>article:nth-of-type(1)>.slides>.slides-container');
const $indicator = $('section>article:nth-of-type(1)>.icons>.circle>a');
const $btnAuto = $('section>article:nth-of-type(1)>.icons>p:nth-child(5)');

let nowIdx = 0;
let intervalKey = null;

$indicator.on('click',function(evt){
    evt.preventDefault();
    
    nowIdx = $indicator.index(this);
    
    $container.stop().animate({left:-(100*nowIdx)+'%'},400);/*얘가문제? */
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    
});

$btnPrev.on('click', function(evt){
    evt.preventDefault();
    
    // nowIdx = $indicator.index(this);
    
    
    $container.stop().animate({
        left: 0
    },400,function(){
        if(nowIdx>0){
            nowIdx=0;
        }else{
            nowIdx=1;
        }
        $container.children('li').last().prependTo($container);
        $container.css('left','-100%');
        
        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    });
});


$btnNext.on('click', function(evt){
    evt.preventDefault();
    
    // nowIdx = $indicator.index(this);
    
    $container.stop().animate({
        left: '-200%'
    },400,function(){
        if(nowIdx<1){
            nowIdx=1;
        }else{
            nowIdx=0;
        }
        $container.children('li').first().appendTo($container);
        $container.css('left','-100%');
        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    });
})

const autoPlay = function(){
    clearInterval(intervalKey);
    
    
    intervalKey = setInterval(function(){
        $btnNext.click();
        
    },4000)};
    
    autoPlay();
    
    


$btnAuto.on('click',function(evt){
    evt.preventDefault();
    
    
    if($(this).hasClass('pause')){
        
        intervalKey = setInterval(function(){
            $btnNext.click();
            
        },4000)
        
        $(this).removeClass('pause');
        
    }else{
        clearInterval(intervalKey);
        
        $(this).addClass('pause');
    }
});



$mnu.on('click',function(evt){
    evt.preventDefault();
    
    $snb.toggle({
        display:'block'
    });
    $lnb.animate({width:"toggle"},200)({
        display:'block'
    });
});


if($(window).width()<=640){
    $lnb2.on('click',function(evt){
        evt.preventDefault();
    nowIdx = $lnb2.index(this);
    
    
    $ul.eq(nowIdx).stop().toggle(200);
    $nav_icon.eq(nowIdx).toggleClass('on');
    
    });
}else{
    $lnb.on('mouseenter',function(){
        nowIdx = $lnb.index(this);

        $lnb_bg.stop().slideDown(200);
        $ul.eq(nowIdx).stop().slideDown(200);
    });
    $lnb.on('mouseleave',function(){
        nowIdx = $lnb.index(this);
    
        $lnb_bg.stop().slideUp(200);
        $ul.eq(nowIdx).stop().slideUp(200);
    });
}

$(window).resize(function(){document.location.reload();})
