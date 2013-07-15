"use strict";

function Slide(h1){
    var index = index || 0
    var opened = false
    var self = this
    self.blinds = h1.children


    function setCurrent(i){
        if (arguments.length > 0) {self.index = arguments[0]}
        self.current = self.blinds[i] || self.blinds[self.index]
    }

    function open(){
        setCurrent()
        self.current.classList.remove('closed')
        self.current.classList.add('opened')
        self.index++
        if ( self.index > self.blinds.length - 1 ) return;
        setTimeout(open.bind(self), 110)
    }

    function close(){
        setCurrent()
        self.current.classList.remove('opened')
        self.current.classList.add('closed')
        self.index++
        if ( self.index > self.blinds.length - 1 ) return;
        setTimeout(close.bind(self), 110)
    }

    self.staggerOpen = function(){
        opened = true
        setCurrent(0)
        open()
    }

    self.staggerClose = function(){
        opened = false
        setCurrent(0)
        close()
    }

    self.isOpen = function(){
        return opened
    }
}

var $loader = $('.loader')
var container = document.getElementById('container')
var A = {
    blinds : document.getElementsByClassName('blind'),
    index : 0,
    setCurrent : function(i){
        if (arguments.length > 0) {this.index = arguments[0]}
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
    staggerOpen : function(){
        this.setCurrent()
        this.open()
        this.index++
        if ( this.index > this.blinds.length - 1 ) return;
        setTimeout(this.staggerOpen.bind(A), 110)
    },
    staggerClose : function(){
        this.setCurrent()
        this.close()
        this.index--
        if ( this.index > this.blinds.length - 1 ) return;
        setTimeout(this.staggerClose.bind(A), 110)
    }
}

function init(){
    setTimeout(A.staggerOpen.bind(A), 250)
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
        setTimeout(A.staggerOpen.bind(A), 100)
        A.again = false
    } else if ( e.target === A.blinds[A.blinds.length-1]) {
        $loader.removeClass('begin')
    } else { return }
}


$('#again').click(again)
$('#out').click(function(){$('#quote').addClass('out').removeClass('next, in')})
$('#in').click(function(){$('#quote').addClass('in').removeClass('next, out')})
$('#next').click(function(){$('#quote').addClass('next').removeClass('out, in')})

function valueSwap($input1, $input2){
    $input1.change(function(e){
        $input2.val(e.target.value)
    })
    $input2.change(function(e){
        $input1.val(e.target.value)
    })

}

var quotes = document.getElementsByTagName('h1')
var slides = []

for (var i = 0; i < quotes.length; i++){
    slides.push(new Slide(quotes[i]))
}

function animate(){
    var slide;
    var nextSlide;

    function tracker(){
        for (var i = 0; i < slides.length; i++){
            if ( slides[i].isOpen() ) {
                slide = slides[i]
                nextSlide = slides[i+1]
                break
            }
        }
        slide = slide || slides[0]
        return
    }
                    
    function go(){
        tracker()
        if ( nextSlide === undefined ) { // first run case
            slide.staggerOpen()
            setTimeout(go, 5000)
            return
        }
        slide.staggerClose()
        setTimeout(nextSlide.staggerOpen, 2500)
        setTimeout(go, 7500)
    }
    setTimeout(go, 500)
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
