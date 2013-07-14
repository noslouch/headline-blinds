var A = {
    blinds : document.getElementsByClassName('blind'),
    index : 0,
    setCurrent : function(){this.current = this.blinds[this.index]},
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
        setTimeout(A.stagger.bind(A), 250)
    }
}

function init(){
    setTimeout(A.stagger.bind(A), 750)
}

init()
