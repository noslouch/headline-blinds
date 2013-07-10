var A = {
    blinds : document.getElementsByClassName('blind'),
    open : function(){
        for (var i = 0; i < this.blinds.length; i++){ 
            this.blinds[i].classList.remove('closed')
            this.blinds[i].classList.add('opened')
        }
    },
    close : function(){
        for (var i = 0; i < this.blinds.length; i++){ 
            this.blinds[i].classList.remove('opened')
            this.blinds[i].classList.add('closed')
        }
    }
}
