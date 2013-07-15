"use strict";

var $loader = $('.loader')
var container = document.getElementById('container')
var A = {
    blinds : document.getElementsByClassName('blind'),
    index : 0,
    setCurrent : function(i){
        if (arguments.length > 0) {this.index = arguments[i]}
        this.current = this.blinds[i] || this.blinds[this.index]
    },
    open : function(){
        this.current.classList.remove('closed')
        this.current.classList.add('opened')
    },
    close : function(){
        this.current.classList.remove('opened')
        this.current.classList.add('closed')
    },
    stagger : function(){
        this.setCurrent()
        this.open()
        this.index++
        if ( A.index > A.blinds.length - 1 ) return;
        setTimeout(A.stagger.bind(A), 110)
    }
}

function init(){
    setTimeout(A.stagger.bind(A), 250)
    container.addEventListener('webkitTransitionEnd', againHandler)
    container.addEventListener('transitionEnd', againHandler)
    container.addEventListener('transitionend', againHandler)
}

function again(){
    $loader.addClass('begin') 
    A.setCurrent(0)
    $(A.blinds).each(function(i,e){
        e.classList.remove('opened')
        e.classList.add('closed')
    })
    A.again = true
}


function againHandler(e){
    if (e.target === A.blinds[0] && A.again){
        setTimeout(A.stagger.bind(A), 100)
        A.again = false
    } else if ( e.target === A.blinds[A.blinds.length-1]) {
        $loader.removeClass('begin')
    } else { return }
}


$('#again').click(again)

function valueSwap($input1, $input2){
    $input1.change(function(e){
        $input2.val(e.target.value)
    })
    $input2.change(function(e){
        $input1.val(e.target.value)
    })

}

$(function(){
    var $fadeSlider = $('#duration'),
        $fadeText = $('#durationText'),
        $fade = $($fadeSlider, $fadeText),
        $staggerSlider = $('#stagger'),
        $staggerText = $('#staggerText'),
        $stagger = $($staggerText, $staggerSlider),
        $controls = $('#controls')

    $fadeText.val($fadeSlider.val())
    $staggerText.val($staggerSlider.val())
    
    valueSwap($fadeSlider, $fadeText)
    valueSwap($staggerSlider, $staggerText)
    
    $controls.on('change', $fade, function(e){ 
        $(A.blinds).css({
            webkitTransitionDuration : e.target.value + 'ms',
            mozTransitionDuration : e.target.value + 'ms',
            transitionDuration : e.target.value + 'ms'
        })
    })

})
