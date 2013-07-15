"use strict";
/*jshint -W002*/

var quotes = document.getElementsByTagName('h1'),
    slides = [],
    $loader = $('.loader'),
    container = document.getElementById('container'),
    animation


function Slide(h1){
    var openFlag = false
    var self = this
    self.blinds = h1.children

    self.init()
    
    function open(index){
        if ( index === self.blinds.length ) {
            return
        }
        $(self.blinds[index]).addClass('opened ')
        $(self.blinds[index]).removeClass('closed')
        setTimeout(open.bind(self,index+1), 110)
    }

    function close(index){
        if ( index === self.blinds.length ) {
            return
        }
        $(self.blinds[index]).removeClass('opened')
        $(self.blinds[index]).addClass('closed')
        setTimeout(close.bind(self,index+1), 110)
    }

    self.staggerOpen = function(){
        openFlag = true
        open(0)
    }

    self.staggerClose = function(){
        openFlag = false
        close(0)
    }

    self.isOpen = function() {
        return openFlag
    }

    self.lastBlind = function(){
        return self.blinds[self.blinds.length-1]
    }
}

Slide.prototype.init = function(){
    Slide.prototype.slides = Slide.prototype.slides || []
    Slide.prototype.slides.push(this)
}


Slide.prototype.getCurrent = function(){
    var current;
    var slides = Slide.prototype.slides
    for (var i = 0; i < slides.length; i++){
        if (slides[i].isOpen()){
            current = slides[i]
            break
        }
    }
    if (!current){
        current = slides[0]
    }

    return current
}

Slide.prototype.getNext = function(){
    var current = Slide.prototype.getCurrent()
    var next;

    for (var i = 0; i < Slide.prototype.slides.length; i++){
        if (slides[i] === current){
            next = slides[i+1]
        }
    }

    return next
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

function restart(e){
    console.log(e.target)
    console.log(e.target === slides)
}

/*
 * at the end of a slide transition:
 * close it if it's open,
 * open it if it's closed,
 * and kick off next slide after an interval
*/

function animationHandler(e){
    var slide = Slide.prototype.getCurrent(),
        next = Slide.prototype.getNext(),
        lastBlind = slide.lastBlind(),
        blind = e.target

    if (blind === lastBlind && $(lastBlind).hasClass('opened')) {
        slide.staggerClose()
        try {
            animation = setTimeout(next.staggerOpen, 2500)
        } catch(e) {
            next = Slide.prototype.slides[0]
            animation = setTimeout(next.staggerOpen, 2500)
        }

    }
}

$(container).on('webkitTransitionEnd', animationHandler)
$(container).on('transitionEnd', animationHandler)
$(container).on('transitionend', animationHandler)

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
        if ( this.index > this.blinds.length - 1 ){ return;}
        setTimeout(this.staggerOpen.bind(A), 110)
    },
    staggerClose : function(){
        this.setCurrent()
        this.close()
        this.index--
        if ( this.index > this.blinds.length - 1 ) {return;}
        setTimeout(this.staggerClose.bind(A), 110)
    }
}
/*
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
*/
function valueSwap($input1, $input2){
    $input1.change(function(e){
        $input2.val(e.target.value)
    })
    $input2.change(function(e){
        $input1.val(e.target.value)
    })
}


for (var i = 0; i < quotes.length; i++){
    slides.push(new Slide(quotes[i]))
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

    slides[0].staggerOpen()
})
